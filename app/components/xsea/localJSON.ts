const sessionHandler = {
  get: (target: any, property: any) => {
    try {
      return JSON.parse(sessionStorage.getItem(property) as string);
    } catch (error) {
      return null;
    }
  },
  set: (target: any, property: any, value: any) => {
    sessionStorage.setItem(property, JSON.stringify(value));
    return true;
  },
};

const localHandler = {
  get: (target: any, property: any) => {
    try {
      return JSON.parse(localStorage.getItem(property) as string);
    } catch (error) {
      return null;
    }
  },
  set: (target: any, property: any, value: any) => {
    localStorage.setItem(property, JSON.stringify(value));
    return true;
  },
};

export const SessionJSON = new Proxy({}, sessionHandler);

const LocalJSON = new Proxy({}, localHandler);

export default LocalJSON;
