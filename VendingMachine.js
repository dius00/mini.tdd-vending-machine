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
    this.coffee1 = { name: `Regular Coffee`, price: 150, count: 6 };
    this.coffee2 = { name: `Decaf Coffee`, price: 200, count: 5 };
    this.coffee3 = { name: `Latte`, price: 300, count: 2 };
    this.coffee4 = { name: `Espresso`, price: 230, count: 4 };
    this.juice1 = { name: `Apple Juice`, price: 350, count: 3 };
    this.juice2 = { name: `Peach Juice`, price: 350, count: 4 };
    this.juice3 = { name: `Pear Juice`, price: 350, count: 5 };
    this.juice4 = { name: `Mango Juice`, price: 450, count: 1 };
    this.tea1 = { name: `Black Tea`, price: 250, count: 5 };
    this.tea2 = { name: `Green Tea`, price: 250, count: 5 };
    this.tea3 = { name: `Matcha Tea`, price: 330, count: 5 };
    this.tea4 = { name: `Soba Tea`, price: 250, count: 5 };
    this.water1 = { name: `Water`, price: 100, count: 5 };
    this.water2 = { name: `Sparkling Water`, price: 130, count: 5 };
    this.water3 = { name: `Fancy Water`, price: 500, count: 5 };
    this.water4 = { name: `Energy Drink`, price: 600, count: 5 };

    this.inventory = [
      [this.coffee1, this.coffee2, this.coffee3, this.coffee4],
      [this.juice1, this.juice2, this.juice3, this.juice4],
      [this.tea1, this.tea2, this.tea3, this.tea4],
      [this.water1, this.water2, this.water3, this.water4],
    ];

    this.change = {
      10: 0,
      50: 0,
      100: 0,
      500: 0,
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
        this.change[500] += 1;
        amount -= 500;
      } else if (amount - 100 >= 0) {
        this.change[100] += 1;
        amount -= 100;
      } else if (amount - 50 >= 0) {
        this.change[50] += 1;
        amount -= 50;
      } else if (amount - 10 <= 0) {
        this.change[10] += 1;
        amount -= 10;
      }
    }
    console.log(
      JSON.stringify(this.change)
        .replace(/["]/gm, "")
        .replace(/[:]/gm, ": ")
        .replace(/[,]/gm, ", ")
        .slice(1, -1)
    );
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
        console.log("Error!");
      }
      item.count--;
      if (item.price > this.balance) console.log("Insufficient credit!");
      else {
        this.changeReturn(item.price);
        console.log(item.name);
      }
    }
  }
}

module.exports = VendingMachine;
/*
  >>> Don't forget to use module.exports!
  What is that? Well, glad you asked.
  Read about it here: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
*/
