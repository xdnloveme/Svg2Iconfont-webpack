import Svg2IconfontWebpack from '../';

describe('plugin test start', () => {
  it('does not throw when called', () => {
    expect(() => {
      new Svg2IconfontWebpack();
    }).not.toThrow();
  });

})