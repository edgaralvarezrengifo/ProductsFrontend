import { useState,useEffect } from "react";
import { addProduct,updateProduct } from "../Api/mutations";
import {GET_Product} from "../Api/queries";
import { useMutation,useQuery } from '@apollo/client';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { uploadFileToAWS } from "./HandleImages";


export const ProductForm = ({onNewProduct,onUpdateProduct,prodId,notify,updatedProduct,Title}) =>{
    const [product, setProduct] = useState({'id':'','title':'','description':'','price':0,'image':'','quantity':0 });
    const [createProd, { data, loading, error }] = useMutation(addProduct);
    const [updateProd, { dataupdate, loadingupdate, errorupdate }] = useMutation(updateProduct);
    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(()=>{
    
        if(updatedProduct!==undefined){   
            const pro =Object.fromEntries(Object.entries(updatedProduct).filter(e => e[0] != '__typename'));         
            console.log(pro);
            setProduct(pro);
        }
        
    },[updatedProduct]);

   

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    const  handledOnChangeEvent= (event)=>{
        const value = event.target.name==="price" || event.target.name==="quantity" ? +event.target.value : event.target.value  ;
        setProduct({...product,[event.target.name]: value});    
        if(event.target.files!==undefined  &&  event.target.files!==null ){ 
            console.log(event);
            if(event.target.files[0]!==null){
                console.log('entra a setear la imagen')       
                setSelectedFile(event.target.files[0]);
            }
           
        }
    }
    function delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    const onSubmit =async (event)=>{
        console.log(product);
        event.preventDefault();
        if(updatedProduct===undefined){
         
            let copy = {...product}
            onNewProduct(copy);
            
            console.log(copy);
            createProd({ variables: { type:copy } });      
            notify("Product created successfully");
            if(selectedFile!==null){
                copy.image=`https://buckettrainning.s3.amazonaws.com/images/${selectedFile.name}`;
                uploadFileToAWS(selectedFile);
                await delay(2000);
            }
            setSelectedFile(null);
          
        }else{
            let copy = {...product}
            if(selectedFile!==null){
                copy.image=`https://buckettrainning.s3.amazonaws.com/images/${selectedFile.name}`;
                uploadFileToAWS(selectedFile);
            }
           
            updateProd({variables : {type:copy,id:product.id}});
            onUpdateProduct(copy);
            notify("Product updated successfully");
           
        }
        setProduct({'id':'','title':'','description':'','price':0,'image':'','quantity':0 });

       
    }
    
    return(
        
        <Form onSubmit={onSubmit} >
            <div>{prodId!=='-1' && <CompgetProd prodId={prodId} setproduct={setProduct}/>}</div>
            <fieldset className="border p-2">
            <legend  className="float-none w-auto">{Title}</legend>
                <br></br>
                <Row>
                    <Col>
                        <Form.Group controlId="formCode" className="mb-3">
                            <Form.Label> Product Code:</Form.Label>
                            <Form.Control type="text" name="id" value={product.id} onChange={handledOnChangeEvent} 
                            disabled={prodId!=='-1'} required />
                        </Form.Group>
                    </Col> 
                    <Col>
                        <Form.Group controlId="formTitle" className="mb-3">
                        <Form.Label> Title:</Form.Label>
                        <Form.Control type="text" name="title" value={product.title} onChange={handledOnChangeEvent} 
                        disabled={prodId!=='-1'} required/>
                            
                        </Form.Group>
                    </Col>
                    {prodId==='-1'&&
                    <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label> Image:</Form.Label>
                            <Form.Control type="file" name="image" 
                            disabled={prodId!=='-1'} onChange={handledOnChangeEvent}/>
                    
                    </Form.Group>
                    
                    </Col>
                    }
                    {prodId!=='-1'&&
                    <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                        <img src= {product.image}  width="200" height="100"></img>
                    
                    </Form.Group>
                    
                    </Col>
                    }
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formDesc" className="mb-3">
                            <Form.Label> Description:</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={product.description} 
                            disabled={prodId!=='-1'} onChange={handledOnChangeEvent}/>
                        </Form.Group>
                        
            
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formPrice" className="mb-3">
                            <Form.Label> Price:</Form.Label>
                            <Form.Control type="number" name="price" value={product.price} onChange={handledOnChangeEvent} 
                            disabled={prodId!=='-1'} min="0"  required/>
                        </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formQuantity" className="mb-3">
                                <Form.Label> Quantity:</Form.Label>
                                <Form.Control type="number" name="quantity" value={product.quantity} onChange={handledOnChangeEvent} 
                                 disabled={prodId!=='-1'} min="0" required/>
                            </Form.Group>
                        </Col>
                        {prodId==='-1' &&
                        <Col>
                            <Form.Group controlId="formsend" className="mb-1">
                            <Form.Label>.</Form.Label>
                                <Form.Control type="submit" className="btn btn-success" value={'Save'}/>
                            </Form.Group>
                        </Col>
                        }
                </Row>       
            </fieldset>           
      </Form>
     
    );
}



export const CompgetProd=({prodId,setproduct})=>{

    const { data, loading, error }  = useQuery(GET_Product,{ variables: { id:prodId }});
    useEffect(()=>{
        if(!loading && data!==undefined){
            setproduct(data.product);
         
        }
    },[data,loading])
}