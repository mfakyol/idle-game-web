const { default: isBrowser } = require("./isBrowser");

class LocalStorageService {
  get = (key) => {
    return isBrowser() ? localStorage.getItem(key) || null : null;
  };

  set = (key, item) => {
    isBrowser() && localStorage.setItem(key, item);
  };

  remove = (key) => {
    isBrowser() && localStorage.removeItem(key);
  };

  clear = () => {
    isBrowser() && localStorage.clear();
  };
}

export default new LocalStorageService();
