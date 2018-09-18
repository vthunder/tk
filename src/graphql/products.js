import gql from 'graphql-tag';

export const query = {
  products: gql`
    query {
      products {
        id
        active
        attributes
        caption
        description
        livemode
        metadata {
          key
          value
        }
        name
        type
        url
      }
    }
  `,
  plans: gql`
    query($product: String) {
      plans(product: $product) {
        id
        active
        amount
        currency
        interval
        interval_count
        livemode
        metadata {
          key
          value
        }
        nickname
        product
      }
    }
  `,
  plan: gql`
    query($product: String, $nickname: String) {
      plan(product: $product, nickname: $nickname) {
        id
        active
        amount
        currency
        interval
        interval_count
        livemode
        metadata {
          key
          value
        }
        nickname
        product
      }
    }
  `,
  skus: gql`
    query($product: String) {
      skus(product: $product) {
        id
        active
        attributes {
          key
          value
        }
        currency
        inventory {
          quantity
          type
          value
        }
        livemode
        metadata {
          key
          value
        }
        price
        product
      }
    }
  `,
};

export const mutation = {
};
