import { useRouter } from 'next/router';
import DefaultLayout from '@/layouts/default';
import { Card } from '@nextui-org/react';

export default function ResultPage() {
  const router = useRouter();
  const { score } = router.query;

  return (
    <DefaultLayout>
      <Card className="flex items-center justify-center flex-col w-[30%] p-8 m-4">
        <h1>Quiz Submitted Successfully</h1>
        <p>Your score is: {score}</p>
      </Card>
    </DefaultLayout>
  );
}