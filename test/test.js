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
  });
  describe("inventory", () => {
    it("should have property inventory", () => {
      const machine = new VendingMachine();
      expect(machine.inventory).to.not.be.undefined;
    });
  });
});
