'use client';

import { JSX, ReactNode, useMemo } from 'react';
import styles from './styles/grid.module.css';

// Тип для расширенных стилей
type ExtendedCSSProperties = React.CSSProperties & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Разрешаем медиазапросы
};

// Тип для Grid
interface GridProps {
  /** @param children Дочерние элементы для отображения в сетке */
  children: React.ReactNode;
  /** @param cols Количество колонок */
  cols?: number;
  /** @param gap Отступы между элементами */
  gap?: string;
  /** @param flow Направление расположения элементов */
  flow?: `row` | `row dense` | `column` | `column dense` | `dense`;
  /** @param className Дополнительный CSS-класс */
  className?: string;
  /** @param style Инлайновые стили */
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
}: Omit<GridProps, 'children' | 'className' | 'style'>): ExtendedCSSProperties =>
  useMemo(() => {
    const baseStyle: ExtendedCSSProperties = {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap,
      gridAutoFlow: flow,
    };

    return baseStyle;
  }, [cols, gap, flow]);

/**
 * Компонент `Grid`
 * @param children Дочерние элементы для отображения в сетке
 * @param cols Количество колонок
 * @param gap Отступы между элементами
 * @param flow Направление расположения элементов
 * @param responsiveCols Адаптивное управление количеством колонок
 * @param className Дополнительный CSS-класс
 * @param style Инлайновые стили
 */
export const Grid = ({
  children,
  cols = 1,
  gap = '20px',
  flow = 'row dense',
  className = '',
  style = {},
}: GridProps): JSX.Element => {
  const gridStyle = useGridStyles({ cols, gap, flow });

  return (
    <div className={`${className}`} style={{ ...gridStyle, ...style }}>
      {children}
    </div>
  );
};

// Типы для Item
interface ItemProps {
  /** @param children Дочерние элементы для отображения внутри элемента сетки */
  children: ReactNode;
  /** @param colSpan Количество колонок, занимаемых элементом */
  colSpan?: number;
  /** @param rowSpan Количество строк, занимаемых элементом */
  rowSpan?: number;
  /** @param className Дополнительный CSS-класс */
  className?: string;
  /** @param style Инлайновые стили */
  style?: React.CSSProperties;
}

/**
 * Компонент `Item`
 * @param children Дочерние элементы для отображения внутри элемента сетки
 * @param colSpan Количество колонок, занимаемых элементом
 * @param rowSpan Количество строк, занимаемых элементом
 * @param className Дополнительный CSS-класс
 * @param style Инлайновые стили
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
    padding: '1em',
    ...style,
  };

  return (
    <div className={`${styles.item} ${className}`} style={itemStyle}>
      {children}
    </div>
  );
};
