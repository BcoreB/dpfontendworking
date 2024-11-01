// components/SummaryCards.tsx
import React from 'react';
import { Button } from 'devextreme-react';
const SummaryCards = () => {
  const cards = [
    { title: 'ABSENT', count: 6 },
    { title: 'LEAVE', count: 1 },
    { title: 'LOAN', count: 6 },
  ];

  return (
    <div className='flex flex-col py-4 justify-between items-end'>
        <Button className='px-4 py-2'>Month</Button>
        <div className="flex space-x-4 gap-6">
        {cards.map((card, index) => (
            <div key={index} className='w-40'>
                <div className="bg-red-100 p-4 border-1 text-center rounded-md">
                <h3 className="text-xl font-semibold">{card.title}</h3>
                </div>
                <div className='bg-green-100 p-2'><p className="text-2xl font-bold">{card.count}</p></div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default SummaryCards;
