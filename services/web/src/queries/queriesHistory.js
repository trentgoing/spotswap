import { gql } from 'apollo-boost';

const getHistoryListings = gql`
  query{
    myListingsHistory{
      id
      status
      claiming_user{
        id
        user_name
      }
      listing_user {
        id
        user_name
      }
      spot {
        id
        start_time
        end_time
        street1
        street2
        state
        city
      }
      type
      time_complete
    }
  }
`;

export { getHistoryListings };