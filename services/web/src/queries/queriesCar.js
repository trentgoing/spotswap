import { gql } from 'apollo-boost';

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

// const getCarQuery = gql`
//   {
//     car {
//       name
//     }
//   }
// `;

const addCarMutation = gql`
  mutation(
    $size: Int,
    $make: String,
    $model: String,
    $color: String,
    $plate: String,
    $state: String
  ) {
    addCar(
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

const deleteCarMutation = gql`
  mutation(
    $id: ID!
  ) {
    deleteCar(
      id: $id
    ) {
      id
    }
  }
`;


export { getCarsQuery, addCarMutation, deleteCarMutation };