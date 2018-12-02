function remove_null(obj) {
  const newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] != null) { newObj[prop] = obj[prop]; }
  });
  return newObj;
}

export function merge_master(masters) {
  return (e) => {
    if (!e.master_id) return e;
    const master = masters.find(m => m.id === e.master_id);
    return Object.assign({}, remove_null(master), remove_null(e));
  };
}
