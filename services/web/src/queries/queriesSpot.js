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
    $type: Int,
    $start_time: DateTime,
    $end_time: DateTime,
    $status: Int
  ) {
    addListing(
      lat: $lat
      lng: $lng
      type: $type
      start_time: $start_time
      end_time: $end_time
      status: $status
    ){
      id
    }
  }
`;

const editSpotMutation = gql`
  mutation(
    $start_time: DateTime,
    $end_time: DateTime
  ) {
    editSpot(
      start_time: $start_time
      end_time: $end_time
    ){
      is_available
    }
  }
`;

export { addSpotMutation, getSpotsQuery, editSpotMutation };