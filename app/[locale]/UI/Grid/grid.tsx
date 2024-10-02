'use client';

import { ReactNode, CSSProperties, useMemo } from 'react';

type ResponsiveCols = {
  [breakpoint: string]: number;
};

// Расширяем CSSProperties для поддержки медиа-запросов
type ExtendedCSSProperties = React.CSSProperties & {
  [key: string]: React.CSSProperties | string | number;
};

type GridProps = {
  children: ReactNode;
  gridType?: 'fixed' | 'auto';
  cols?: number;
  gap?: string;
  flow?: 'row' | 'column';
  responsiveCols?: ResponsiveCols;
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
  responsiveCols = {},
  transitionDuration = '0.3s',
}: GridProps): JSX.Element => {
  // Использование useMemo для мемоизации стилей
  const gridStyle = useMemo((): ExtendedCSSProperties => {
    const baseStyle: ExtendedCSSProperties = {
      display: 'grid',
      gap,
      gridAutoFlow: flow,
      justifyContent: 'stretch',
      alignItems: 'stretch',
      transition: `all ${transitionDuration} ease`,
    };

    if (gridType === 'fixed') {
      baseStyle.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    } else {
      baseStyle.gridTemplateColumns = `repeat(auto-fill, minmax(${cols}px, 1fr))`;
    }

    // Адаптивные колонки
    Object.entries(responsiveCols).forEach(([breakpoint, value]) => {
      baseStyle[`@media (min-width: ${breakpoint}px)`] = {
        gridTemplateColumns: `repeat(${value}, 1fr)`,
      };
    });

    return baseStyle;
  }, [gridType, cols, gap, flow, responsiveCols, transitionDuration]);

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
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  borderRadius?: string;
  transitionDuration?: string;
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
  // Использование useMemo для оптимизации стилей элемента
  const itemStyle = useMemo((): CSSProperties => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection,
    flexWrap: 'wrap',
    backgroundColor: bgColor || 'var(--background-after)',
    padding,
    textAlign,
    borderRadius,
    gridColumn: span?.col ? `span ${span.col}` : 'auto',
    gridRow: span?.row ? `span ${span.row}` : 'auto',
    transition: `background-color ${transitionDuration} ease`,
    outline: 'none',
  }), [span, bgColor, padding, textAlign, flexDirection, borderRadius, transitionDuration]);

  return (
    <span style={itemStyle}>
      {children}
    </span>
  );
};
