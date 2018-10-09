import gql from 'graphql-tag';

export const query = {
  me: gql`
query Me {
  me {
    name
    email
    is_member
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

  verifyEmail: gql`
mutation VerifyEmail($token: String!) {
  verify_email(token: $token)
}
`,

  updateProfile: gql`
mutation UpdateProfile ($profile: ProfileInput!) {
  update_profile(profile: $profile)
}
`,

  updatePassword: gql`
mutation UpdatePassword($old_password: String!, $password: String!) {
  update_password(old_password: $old_password, password: $password)
}
`,

  forgotPassword: gql`
mutation ForgotPassword($email: String!) {
  forgot_password(email: $email)
}
`,

  updatePasswordByToken: gql`
mutation UpdatePasswordByToken($token: String!, $password: String!) {
  update_password_by_token(token: $token, password: $password)
}
`,
};
