'use client';
import React, { useEffect, useState } from 'react';
import Client from './client';

const NewsBlock: React.FC = () => {
  const [facts, setFacts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFacts = async (): Promise<void> => {
      try {
        const factsList: string[] = [];
        for (let i = 0; i < 20; i++) {
          const response = await fetch('https://catfact.ninja/fact');
          const data = await response.json();
          factsList.push(data.fact);
        }
        setFacts(factsList);
        setIsLoading(true);
      } catch (error) {
        console.error('Ошибка при получении фактов:', error);
      }
    };

    fetchFacts();
  }, []);

  return <Client facts={facts} isLoading={isLoading} />;
};

export default NewsBlock;
