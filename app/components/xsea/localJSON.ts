const handler = {
  get: (_: any, property: any) => {
    try {
      return JSON.parse(sessionStorage.getItem(property) as string);
    } catch (error) {
      return null;
    }
  },
  set: (_: any, property: any, value: any) => {
    sessionStorage.setItem(property, JSON.stringify(value));
    return true;
  },
};

const LocalJSON = new Proxy({}, handler);

export default LocalJSON;
