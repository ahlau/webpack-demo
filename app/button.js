module.exports = function(text) {
  var element = document.createElement('button');
  element.innerHTML = text || 'hello world';
  element.className = 'pure-button';
  return element;
};
