import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteProduct } from "../Api/mutations";
import { useMutation } from '@apollo/client';

export const ProductsList = ({products,setProducts,setProdId,notify,setupdateProduct,setisAdd, setformTitle}) =>{
    const [show, setShow] = useState(false);
    const[cindex,setCindex] = useState(-1);
    const [deleteProd, { data, loading, error }] = useMutation(deleteProduct);

    const handleClose = () => setShow(false);
    const handleCloseConfirm = ()=>{
        const prod = products[cindex]
        const prodid = products[cindex].id;
        console.log(prodid);
        deleteProd({ variables: { type: prodid } });
        setCindex(-1);
        setShow(false);
        products = products.filter(function(item) {
            return item !== prod
        })
        setProducts(products);
        notify(`Product ${prodid} deleted successfully`);

    }
    const handledUpdateProduct=(event,i)=>{
        const prod = products[i];
        setupdateProduct(prod);
        setformTitle(`Update Product ${prod.id}`)
        console.log(prod);
        setisAdd(true);
        setProdId('-1');

    };
    const handledViewProduct=(event,i)=>{
        const prod = products[i];
        setProdId(prod.id);
        setformTitle(`Product ${prod.id}`)
        setisAdd(true);

    };
    const handleShow = (event,i) => {
        console.log(i);
        setCindex(i);
        setShow(true)
    
    };
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
                        })}
                            <td key={`Actions ${index}`}>
                                <Button size="sm" variant="outline-info" onClick={(event)=>handledViewProduct(event,index)}>View</Button>    
                                <Button size="sm" variant="outline-success" onClick={(event)=>handledUpdateProduct(event,index)}>update</Button>
                                <Button size="sm" variant="outline-danger" onClick={(event)=>handleShow(event, index)}>delete</Button>
                            </td>
                        </tr>)
                        })}
                    
                </tbody>
        
            </table>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure do you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        cancel
                    </Button>
                    <Button variant="primary" onClick={handleCloseConfirm}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
