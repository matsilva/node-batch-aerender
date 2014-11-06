var numCPUs = require('os').cpus().length;
console.log(Math.floor(numCPUs/2));


var array = [2, 5, 9];
var index = array.indexOf(5);

if (index > -1) {
    array.splice(index, 1);
}
console.log(array)

var index = 0;
for (var i = 0; i < Math.floor(numCPUs/2); i++) {
  index++;
}
console.log(index);
