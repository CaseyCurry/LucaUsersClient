"use strict";

const expect = require("chai")
  .expect;
const hashPassword = require("./hash-password")
  .default;

describe("hash password test suite", () => {
  describe("unit test suite", () => {
    it("should hash password", () => {
      const unhashed = "123";
      const hashed = hashPassword(unhashed);
      expect(unhashed)
        .not
        .to
        .equal(hashed);
      expect(hashed)
        .to
        .be
        .ok;
    });
  });
});
