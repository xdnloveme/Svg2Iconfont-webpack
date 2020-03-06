# Svg2Iconfont-webpack
a webpack plugin for svg to iconfont.

# Getting Started
First of all, install the module:
```
npm i svg2iconfont-webpack
```

## Usage

```javascript
const Svg2IconfontWebpack = require("svg2iconfont-webpack");
const path = require('path');

const resolve = oppositePath => {
  return path.resolve(__dirname, oppositePath);
};

module.exports = {
  plugins: [
    new svg2iconfontWebpack({
      // 你的资源文件夹
      // your svg assets folder url
      assetsPath: resolve("./assets/icon"),
      // output
      output: {
        // 输出文件夹地址
        // destination
        path: resolve("../dist"),
        // 输出字体文件的名称(ttf, otf, etc...)
        // font-lib name
        fileName: "font-lib",
        // 引入CSS文件的名称
        // import css modules name
        cssFileName: "iconfont-web"
      }
    })
  ]
}

```

# LICENSE

### [MIT](https://github.com/xdnloveme/Svg2Iconfont-webpack/blob/master/LICENSE)

