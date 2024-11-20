import { FormRegister } from "@cmp/Form";
import { Metadata } from "next";
import { JSX } from "react/jsx-runtime";

export const metadata: Metadata = {
    title: 'Register',
};

const RegisterPage = (): JSX.Element => {

    return (
        <main>
            <FormRegister />
        </main>
    );
};

export default RegisterPage;