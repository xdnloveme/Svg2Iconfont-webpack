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
      // 你的资源文件夹根目录
      // your svg assets root url
      assetsPath: resolve("./assets/icon"),
      // output（输出配置）
      output: {
        // 输出文件夹地址
        // destination
        path: resolve("../dist"),
        // 输出字体文件的名称(ttf, otf, etc...)
        // font-lib name => myIconfont
        fileName: "myIconfont",
        // 引入CSS文件的名称
        // import css modules name
        cssFileName: "iconfont-web"
      },
      
      // font options（字体配置）
      fontOptions: {
        // 图标的基准大小
        // icon basic size
        fontSize: 32,

        // 图标的font-family
        // font-family
        fontFamily: 'iconfont'
      }
    })
  ]
}


```

after

```html
<!-- add class "icon-iconfont" -->
<i class="my-icon icon-iconfont"></i>
```

Css

```css
/* your icon class */
.my-icon::after {
  /* your icon unicode */
  content: "\0e602"; 
}
```

Then you will see ICON appeared:

![plugin-desc](https://github.com/xdnloveme/MarkdownPictureStore/blob/master/plugin-desc.png)

# LICENSE

### [MIT](https://github.com/xdnloveme/Svg2Iconfont-webpack/blob/master/LICENSE)

