import gql from 'graphql-tag';

export const query = {
  ping: gql`
query Ping {
  ping
}
`,
  calendar_event: gql`
query CalendarEvent($id: Int!) {
  calendar_event(id: $id) {
    id
    title
    all_day
    start
    end
    duration
    description
    category
    price
    member_price
    sku {
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
    member_sku {
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
}
`,
  calendar_events: gql`
query CalendarEvents {
  calendar_events {
    id
    title
    all_day
    start
    end
    duration
    description
    category
  }
}
`,
};

export const mutation = {
  mailing_list_signup: gql`
mutation MailingListSignup($name: String, $email: String!) {
  mailing_list_signup(name: $name, email: $email)
}
`,
  create_coupon_token: gql`
mutation CreateCouponToken($type: String!, $count: Int) {
  create_coupon_token(type: $type, count: $count)
}
`,
  send_coupon_tokens: gql`
mutation SendCouponTokens($type: String!, $emails: String!) {
  send_coupon_tokens(type: $type, emails: $emails)
}
`,
  use_coupon_token: gql`
mutation UseCouponToken($token: String!) {
  use_coupon_token(token: $token)
}
`,
};
