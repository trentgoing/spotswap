import { gql } from 'apollo-boost';

const editListingMutation = gql`
mutation(
  $spot_id: ID, 
  $listing_id: ID, 
  $status: Int
) {
  editSpotListing(
    spot_id: $spot_id
    listing_id: $listing_id 
    status: $status
  ){
    id
  }
}
`;


export { editListingMutation };