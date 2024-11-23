"use client";
// @ui/ONTop/page.tsx

import React, { useState, useEffect } from 'react';
import styles from './style/ontop.module.css';

interface ONTopProps {
    position?: 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';
}

const ONTop: React.FC<ONTopProps> = ({ position = 'bottomRight' }) => {
    const [, setScrollDirection] = useState<'up' | 'down'>('up');
    const [translateY, setTranslateY] = useState('0px');
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        let previousScrollY = 0;
        const handleScroll = (): void => {
            const currentScrollY = window.scrollY;
            const newScrollDirection = currentScrollY > previousScrollY ? 'down' : 'up';

            setScrollDirection(newScrollDirection);
            setTranslateY(newScrollDirection === 'down' ? '0px' : '20px');
            setIsHidden(currentScrollY > 60);

            previousScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return (): void => window.removeEventListener('scroll', handleScroll);
    }, []);

    const positions = {
        topRight: `${styles.ontop} ${styles.top_right}`,
        bottomRight: `${styles.ontop} ${styles.bottom_right}`,
        bottomLeft: `${styles.ontop} ${styles.bottom_left}`,
        topLeft: `${styles.ontop} ${styles.top_left}`,
    };

    return (
        <div
            role="button"
            tabIndex={isHidden ? 0 : -1}
            className={positions[position]}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
                transform: `translateY(${translateY})`,
                opacity: isHidden ? '1' : '0',
                cursor: isHidden ? 'pointer' : 'default'
            }}
        >
            <i className="bi bi-arrow-up" />
        </div>
    );
};

export default ONTop;
