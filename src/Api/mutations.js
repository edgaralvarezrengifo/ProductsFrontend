import { gql, useMutation } from '@apollo/client';

export const addProduct = gql`
  mutation createProduct($type: ProductInputType) {
    createProduct(product: $type) {
      id
      title
    }
  }
`;