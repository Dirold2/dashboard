"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from './style/register.module.css';
import { useTranslations } from "next-intl";
import { UAlertContainer, AlertContainerRef } from '@ui/UAlert';
import { getCookie } from "@cmp/Utils";
import { JSX } from "react/jsx-runtime";

export default function FormRegister(): JSX.Element {
    const t = useTranslations(``);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [error, setError] = useState("");
    const router = useRouter();
    const { status: sessionStatus } = useSession();
    const lang = getCookie('NEXT_LOCALE')
    const alertContainerRef = useRef<AlertContainerRef | null>(null);

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace(`/${lang}`);
        }
    }, [sessionStatus, router, lang]);

    const isValidEmail = (email: string): boolean => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        let isValid = true;

        if (!isValidEmail(email)) {
            alertContainerRef.current?.addAlert(
                'error',
                <span>{t("Error.Emailinvalid")}</span>,
            );
            isValid = false;
        }

        if (!name) {
            alertContainerRef.current?.addAlert(
                'error',
                <span>{t("Error.Logininvalid")}</span>,
            );
            isValid = false;
        }

        if (!password || password.length < 8) {
            alertContainerRef.current?.addAlert(
                'error',
                <span>{t("Error.Passwordlong")}</span>,
            );
            isValid = false;
        }

        if (confirmPassword!== password) {
            alertContainerRef.current?.addAlert(
                'error',
                <span>{t("Error.Passwordsmatch")}</span>,
            );
            isValid = false;
        }

        if (isValid) {
            try {
                const res = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, name, password }),
                });

                if (res.status === 400) {
                    alertContainerRef.current?.addAlert(
                        'error',
                        <span>{t("Error.TemailAlredy")}</span>,
                    );
                } else if (res.status === 200) {
                    router.push(`/${lang}/login`);
                }
            } catch (error) {
                alertContainerRef.current?.addAlert(
                    'error',
                    <span>{t("Error.TryAgain")}</span>,
                );
                console.log(error);
            }
        }
    };

    if (sessionStatus === "loading") {
        return <h1>Loading...</h1>;
    }

    return <>
        {sessionStatus!== "authenticated" && (
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className={styles.label}>{t('Login.EmailAddress')}</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                                className={styles.inputField}
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className={styles.label}>{t('Login.Username')}</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="username"
                                required
                                className={styles.inputField}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className={styles.label}>{t('Login.Password')}</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                className={styles.inputField}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmpassword" className={styles.label}>{t('Login.ConfirmPassword')}</label>
                            <input
                                id="confirmpassword"
                                name="confirmpassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                className={styles.inputField}
                            />
                        </div>

                        <button type="submit" className={styles.button}>{t(`Login.Register`)}</button>
                        <UAlertContainer ref={alertContainerRef} />
                    </form>
                </div>
            </div>
        )}
    </>;
}