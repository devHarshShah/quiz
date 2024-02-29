import { useRouter } from 'next/router';
import DefaultLayout from '@/layouts/default';
import { Card } from '@nextui-org/react';
import { Copy } from 'react-feather';

export default function ResultPage() {
  const router = useRouter();
  const { uniqueCode } = router.query;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://quiz-swart-five.vercel.app/answerQuiz/${uniqueCode}`);
  };

  return (
    <DefaultLayout>
      <Card className="flex items-center justify-center flex-col w-[30%] p-8 m-4">
        <h1>Quiz Submitted Successfully</h1>
        <p>Your Quiz can be accessed at: </p>
        <div className='flex flex-row m-4'>
          <a style={{ backgroundColor: 'black', color: 'white', padding: '1rem', borderRadius: '1rem' }} href={`https://quiz-swart-five.vercel.app/answerQuiz/${uniqueCode}`} target="_blank">
            https://quiz-swart-five.vercel.app/answerQuiz/{uniqueCode}
          </a>
          <button className='ml-3' onClick={copyToClipboard}><Copy /></button>
        </div>
      </Card>
    </DefaultLayout>
  );
}
