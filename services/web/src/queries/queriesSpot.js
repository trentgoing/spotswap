import { gql } from 'apollo-boost';

const getSpotsQuery = gql`
  query getStops {
    spots {
      id
      street1
      city
      type
      is_available
    }
  }
`;

const addSpotMutation = gql`
  mutation addSpotMutation (
    $lat: String,
    $lng: String,
    $street1: String,
    $street2: String,
    $city: String,
    $state: String,
    $zip: Int,
    $type: Int!,
    $start_time: DateTime,
    $end_time: DateTime
  ) {
    addSpot(
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
    ) {
      id
      street1
      city
      type
      is_available
    }
  }
`;

export { addSpotMutation, getSpotsQuery };