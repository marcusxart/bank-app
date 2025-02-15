export const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

export const deleteCookie = (name) => {
  const date = new Date();
  date.setTime(date.getTime() - 1); // Set the date to the past
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=; ${expires}; path=/`;
};

export const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};
