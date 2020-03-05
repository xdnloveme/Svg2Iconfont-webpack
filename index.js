const fontCarrier = require("font-carrier");
const fs = require("fs");
const wideTraversalIcons = require("./wideTraversalIcons");
const { readFileAsync } = require("./utils");
const MAX_UNICODE_NUM = 1048576;
const { resolve } = require('./src/path');

const matchIconsList = async (assetsPath) => {
  return await wideTraversalIcons(assetsPath);
};

const font = fontCarrier.create();
const startUnicodeHex = "e601";

const createProcess = async (assetsPath, outputPath) => {
  const iconList = await matchIconsList(assetsPath);
  for (let i = 0; i < iconList.length; i++) {
    const svgPath = `${assetsPath}/${iconList[i].oppositePath}`;
    const cSvg = fs.readFileSync(svgPath).toString();

    // Translate from HEX
    const HEX2Decimal = parseInt(startUnicodeHex, 16);

    // check if over above maximum unicode number
    if (HEX2Decimal >= MAX_UNICODE_NUM) {
      throw new Error("Exceeds the maximum unicode number");
    }

    // Decimal auto-increment, translate to HEX
    const HEXCode = Number(HEX2Decimal + i).toString(16);
    console.log("HEXCode=", HEXCode);

    // set Unicode
    font.setSvg(`&#x${HEXCode};`, cSvg);
  }

  font.output({
    path: outputPath,
  });
};

module.exports = class Svg2IconfontWebpack {
  constructor(props = {}) {
    this.init(props);
  }

  init (props) {
    const { assetsPath = null, outputPath = null } = props;
    this.assetsPath = assetsPath;
    this.outputPath = outputPath;
  }

  apply(compiler) {
    compiler.hooks.watchRun.tap("Svg2IconfontWebpack", async () => {
      await createProcess(this.assetsPath, this.outputPath);
    });

    compiler.hooks.compilation.tap("Svg2IconfontWebpack", compilation => {
      console.log("The compiler is starting a new compilation...");

      compilation.plugin("html-webpack-plugin-before-html-processing", data => {
        data.assets.css.push("/css/main.css");
        return Promise.resolve(data);
      });
    });

    compiler.hooks.make.tap("Svg2IconfontWebpack", async compilation => {
      compilation.hooks.additionalAssets.tapAsync(
        "Svg2IconfontWebpack",
        async cb => {
          const fileContent = await readFileAsync(
            resolve("../iconWebpack/template/temp.css")
          );
          compilation.assets["css/main.css"] = {
            source: () => {
              return fileContent;
            },
            size: () => {
              return Buffer.byteLength(fileContent, "utf-8");
            }
          };
          cb();
        }
      );
    });
  }
};
