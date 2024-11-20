'use client';
import { useEffect, useState } from 'react';
import { Item } from '@ui/Grid';
import styles from './style/color.module.css';
import { JSX } from 'react/jsx-runtime';

interface Scheme {
  background: string;
  backgroundBefore: string;
  backgroundAfter: string;
  color: string;
}

function Colors(): JSX.Element {
  const [background, setBackground] = useState('#ADADAD');
  const [backgroundBefore, setBackgroundBefore] = useState('#949494');
  const [backgroundAfter, setBackgroundAfter] = useState('#949494');
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    const getInitialColor = (): Scheme | Scheme => {
      const savedScheme = localStorage.getItem('colorScheme');
      const schemes: Record<number, Scheme> = {
        1: {
          background: '#FFFFFF',
          backgroundBefore: '#DCDCDC',
          backgroundAfter: '#B4B4B4',
          color: '#32323C',
        },
        2: {
          background: '#1A1A1A',
          backgroundBefore: '#262626',
          backgroundAfter: '#666666',
          color: '#DEDEDE',
        },
        3: {
          background: '#1A1A1A',
          backgroundBefore: '#262626',
          backgroundAfter: '#666666',
          color: '#DEDEDE',
        },
      };

      const defaultScheme: Scheme = {
        background: '#FFFFFF',
        backgroundBefore: '#DCDCDC',
        backgroundAfter: '#B4B4B4',
        color: '#32323C',
      };

      return savedScheme
        ? schemes[parseInt(savedScheme)] || defaultScheme
        : defaultScheme;
    };

    const colors = getInitialColor();
    setBackground(colors.background);
    setBackgroundBefore(colors.backgroundBefore);
    setBackgroundAfter(colors.backgroundAfter);
    setColor(colors.color);
  }, []);

  const handleBackground = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setBackground(event.target.value);
    document.documentElement.style.setProperty(
      '--background',
      event.target.value,
    );
  };

  const handleBackgroundBefore = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setBackgroundBefore(event.target.value);
    document.documentElement.style.setProperty(
      '--background-before',
      event.target.value,
    );
  };

  const handleBackgroundAfter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setBackgroundAfter(event.target.value);
    document.documentElement.style.setProperty(
      '--background-after',
      event.target.value,
    );
  };

  const handleColor = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setColor(event.target.value);
    document.documentElement.style.setProperty('--color', event.target.value);
  };

  return (
    <main className={`${styles.colors}`}>
      <div className={styles.ItemStyle}>
        <Item rowSpan={2}>
          <label htmlFor="background" defaultValue="initial value">
            Background:
          </label>
          <form>
            <input
              type="color"
              id="background"
              name="background"
              value={background}
              onChange={handleBackground}
              className={styles['input[type="color"]']}
              data-hex={background}
            />
          </form>
        </Item>
      </div>
      <div className={styles.ItemStyle}>
        <Item rowSpan={2}>
          <label htmlFor="backgroundBefore" defaultValue="initial value">
            Background Before
          </label>
          <form>
            <input
              type="color"
              id="backgroundBefore"
              name="backgroundBefore"
              value={backgroundBefore}
              onChange={handleBackgroundBefore}
              className={styles['input[type="color"]']}
              data-hex={backgroundBefore}
            />
          </form>
        </Item>
      </div>
      <div className={styles.ItemStyle}>
        <Item rowSpan={2}>
          <label htmlFor="secondaryColor" defaultValue="initial value">
            Background After
          </label>
          <form>
            <input
              type="color"
              id="secondaryColor"
              name="secondaryColor"
              value={backgroundAfter}
              onChange={handleBackgroundAfter}
              className={styles['input[type="color"]']}
              data-hex={backgroundAfter}
            />
          </form>
        </Item>
      </div>
      <div className={styles.ItemStyle}>
        <Item rowSpan={2}>
          <label htmlFor="color" defaultValue="initial value">
            Color:
          </label>
          <form>
            <input
              type="color"
              id="color"
              name="color"
              value={color}
              onChange={handleColor}
              className={styles['input[type="color"]']}
              data-hex={color}
            />
          </form>
        </Item>
      </div>
    </main>
  );
}

export default Colors;