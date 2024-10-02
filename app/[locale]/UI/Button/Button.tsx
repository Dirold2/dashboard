"use client";
import React, { useState } from 'react';
import styles from './style/button.module.css';

type Ripple = {
    id: number;
    left: number;
    top: number;
}

type ButtonProps = {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const horizontalPos = e.clientX - (e.target as HTMLButtonElement).offsetLeft;
        const verticalPos = e.clientY - (e.target as HTMLButtonElement).offsetTop;

        const newRipple = {
            id: Date.now(),
            left: horizontalPos,
            top: verticalPos,
        };

        setRipples([...ripples, newRipple]);

        setTimeout(() => {
            setRipples(ripples.filter(r => r.id !== newRipple.id));
        }, 1000);

        // Call the onClick prop if it's provided
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <button className={styles.rippleBtn} onClick={handleClick}>
            {ripples.map(r => (
                <span key={r.id} style={{ left: r.left + 'px', top: r.top + 'px' }} className="ripple"></span>
            ))}
            {children}
        </button>
    );
};

export default Button;