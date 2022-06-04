const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: "ap-south-1",
  // and rest of properties
})

exports.handler = async (event) => {
   
    
try {
    /* code */
    
    console.log('Event body ==',event.body)
    // console.log('Endpoint -->>',JSON.parse(event.body).endpoint)
    
    let req = JSON.parse(event.body)
    
    let params = {
        
        TableName: 'DEV',
        Item: {
          PK: 'mehul',
          SK:'ballu',
          subcription:{
             endpoint:req.endpoint,
             expirationTime:null,
                keys:{
                  auth:req.keys.auth,
                  p256dh:req.keys.p256dh
                }
           }
        }
   };

   let data = await dynamoDB.put(params).promise();
   
   console.log('Storing data to DB',data)
   return data
    
} catch (e) {
     console.log('catch error =>', e)
} 
   
   
};
