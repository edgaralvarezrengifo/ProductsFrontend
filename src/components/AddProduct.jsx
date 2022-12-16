import { useState } from "react";


export const AddProducts = ({setProducts}) =>{
    const [product, setProduct] = useState({'id':'','title':'','description':'','price':0,'image':'','quantity':0 });
    
    const  handledOnChangeEvent= (event)=>{
        const value = event.target.value;
        setProduct({...product,[event.target.name]: value});
        console.log(product)
    }

    const onSubmit = (event)=>{
        console.log(product);
        event.preventDefault();
        setProducts(products =>[...products,product])
        setProduct({'id':'','title':'','description':'','price':0,'image':'','quantity':0 });
       
    }
    
    return(
        <form onSubmit={onSubmit} >
            <label className="column">
                Product Code:
                <input type="text" name="id" value={product.id} onChange={handledOnChangeEvent} />
            </label>
            <label className="column">
                Title:
                <input type="text" name="title" value={product.title} onChange={handledOnChangeEvent} />
            </label>
            <label className="column">
                Image:
                <input type="text" name="description" value={product.description} onChange={handledOnChangeEvent}/>
            </label>
            <label>
                Description:
                <textarea type="text" name="image" value={product.image} onChange={handledOnChangeEvent}/>
            </label>
            <label className="column">
                Price:
                <input type="number" name="price" value={product.price} onChange={handledOnChangeEvent} />
            </label>
            <label className="column">
                Quantity:
                <input type="number" name="quantity" value={product.quantity} onChange={handledOnChangeEvent}/>
            </label>
            <label className="column">
                create product:
             <input type="submit" value={'Send'}/>
             </label>
      </form>
     
    );
}