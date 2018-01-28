import { expect } from "chai";
import "mocha";
import { add } from "../src/index";

describe("index", function() {
  before(async () => {});
  after(async () => {});

  it("add should be success", async () => {
    expect(add(1, 2)).to.equal(3);
  });
});
