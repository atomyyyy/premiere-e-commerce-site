require("dotenv").config();

const { MongoClient } = require('mongodb');
const crypto = require('crypto');

const url = process.env.DATABASE_CONNECTION_STRING;
const client = new MongoClient(url);

const handler = async (event) => {
  if (event.httpMethod !== 'OPTIONS') {
    return {
      body: '',
      statusCode: 200
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      body: JSON.stringify({ message: 'BAD_REQUEST' }),
      headers: { 'Content-Type': 'application/json'},
      statusCode: 400
    }
  }

  await client.connect();
  const db = client.db('e_commerce');
  const collection = db.collection('order');

  const orderId = crypto.randomUUID();
  collection.insertOne({
    ...JSON.parse(event.body),
    orderId
  })

  const createdDocument = await collection.findOne({ orderId }, { _id: 0 });

  return {
    body: JSON.stringify(createdDocument),
    headers: { 'Content-Type': 'application/json'},
    statusCode: createdDocument ? 201 : 500
  }
}

module.exports = { handler }
