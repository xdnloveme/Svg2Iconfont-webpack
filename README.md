# Svg2Iconfont-webpack
A webpack plugin for **svg transform to iconfont** automatically.🎉

# why use?

English:

1. You can **package all svg files** to **iconfont** bundle.
2. You can use it in your code by **setting ClassName(the same as filename)**  directly **without any import or require**.
3. All process is automatic, you don't care about anything;

中文:

1. 你可以根据**指定资源路径**，打包所有的svg文件，统一生成一份iconfont文件
2. 整个流程都是**自动的**，统一生成的文件也是**自动引入的**，你不用另外的import或者require，你只需要启动你的项目(npm start)，即可在你的代码里**对应文件名直接设置ClassName**，即可显示ICON图标。

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

And you can show the icons by setting **ClassName(From Filename)**, the same name from Filename, including the path,**but format to '-' sign**.

```html
<!-- 你可以通过设置你对应svg文件的文件名（不带svg后缀名），来达到显示图标的目的，注意，如果你的文件是嵌套在文件夹里面的，请输入文件夹 + 文件名的方式来对应显示，分隔符是“-”而不是“/” -->
<!-- if you want to show the "my-icon-file-name.svg" ICON -->
<!-- the className below represent the icons -->
<i class="my-icon-file-name icon-iconfont"></i>
```

Then you will see **ICON appeared**:

![plugin-desc](https://github.com/xdnloveme/MarkdownPictureStore/blob/master/plugin-desc.png)

OR You can set  its unicode by your own className(**First, you should know the ICON's unicode**)

```html
<!-- add class "icon-iconfont" -->
<i class="my-icon-class icon-iconfont"></i>
```

Css

```css
/* your icon class */
.my-icon-class::after {
  /* your icon unicode */
  content: "\0e602"; 
}
```



# LICENSE

### [MIT](https://github.com/xdnloveme/Svg2Iconfont-webpack/blob/master/LICENSE)

