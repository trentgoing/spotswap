import { gql } from 'apollo-boost';

const signupQuery = gql`
  mutation SignupMutation(
    $email: String!,
    $password: String!
    $user_name: String!,
  ) {
    signup(
      email: $email
      password: $password
      user_name: $user_name
    ) {
      token
    }
  }`;

const loginQuery = gql`
  mutation LoginMutation(
    $email: String!,
    $password: String!,
  ) {
    login(
      email: $email
      password: $password
    ) {
      token
    }
  }`;

export { signupQuery, loginQuery };