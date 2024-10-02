"use client"
import { useState, useEffect } from 'react';

// Объявление хука useWindowSize с явным указанием типа возвращаемого значения
function useWindowSize(): { width: number } {
  // Инициализация состояния шириной окна
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    // Функция для обработки изменения размера окна
    function handleResize(): void {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    // Добавление обработчика события resize
    window.addEventListener('resize', handleResize);

    // Возвращаемая функция для очистки обработчика события
    return (): void => window.removeEventListener('resize', handleResize);
  }, []); // Пустой массив зависимостей означает, что эффект запускается один раз

  return windowSize; // Возвращаем состояние размера окна
}

export default useWindowSize;
