import { useState } from "react";
import { addProduct } from "../Api/mutations";
import { useMutation } from '@apollo/client';
export const AddProducts = ({onNewProduct}) =>{
    const [product, setProduct] = useState({'id':'','title':'','description':'','price':0,'image':'','quantity':0 });
    const [createProd, { data, loading, error }] = useMutation(addProduct);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    const  handledOnChangeEvent= (event)=>{
        const value = event.target.name==="price" || event.target.name==="quantity" ? +event.target.value : event.target.value  ;
        setProduct({...product,[event.target.name]: value});        
        console.log(product)
    }

    const onSubmit = (event)=>{
        console.log(product);
        event.preventDefault();
        onNewProduct(product);
        createProd({ variables: { type:product } });
      //  createProduct({ variables: { type: input.value } });
        setProduct({'id':'','title':'','description':'','price':0,'image':'','quantity':0 });
       
    }
    
    return(
        <form onSubmit={onSubmit} >
            <label className="column">
                Product Code:
                <input type="text" name="id" value={product.id} onChange={handledOnChangeEvent} required />
            </label>
            <label className="column">
                Title:
                <input type="text" name="title" value={product.title} onChange={handledOnChangeEvent}  required/>
            </label>
            <label className="column">
                Image:
                <input type="file" name="image" value={product.image} onChange={handledOnChangeEvent}/>
            </label>
            <label>
                Description:
                <textarea type="text" name="description" value={product.description} onChange={handledOnChangeEvent}/>
            </label>
            <label className="column">
                Price:
                <input type="number" name="price" value={product.price} onChange={handledOnChangeEvent} min="0"  required/>
            </label>
            <label className="column">
                Quantity:
                <input type="number" name="quantity" value={product.quantity} onChange={handledOnChangeEvent} min="0" required/>
            </label>
            <label className="column">
                create product:
             <input type="submit" value={'Send'}/>
             </label>
      </form>
     
    );
}