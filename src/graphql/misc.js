import gql from 'graphql-tag';

export const query = {
  ping: gql`
query Ping {
  ping
}
`,
  products: gql`
query Products {
  products {
    id
    title
    description
    billingDescription
    price
    memberPrice
    bundledUnits
    unit
    isSubscription
    subscriptionPeriod
    subscriptionName
    subscriptionPlan
    createdAt
    updatedAt
  }
}
`,
  calendarEvent: gql`
query CalendarEvent($id: Int!) {
  calendarEvent(id: $id) {
    id
    title
    allDay
    start
    end
    duration
    description
    category
    price
    memberPrice
  }
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
    duration
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
