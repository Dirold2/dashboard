'use client';

import Calendar from 'react-calendar';
import '../css/MyCustomCalendarStyles.css';
import styles from '@styles/other.module.css';
import { VisibilityToggle } from '@ui/VisibilityToggle';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { JSX } from 'react/jsx-runtime';

function Dates(): JSX.Element {
  const t = useTranslations('Data');
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());
  const [date, setDate] = useState<number | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const typedButtonRef = buttonRef as RefObject<HTMLDivElement>;
  const typedBlockRef = blockRef as RefObject<HTMLDivElement>;
  
  useEffect(() => {
    const monthNames = [
      t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun'),
      t('jul'), t('aug'), t('sep'), t('oct'), t('nov'), t('dec'),
    ];

    const now = new Date();
    setCurrentDate(now);
    setDate(now.getDate());
    setMonth(monthNames[now.getMonth()]);
    setYear(now.getFullYear());

    const intervalId = setInterval(() => {
      const currentTime = new Date();
      setCurrentDate(currentTime);
    }, 1000);

    return (): void => clearInterval(intervalId);
  }, [t]);

  if (date === null) {
    return <aside className={styles.date} />;
  }

  return (
    <div className={styles.sidebox} style={{width: '100%'}}>
    <VisibilityToggle buttonRef={typedButtonRef} blockRef={typedBlockRef}>
        {({
          showBlock,
          showStyleBlock,
          toggleBlockVisibility,
        }: {
          showBlock: boolean;
          showStyleBlock: boolean;
          toggleBlockVisibility: () => void;
        }) => (
          <aside
            ref={buttonRef}
            onClick={toggleBlockVisibility}
            className={`${styles.date} center ${showStyleBlock ? styles.Active : ''}`}
          >
            <span style={{ fontSize: '0.9em' }}>{`${date} ${month} ${year}`}</span>
            {showBlock && (
              <div
                ref={blockRef}
                className={`${styles.calendarContainer} ${showStyleBlock ? styles.visible : ''}`}
              >
                <Calendar
                  className={styles.calendarStyle}
                  activeStartDate={currentDate || new Date()}
                  view="month"
                  navigationLabel={() => '' as React.ReactNode}
                  prevLabel={null}
                  nextLabel={null}
                  prev2Label={null}
                  next2Label={null}
                />
              </div>
            )}
          </aside>
        )}
      </VisibilityToggle>
    </div>
  );
}

export default Dates;
