const generateUniqueId = require("generate-unique-id");

exports.generateUserId = (firstName, lastName) => {
  // Get the first letter of the first name and the full last name
  const userInitials =
    firstName[0].toUpperCase() +
    lastName.charAt(0).toUpperCase() +
    lastName.slice(1);

  const uniqueNumber = generateUniqueId({
    length: 6,
    useLetters: false,
    useNumbers: true,
  });

  const userId = `${userInitials}-${uniqueNumber}`;
  return userId;
};

exports.generateAccountNumber = (accountType) => {
  let accountNumber;

  const year = new Date().getFullYear().toString();

  switch (accountType) {
    case "personal":
      accountNumber =
        year +
        generateUniqueId({
          length: 5, // Generate 5 random digits
          useLetters: false, // Use only numbers
          useNumbers: true, // Allow numeric digits
        });
      break;

    case "current":
      // Current Account: 12 digits, padded with leading zeros
      accountNumber = generateUniqueId({
        length: 12, // Generate 12 random digits
        useLetters: false,
        useNumbers: true,
      }).padStart(12, "0");
      break;

    case "checking":
      accountNumber = generateUniqueId({
        length: 10,
        useLetters: false,
        useNumbers: true,
      });
      break;

    default:
      throw new Error("Invalid account type");
  }

  return accountNumber;
};
