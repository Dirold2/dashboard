"use client";
import { GithubAuthentication, DiscordAuthentication } from '@ui/Button';
import { FormLogin, FormRegister } from '@cmp/Form';
import { Grid, Item } from '@ui/Grid';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import React from 'react';
import { JSX } from 'react/jsx-runtime';

function ClientComponent(): JSX.Element {
    const t = useTranslations(``);
    
    const [isRegistered, setIsRegistered] = useState(false);

    const toggleRegister = (): void => setIsRegistered(!isRegistered);

    return (
        <>
            <main className="center">
                <div style={{width: `100%`}}>
                    {isRegistered ? <FormRegister /> : <FormLogin />}

                    <hr />
                    <div className="center">
                        <button onClick={toggleRegister}>
                            {isRegistered ? t(`Login.Login`) : t(`Login.Register`)}
                        </button>
                    </div>
                </div>
            </main>
            <main className="center">
                <Grid flow="column">
                    <Item>
                        <GithubAuthentication />
                        <DiscordAuthentication />
                    </Item>
                </Grid>
            </main>
        </>
    );
}

export default ClientComponent;