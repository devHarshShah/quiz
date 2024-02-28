import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ServerApiVersion } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { quizCode } = req.body;
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

      const db = client.db('quizDB');
      const collection = db.collection('quizzes');

      const quiz = await collection.findOne({ uniqueCode: quizCode });

      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }

      res.json(quiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
