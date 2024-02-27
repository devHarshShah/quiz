
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ServerApiVersion } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config();

type Data = {
    token?: string;
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
    const client = new MongoClient(uri ?? '', {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {
        await client.connect();

        const collection = client.db('quizDB').collection('users');

        const user = await collection.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            res.status(500).json({ message: 'JWT secret not configured' });
            return;
        }

        const token = jwt.sign({ id: user._id }, secret);
        res.status(200).json({ token, message: 'Logged in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    } finally {
        await client.close();
    }
}