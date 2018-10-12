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
  }
`;

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
  }
`;

const getUserQuery = gql`
  query getUserQuery {
    userInfo {
      user_name
      first_name
      last_name
      user_cars {
        default_car
        make
        model
        color
      }
    }
  }
`;

const mutationUser = gql`
  mutation(
    $user_name: String,
    $first_name: String,
    $last_name: String
  ) {
    editUser(
      user_name: $user_name
      first_name: $first_name
      last_name: $last_name
    ){
      user_name
      first_name
      last_name
    }
  }
`;

export { signupQuery, loginQuery, getUserQuery, mutationUser };