import gql from 'graphql-tag'

const getCurrentSearch = gql`
  query {
    currentSearch @client {
      searchInput
    }
  }
`;

const updateSearch = gql`
  mutation updateSearch(
    $index: String!,
    $value: String!
  ) {
    updateSearch(index: $index, value: $value) @client {
      searchInput
    }
  }
`;

export { getCurrentSearch, updateSearch };