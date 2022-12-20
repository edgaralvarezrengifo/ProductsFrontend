import { gql, useMutation } from '@apollo/client';

export const addProduct = gql`
  mutation createProduct($type: ProductInputType) {
    createProduct(product: $type) {
      id
      title
    }
  }
`;

export const deleteProduct = gql`
  mutation deleteProduct($type: String) {
    deleteProduct(id: $type) 
  }
`;

export const updateProduct = gql`
  mutation updateProduct($product: ProductInputType,$id: String) {
    deleteProduct(product:$product,id: $type) 
  }
`;