function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const ali = new Person("Ali");
ali.greet(); // "Hi, I'm Ali"

console.log(ali.__proto__ === Person.prototype); // true