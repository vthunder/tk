import * as products from '@/graphql/products';
import * as kv from '@/lib/keyVal';
import * as format from '@/lib/format';

export function updatePlan({ plan }) {
  const ret = JSON.parse(JSON.stringify(kv.restoreObject(plan, ['metadata'])));

  if (ret.interval === 'month') ret.monthly_amount = ret.amount;
  if (ret.interval === 'year') ret.monthly_amount = ret.amount / 12;

  ret.price = format.priceWhole(ret.amount);
  ret.monthly_price = format.priceWhole(ret.monthly_amount);

  ret.ks_amount = ret.amount;
  if (ret.interval === 'month') {
    ret.ks_amount = ret.amount - 2500;
    ret.ks_monthly_amount = ret.ks_amount;
  }
  if (ret.interval === 'year') {
    ret.ks_amount = ret.amount - 20000;
    ret.ks_monthly_amount = ret.ks_amount / 12;
  }
  ret.ks_price = format.priceWhole(ret.ks_amount);
  ret.ks_monthly_price = format.priceWhole(ret.ks_monthly_amount);

  return ret;
}

export const monthlyQuery = {
  query: products.query.plan,
  variables: { nickname: 'Monthly membership' },
  update(data) { return updatePlan(data); },
};

export const yearlyQuery = {
  query: products.query.plan,
  variables: { nickname: 'Yearly membership' },
  update(data) { return updatePlan(data); },
};
