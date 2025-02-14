const handler = {
  get: (_: any, property: any) => {
    return JSON.parse(localStorage.getItem(property) as string);
  },
  set: (_: any, property: any, value: any) => {
    localStorage.setItem(property, JSON.stringify(value));
    return true;
  },
};

const LocalJSON = new Proxy({}, handler);

export default LocalJSON;
