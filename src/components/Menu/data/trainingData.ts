// data/trainingData.ts
export interface TrainingData {
    date: string;
    training: string;
    attenddate: string;
  }
  
  export const trainingData: { [key: string]: TrainingData[] } = {
    '12345': [
      { date: '2024-11-02', training: 'React Basics', attenddate: '2024-11-03' },
      { date: '2024-11-10', training: 'Advanced JavaScript', attenddate: '2024-11-11' },
    ],
    '67890': [
      { date: '2024-12-01', training: 'TypeScript Essentials', attenddate: '2024-12-02' },
      { date: '2024-12-15', training: 'Node.js Fundamentals', attenddate: '2024-12-16' },
    ],
    // Add more employee data as needed
  };
  