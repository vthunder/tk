import gql from 'graphql-tag';

export const query = {
  ping: gql`
query Ping {
  ping
}
`,
  saved_cards: gql`
query SavedCards {
  saved_cards {
    id
    brand
    last_four
    exp_month
    exp_year
  }
}
`,
  subscriptions: gql`
query Subscriptions {
  subscriptions {
    id
    name
    stripe_id
    stripe_plan
    qty
    trial_ends_at
    ends_at
    created_at
    updated_at
  }
}
`,
  products: gql`
query Products {
  products {
    id
    title
    description
    billing_description
    price
    member_price
    member_discount_available
    list_unit_price
    member_unit_price
    bundled_units
    unit
    is_subscription
    subscription_period
    subscription_name
    subscription_plan
    created_at
    updated_at
  }
}
`,
  calendarEvent: gql`
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
  }
}
`,
  calendarEvents: gql`
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
    price
    member_price
  }
}
`,
};

export const mutation = {
  mailingListSignup: gql`
mutation MailingListSignup($name: String, $email: String!) {
  mailing_list_signup(name: $name, email: $email)
}
`,
};
