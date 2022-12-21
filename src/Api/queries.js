import { gql } from "@apollo/client";

export const GET_Products = gql`
query{
    products{
      id,
      title,
      description,
      price,  
      image,
      quantity
      
    }
  }
`;

export const GET_Product = gql`
query product($id: String){
  product(id:$id){
    id,
    title,
    description,
    price,  
    image,
    quantity
  }
}
`;