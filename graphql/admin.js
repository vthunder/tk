import gql from 'graphql-tag';

export const query = {
  admin_stats: gql`
query AdminStats {
  admin_stats {
    num_members
    num_paying_members
    num_coupon_members
    num_events
    num_event_bookings
  }
}
`,
  admin_list_checkins: gql`
query AdminListCheckins {
  admin_list_checkins {
    name
    email
    user_type
    date
  }
}
`,
};

export const mutation = {
};
