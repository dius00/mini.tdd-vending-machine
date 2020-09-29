const VendingMachine = require("../VendingMachine");
const { expect } = require("chai");
const sinon = require("sinon");

describe("vending machine", () => {
  //setup
  let machine;
  const spy = sinon.spy(console, "log");
  beforeEach(() => {
    machine = new VendingMachine();
  });
  afterEach(() => spy.resetHistory());
  describe("insertCoin ", () => {
    it("should accept valid coins and update the till", () => {
      // Exercise
      machine.insertCoin(500);

      // Assert
      expect(machine.till).to.deep.equal({
        10: 10,
        50: 10,
        100: 10,
        500: 11,
      });
      expect(machine.balance).to.equal(500); // Use an ES6 getter
    });
    it("should have method insertCoin", () => {
      expect(typeof machine.insertCoin).to.equal("function");
    });
    it("should raise the balance when coin is inserted", () => {
      machine.insertCoin(100);
      expect(machine.balance).to.equal(100);
    });
  });
  describe("changeReturn", () => {
    it("should have method changeReturn", () => {
      expect(typeof machine.changeReturn).to.equal("function");
    });
    it("should return correct change balance", () => {
      machine.insertCoin(500);
      machine.pressButton("A");
      machine.pressButton(1);
      expect(machine.balance).to.equal(350);
    });
    it("should return change coins (type and number) correctly", () => {
      machine.insertCoin(500);
      machine.pressButton("A");
      machine.pressButton(1);

      expect(spy.calledWith("10: 0, 50: 1, 100: 3, 500: 0")).to.be.true;
    });
  });

  describe("pressButton", () => {
    it("should have method pressButton", () => {
      expect(typeof machine.pressButton).to.equal("function");
    });
    it("should save and print the row letter", () => {
      machine.pressButton("A");
      expect(spy.calledWith("A")).to.be.true;
    });
    it("should save and print the column", () => {
      machine.pressButton("A");
      machine.pressButton(1);
      expect(machine.column).to.equal(1);
    });
    it("should decrease item inventory by 1", () => {
      machine.pressButton("B");
      machine.pressButton(4);
      expect(machine.juice4.count).to.equal(0);
    });
    it("should throw an error if item is not in stock", () => {
      for (let i = 0; i < 5; i++) {
        machine.pressButton("B");
        machine.pressButton(1);
      }
      machine.pressButton("A");
      machine.pressButton(1);
      expect(spy.calledWith("Error!")).to.be.true;
    });
    it("should throw an error if you can't afford it", () => {
      machine.pressButton("A");
      machine.pressButton(1);
      expect(spy.calledWith("Insufficient credit!")).to.be.true;
    });
    it("should return the name of the item selected", () => {
      machine.insertCoin(500);
      machine.pressButton("A");
      machine.pressButton(1);
      expect(spy.calledWith(`Regular Coffee`)).to.be.true;
    });
  });
  describe("inventory", () => {
    it("should have property inventory", () => {
      expect(machine.inventory).to.not.be.undefined;
    });
  });
});
