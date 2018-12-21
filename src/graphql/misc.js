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
    master_id
    title
    slug
    image_header
    all_day
    start
    end
    duration
    description
    category
    price
    member_price
    ext_book_url
    ext_member_discount_code
    sku_id
  }
}
`,
  calendar_master: gql`
query CalendarMaster($id: Int, $slug: String) {
  calendar_master(id: $id, slug: $slug) {
    id
    featured
    title
    slug
    image_header
    all_day
    duration
    description
    category
    price
    member_price
    max_size
    ext_book_url
    ext_member_discount_code
    events {
      id
      start
      duration
      all_day
      sku_id
    }
  }
}
`,
  calendar_events: gql`
query CalendarEvents {
  calendar_events {
    id
    master_id
    title
    slug
    image_header
    all_day
    start
    end
    duration
    description
    category
    price
    member_price
    ext_book_url
  }
}
`,
  calendar_event_masters: gql`
query CalendarEventMasters {
  calendar_event_masters {
    id
    featured
    title
    slug
    image_header
    all_day
    duration
    description
    category
    price
    member_price
    max_size
    ext_book_url
    ext_member_discount_code
  }
}
`,
  google_calendar_events: gql`
query GoogleCalendarEvents {
  google_calendar_events {
    title
    start
    end
  }
}
`,
  gift_certificate_balance: gql`
query GiftCertificateBalance {
  gift_certificate_balance
}
`,
};

export const mutation = {
  create_calendar_event: gql`
mutation CreateCalendarEvent($event_data: EventInput!) {
  create_calendar_event(event_data: $event_data)
}
`,
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
  use_coupon_token(token: $token) {
    status
    type
  }
}
`,
  class_interest: gql`
mutation ClassInterest($email: String!, $master_id: Int!) {
  class_interest(email: $email, master_id: $master_id)
}
`,
};
