export const sessionGet = (key) => {
    const stringValue = window.sessionStorage.getItem(key);
    if (stringValue !== null) {
      const value = JSON.parse(stringValue);
      const expirationDate = new Date(value.expirationDate);
      if (expirationDate.getTime() > new Date().getTime()) {
        return value.value;
      }
      window.sessionStorage.removeItem(key);
    }
    return null;
  };
  
  export const sessionSet = (key, value, expiration) => {
    const expirationDate = new Date(new Date().getTime() + (60000 * expiration));
    const newValue = {
      value,
      expirationDate: expirationDate.toISOString(),
    };
    window.sessionStorage.setItem(key, JSON.stringify(newValue));
  };
  
  export const sessionRemove = (key) => {
    window.sessionStorage.removeItem(key);
  };
  
  export const localGet = (key) => {
    const stringValue = window.localStorage.getItem(key);
    if (stringValue !== null) {
      const value = JSON.parse(stringValue);
      const expirationDate = new Date(value.expirationDate);
      if (expirationDate > new Date()) {
        return value.value;
      }
      window.localStorage.removeItem(key);
    }
    return null;
  };
  
  export const localSet = (key, value, expiration) => {
    const expirationDate = new Date(new Date().getTime() + (60000 * expiration));
    const newValue = {
      value,
      expirationDate: expirationDate,
    };
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };
  
  export const localRemove = (key) => {
    window.localStorage.removeItem(key);
  };