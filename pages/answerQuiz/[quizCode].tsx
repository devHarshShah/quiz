import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/layouts/default';
import { Card, Input } from '@nextui-org/react';
import { title } from '@/components/primitives';
import {RadioGroup, Radio} from "@nextui-org/react";
import { useRouter } from 'next/router';
import axios from 'axios';

interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
  createdBy: string;
  uniqueCode: string;
}

interface Question {
  selectedOption: string;
  options: Options;
  isRequired: boolean;
  question: string;
  correctAnswer: string;
}

interface Options {
  A: string;
  B: string;
  C: string;
  D: string;
}

function QuizComponent() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const router = useRouter();
  const quizCode = router.query.quizCode as string;

  console.log(quizCode)

  useEffect(() => {
    axios.post('/api/getQuiz', { quizCode: quizCode })
      .then(response => setQuiz(response.data))
      .catch((error) => console.error('Error:', error));
  }, [quizCode]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <h1 className={title({ color: 'blue' })}>{quiz.title}</h1>
      {quiz.questions.map((question, index) => (
        <Card key={index} className="flex items-center justify-center flex-col w-[30%] p-8 m-4">
          {question.selectedOption === 'Numerical' && (
            <div className="flex flex-col justify-center items-center">
              <h3>Question: {question.question}</h3>
              <Input className="w-full m-10 mb-1" placeholder="Enter your answer" />
            </div>
          )}
          {question.selectedOption === 'Text' && (
            <div className="flex flex-col justify-center items-center">
              <h3>Question: {question.question}</h3>
              <Input className="w-full m-10 mb-1" placeholder="Enter your answer" />
            </div>
          )}
          {question.selectedOption === 'Multiple Choice' && (
            <div className="flex flex-col justify-center items-center">
              <h3>Question: {question.question}</h3>
              <div className="w-full m-10 mb-1">
                      <div>
                        <RadioGroup label="Select your Answer">
                          <Radio value={question.options.A}>{question.options.A}</Radio>
                          <Radio value={question.options.B}>{question.options.B}</Radio>
                          <Radio value={question.options.C}>{question.options.C}</Radio>
                          <Radio value={question.options.D}>{question.options.D}</Radio>
                        </RadioGroup>
                      </div>
              </div>
            </div>
          )}
        </Card>
      ))}
    </DefaultLayout>
  );
}

export default QuizComponent;
