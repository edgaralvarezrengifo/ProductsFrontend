import AWS from 'aws-sdk';
import { uploadFile } from 'react-s3';
import {Config } from '../config/credentials';
import {Buffer} from 'buffer';
window.Buffer = Buffer;


export const uploadFileToAWS = async (file) => {

    uploadFile(file, Config)
            .then(data => {console.log(data)})
            .catch(err => console.error(err))
   
}



