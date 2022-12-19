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

export const GET_Product = (id)=> {gql`
query(){
  product(id:${id}){
    id
    title
    price
    description
    quantity
    image
  }
`};