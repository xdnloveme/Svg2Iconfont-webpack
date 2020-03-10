const Svg2IconfontWebpack = require('../');
const { DEFAULT_OPTIONS, DEFAULT_FONT_OPTIONS, DEFAULT_OUTPUT } = require('../src/constant');

describe('plugin test start', () => {
  it('does not throw when called', () => {
    expect(() => {
      new Svg2IconfontWebpack();
    }).not.toThrow();
  });

  it('check default parameters', () => {
    const plugin = new Svg2IconfontWebpack();
    expect(plugin.pluginOptions.assetsPath).toEqual(DEFAULT_OPTIONS.assetsPath);
    expect(plugin.pluginOptions.output).toEqual(DEFAULT_OUTPUT);
    expect(plugin.pluginOptions.fontOptions).toEqual(DEFAULT_FONT_OPTIONS);
  });

  it('can override default parameters', () => {
    const options = {
      assetsPath: './test/assetsPath',
      output: {
        fileName: "test-file-name",
        cssFileName: "test-iconfont-web"
      },     
      fontOptions: {
        fontSize: 128,
        fontFamily: 'test-iconFont'
      }
    }

    const plugin = new Svg2IconfontWebpack(options);
    expect(plugin.pluginOptions.assetsPath).toEqual(options.assetsPath);
    expect(plugin.pluginOptions.output.fileName).toEqual(options.output.fileName);
    expect(plugin.pluginOptions.output.cssFileName).toEqual(options.output.cssFileName);
    expect(plugin.pluginOptions.fontOptions.fontSize).toEqual(options.fontOptions.fontSize);
    expect(plugin.pluginOptions.fontOptions.fontFamily).toEqual(options.fontOptions.fontFamily);
  })

})