// Javascript 實現私有屬性

// 通常開發人員 把 _開頭的變數 視為私有成員，以便團隊開發。

const Person = (name) => {
  this._name = name;  //箭頭涵式，這裡的_name 等於是放在外面的，這不是作用域
}

function Person1(name1){
  this._name1 = name1;
}
let person1 = new Person1('BRyant');
let person = Person('Bryant');

//person可以直接訪問_name屬性
console.log(this._name);  //Bryant
console.log(person1._name1);  //BRyant

//基於閉包的實現方式------------------------------------------------

function Person3(name3){
  let _name3 = name3;
  this.getName3 = function(){
    return _name3;
  }
}

let person3 = new Person3('BRRyant');

// Person3不能直接訪問_name屬性，只能透過特權函數(getName)獲取。
console.log(person3._name2);     //undefined
console.log(person3.getName3()); //'Bryant'