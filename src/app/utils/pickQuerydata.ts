const pickQuerydata = (queryObj: Record<string, unknown>, keys: string[]) => {
  const finalObj: Record<string, unknown> = {};

  for (const key of keys) {
    if (queryObj && Object.hasOwnProperty.call(queryObj, key)) {
      finalObj[key] = queryObj[key];
    }
  }
  return finalObj;
};

export default pickQuerydata;
