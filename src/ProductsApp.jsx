import React from "react";
import { useState,useEffect } from "react";
import { AddProducts } from "./components/AddProduct";
import { ProductsList } from "./components/PorductList";
import { useQuery } from '@apollo/client';
import { GET_Products } from "./Api/queries";




export const ProductsApp = () =>{

    const [products, setProducts] = useState([]);
    const [isAdd, setisAdd] = useState(false);

    const { loading, error, data } = useQuery(GET_Products);
    console.log(data);

   

    const handledAddProduct = (event) =>{
      setisAdd(!isAdd);
    }
    const onAddProduct = (newProduct) =>{
      {/*falta hacer la validación de los id sean únicos video 80*/ }
      setProducts(prod => [...prod,newProduct])
    }

  

    return(
        <>
   
        <h1>Product List</h1>
        {loading ? 
        
        <div>carganfo</div> :
       <ProductsList products={data.products}/>
      
      }

       <div>
        <button onClick={handledAddProduct }>Add</button>
       </div>

      {isAdd&&<AddProducts onNewProduct={onAddProduct}/>} 

        </>
    )
}