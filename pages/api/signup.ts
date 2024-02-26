import { NextApiRequest, NextApiResponse } from 'next';
const { MongoClient, ServerApiVersion } = require("mongodb");
import bcrypt from 'bcrypt';
require('dotenv').config();

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

  try {
    await client.connect();

    const collection = client.db("quizDB").collection("users");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await collection.insertOne({ email, password: hashedPassword });

    if (result.insertedId) {
      res.status(200).json({ message: 'User created successfully' });
    } else {
      res.status(500).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close();
  }
}