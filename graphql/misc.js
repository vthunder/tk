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
    book_event_label
    ext_book_url
    ext_member_discount_code
    show_interested
    sidebar_pre_text
    sidebar_post_text
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
    book_event_label
    ext_book_url
    ext_member_discount_code
    show_interested
    sidebar_pre_text
    sidebar_post_text
    events {
      id
      status
      start
      duration
      all_day
      sku_id
    }
    next_event {
      id
      status
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
    calendar_hide
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
    calendar_hide
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
      status
      start
      duration
      all_day
      sku_id
    }
    next_event {
      id
      status
      start
      duration
      all_day
      sku_id
    }
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
  get_cart_coupon: gql`
query GetCartCoupon($code: String!) {
  get_cart_coupon(code: $code) {
    id
    code
    amount_off
    percent_off
    duration
    duration_in_months
    max_redemptions
    name
    redeem_by
    times_redeemed
    valid
    conditions
  }
}
`,
  get_latest_qr_scan: gql`
query getLatestQrScan {
  get_latest_qr_scan {
    type
    name
    email
    status
    agreed_terms
  }
}
`,
  get_legal_terms: gql`
query getLegalTerms($name: String!, $email: String!) {
  get_legal_terms(name: $name, email: $email)
}
`,
  tasting_info: gql`
query tastingInfo($date: String!, $station: Int!) {
  tasting_info(date: $date, station: $station) {
    station
    generic_name
    survey_url
    products {
      product_code
      product_name
    }
  }
}
`,
  mailing_list_check: gql`
query mailingListCheck($email: String!, $list: String) {
  mailing_list_check(email: $email, list: $list)
}
`,
};

export const mutation = {
  create_calendar_event: gql`
mutation CreateCalendarEvent($event_data: EventInput!) {
  create_calendar_event(event_data: $event_data)
}
`,
  create_calendar_hold: gql`
mutation CreateCalendarHold($event_data: HoldInput!) {
  create_calendar_hold(event_data: $event_data)
}
`,
  checkin: gql`
mutation Checkin($data: CheckinInput!) {
  checkin(data: $data)
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
  check_in_qr_scan: gql`
mutation CheckInQrScan($qr_data: String!) {
  check_in_qr_scan(qr_data: $qr_data)
}
`,
};

export const subscription = {
  new_qr_scan: gql`
subscription newQrScan {
  new_qr_scan {
    type
    name
    email
    status
    agreed_terms
  }
}
`
};
