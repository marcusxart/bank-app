const formChecker = (form) => {
  if (form) {
    return Object.values(form).every((value) => value);
  }
  return false;
};

export default formChecker;
