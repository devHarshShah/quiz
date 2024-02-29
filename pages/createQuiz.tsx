import DefaultLayout from '@/layouts/default';
import { Input, Button } from '@nextui-org/react';
import { title } from '@/components/primitives';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Card } from '@nextui-org/react';
import axios from 'axios';

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

const CreateQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([{ selectedOption: 'Question Type', options: { A: '', B: '', C: '', D: '' }, isRequired: false, question: '', correctAnswer: '' }]);
  const [quizTitle, setQuizTitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  const handleSelect = (option: string, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].selectedOption = option;
    setQuestions(newQuestions);
  };

  const handleQuizTitleChange = (value: string) => {
    setQuizTitle(value);
  };

  const handleCheckboxChange = (value: boolean, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].isRequired = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (optionKey: string, value: string, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionKey] = value;
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (value: string, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (value: string, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { selectedOption: 'Question Type', options: { A: '', B: '', C: '', D: '' }, isRequired: false, question: '', correctAnswer: '' }]);
  };

  const handleSubmit = () => {
    const quizData = {
      quizTitle: quizTitle,
      questions: questions,
      token: localStorage.getItem('token')
    };
  
    axios.post('/api/createQuiz', quizData)
      .then(response => {
        console.log(response.data);
        setQuestions([{ selectedOption: 'Question Type', options: { A: '', B: '', C: '', D: '' }, isRequired: false, question: '', correctAnswer: '' }]);
        setQuizTitle('');
        router.push(`/quizLink?uniqueCode=${response.data.quiz.uniqueCode}`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <DefaultLayout>
      <h1 className={title({ color: 'blue' })}>Create Quiz</h1>
      <Input isRequired type="text" label="Quiz Title" variant="bordered" placeholder="Enter Quiz Title" className="w-[30%] mt-6 m-3 mb-1" value={quizTitle} onChange={(e) => handleQuizTitleChange(e.target.value)} />
      {questions.map((question, index) => (
        <Card key={index} className="flex items-center justify-center flex-col w-[30%] p-8 m-4">
        <Input isRequired type="text" label="Question" variant="bordered" placeholder="Enter Question" className="w-full m-3 mb-1" value={question.question} onChange={(e) => handleQuestionChange(e.target.value, index)} />
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="max-w-lg m-3 mb-1">
                {question.selectedOption}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="numerical" onClick={() => handleSelect('Numerical', index)}>
                Numerical
              </DropdownItem>
              <DropdownItem key="text" onClick={() => handleSelect('Text', index)}>
                Text
              </DropdownItem>
              <DropdownItem key="mcq" onClick={() => handleSelect('Multiple Choice', index)}>
                Multiple Choice
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {question.selectedOption === 'Numerical' && <Input isRequired type="number" label="Answer" variant="bordered" placeholder="Enter Correct Numerical Answer" value={question.correctAnswer} className="w-full m-3 mb-1" onChange={(e) => handleCorrectAnswerChange(e.target.value, index)} />}
          {question.selectedOption === 'Text' && <Input isRequired type="text" label="Answer" variant="bordered" placeholder="Enter Correct Textual Answer" className="w-full m-3 mb-1" value={question.correctAnswer} onChange={(e) => handleCorrectAnswerChange(e.target.value, index)} />}
          {question.selectedOption === 'Multiple Choice' && (
            <div className="flex flex-col justify-center items-center w-full mt-2">
              <Input className="w-full mb-2" isRequired label="Select" variant="bordered" value={question.options.A} onChange={(e) => handleOptionChange('A', e.target.value, index)} placeholder="Option A" />
              <Input className="w-full mb-2" isRequired label="Select" variant="bordered" value={question.options.B} onChange={(e) => handleOptionChange('B', e.target.value, index)} placeholder="Option B" />
              <Input className="w-full mb-2" isRequired label="Select" variant="bordered" value={question.options.C} onChange={(e) => handleOptionChange('C', e.target.value, index)} placeholder="Option C" />
              <Input className="w-full mb-2" isRequired label="Select" variant="bordered" value={question.options.D} onChange={(e) => handleOptionChange('D', e.target.value, index)} placeholder="Option D" />
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="max-w-lg m-3 mb-1">
                    {question.correctAnswer || 'Select Correct Answer'}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Correct Answer">
                  <DropdownItem key="A" onClick={() => handleCorrectAnswerChange('A', index)}>
                    A
                  </DropdownItem>
                  <DropdownItem key="B" onClick={() => handleCorrectAnswerChange('B', index)}>
                    B
                  </DropdownItem>
                  <DropdownItem key="C" onClick={() => handleCorrectAnswerChange('C', index)}>
                    C
                  </DropdownItem>
                  <DropdownItem key="D" onClick={() => handleCorrectAnswerChange('D', index)}>
                    D
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <input type="checkbox" id="required" className="mt-3" onChange={(e) => handleCheckboxChange(e.target.checked, index)}/>
          <label htmlFor="required" className='ml-2 mt-3'>Mark as Required</label>
          </div>
        </Card>
      ))}
      <Button className="w-[30%] m-7 mt-5" color="primary" variant="solid" onClick={handleAddQuestion}>
        Add Question
      </Button>
      <Button className="w-[30%] m-7 mt-3" color="primary" variant="solid" onClick={handleSubmit}>
        Submit Quiz
      </Button>
    </DefaultLayout>
  );
};

export default CreateQuiz;