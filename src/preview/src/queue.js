export default function Queue() {
  const arr = [];
  //入队操作
  this.push = function(element) {
    arr.push(element);
    return true;
  };
  //出队操作
  this.pop = function() {
    return arr.shift();
  };
  //清空队列
  this.clear = function() {
    arr = [];
  };
  //获取队长
  this.size = function() {
    return length;
  };
  // map
  this.map = function (callback) {
    return arr.map(callback);
  };
}
