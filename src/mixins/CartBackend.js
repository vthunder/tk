import * as _ from 'lodash';
import * as format from '@/lib/format';

export default {
  store: {
    cart: 'cart',
  },
  mounted() {
    this._loadCart();
    this.$root.$on('tk::cart::add', this.add);
    this.$root.$on('tk::cart::minusItem', this.minusItem);
    this.$root.$on('tk::cart::plusItem', this.plusItem);
    this.$root.$on('tk::cart::deleteItem', this.deleteItem);
    this.$root.$on('tk::cart::clear', this.clear);
    this.$root.$on('tk::cart::setCoupon', this.setCoupon);
    this.$root.$on('tk::cart::clearCoupon', this.clearCoupon);
  },
  destroyed() {
    this.$root.$off('tk::cart::add', this.add);
    this.$root.$off('tk::cart::minusItem', this.minusItem);
    this.$root.$off('tk::cart::plusItem', this.plusItem);
    this.$root.$off('tk::cart::deleteItem', this.deleteItem);
    this.$root.$off('tk::cart::clear', this.clear);
    this.$root.$off('tk::cart::setCoupon', this.setCoupon);
    this.$root.$off('tk::cart::clearCoupon', this.clearCoupon);
    this._saveCart();
  },
  methods: {
    /*
     * items: array of objects containing:
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
    add(items) {
      items.forEach((newItem) => {
        let idx = this._itemIndex(newItem.id);

        if (idx < 0) { // new item
          idx = this.cart.items.push({ ...newItem, amount: 0, price: '' }) - 1;
        } else if (newItem.type !== 'discount') {
          this.cart.items[idx].quantity += newItem.quantity;
        } else {
          // adding discount that already exists; update its discount_for array
          const forSkus = _.union(this.cart.items[idx].discount_for, newItem.discount_for);
          this.cart.items[idx].discount_for = forSkus;
        }

        // recompute amount and formatted price
        this._recomputeAmount(idx);

        // recalculate all discounts since they depend on items/quantities
        this._recalculateDiscounts();
      });
      this._saveCart();
    },

    minusItem(id) {
      const idx = this._itemIndex(id);
      this.cart.items[idx].quantity = Math.max(this.cart.items[idx].quantity - 1, 1);
      this._recomputeAmount(idx);
      this._recalculateDiscounts();
      this._saveCart();
    },

    plusItem(id) {
      const idx = this._itemIndex(id);
      this.cart.items[idx].quantity = Math.min(this.cart.items[idx].quantity + 1, 10);
      this._recomputeAmount(idx);
      this._recalculateDiscounts();
      this._saveCart();
    },

    deleteItem(id) {
      this.cart.items = this.cart.items.filter(i => i.id !== id);
      this._recalculateDiscounts();
      this._saveCart();
    },

    clear() {
      this.cart.items = [];
      this.clearCoupon();
      this._saveCart();
    },

    setCoupon(coupon) {
      // Force reactivity to kick in (work around vue-stash bug?)
      this.$set(this.cart, 'coupon', coupon);
      this._saveCart();
    },

    clearCoupon() {
      this.cart.coupon = null;
    },

    _itemIndex(id) {
      return this.cart.items.map(c => (c.id)).indexOf(id);
    },

    _recomputeAmount(idx) {
      this.cart.items[idx].amount = this.cart.items[idx].quantity *
        this.cart.items[idx].amount_each;
      this.cart.items[idx].price = format.priceCents(this.cart.items[idx].amount);
      if (this.cart.items[idx].type === 'discount') {
        this.cart.items[idx].price = `-${this.cart.items[idx].price}`;
      }
    },

    _recalculateDiscounts() {
      this.cart.items
        .filter(i => i.type === 'discount')
        .map(i => this._recalculateDiscount(i.id));
    },

    _recalculateDiscount(id) {
      const idx = this._itemIndex(id);
      const disc = this.cart.items[idx];
      if (disc.type !== 'discount') throw new Error('internal error recalculating discount');

      const forIdx = disc
        .discount_for
        .map(i => this._itemIndex(i))
        .filter(i => this.cart.items[i]);

      const qty = forIdx.reduce((acc, cur) => acc + this.cart.items[cur].quantity, 0);

      if (!forIdx.length || qty === 0) {
        // dangling discount; self destruct and return
        // note: qty should never be 0 unless forIdx is empty
        // fixme: might be unexpected for this method to remove items
        this.cart.items = this.cart.items.filter(i => i.id !== id);
        return;
      }

      this.cart.items[idx].quantity = (disc.discount_per === 'order') ? 1 : qty;
      this._recomputeAmount(idx);
    },

    _loadCart() {
      if (localStorage.savedCart) {
        this.cart = JSON.parse(localStorage.savedCart);
      }
    },

    _saveCart() {
      localStorage.savedCart = JSON.stringify(this.cart);
    },
  },
};
