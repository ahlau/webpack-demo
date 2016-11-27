module.exports = function(text) {
  var element = document.createElement('h1');
  element.innerHTML = text || "hello world";
  return element;
};
