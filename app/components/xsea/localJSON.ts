const handler = {
  get: (_: any, property: any) => {
    try {
      return JSON.parse(localStorage.getItem(property) as string);
    } catch (error) {
      return null;
    }
  },
  set: (_: any, property: any, value: any) => {
    localStorage.setItem(property, JSON.stringify(value));
    return true;
  },
};

const LocalJSON = new Proxy({}, handler);

export default LocalJSON;
