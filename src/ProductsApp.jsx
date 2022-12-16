import React from "react";
import { useState } from "react";
import { AddProducts } from "./components/AddProduct";
import { ProductsList } from "./components/PorductList";
export const ProductsApp = () =>{

    const [products, setProducts] = useState([{ 'id':'PRODA','title':'PRODUCTO A','description':'PRODUCTO A','price':1000,'image':'','quantity':20 }]);
    const [isAdd, setisAdd] = useState(false);
    const handledAddProduct = (event) =>{
      setisAdd(!isAdd);
    }

    return(
        <>
        {/* titulo*/ }
        <h1>Products</h1>

        {/*Add Product*/}
        <div>
        <button onClick={handledAddProduct }>Add</button>
        </div>

         {isAdd&&<AddProducts  setProducts={setProducts}/>}    

        {/*Lista de productos*/}

       <ProductsList products={products}/>

        </>
    )
}