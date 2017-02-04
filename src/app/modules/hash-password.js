import hash from "hash.js";

const hashPassword = (password) => {
  return hash
    .sha256()
    .update(password)
    .digest("hex");
};

export default hashPassword;
