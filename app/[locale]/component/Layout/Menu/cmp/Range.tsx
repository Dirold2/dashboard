'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '../style/menu.module.scss';
import { Range } from 'react-range';

const RangeDev: React.FC = () => {
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
    (values: number[]) => {
      const schemeNumber = values[0];
      setToggleValue(schemeNumber);
      applyColorScheme(schemeNumber);
      localStorage.setItem('colorScheme', schemeNumber.toString());
    },
    [applyColorScheme],
  );

  return (
    <div className={`${styles.range}`}>
      <div className={styles.rangeWrapper}>
        <Range
          values={[toggleValue]}
          step={1}
          min={1}
          max={3}
          onChange={handleToggleChange}
          renderTrack={({ props, children }) => (
            <div
              key={Math.random()}
              {...props}
              className={styles.track}
              style={{}}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              key={props.key}
              className={styles.thumb}
              style={{}}
            />
          )}
        />
        <div className={`${styles.ticks}`}>
          <span className={`${styles.tick}`} key="brightness">
            <i className="bi bi-brightness-high-fill"></i>
          </span>
          <span className={`${styles.tick}`} key="half">
            <i className="bi bi-circle-half"></i>
          </span>
          <span className={`${styles.tick}`} key="moon">
            <i className="bi bi-moon-stars-fill"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RangeDev;
