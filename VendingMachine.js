// your class here
class VendingMachine {
  constructor() {
    this.till = {
      10: 10,
      50: 10,
      100: 10,
      500: 10,
    };
    this.balance = 0;
    this.row;
    this.column;
    this.juice1 = { name: `Apple Juice`, price: 350, count: 5 };
    this.juice2 = { name: `Apple Juice`, price: 350, count: 5 };
    this.juice3 = { name: `Apple Juice`, price: 350, count: 5 };
    this.juice4 = { name: `Apple Juice`, price: 350, count: 5 };
    this.coffee1 = { name: `Coffee1`, price: 350, count: 5 };
    this.coffee2 = { name: `Coffee1`, price: 350, count: 5 };
    this.coffee3 = { name: `Coffee1`, price: 350, count: 5 };
    this.coffee4 = { name: `Coffee1`, price: 350, count: 5 };
    this.tea1 = { name: `Tea`, price: 350, count: 5 };
    this.tea2 = { name: `Tea`, price: 350, count: 5 };
    this.tea3 = { name: `Tea`, price: 350, count: 5 };
    this.tea4 = { name: `Tea`, price: 350, count: 5 };
    this.water1 = { name: `Apple Juice`, price: 350, count: 5 };
    this.water2 = { name: `Apple Juice`, price: 350, count: 5 };
    this.water3 = { name: `Apple Juice`, price: 350, count: 5 };
    this.water4 = { name: `Apple Juice`, price: 350, count: 5 };

    this.inventory = [
      [this.coffee1, this.coffee2, this.coffee3, this.coffee4],
      [this.juice1, this.juice2, this.juice3, this.juice4],
      [this.tea1, this.tea2, this.tea3, this.tea4],
      [this.water1, this.water2, this.water3, this.water4],
    ];

    this.change = {
      ten: 0,
      fifty: 0,
      hundred: 0,
      fivehundred: 0,
    };
  }
  insertCoin(denomination) {
    this.balance += denomination;
    this.till[denomination] += 1;
    return this.balance;
  }
  changeReturn(price) {
    this.balance -= price;
    let amount = this.balance;
    console.log(amount);
    while (amount != 0) {
      if (amount - 500 >= 0) {
        this.change.fivehundred += 1;
        amount -= 500;
      } else if (amount - 100 >= 0) {
        this.change.hundred += 1;
        amount -= 100;
      } else if (amount - 50 >= 0) {
        this.change.fifty += 1;
        amount -= 50;
      } else if (amount - 10 <= 0) {
        this.change.ten += 1;
        amount -= 10;
      }
    }
    console.log(JSON.stringify(this.change));
  }
  pressButton(input) {
    if (typeof input === "string") {
      this.row = input;
      console.log(input);
    } else {
      this.column = input;
      console.log(`${this.row}${this.column}`);
      const rowChooser = { A: 0, B: 1, C: 2, D: 3 };
      let item = this.inventory[rowChooser[this.row]][this.column - 1];
      if (item.count === 0) {
        return "Error!";
      }
      item.count--;
      if (item.price > this.balance) return "Insufficient credit!";
      this.changeReturn(item.price);
      return `${item.name}`;
    }
  }
}

module.exports = VendingMachine;
/*
  >>> Don't forget to use module.exports!
  What is that? Well, glad you asked.
  Read about it here: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
*/
