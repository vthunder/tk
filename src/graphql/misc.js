import gql from 'graphql-tag';

export const query = {
  ping: gql`
query Ping {
  ping
}
`,
  calendarEvents: gql`
query CalendarEvents {
  calendarEvents {
    id
    title
    allDay
    start
    end
    description
    category
    price
    memberPrice
  }
}
`,
};

export const mutation = {
  mailingListSignup: gql`
mutation MailingListSignup($name: String, $email: String!) {
  mailingListSignup(name: $name, email: $email)
}
`,
};
