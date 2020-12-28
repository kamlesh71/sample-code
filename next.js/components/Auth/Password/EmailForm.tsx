import { useMutation } from '@apollo/client'
import { FORGOT_PASSWORD_MUTATION } from 'graphql/mutations/auth'
import React from 'react'
import Link from 'next/link'
import { Formik, Form } from 'formik';
import { TextField } from 'components/common/Field'
import { Button, Image } from 'react-bootstrap'
import { ForgotPasswordSchema } from 'validations/AuthSchema'

import { FormCard } from 'components/common';
import routes from 'constants/routes';

import styles from './Password.module.scss'
import { toast } from 'react-toastify';

const initialValues = {
    email: '',
};

interface Props {
    onFinish(email: string): void
}

const EmailForm: React.FC<Props> = ({ onFinish }) => {

    const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD_MUTATION);

    const handleForgotPassword = React.useCallback((values) => {

        forgotPassword({
            variables: values
        }).then(res => {

            toast(res.data.forgotPassword.message, {
                type: res.data.forgotPassword.success ? "success" : "error"
            });

            if (res.data.forgotPassword.success) {
                onFinish(values.email);
            }

        }).catch(error => {
            console.log(error);
        });

    }, [forgotPassword]);

    return (
        <FormCard
            className={'mb-2 pb-4'}
            title="Forgot Password"
            subTitle="Password reset code will be sent to your email."
        >
            <Formik
                initialValues={initialValues}
                onSubmit={handleForgotPassword}
                validationSchema={ForgotPasswordSchema}
            >
                <Form className={'auth-form'}>

                    <TextField
                        type="email"
                        placeholder="Email Address"
                        icon={<Image src={require('../../../assets/images/icons/email-icon.svg')} />}
                        size="lg"
                        name="email"
                    />

                    <Button
                        disabled={loading}
                        variant="auth"
                        type="submit"
                        size="lg"
                        block
                    >
                        Submit
                    </Button>
                </Form>
            </Formik>

            <div className={styles.SigninLink}>
                <p>Do you have your password?
                        <Link href={routes.auth.login}>
                        <a> Sign In</a>
                    </Link>
                </p>
            </div>
        </FormCard>
    );
}

export default EmailForm;