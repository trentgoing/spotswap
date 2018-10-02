import { gql } from 'apollo-boost';

const getLocationsQuery = gql`
  query($user_id: ID){
    locations(user_id: $user_id){
      id
      name
      city
      street1
    }
  }
`;

// const getLocationQuery = gql`
//   {
//     location {
//       id
//       name
//       city
//       street1
//     }
//   }
// `;

const getCarsQuery = gql`
  {
    cars {
      name
    }
  }
`;

const addLocationMutation = gql`
  mutation(
      $name: String!,
      $street1: String!,
      $street2: String,
      $city: String!,
      $state: String!,
      $zip: Int!,
      $user_id: ID!
    ) {
    addLocation(
      name: $name,
      street1: $street1,
      street2: $street2,
      city: $city,
      state: $state,
      zip: $zip,
      user_id: $user_id
    ){
      id
      name
    }
  }
`;

export {getLocationsQuery, getCarsQuery, addLocationMutation};