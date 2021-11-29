export const clearWindowName = () => {
  if (window.name) {
    sessionStorage.removeItem(window.name);
    window.name = '';
  }
};

export const saveCurrentPageAndRedirect = (userName) => {
  const windowName = `DMSWeb-${Math.floor(100000 + Math.random() * 900000)}`;
  window.name = windowName;
  const details = JSON.stringify({ loggedOutLocation: window.location.href, loggedOutUser: userName });
  sessionStorage.setItem(windowName, details);
  window.location = `${process.env.REACT_APP_API_URL}`;
};
