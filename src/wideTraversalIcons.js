const { readDirAsync } = require('./utils')

const imageReg = /\.jpeg|\.png|\.jpg|\.svg/i

/**
 * 遍历文件夹下所有icon图片列表
 * @param {icon存放地址} iconPath
 */
const wideTraversalIcons = async (iconPath, nestFolder = null) => {
  let icons = []

  const fileList = await readDirAsync(iconPath)
  const fileTypes = fileList.filter(
    file => file.isFile() && imageReg.test(file.name),
  )
  const dirTypes = fileList.filter(file => file.isDirectory())

  icons = fileTypes.map(item => {
    return {
      ...item,
      oppositePath: nestFolder ? `${nestFolder}/${item.name}` : item.name,
    }
  })

  for (let i = 0; i < dirTypes.length; i++) {
    const each = dirTypes[i]
    const nestFolderUrl = nestFolder ? `${nestFolder}/${each.name}` : each.name
    const nestFiles = await wideTraversalIcons(
      `${iconPath}/${each.name}`,
      nestFolderUrl,
    )
    icons = icons.concat(nestFiles)
  }

  return icons
}

module.exports = wideTraversalIcons;
