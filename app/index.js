require('react');

var component = require('./component');
var button = require('./button');

document.body.appendChild(component());
document.body.appendChild(button("Click Me"));
document.body.appendChild(button("Click"));
