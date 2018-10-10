const getCarsQuery = gql`
query{
  cars{
    id
    make
    model
    color
  }
}
`;

module.exports = {
  getCarsQuery,
};