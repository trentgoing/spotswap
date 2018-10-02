import { gql } from 'apollo-boost';

const getCarsQuery = gql`
query($user_id: ID){
  cars(user_id: $user_id){
    id
    make
  }
}
`;

// const getCarQuery = gql`
//   {
//     car {
//       name
//     }
//   }
// `;

const addCarMutation = gql`
  mutation(
    $size: Int!,
    $make: String!,
    $model: String!,
    $color: String!,
    $plate: String!,
    $state: String!,
    $user_id: ID!
  ) {
    addCar(
      user_id: $user_id,
      size: $size,
      make: $make,
      model: $model,
      color: $color,
      plate: $plate,
      state: $state
    ) {
      id
      make
    }
  }
`;


export { getCarsQuery, addCarMutation };