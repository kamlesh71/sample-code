import React from 'react'

import { OTPForm, CODE_LENGTH } from 'components/Form/OTPForm';
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD_MUTATION, VALIDATE_PASSWORD_CODE_MUTATION } from 'graphql/mutations/auth';
import { toast } from 'react-toastify';

interface Props {
    email: string,
    onFinish(code: string): void
}

const OTP_TOAST = 'OTP_TOAST';
const VALIDATE_OTP_TOAST = 'VALIDATE_OTP_TOAST';

const EnterOTP: React.FC<Props> = ({ email, onFinish }) => {

    const [validateCode, { loading: validating }] = useMutation(VALIDATE_PASSWORD_CODE_MUTATION);
    const [resendCode, { loading: resending }] = useMutation(FORGOT_PASSWORD_MUTATION);

    const [code, setCode] = React.useState('');

    const handleChangeOTP = React.useCallback((code) => {

        setCode(code);

        if (toast.isActive(VALIDATE_OTP_TOAST)) {
            toast.dismiss(VALIDATE_OTP_TOAST)
        }

        if (code.length === CODE_LENGTH) {

            validateCode({
                variables: {
                    email,
                    code
                }
            }).then(res => {

                setCode('');

                const { success, message } = res.data.validatePasswordCode;

                if (! success) {
                    toast(message, {
                        type: 'error',
                        toastId: VALIDATE_OTP_TOAST
                    });
                }
                
                if (success) {
                    onFinish(code);
                }

            }).catch(error => {
                console.log('error', error)
            });

        }
    }, [setCode, email]);

    const handleRequestNewCode = React.useCallback(() => {

        if (toast.isActive(OTP_TOAST)) {
            toast.dismiss(OTP_TOAST);
        }

        resendCode({
            variables: {
                email
            }
        }).then(res => {

            const { success, message } = res.data.forgotPassword;

            toast(message, {
                type: success ? "success" : "error",
                toastId: OTP_TOAST
            });

        }).catch(error => {

        });

    }, [resendCode, email]);

    return (
        <OTPForm
            title="Enter code sent on your email."
            onChange={handleChangeOTP}
            onRequest={handleRequestNewCode}
            value={code}
            loading={validating || resending}
        />
    )
}

export default EnterOTP;
