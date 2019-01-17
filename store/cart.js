import * as format from '@/lib/format';

export const state = () => ({
  items: [],
  coupon: {},
})

export const mutations = {
  /*
   * newItems: array of objects containing:
   *   id: String: unique ID; consists of colon-separated type string &
   *       type-specific ID e.g.: sku:sku_DyIJDRjZCbcNmR, discount:1
   *   type: String: type (same as in id)
   *   sku: String: Stripe sku id of the item
   *   discount_for: Array: list of item ids the discount applies to
   *   discount_per: String: 'order' (1x per order, across skus),
   *                         'item' (1x per total qty)
   *   title: String
   *   subtitle: String
   *   quantity: Int (ignored for type discount)
   *   amount_each: Int: price each 1 qty in cts
   *
   * these are computed internally for each item:
   *   amount: total amount in cts for all of qty
   *   price: total price already formatted for display
   *   quantity: (discount only)
   *
   * note: this method is not resilient to item amounts changing between each call
   */
  add (state, newItems) {
    newItems.forEach((newItem) => {
      let idx = itemIndex(state, newItem.id);

      if (idx < 0) { // new item
        idx = state.items.push({ ...newItem, amount: 0, price: '' }) - 1;
      } else if (newItem.type !== 'discount') {
        state.items[idx].quantity += newItem.quantity;
      } else {
        // adding discount that already exists; update its discount_for array
        const forSkus = _.union(state.items[idx].discount_for, newItem.discount_for);
        state.items[idx].discount_for = forSkus;
      }

      // recompute amount and formatted price
      recomputeAmount(state, idx);

      // recalculate all discounts since they depend on items/quantities
      recalculateDiscounts(state);
    });
  },

  minusItem(state, id) {
    const idx = itemIndex(state, id);
    state.items[idx].quantity = Math.max(state.items[idx].quantity - 1, 1);
    recomputeAmount(state, idx);
    recalculateDiscounts(state);
  },

  plusItem(state, id) {
    const idx = itemIndex(state, id);
    state.items[idx].quantity = Math.min(state.items[idx].quantity + 1, 10);
    recomputeAmount(state, idx);
    recalculateDiscounts(state);
  },

  deleteItem(state, id) {
    state.items = state.items.filter(i => i.id !== id);
    recalculateDiscounts(state);
  },

  clear(state) {
    state.items = [];
    mutations.clearCoupon(state);
  },

  setCoupon(state, coupon) {
    state.coupon = coupon;
  },

  clearCoupon(state) {
    state.coupon = {};
  },
}

function itemIndex(state, id) {
  return state.items.map(c => (c.id)).indexOf(id);
}

function recomputeAmount(state, idx) {
  state.items[idx].amount = state.items[idx].quantity * state.items[idx].amount_each;
  state.items[idx].price = format.priceCents(state.items[idx].amount);
  if (state.items[idx].type === 'discount') {
    state.items[idx].price = `-${state.items[idx].price}`;
  }
}

function recalculateDiscounts(state) {
  state.items
    .filter(i => i.type === 'discount')
    .map(i => recalculateDiscount(state, i.id));
}

function recalculateDiscount(state, id) {
  const idx = itemIndex(state, id);
  const disc = state.items[idx];
  if (disc.type !== 'discount') throw new Error('internal error recalculating discount');

  const forIdx = disc
        .discount_for
        .map(i => itemIndex(state, i))
        .filter(i => state.items[i]);

  const qty = forIdx.reduce((acc, cur) => acc + state.items[cur].quantity, 0);

  if (!forIdx.length || qty === 0) {
    // dangling discount; self destruct and return
    // note: qty should never be 0 unless forIdx is empty
    // fixme: might be unexpected for this method to remove items
    state.items = state.items.filter(i => i.id !== id);
    return;
  }

  state.items[idx].quantity = (disc.discount_per === 'order') ? 1 : qty;
  recomputeAmount(state, idx);
}
