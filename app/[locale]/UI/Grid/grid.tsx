'use client';

import { JSX, ReactNode, useMemo } from 'react';
import styles from './styles/grid.module.css';

// Тип для расширенных стилей
type ExtendedCSSProperties = React.CSSProperties & {
  [key: string]: any; // Разрешаем медиазапросы
};

// Тип для адаптивного управления колонками
type ResponsiveCols = {
  [breakpoint: string]: number;
};

// Тип для Grid
interface GridProps {
  /** Дочерние элементы для отображения в сетке */
  children: ReactNode;
  /** Количество колонок */
  cols?: number;
  /** Отступы между элементами */
  gap?: string;
  /** Направление расположения элементов */
  flow?: `row` | `row dense` | `column` | `column dense` | `dense`;
  /** Адаптивное управление количеством колонок */
  responsiveCols?: ResponsiveCols;
  /** Дополнительный CSS-класс */
  className?: string;
  /** Инлайновые стили */
  style?: React.CSSProperties;
}

/**
 * Возвращает стили для компонента Grid
 * @param {GridProps} props Свойства сетки
 * @returns {ExtendedCSSProperties} Стили для сетки
 */
const useGridStyles = ({
  cols = 1,
  gap = '20px',
  flow = 'row dense',
  responsiveCols = { 600: 6, 900: 8, 1200: 12 },
}: Omit<GridProps, 'children' | 'className' | 'style'>): ExtendedCSSProperties =>
  useMemo(() => {
    const baseStyle: ExtendedCSSProperties = {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap,
      gridAutoFlow: flow,
    };

    // Добавление медиазапросов
    Object.entries(responsiveCols).forEach(([breakpoint, cols]) => {
      const mediaQuery = `@media (minWidth: ${breakpoint}px)`;
      baseStyle[mediaQuery] = {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      };
    });

    return baseStyle;
  }, [cols, gap, flow, responsiveCols]);

/**
 * Компонент `Grid`
 * @param {GridProps} props Свойства компонента
 * @returns {JSX.Element} JSX для сетки
 */
export const Grid = ({
  children,
  cols = 1,
  gap = '20px',
  flow = 'row dense',
  responsiveCols = { 600: 6, 900: 8, 1200: 12 },
  className = '',
  style = {},
}: GridProps): JSX.Element => {
  const gridStyle = useGridStyles({ cols, gap, flow, responsiveCols });

  return (
    <div className={`${className}`} style={{ ...gridStyle, ...style }}>
      {children}
    </div>
  );
};

// Типы для Item
interface ItemProps {
  /** Дочерние элементы для отображения внутри элемента сетки */
  children: ReactNode;
  /** Количество колонок, занимаемых элементом */
  colSpan?: number;
  /** Количество строк, занимаемых элементом */
  rowSpan?: number;
  /** Дополнительный CSS-класс */
  className?: string;
  /** Инлайновые стили */
  style?: React.CSSProperties;
}

/**
 * Компонент `Item`
 * @param {ItemProps} props Свойства компонента
 * @returns {JSX.Element} JSX для элемента сетки
 */
export const Item = ({
  children,
  colSpan,
  rowSpan,
  className = '',
  style = {},
}: ItemProps): JSX.Element => {
  const itemStyle: React.CSSProperties = {
    gridColumn: colSpan ? `span ${colSpan}` : undefined,
    gridRow: rowSpan ? `span ${rowSpan}` : undefined,
    ...style,
  };

  return (
    <div className={`${styles.item} ${className}`} style={itemStyle}>
      {children}
    </div>
  );
};
