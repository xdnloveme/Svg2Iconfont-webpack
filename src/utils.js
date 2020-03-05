const fs = require('fs');

// 异步读取文件夹列表
const readDirAsync = async iconPath => {
  return new Promise((resolve, reject) => {
    fs.readdir(
      iconPath,
      {
        withFileTypes: true,
      },
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      },
    );
  });
};

// 异步读取文件
const readFileAsync = async filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result.toString());
    });
  });
};

const mkdirAsync = async path => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

module.exports = {
  readDirAsync,
  readFileAsync,
  mkdirAsync,
};
