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
    expect(plugin.options.assetsPath).toEqual(DEFAULT_OPTIONS.assetsPath);
    expect(plugin.options.output).toEqual(DEFAULT_OUTPUT);
    expect(plugin.options.fontOptions).toEqual(DEFAULT_FONT_OPTIONS);
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
    expect(plugin.options.assetsPath).toEqual(options.assetsPath);
    expect(plugin.options.output.fileName).toEqual(options.output.fileName);
    expect(plugin.options.output.cssFileName).toEqual(options.output.cssFileName);
    expect(plugin.options.fontOptions.fontSize).toEqual(options.fontOptions.fontSize);
    expect(plugin.options.fontOptions.fontFamily).toEqual(options.fontOptions.fontFamily);
  })

})