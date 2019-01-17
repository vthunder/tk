import * as moment from 'moment';

export function priceCents(cents) {
  return (cents / 100)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function priceWhole(cents) {
  return (cents / 100)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    .split('.')[0];
}

export function date(unix) {
  return moment.unix(unix).format('dddd, MMMM Do YYYY');
}
