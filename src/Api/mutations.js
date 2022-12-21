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
  mutation updateProduct($type: ProductInputType,$id: String) {
    updateProduct(product:$type,id: $id){
      id
      title
    }
  }
`;