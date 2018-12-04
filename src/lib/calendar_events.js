function removeNull(obj) {
  const newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] != null) { newObj[prop] = obj[prop]; }
  });
  return newObj;
}

// eslint-disable-next-line
export function mergeMaster(masters) {
  return (e) => {
    if (!e.master_id) return e;
    const master = masters.find(m => m.id === e.master_id);
    return Object.assign({}, removeNull(master), removeNull(e));
  };
}
