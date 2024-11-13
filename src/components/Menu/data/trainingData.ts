// data/trainingData.ts
export interface TrainingData {
    date: string;
    training: string;
    attenddate: string;
  }
  
  export const trainingData: { [key: string]: TrainingData[] } = {
    '12345': [
      { date: '20-11-2024', training: 'React Basics', attenddate: '25-11-2024' },
      { date: '24-12-2024', training: 'Advanced JavaScript', attenddate: '27-12-2024' },
    ],
    '67890': [
      { date: '20-11-2024', training: 'TypeScript Essentials', attenddate: '26-11-2024' },
      { date: '24-12-2024', training: 'Node.js Fundamentals', attenddate: '29-12-2024' },
    ],
    // Add more employee data as needed
  };
  