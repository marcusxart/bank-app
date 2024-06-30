// Function to generate a random digit
function getRandomDigit() {
  return Math.floor(Math.random() * 10);
}

// Function to generate an account number (10 digits)
function generateAccountNumber() {
  let accountNumber = "";
  for (let i = 0; i < 10; i++) {
    accountNumber += getRandomDigit();
  }
  return accountNumber;
}

// Main function to create a complete account number object
function createAccountNumber() {
  return generateAccountNumber();
}

module.exports = { createAccountNumber };
