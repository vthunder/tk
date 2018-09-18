import * as _ from 'lodash';

export function restoreField(array) {
  const ret = {};
  array.forEach((pair) => {
    ret[pair.key] = pair.value;
  });
  return ret;
}

export function restoreObject(obj, attributes) {
  const ret = JSON.parse(JSON.stringify(obj));
  attributes.forEach((attr) => {
    _.set(ret, attr, restoreField(_.get(ret, attr)));
  });
  return ret;
}

export function restoreArray(array, attributes) {
  const ret = [];
  array.forEach((obj) => {
    ret.push(restoreObject(obj, attributes));
  });
  return ret;
}

