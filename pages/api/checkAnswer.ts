import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {quiz, answers} = req.body
        
        let score = 0;

        for (let i = 0; i < quiz.questions.length; i++) {
            if (answers[`question${i + 1}`] === quiz.questions[i].correctAnswer) {
                score++;
            }
        }

        res.status(200).json({ score });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}