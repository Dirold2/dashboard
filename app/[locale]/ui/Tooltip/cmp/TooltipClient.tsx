'use client';
import React, { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';

import styles from '../style/tooltip.module.scss';

interface TooltipProps {
  content: string;
  children: JSX.Element;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  visible?: boolean;
}

const TooltipClient: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  visible,
}) => {
  const [showTooltip, setShowTooltip] = useState(visible ?? false);

  useEffect(() => {
    if (visible !== undefined) {
      setShowTooltip(visible);
    }
  }, [visible]);

  return (
    <div
      style={{ cursor: 'pointer' }}
      className={styles.tooltip_container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      <span
        className={`${styles.tooltip} ${
          showTooltip ? styles.tooltip_visible : ''
        } ${styles[`tooltip_${position}`]}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {content}
      </span>
    </div>
  );
};

export default TooltipClient;
