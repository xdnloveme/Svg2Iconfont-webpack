const fontCarrier = require('font-carrier');
const fs = require('fs');
const wideTraversalIcons = require('../wideTraversalIcons');
const { startUnicodeHex, MAX_UNICODE_NUM } = require('../constant');
const { mkdirAsync } = require('../utils');

const font = fontCarrier.create();

const matchIconsList = async assetsPath => {
  return await wideTraversalIcons(assetsPath);
};

const fontCreator = async (assetsPath, output) => {
  if (!assetsPath) {
    throw new Error('options: assetsPath required');
  }

  if (!output.path) {
    throw new Error('options: output path required');
  }

  const iconList = await matchIconsList(assetsPath);
  for (let i = 0; i < iconList.length; i++) {
    const svgPath = `${assetsPath}/${iconList[i].oppositePath}`;
    const cSvg = fs.readFileSync(svgPath).toString();

    // Translate from HEX
    const HEX2Decimal = parseInt(startUnicodeHex, 16);

    // check if over above maximum unicode number
    if (HEX2Decimal >= MAX_UNICODE_NUM) {
      throw new Error('Exceeds the maximum unicode number');
    }

    // Decimal auto-increment, translate to HEX
    const HEXCode = Number(HEX2Decimal + i).toString(16);
    // console.log('HEXCode=', HEXCode);

    // set Unicode
    font.setSvg(`&#x${HEXCode};`, cSvg);
  }

  await mkdirAsync(output.path);

  // font.output({
  //   path: outputPathComputed,
  // });
  return font.output();
};

module.exports = fontCreator;