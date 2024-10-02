'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '../style/menu.module.css';

const Range: React.FC = () => {
  const [toggleValue, setToggleValue] = useState(2);

  useEffect(() => {
    const savedScheme = localStorage.getItem('colorScheme');
    if (savedScheme) {
      const schemeNumber = parseInt(savedScheme, 10);
      document.body.className = '';
      switch (schemeNumber) {
        case 1:
          document.body.classList.add('light-scheme');
          break;
        case 2:
          document.body.classList.add('system-scheme');
          break;
        case 3:
          document.body.classList.add('dark-scheme');
          break;
      }
      setToggleValue(schemeNumber);
    }
  }, []);

  const applyColorScheme = useCallback((schemeNumber: number) => {
    document.body.className = '';
    switch (schemeNumber) {
      case 1:
        document.body.classList.add('light-scheme');
        break;
      case 2:
        document.body.classList.add('system-scheme');
        break;
      case 3:
        document.body.classList.add('dark-scheme');
        break;
    }
  }, []);

  const handleToggleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const schemeNumber = parseInt(event.target.value, 10);
      setToggleValue(schemeNumber);
      applyColorScheme(schemeNumber);
      localStorage.setItem('colorScheme', schemeNumber.toString());

      document.documentElement.style.setProperty(
        '--slider-position',
        event.target.value,
      );
    },
    [applyColorScheme],
  );

  const toggleClass = (): string => {
    switch (toggleValue) {
      case 1:
        return styles.someClassNameForValue1;
      case 2:
        return styles.someClassNameForValue2;
      case 3:
        return styles.someClassNameForValue3;
      default:
        return '';
    }
  };

  return (
    <div className={`${styles.range}`}>
      <div className={styles.iconWrapper}>
        <input
          type="range"
          name="points"
          onChange={handleToggleChange}
          min="1"
          step="1"
          className={`${styles.tgl_def} ${toggleClass()}`}
          max="3"
          value={toggleValue}
        />
        <div className={`${styles.ticks}`}>
          <span className={`${styles.tick}`}>
            <i className="bi bi-brightness-high-fill"></i>
          </span>
          <span className={`${styles.tick}`}>
            <i className="bi bi-circle-half"></i>
          </span>
          <span className={`${styles.tick}`}>
            <i className="bi bi-moon-stars-fill"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Range;
