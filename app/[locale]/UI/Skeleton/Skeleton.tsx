// @ui/Skeleton/Skeleton.tsx

import React from 'react';
import styles from './style/skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  circle?: boolean;
  pulse?: boolean;
  waveLines?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '100%',
  circle = false,
  pulse = true,
  waveLines = true,
}) => {
  const skeletonClass = circle ? styles.circle : styles.rectangle;
  const animationClassPulse = pulse ? styles.pulse : '';
  const animationClassWaveLines = waveLines ? styles.waveLines : '';

  return (
    <div
      className={`${styles.skeleton} ${skeletonClass} ${animationClassPulse} ${animationClassWaveLines}`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
