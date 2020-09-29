const VendingMachine = require("../VendingMachine");
const { expect } = require("chai");

describe("vending machine", () => {
  describe("insertCoin ", () => {
    it("should accept valid coins and update the till", () => {
      // Setup
      const machine = new VendingMachine();

      // Exercise
      machine.insertCoin(500);

      // Assert
      expect(machine.till).to.deep.equal({
        10: 0,
        50: 0,
        100: 0,
        500: 1,
      });
      expect(machine.balance).to.equal(500); // Use an ES6 getter
    });
    it("should have method insertCoin", () => {
      const machine = new VendingMachine();
      expect(typeof machine.insertCoin).to.equal("function");
    });
    it("should raise the balance when coin is inserted", () => {
      const machine = new VendingMachine();
      machine.insertCoin(100);
      expect(machine.balance).to.equal(100);
    });
  });
  describe("changeReturn", () => {
    it("should have method changeReturn", () => {
      const machine = new VendingMachine();
      expect(typeof machine.changeReturn).to.equal("function");
    });
    it("should return correct change", () => {
      const machine = new VendingMachine();
      machine.insertCoin(500);
      machine.pressButton("A");
      machine.pressButton(1);
      expect(machine.balance).to.equal(150);
    });
  });
  describe("pressButton", () => {
    it("should have method pressButton", () => {
      const machine = new VendingMachine();
      expect(typeof machine.pressButton).to.equal("function");
    });
    it("should save and print the row letter", () => {
      const machine = new VendingMachine();
      machine.pressButton("A");
      expect(machine.row).to.equal("A");
    });
    it("should save and print the column", () => {
      const machine = new VendingMachine();
      machine.pressButton("A");
      machine.pressButton(1);
      expect(machine.column).to.equal(1);
    });
    it("should decrease item inventory by 1", () => {
      const machine = new VendingMachine();
      machine.pressButton("A");
      machine.pressButton(1);
      expect(machine.coffee1.count).to.equal(4);
    });
    it("should throw an error if item is not in stock", () => {
      const machine = new VendingMachine();
      for (let i = 0; i < 5; i++) {
        machine.pressButton("A");
        machine.pressButton(1);
      }
      machine.pressButton("A");
      expect(machine.pressButton(1)).to.equal("Error!");
    });
    it("should throw an error if you can't afford it", () => {
      const machine = new VendingMachine();
      machine.pressButton("A");
      expect(machine.pressButton(1)).to.equal("Insufficient credit!");
    });
  });
  describe("inventory", () => {
    it("should have property inventory", () => {
      const machine = new VendingMachine();
      expect(machine.inventory).to.not.be.undefined;
    });
  });
});
