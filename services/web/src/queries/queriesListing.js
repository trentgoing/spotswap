import { gql } from 'apollo-boost';

const editListingMutation = gql`
mutation(
  $id: ID
  $claiming_user_id: ID,
  $status: Int,
  $time_complete: DateTime
) {
  editListing(
    id: $id
    claiming_user_id: $claiming_user_id
    status: $status
    time_complete: $time_complete
  ){
    status
  }
}
`;

export { editListingMutation };