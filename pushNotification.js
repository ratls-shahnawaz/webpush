const webpush = require('web-push')
const AWS = require('aws-sdk')

const publicvapidKey = process.env.publicvapidKey
const privatevapidKey = process.env.privatevapidKey

webpush.setVapidDetails("mailto: <shahnawaz@reachandteach.in>", publicvapidKey, privatevapidKey)

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: "ap-south-1",
  // and rest of properties
})



let num = 1
exports.handler = async (event) => {


  try {
    num++

    // getting subcription from dynamoDB
    const data = await getDataFromDynamo()
    let subscription = data.Items[0].subcription
    console.log('DB data =>',data)

    // create payload
    const payload = JSON.stringify({
      title: 'Push Test' + ' ' + num,
      body: 'Hello From AWS 🚀🤘',
      icon: 'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png'
    })

    // // sending notification
    let dataPush = await webpush.sendNotification(subscription, payload)
    console.log('Response =>', dataPush)
  } catch (error) {
    console.log('catch error =>', error)
  }


}


// Function for getting the data from database

const getDataFromDynamo = async () => {

let params = {
      TableName: 'DEV',
      KeyConditionExpression: '#name = :value',
      ExpressionAttributeValues: { ':value': 'mehul' },
      ExpressionAttributeNames: { '#name': 'PK' }
}

try {
  /* code */
  const data = await dynamoDB.query(params).promise()
  return data
} catch (e) {return e}


}