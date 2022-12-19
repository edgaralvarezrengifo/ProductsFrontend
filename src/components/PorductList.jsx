import { useState } from "react";


export const ProductsList = ({products}) =>{
    return(
        <>
             <table className="styled-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {products.map((product,index) => {
                    return (

                        <tr key={index}> 
                        {
                        Object.values(product).map((value,index) => {
                            {if(value!='ProductType')
                                return (
                                <td key={index}>
                                    {value}
                                </td>)} 
                        })
                        } 
                        </tr>)
                        })}
                    
                </tbody>
        
            </table>
        </>
    )
}