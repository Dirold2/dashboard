// @ui/Skeleton/Skeleton.tsx

import React from 'react';

import styles from './style/skeleton.module.scss';

interface SkeletonProps {
  width?: string;
  height?: string;
  circle?: boolean;
  pulse?: boolean;
  waveLines?: boolean;
  backgroundColor?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '100%',
  circle = false,
  pulse = true,
  waveLines = true,
  backgroundColor = 'var(--background-before)',
}) => {
  const skeletonClass = circle ? styles.circle : styles.rectangle;
  const animationClassPulse = pulse ? styles.pulse : '';
  const animationClassWaveLines = waveLines ? styles.waveLines : '';

  return (
    <div
      className={`${styles.skeleton} ${skeletonClass} ${animationClassPulse} ${animationClassWaveLines}`}
      style={{ width, height, backgroundColor: backgroundColor }}
    />
  );
};

export default Skeleton;
