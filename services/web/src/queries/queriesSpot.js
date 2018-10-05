import { gql } from 'apollo-boost';

const getSpotsQuery = gql`
  {
    spots {
      id
      street1
      city
      type
      is_available
      lat
      lng
    }
  }
`;

const addSpotMutation = gql`
  mutation(
    $lat: String,
    $lng: String,
    $street1: String,
    $street2: String,
    $city: String,
    $state: String,
    $zip: Int,
    $type: String!,
    $start_time: DateTime!,
    $end_time: DateTime
  ) {
    addListing(
      lat: $lat
      lng: $lng
      street1: $street1
      street2: $street2
      city: $city
      state: $state
      zip: $zip
      type: $type
      start_time: $start_time
      end_time: $end_time
    ){
      id
    }
  }
`;

export { addSpotMutation, getSpotsQuery };