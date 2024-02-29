import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
let random = require('random-string-alphanumeric-generator');
require('dotenv').config();

interface Option {
    [key: string]: string;
}

interface Question {
    selectedOption: string;
    options: Option;
    isRequired: boolean;
    question: string;
    correctAnswer: string;
}

type Data = {
    quizTitle: string;
    questions: Question[];
    message: string;
}

interface ErrorResponse {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorResponse>
) {
    const { quizTitle, questions, token } = req.body;

    if (!quizTitle || !questions || !token) {
        res.status(400).json({ message: 'Quiz title, questions and token are required' });
        return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        res.status(500).json({ message: 'JWT secret not configured' });
        return;
    }

    let userId ;
    try {
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        console.log(decoded);
        userId = decoded.id;
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
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

        const collection = client.db('quizDB').collection('quizzes');
        const usersCollection = client.db('quizDB').collection('users');
        const code = random.randomAlphanumeric(10, "lowercase")

        const quiz = {
            title: quizTitle,
            questions,
            createdBy: userId,
            uniqueCode: code
        };

        const result = await collection.insertOne(quiz);

        if (result.insertedId) {
            const updateResult = await usersCollection.updateOne(
                { _id: new ObjectId(userId) },
                { $addToSet: { createdQuizzes: result.insertedId } }
            );
        }

        res.status(200).json({ message: 'Quiz created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    } finally {
        await client.close();
    }
}
