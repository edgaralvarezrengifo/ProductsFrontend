import React from "react";
import { useState,useEffect } from "react";
import { AddProducts } from "./components/AddProduct";
import { ProductsList } from "./components/PorductList";
import { useQuery } from '@apollo/client';
import { GET_Products } from "./Api/queries";
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
export const ProductsApp = () =>{
    const [updateProduct, setupdateProduct] = useState(undefined);
    const [products, setProducts] = useState([]);
    const [isAdd, setisAdd] = useState(false);

    const notify = (message) => toast.success(message);

    const { loading, error, data } = useQuery(GET_Products);
    console.log(data);

    useEffect(()=>{
      if(loading === false && data){
        setProducts(data.products);
 
      }
    },[loading, data,updateProduct]);

    const handledAddProduct = (event) =>{
      
      setisAdd(!isAdd);
      if(!isAdd){
        setupdateProduct(undefined);
      }
    }
    const onAddProduct = (newProduct) =>{
      {/*falta hacer la validación de los id sean únicos video 80*/ }
      setProducts(prod => [...prod,newProduct])
    }

    return(
        <>
   
        <h1>Product List</h1>
        {loading ? 
        
        <div>Loading products</div> :
        products !==undefined &&<ProductsList products={products} setProducts={(products)=>setProducts(products)}  
                                              setupdateProduct={(p)=>{setupdateProduct(p)}} 
                                              setisAdd={(a)=>{setisAdd(a)}} notify={notify}/>
      
      }

       <div>
       {!isAdd&&<Button variant="outline-success" onClick={handledAddProduct }>Add Product</Button>}
        {isAdd&& <Button variant="outline-danger" onClick={handledAddProduct }>Cancel</Button>}
       </div>

      {isAdd&&<AddProducts onNewProduct={onAddProduct}  updateProduct={updateProduct}
                          notify={notify}/>} 
      <ToastContainer />

        </>
    )
}