import gql from 'graphql-tag';

export const query = {
  me: gql`
query Me {
  me {
    name
    email
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
  verifyEmail(token: $token)
}
`,

  updateProfile: gql`
mutation UpdateProfile ($profile: ProfileInput!) {
  updateProfile(profile: $profile)
}
`,

  updatePassword: gql`
mutation UpdatePassword($old_password: String!, $password: String!) {
  updatePassword(old_password: $old_password, password: $password)
}
`,

  forgotPassword: gql`
mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
`,

  updatePasswordByToken: gql`
mutation UpdatePasswordByToken($token: String!, $password: String!) {
  updatePasswordByToken(token: $token, password: $password)
}
`,
};
