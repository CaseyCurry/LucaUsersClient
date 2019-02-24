import scrypt from "scryptsy";

/* A more secure hash is done on the server. Passwords are hashed on the client
   just to guard against plain-text passwords from being stored into logs
   on accident. */
const hashPassword = (password, email) => {
  const numberOfIterations = 1024;
  const memoryFactor = 8;
  const parallelization = 1;
  const lengthInBytes = 16;
  const hash = scrypt(
    password,
    email,
    numberOfIterations,
    memoryFactor,
    parallelization,
    lengthInBytes
  ).toString("hex");
  return hash;
};

export default hashPassword;
