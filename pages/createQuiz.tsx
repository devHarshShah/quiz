import DefaultLayout from '@/layouts/default';
import { Input, Button } from '@nextui-org/react';
import { title, subtitle } from '@/components/primitives';
import { Checkbox } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import React, { useState, ChangeEvent } from 'react';
import { Card } from '@nextui-org/react';

interface Option {
  [key: string]: string;
}

interface Question {
  selectedOption: string;
  options: Option;
  isRequired: boolean;
  quizTitle: string;
  question: string;
  correctAnswer: string;
}

const CreateQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([{ selectedOption: 'Question Type', options: { A: '', B: '', C: '', D: '' }, isRequired: false, quizTitle: '', question: '', correctAnswer: '' }]);

  const handleSelect = (option: string, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].selectedOption = option;
    setQuestions(newQuestions);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].isRequired = event.target.checked;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (optionKey: string, value: string, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionKey] = value;
    setQuestions(newQuestions);
  };

const handleCorrectAnswerChange = (value: string, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = value;
    setQuestions(newQuestions);
};

const handleAddQuestion = () => {
    setQuestions([...questions, { selectedOption: 'Question Type', options: { A: '', B: '', C: '', D: '' }, isRequired: false, quizTitle: '', question: '', correctAnswer: '' }]);
};

const handleSubmit = () => {
    console.log(questions);
};

  return (
    <DefaultLayout>
      <h1 className={title({ color: 'blue' })}>Create Quiz</h1>
      {questions.map((question, index) => (
        <Card key={index} className="flex items-center justify-center flex-col w-full mt-6 p-8">
          <Input isRequired type="email" label="Quiz Title" variant="bordered" placeholder="Enter Quiz Title" className="w-full m-3 mb-1" value={question.quizTitle} onChange={(e) => handleOptionChange('quizTitle', e.target.value, index)} />
          <Input isRequired type="email" label="Question" variant="bordered" placeholder="Enter Question" className="w-full m-3 mb-1" value={question.question} onChange={(e) => handleOptionChange('question', e.target.value, index)} />
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
          {question.selectedOption === 'Numerical' && <Input isRequired type="number" label="Answer" variant="bordered" placeholder="Enter Correct Numerical Answer" className="w-full m-3 mb-1" />}
          {question.selectedOption === 'Text' && <Input isRequired type="text" label="Answer" variant="bordered" placeholder="Enter Correct Textual Answer" className="w-full m-3 mb-1" />}
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
          <Checkbox className="mt-3" defaultSelected onChange={(e) => handleCheckboxChange(e, index)}>
            Mark as Required
          </Checkbox>
        </Card>
      ))}
      <Button className="w-96 m-7 mt-5" color="primary" variant="solid" onClick={handleAddQuestion}>
        Add Question
      </Button>
      <Button className="w-96 m-7 mt-3" color="primary" variant="solid" onClick={handleSubmit}>
        Submit Quiz
      </Button>
    </DefaultLayout>
  );
};

export default CreateQuiz;
