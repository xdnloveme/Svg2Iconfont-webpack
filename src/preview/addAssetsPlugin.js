module.exports = class AddAssetsPlugins {
  constructor(fileList = {}) {
    this.fileList = fileList;
  }

  apply(compiler) {
    const fileList = this.fileList;
    compiler.hooks.emit.tap('AddAssetsPlugins', (compilation) => {
      Object.keys(fileList).forEach(path => {
        compilation.assets[path] = {
          source: () => {
            return fileList[path];
          },
          size: () => {
            return Buffer.byteLength(fileList[path]);
          },
        };
      })
      
    });

    compiler.hooks.failed.tap('AddAssetsPlugins', () => {
      console.log('编译出错了');
    })
  }
};
