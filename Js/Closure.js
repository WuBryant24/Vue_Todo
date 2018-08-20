//閉包：存取內部的涵式
//運作原理：呼叫Function內的Function
//內層Function作用域變數只會存在內層
//內層Function變數可以不被釋放，重複使用

//直接呼叫內層涵式--------------------------------------------------------------------------

const buyItem = () => { //宣告一個function
  let myMoney = 1000;
  return (price) => {
    myMoney = myMoney - price;
    return myMoney;
  }
}

let balance = buyItem()(100); //呼叫內部涵式 ，存取內部涵式的變數
console.log('直接呼叫內層涵式 = ', balance);  //900

//why?
// 外層的myMoney可以被內層的Function存取
// 內層的myMoney變成私有變數，外層無法存取
// 運行buyItem()(100)時，等同於呼叫一次外層在一次內層，最終將內層的值回傳給balance變數

//將外層涵式賦予到另一個變數上--------------------------------------------------------------


const buyItem2 = () => {
  let myMoney2 = 1000;
  return (price2) => {
    myMoney2 = myMoney2 - price2;
    return myMoney2;
  }
}

let balance2 = buyItem();  //存取內部涵式的變數
console.log('外層涵式賦予到其他變數上 === ', balance2(100));  //900
console.log('外層涵式賦予到其他變數上 === ', balance2(100));  //800
console.log('外層涵式賦予到其他變數上 === ', balance2(100));  //700
//每次執行都是跑內層的涵式，因此只會更新內層的涵式變數

// buyItem2() 直接執行會出現 function... ，所以無法直接使用
// balance2現在指向 buyItem2()使其可以不斷反覆呼叫，且內層記憶體不會被釋放
// balance2()每次執行時，只會執行內層的涵式，在記憶沒被釋放的情況下，myMoney2變數會不斷被更新。

//多個具私有變數的涵式-----------------------------------------------------------------------

// 使用閉包產生兩個作用域

const buyItem3 = (money3)=>{
  let myMoney3 = money3;
  return (price3)=>{
    myMoney3 = myMoney3 - price3;
    return myMoney3;
  }
}

let MyCost = buyItem3(1000); //存取內部涵式的變數
let YouCost = buyItem3(10000);

console.log('使用閉包產生兩個作用域');

console.log('MyCost的內層作用域變數  === ', MyCost(100));  //900
console.log('MyCost的內層作用域變數  === ', MyCost(100));  //800
console.log('MyCost的內層作用域變數  === ', MyCost(100));  //700

console.log('YouCost的內層作用域變數 === ', YouCost(1000)); //9000
console.log('YouCost的內層作用域變數 === ', YouCost(1000)); //8000
console.log('YouCost的內層作用域變數 === ', YouCost(1000)); //7000

//let MyCost = buyItem3(1000); 此時buyItem3已經執行過一次，並且將myMoney3變數已經依照傳入的變數做調整。
//每次執行MyCost(100) 時，調整的是傳至內層的myMoney3變數
