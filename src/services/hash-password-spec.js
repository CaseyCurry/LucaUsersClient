import { expect } from "chai";
import hashPassword from "./hash-password";

describe("hash password test suite", () => {
  describe("unit test suite", () => {
    it("should hash password", () => {
      const password = "123";
      const email = "test@example.com";
      const hashed = hashPassword(password, email);
      expect(hashed).to.exist;
      expect(password).not.to.equal(hashed);
    });
  });
});
