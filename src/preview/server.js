const webpack = require('webpack');
const express = require('express');
const events = require('events');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./config/webpack.config');

console.log(webpackConfig);

const defaults = {
  host: '0.0.0.0',
  port: 3001,
  https: false,
};

module.exports = class Server extends events.EventEmitter {
  constructor(context) {
    super();
    this.context = context;
    const app = express();
    const complier = webpack(webpackConfig);

    // const HotMiddleware = webpackHotMiddleware(complier, {
    //   log: false,
    //   heartbeat: 2000,
    // });

    const DevMiddleware = webpackDevMiddleware(complier, {
      //绑定中间件的公共路径,与webpack配置的路径相同
      publicPath: webpackConfig.output.publicPath,
      logLevel: false, //向控制台显示任何内容
    });

    app.use(DevMiddleware);
    // app.use(HotMiddleware);

    app.use(express.static(path.resolve(__dirname, '../dist')));

    this.server = http.createServer(app);

    this.wss = new WebSocket.Server({ server: this.server });
  }

  async start() {
    // httpserver
    if (this.server) {
      this.server.listen(defaults.port, err => {
        if (err) {
          console.error(err);
        }
      });
    }

    // websocket
    if (this.wss) {
      const ws = await this.connect(this.wss);

      this.ws = ws;
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
    console.log('获取到了', this.context, iconList);
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
