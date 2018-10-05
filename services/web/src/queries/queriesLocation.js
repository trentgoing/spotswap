import { gql } from 'apollo-boost';

const getLocationsQuery = gql`
  query{
    locations{
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

const addLocationMutation = gql`
  mutation(
      $name: String,
      $street1: String,
      $street2: String,
      $city: String,
      $state: String,
      $zip: Int
    ) {
    addLocation(
      name: $name,
      street1: $street1,
      street2: $street2,
      city: $city,
      state: $state,
      zip: $zip
    ){
      id
      name
    }
  }
`;

const deleteLocationMutation = gql`
  mutation(
    $id: ID!
  ) {
    deleteLocation(
      id: $id
    ) {
      id
    }
  }
`;

export { getLocationsQuery, addLocationMutation, deleteLocationMutation };
