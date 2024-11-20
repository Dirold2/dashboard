"use client";
import { useState } from 'react';
import styles from './style/login.module.css';
import { useTranslations } from "next-intl";
import { signIn } from 'next-auth/react';
import { signInSchema } from '@lib/zod';
import { ZodError } from 'zod';
import { JSX } from 'react/jsx-runtime';

type ValidationErrors = {
    name?: string;
    password?: string;
};

export default function FormLogin(): JSX.Element {
    const t = useTranslations(``);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const formData = { name, password };

        try {
            signInSchema.parse(formData);
            await signIn('credentials', { name, password });
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = Object.fromEntries(
                    Object.entries(error.errors).map(([key, { message }]) => [key, message])
                ) as Record<string, string>;

                setErrors(formattedErrors);
            } else {
                alert('An unexpected error occurred');
            }
        }
    };

    return (
        <div>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <label>
                    {t('Login.Username')}
                    <input
                        className={styles.inputField}
                        name="name"
                        type="text"
                        autoComplete="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    {t('Login.Password')}
                    <input
                        className={styles.inputField}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className={styles.errorText}>{errors.password}</p>}
                </label>
                <button className={styles.button} type="submit">
                    {t(`Login.Login`)}
                </button>
                {errors.name && (
                    <div className='center'>
                        <p className={styles.errorText}>{errors.name}</p>
                    </div>
                )}
            </form>
        </div>
    );
}