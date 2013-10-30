exports.square = function(x) {
  return x * x;
};

exports.area = function(length, width) {
  return length * width;
};

exports.vol = function(length, width, height) {
  return this.area(length, width) * height;
}