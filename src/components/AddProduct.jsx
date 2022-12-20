import { useState,useEffect } from "react";
import { addProduct } from "../Api/mutations";
import { useMutation } from '@apollo/client';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


export const AddProducts = ({onNewProduct,notify,updateProduct}) =>{
    const [product, setProduct] = useState({'id':'','title':'','description':'','price':0,'image':'','quantity':0 });
    const [createProd, { data, loading, error }] = useMutation(addProduct);
   
    useEffect(()=>{
        console.log(updateProduct);
        if(updateProduct!==undefined){

            
            setProduct(updateProduct);
        }
    },[updateProduct])

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
        notify("Product created successfully");
       
    }
    
    return(
        <Form onSubmit={onSubmit} >
            <Row>
                <Col>
                    <Form.Group controlId="formCode" className="mb-3">
                        <Form.Label> Product Code:</Form.Label>
                        <Form.Control type="text" name="id" value={product.id} onChange={handledOnChangeEvent} required />
                    </Form.Group>
                </Col> 
                <Col>
                    <Form.Group controlId="formTitle" className="mb-3">
                    <Form.Label> Title:</Form.Label>
                    <Form.Control type="text" name="title" value={product.title} onChange={handledOnChangeEvent}  required/>
                        
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label> Image:</Form.Label>
                        <Form.Control type="file" name="image" value={product.image} onChange={handledOnChangeEvent}/>
                  
                </Form.Group>
                
                </Col>
                
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="formDesc" className="mb-3">
                        <Form.Label> Description:</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={product.description} onChange={handledOnChangeEvent}/>
                    </Form.Group>
                    
           
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="formPrice" className="mb-3">
                        <Form.Label> Price:</Form.Label>
                        <Form.Control type="number" name="price" value={product.price} onChange={handledOnChangeEvent} min="0"  required/>
                    </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formQuantity" className="mb-3">
                            <Form.Label> Quantity:</Form.Label>
                            <Form.Control type="number" name="quantity" value={product.quantity} onChange={handledOnChangeEvent} min="0" required/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formsend" className="mb-1">
                        <Form.Label>.</Form.Label>
                            <Form.Control type="submit" className="btn btn-success" value={'Save'}/>
                        </Form.Group>
                    </Col>
            </Row>
           
                
            
           
      </Form>
     
    );
}