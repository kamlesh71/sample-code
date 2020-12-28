import React from 'react'
import { useRouter } from 'next/router'
import EmailForm from './EmailForm'
import OTPForm from './OTPForm';
import ResetPassword from './ResetPasswordForm'
import routes from 'constants/routes';

const Password = () => {

    const router = useRouter();

    const [step, setStep] = React.useState(1);
    const [email, setEmail] = React.useState('');
    const [ code, setCode ] = React.useState('');

    const handleOpenStep2 = React.useCallback((email) => {
        setEmail(email);
        setStep(2);
    }, [setEmail, setStep]);

    const handleOpenStep3 = React.useCallback((code) => {
        setCode(code);
        setStep(3);
    }, [setStep, setCode]);

    const handleFinish = React.useCallback(() => {
        router.replace(routes.auth.login);
    }, [router]);

    if (step === 2) {
        return (
            <OTPForm
                email={email}
                onFinish={handleOpenStep3}
            />
        )
    }

    if (step === 3) {
        return <ResetPassword email={email} code={code} onFinish={handleFinish} />
    }

    return (
        <EmailForm
            onFinish={handleOpenStep2}
        />
    )
}

export default Password;