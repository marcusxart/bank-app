exports.generateReferenceId = () => {
  const timestamp = Date.now().toString();
  const randomPart = Math.random().toString().slice(2, 12); // Random
  return timestamp + randomPart;
};
