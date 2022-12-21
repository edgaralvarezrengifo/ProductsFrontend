import React from "react";
import { useState,useEffect } from "react";
import { ProductForm } from "./components/ProductForm";
import { ProductsList } from "./components/PorductList";
import { useQuery } from '@apollo/client';
import { GET_Products } from "./Api/queries";
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
export const ProductsApp = () =>{
    const [updateProduct, setupdateProduct] = useState(undefined);
    const [products, setProducts] = useState([]);
    const [isAdd, setisAdd] = useState(false);
    const [formTitle, setformTitle] = useState(undefined);
    const [prodId,setProdId] = useState('-1');

    const notify = (message) => toast.success(message);

    const { loading, error, data } = useQuery(GET_Products);


    useEffect(()=>{
      if(loading === false && data){
        setProducts(data.products);
 
      }
    },[loading, data]);

    const handledAddProductCancel = (event) =>{
      setisAdd(false);
      setProdId('-1');
    }

    const handledAddProduct = (event) =>{
      console.log(formTitle);
      setformTitle("Create Product");
      setisAdd(!isAdd);
      setupdateProduct(undefined);
      
     
    }
    const onAddProduct = (newProduct) =>{
      {/*falta hacer la validación de los id sean únicos video 80*/ }
      setProducts(prod => [...prod,newProduct])
      setisAdd(false);
    }

    const onUpdateProduct = (updatedProduct)=>{
      const prodjIndex = products.findIndex((obj => obj.id == updatedProduct.id ));
      let copyproducts= [...products];
      copyproducts[prodjIndex] = updatedProduct;
    
      setProducts(copyproducts);
      setupdateProduct(undefined);
      setisAdd(false);
    }

    return(
        <>
   
        <h1>Product List</h1>
        {loading ? 
        
        <div>Loading products</div> :
        products !==undefined &&<ProductsList products={products} setProducts={(products)=>setProducts(products)}  
                                              setupdateProduct={(p)=>{setupdateProduct(p)}} setProdId={setProdId}
                                              setisAdd={(a)=>{setisAdd(a)}}  setformTitle={(t)=>{setformTitle(t)}}
                                              notify={notify}/>
      
      }

       <div>
       {!isAdd&&<Button variant="outline-success" onClick={handledAddProduct }>Add Product</Button>}
        {isAdd&& <Button variant="outline-danger" onClick={handledAddProductCancel }>Cancel</Button>}
       </div>
      <div><br/></div>
      {isAdd&&<ProductForm onNewProduct={onAddProduct}   onUpdateProduct={onUpdateProduct}
                           updatedProduct={updateProduct} Title={formTitle}
                           prodId={prodId} notify={notify}/>} 
      <ToastContainer />

        </>
    )
}