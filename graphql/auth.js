import gql from 'graphql-tag';

export const query = {
  me: gql`
query Me {
  me {
    name
    email
    is_member
    is_free_member
    free_member_until
    free_membership_type
    has_stripe_customer
    has_previous_stripe_ids
  }
}
`,
};

export const mutation = {
  signup: gql`
mutation Signup($name: String!, $email: String!, $password: String!) {
  signup(name: $name, email: $email, password: $password) {
    id
    name
    email
    jwt {
      type
      token
      refreshToken
    }
  }
}
`,

  login: gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    name
    email
    jwt {
      type
      token
      refreshToken
    }
  }
}
`,

  verify_email: gql`
mutation VerifyEmail($token: String!) {
  verify_email(token: $token)
}
`,

  update_profile: gql`
mutation UpdateProfile ($profile: ProfileInput!) {
  update_profile(profile: $profile)
}
`,

  update_password: gql`
mutation UpdatePassword($old_password: String!, $password: String!) {
  update_password(old_password: $old_password, password: $password)
}
`,

  forgot_password: gql`
mutation ForgotPassword($email: String!) {
  forgot_password(email: $email)
}
`,

  update_password_by_token: gql`
mutation UpdatePasswordByToken($token: String!, $password: String!) {
  update_password_by_token(token: $token, password: $password)
}
`,
};
