'use client';
import React, { useState, useEffect, useCallback, RefObject } from 'react';

interface VisibilityToggleProps {
  buttonRef: RefObject<HTMLDivElement>;
  blockRef: RefObject<HTMLDivElement>;
  children: (args: {
    showBlock: boolean;
    showStyleBlock: boolean;
    toggleBlockVisibility: () => void;
  }) => React.ReactNode;
}

const VisibilityToggle: React.FC<VisibilityToggleProps> = ({
  blockRef,
  buttonRef,
  children,
}) => {
  const [showBlock, setShowBlock] = useState(false);
  const [showStyleBlock, setShowStyleBlock] = useState(false);

  const toggleVisibility = useCallback(
    (
      stateSetter: React.Dispatch<React.SetStateAction<boolean>>,
      delay: number,
    ) => {
      setTimeout(() => {
        stateSetter((prevState) => !prevState);
      }, delay);
    },
    [],
  );

  const toggleBlockVisibility = useCallback(
    (event?: React.MouseEvent) => {
      if (event) {
        event.stopPropagation();
        if (
          blockRef.current &&
          blockRef.current.contains(event.target as Node)
        ) {
          return;
        }
      }
      toggleVisibility(setShowBlock, 0);
      toggleVisibility(setShowStyleBlock, 150);
    },
    [blockRef, toggleVisibility],
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const isCloseButton =
        event.target instanceof Element &&
        event.target.classList.contains('bi-x');
      if (isCloseButton) {
        return;
      }
      if (blockRef.current && buttonRef.current) {
        if (
          !blockRef.current.contains(event.target as Node) &&
          buttonRef.current !== event.target &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          toggleVisibility(setShowBlock, 150);
          toggleVisibility(setShowStyleBlock, 0);
        }
      }
    },
    [blockRef, buttonRef, toggleVisibility],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return (): void => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return <div>{children({ showBlock, showStyleBlock, toggleBlockVisibility })}</div>;
};

export default VisibilityToggle;
