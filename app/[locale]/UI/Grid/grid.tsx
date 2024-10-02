'use client';

import { ReactNode, CSSProperties } from 'react';

type ResponsiveCols = {
  [key: string]: number;
};

type GridProps = {
  children: ReactNode;
  gridType?: 'fixed' | 'auto';
  cols?: number;
  gap?: string;
  flow?: 'row' | 'column';
  responsiveCols?: ResponsiveCols;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  transitionDuration?: string;
};

/**
 * Компонент `Grid` создает сетку с возможностью настройки стилей и макета.
 *
 * @param {Object} props - Объект свойств компонента.
 * @param {ReactNode} props.children - Содержимое сетки.
 * @param {'fixed' | 'auto'} [props.gridType='auto'] - Тип сетки: фиксированная или авто-заполняемая.
 * @param {number} [props.cols=100] - Количество колонок или ширина колонок в пикселях.
 * @param {string} [props.gap='20px'] - Расстояние между элементами сетки.
 * @param {'row' | 'column'} [props.flow='row'] - Поток расположения элементов.
 * @param {ResponsiveCols} [props.responsiveCols={}] - Набор адаптивных стилей для различных разрешений.
 * @param {number} [props.xs] - Количество колонок для самого маленького разрешения.
 * @param {number} [props.sm] - Количество колонок для маленького разрешения.
 * @param {number} [props.md] - Количество колонок для среднего разрешения.
 * @param {number} [props.lg] - Количество колонок для большого разрешения.
 * @param {number} [props.xl] - Количество колонок для самого большого разрешения.
 * @param {string} [props.transitionDuration='0.3s'] - Длительность перехода при изменении стилей.
 *
 * @returns {JSX.Element} Элемент сетки с заданными стилями и содержимым.
 */
export const Grid = ({
  children,
  gridType = 'auto',
  cols = 100,
  gap = '20px',
  flow = 'row',
  xs,
  sm,
  md,
  lg,
  xl,
  transitionDuration = '0.3s',
}: GridProps): JSX.Element => {
  const gridStyle: CSSProperties & Record<string, unknown> = {
    display: 'grid',
    gap,
    gridAutoFlow: flow,
    justifyContent: 'stretch',
    alignItems: 'stretch',
    transition: `background-color ${transitionDuration} ease`,
  };

  if (gridType === 'fixed') {
    gridStyle.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  } else {
    gridStyle.gridTemplateColumns = `repeat(auto-fill, minmax(${cols}px, 1fr))`;
  }

  // Адаптивные колонки
  Object.entries({ xs, sm, md, lg, xl }).forEach(([breakpoint, cols]) => {
    gridStyle[`@media (minWidth: ${breakpoint}px)`] = {
      gridTemplateColumns: `repeat(auto-fill, minmax(${cols}px, 1fr))`,
    };
  });

  return <div style={gridStyle}>{children}</div>;
};

type SpanProps = {
  col?: number;
  row?: number;
};

type ItemProps = {
  children: ReactNode;
  span?: SpanProps;
  bgColor?: string;
  padding?: string;
  textAlign?: 'left' | 'center' | 'right';
  flexDirection?: `row` | `row-reverse` | `column` | `column-reverse`,
  borderRadius?: string;
  transitionDuration?: string;
  onFocusBgColor?: string;
  onActiveBgColor?: string;
  onHoverBgColor?: string;
};


/**
 * Компонент `Item` создает элемент сетки с возможностью настройки стилей.
 *
 * @param {Object} props - Объект свойств компонента.
 * @param {ReactNode} props.children - Содержимое элемента сетки.
 * @param {SpanProps} [props.span] - Объект с информацией о количестве колонок и строк, которые должен занимать элемент.
 * @param {string} [props.bgColor] - Цвет фона элемента сетки.
 * @param {string} [props.padding='var(--other-padding)'] - Отступ внутри элемента сетки.
 * @param {'left' | 'center' | 'right'} [props.textAlign='center'] - Выравнивание текста внутри элемента сетки.
 * @param {string} [props.borderRadius='var(--border-radius)'] - Радиус скругления границ элемента сетки.
 * @param {string} [props.transitionDuration='0.3s'] - Длительность перехода при изменении стилей.
 * @param {'column' | 'column-reverse' | 'row' | 'row-reverse'} [props.flexDirection='row'] - Направление элементов внутри элемента сетки.
 * @param {'flex-start' | 'center' | 'flex-end'} [props.alignItems='center'] - Выравнивание элементов внутри элемента сетки по вертикали.
 * @param {'flex-start' | 'center' | 'flex-end'} [props.justifyContent='center'] - Выравнивание элементов внутри элемента сетки по горизонтали.
 *
 * @returns {JSX.Element} Элемент сетки с заданными стилями и содержимым.
 */
export const Item = ({
  children,
  span,
  bgColor,
  padding = 'var(--other-padding)',
  textAlign = 'center',
  flexDirection = 'row',
  borderRadius = 'var(--border-radius)',
  transitionDuration = '0.3s',
}: ItemProps): JSX.Element => {
  const ItemStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: flexDirection || 'row',
    flexWrap: 'wrap',
    backgroundColor: bgColor || 'var(--background-after)',
    padding,
    textAlign,
    borderRadius,
    gridColumn: span?.col ? `span ${span.col}` : 'auto',
    gridRow: span?.row ? `span ${span.row}` : 'auto',
    transition: `background-color ${transitionDuration} ease`,
    outline: 'none',
  };

  return (
    <span
      style={ItemStyle}
    >
      {children}
    </span>
  );
};