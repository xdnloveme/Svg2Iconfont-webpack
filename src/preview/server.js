const webpack = require('webpack');
const express = require('express');
const chalk = require('chalk');
const { EventEmitter } = require('events');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const portfinder = require('portfinder');
const { success } = require('../log');
const webpackDevMiddleware = require('webpack-dev-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');
const webpackConfig = require('./config/webpack.config');

const defaults = {
  host: '127.0.0.1',
  port: 8081,
  https: false,
};

module.exports = class Server extends EventEmitter {
  constructor(context, { options }) {
    super();
    this.context = context;
    const app = express();
    const compiler = webpack(webpackConfig);

    const DevMiddleware = webpackDevMiddleware(compiler, {
      //绑定中间件的公共路径,与webpack配置的路径相同
      publicPath: webpackConfig.output.publicPath,
      logLevel: 'silent', //向控制台显示任何内容
    });

    console.log(compiler);
    console.log(DevMiddleware);

    app.use(DevMiddleware);

    app.use(
      '/project',
      createProxyMiddleware({
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/project': '',
        },
        changeOrigin: true,
      }),
    );

    app.use(express.static(path.resolve(__dirname, '../dist')));

    this.server = http.createServer(app);

    this.wss = new WebSocket.Server({ server: this.server });
  }

  async start() {
    portfinder.basePort = defaults.port;
    const PORT = await portfinder.getPortPromise();
    const HOST = defaults.host;

    // httpserver
    if (this.server) {
      this.server.listen(PORT, err => {
        success(`Preview Server Start at: ${chalk.blue('http://' + HOST + ':' + PORT)}`);
        if (err) {
          console.error(err);
        }
      });
    }

    // websocket
    if (this.wss) {
      this.ws = await this.connect(this.wss);
    }

    this.on('iconList', this.handleIconList.bind(this));
  }

  connect(wss) {
    return new Promise(resolve => {
      wss.on('connection', ws => {
        ws.on('message', this.handleMessage.bind(this));

        resolve(ws);
      });
    });
  }

  close() {}

  handleMessage(event) {
    if (typeof event !== 'string') return;

    // resolve subscribe-publish format: split from ':'
    const eventArgs = event.split(':');
    const name = eventArgs[0];

    let payload = undefined;
    if (eventArgs.length > 1) {
      payload = eventArgs[1];
    }

    this.emit(name, payload);
  }

  handleIconList() {
    const iconList = this.context.iconList;
    this.send(iconList);
  }

  send(payload) {
    if (this.wss) {
      this.wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(payload));
        }
      });
    }
  }
};
