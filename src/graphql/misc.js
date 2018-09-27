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
    price
    member_price
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
};
