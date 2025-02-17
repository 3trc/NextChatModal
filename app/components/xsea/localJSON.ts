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

const SessionJSON = new Proxy({}, sessionHandler);

export default LocalJSON;
