import Cat from './cat.js';
import Dog from './dog.js';
import { VERSION } from 'lodash';

let dog = new Dog();
console.log(dog);

let cat = new Cat();
console.log(cat);

console.log(VERSION);

var sayHello = function(name) {
  var s = 'Received: ' + name + ' - lodash version: ' +_.VERSION;
  console.log('Hello, ' + name + '!');
  console.log(s);
  return s
};

sayHello('javascript');

export { Dog, Cat, sayHello };
