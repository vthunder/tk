import gql from 'graphql-tag';

export const query = {
  customer: gql`
    query {
      customer {
        id
        account_balance
        created
        currency
        default_source
        delinquent
        description
#       discount:
        email
        invoice_prefix
        livemode
        metadata {
          key
          value
        }
        sources {
          id
          brand
          last4
          exp_month
          exp_year
        }
      }
    }
  `,
  customer_payment_sources: gql`
    query {
      customer_payment_sources {
        id
        brand
        last4
        exp_month
        exp_year
      }
    }
  `,
  customer_subscriptions: gql`
    query {
      customer_subscriptions {
        id
        billing_cycle_anchor
        cancel_at_period_end
        canceled_at
        created
        current_period_end
        current_period_start
        customer
#       discount:
        ended_at
        livemode
        metadata {
          key
          value
        }
        plan {
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
        quantity
        start
        status
        tax_percent
      }
    }
  `,
  customer_orders: gql`
    query {
      customer_orders {
        id
        amount
        amount_returned
        charge
        currency
        customer
        created
        email
        items {
          amount
          currency
          description
          parent
          quantity
          type
        }
        livemode
        metadata {
          key
          value
        }
        status
      }
    }
  `,
  customer_charges: gql`
    query {
      customer_charges {
        id
        object
        amount
        amount_refunded
        application
        application_fee
        balance_transaction
        captured
        created
        currency
        customer
        description
        destination
        dispute
        failure_code
        failure_message
        invoice {
          id
#          lines {
#            description
#          }
        }
        livemode
        metadata {
          key
          value
        }
        on_behalf_of
        order {
          id
#          items {
#            description
#          }
        }
        outcome {
          network_status
          reason
          risk_level
          risk_score
          rule
          seller_message
          type
        }
        paid
        payment_intent
        receipt_email
        receipt_number
        refunded
        review
        source {
          id
          brand
          last4
          exp_month
          exp_year
        }
      }
    }
  `,
};

export const mutation = {
  get_or_create_customer: gql`
    mutation($source: String) {
      get_or_create_customer(source: $source) {
        id
        account_balance
        created
        currency
        default_source
        delinquent
        description
        email
        invoice_prefix
        livemode
        metadata {
          key
          value
        }
        sources {
          id
          brand
          last4
          exp_month
          exp_year
        }
      }
    }
  `,
  update_customer: gql`
    mutation($source: String) {
      update_customer(source: $source) {
        id
        account_balance
        created
        currency
        default_source
        delinquent
        description
        email
        invoice_prefix
        livemode
        metadata {
          key
          value
        }
        sources {
          id
          brand
          last4
          exp_month
          exp_year
        }
      }
    }
  `,
  create_subscription: gql`
    mutation($plans: [String]) {
      create_subscription(plans: $plans) {
        id
        billing_cycle_anchor
        cancel_at_period_end
        canceled_at
        created
        current_period_end
        current_period_start
        customer
        ended_at
        livemode
        metadata {
          key
          value
        }
        plan {
          id
          active
          amount
          currency
          interval
          interval
          livemode
          metadata {
            key
            value
          }
          nickname
          product
        }
        quantity
        start
        status
        tax_percent
      }
    }
  `,
  create_order: gql`
    mutation($skus: [String]) {
      create_order(skus: $skus) {
        id
        amount
        amount_returned
        charge
        currency
        customer
        email
        items {
          amount
          currency
          description
          parent
          quantity
          type
        }
        livemode
        metadata {
          key
          value
        }
        status
      }
    }
  `,
  pay_order: gql`
    mutation($order: String!, $source: String) {
      pay_order(order: $order, source: $source) {
        id
        amount
        amount_returned
        charge
        currency
        customer
        email
        items {
          amount
          currency
          description
          parent
          quantity
          type
        }
        livemode
        metadata {
          key
          value
        }
        status
      }
    }
  `,
};
