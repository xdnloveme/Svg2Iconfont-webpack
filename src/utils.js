const fs = require('fs');

// 异步读取文件夹列表
const readDirAsync = iconPath => {
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
const readFileAsync = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result.toString());
    });
  });
};

// 异步创建文件夹
const mkdirAsync = path => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

function isPainObject(o) {
  return (
    o &&
    // 排除 boolean/string/number/function 等
    Object.prototype.toString.call(o) === '[object Object]' &&
    'isPrototypeOf' in o
  );
}

module.exports = {
  readDirAsync,
  readFileAsync,
  mkdirAsync,
  isPainObject,
};
