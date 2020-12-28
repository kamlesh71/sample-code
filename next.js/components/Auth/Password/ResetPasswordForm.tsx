import React from 'react'
import { Formik, Form } from 'formik';
import { TextField } from 'components/common/Field'
import { Button, Image } from 'react-bootstrap'
import { ResetPasswordSchema } from 'validations/AuthSchema'

import { FormCard } from 'components/common';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD_MUTATION } from 'graphql/mutations/auth';
import { matchValidationErrorCategory } from 'helpers';
import { toast } from 'react-toastify';
import styles from './Password.module.scss';

interface Props {
    email: string,
    code: string,
    onFinish(): void
}

const initialValues = {
    password: '',
    confirmPassword: ''
};

const ResetPasswordForm: React.FC<Props> = ({ email, code, onFinish }) => {

    const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION);

    const handleResetPassword = React.useCallback((values) => {

        resetPassword({
            variables: {
                email,
                code,
                password: values.password
            }
        }).then(({ data }) => {

            const { message } = data.resetPassword;

            toast(message, {
                type: "success"
            });

            onFinish();

        }).catch(err => {

            console.log(err, 'error block');

            if (matchValidationErrorCategory(err, 'password_reset')) {
                toast(err.graphQLErrors[0].message, {
                    type: "error"
                });
            }
        });

    }, [resetPassword, email, code]);

    return (
        <FormCard
            className={'mb-2 pb-4'}
            title="Reset Password"
            subTitle="What password would you like to have?"
        >
            <Formik
                initialValues={initialValues}
                onSubmit={handleResetPassword}
                validationSchema={ResetPasswordSchema}
            >
                <Form className="auth-form">

                    <TextField
                        type="password"
                        placeholder="New Password"
                        icon={<Image src={require('../../../assets/images/icons/lock.svg')} />}
                        size="lg"
                        name="password"
                    />

                    <TextField
                        type="password"
                        placeholder="Confirm New Password"
                        icon={<Image src={require('../../../assets/images/icons/lock.svg')} />}
                        size="lg"
                        name="confirmPassword"
                    />

                    <Button disabled={loading} variant="auth" type="submit" size="lg" className={styles.btnWrapper} block>
                        Reset Password
                    </Button>
                </Form>
            </Formik>
        </FormCard>
    );
}

export default ResetPasswordForm;