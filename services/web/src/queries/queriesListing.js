import { gql } from 'apollo-boost';

const editListingMutation = gql`
mutation(
  $claiming_user_id: ID,
  $status: Int,
  $time_complete: DateTime
) {
  editListing(
    claiming_user_id: $claiming_user_id
    status: $status
    time_complete: $time_complete
  ){
    status
  }
}
`;

export { editListingMutation };