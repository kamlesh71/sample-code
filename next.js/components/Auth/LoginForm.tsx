import React from 'react'
import Link from 'next/link'
import { detect } from 'detect-browser';
import { useRouter } from 'next/router'
import { Button, Image, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik';
import styles from './LoginForm.module.scss'
import { TextField, Checkbox } from 'components/common/Field'
import { LoginSchema } from 'validations/AuthSchema'
import { LOGIN_MUTATION } from 'graphql/mutations/auth'
import { useMutation } from '@apollo/client';
import { matchValidationErrorCategory } from 'helpers'
import routes from 'constants/routes'
import classNames from 'classnames'
import { useAuth } from 'hooks'

import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { SocialButton } from 'components/common'

const initialValues = {
    email: '',
    password: '',
    remember: false
};

const TOAST_ID = 'LOGIN_ERROR';

const browser = detect();

const DEVICE_NAME = browser ? `${browser.name}|${browser.os}` : 'Unknown';

export const LoginForm = () => {

    const [login, { loading }] = useMutation(LOGIN_MUTATION);
    const { replace } = useRouter();
    const { setLoggedIn } = useAuth();

    const handleLogin = React.useCallback((values, { setFieldValue }) => {

        if (toast.isActive(TOAST_ID)) {
            toast.dismiss(TOAST_ID);
        }

        login({
            variables: {
                ...values,
                deviceName: DEVICE_NAME
            }
        }).then(res => {
            const login = res.data.login;
            setLoggedIn(login.user, login.token);
        }).catch(error => {

            if (matchValidationErrorCategory(error, 'login')) {

                setFieldValue('password', '');

                toast('Invalid login credentials.', {
                    toastId: TOAST_ID,
                    type: "error"
                });
            }
        });

    }, [login, replace]);

    const handleSocialLoginSuccess = React.useCallback((result) => {

        console.log('google login result', result);

    }, []);

    const handleSocialLoginFailure = React.useCallback((e) => {
        console.log('google error', e);
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
        >
            <>
                <div className={styles.loginForm}>
                    <Form className={'auth-form'}>

                        <TextField
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            size="lg"
                            icon={<Image src={require('../../assets/images/icons/email-icon.svg')} />}
                        />

                        <TextField
                            type="password"
                            name="password"
                            placeholder="Password"
                            size="lg"
                            icon={<Image src={require('../../assets/images/icons/lock.svg')} />}
                        />

                        <Row className={classNames(styles.checkboxLabel, 'mt-n2')}>
                            <Col xs={12} sm={6} className="text-left">
                                <Checkbox
                                    label="Keep me signed in"
                                    name="remember"
                                />
                            </Col>

                            <Col xs={12} sm={6} className={'text-sm-right mb-1'}>
                                <Link href={routes.auth.forgotPassword}>
                                    <a className="text-secondary">Forgot your password?</a>
                                </Link>
                            </Col>
                        </Row>

                        <Button disabled={loading} variant="auth" type="submit" size="lg" block>
                            Sign In
                    </Button>
                    </Form>
                </div>

                <div className={styles.orWrapper}>
                    <p><span>or </span>you can Sign In with your social media accounts</p>
                </div>

                <div className={styles.socialLinks}>
                    <Row className="mx-n2 align-items-center">
                        <Col xs={12} sm={3} className="px-2">
                            <SocialButton
                                appId="{process.env.NEXT_PUBLIC_FACEBOOK_ID}"
                                provider="facebook"
                                variant="facebook"
                                onLoginSuccess={handleSocialLoginSuccess}
                                onLoginFailure={handleSocialLoginFailure}
                            >
                                <FaFacebookF /> Sign up with Facebook
                            </SocialButton>
                        </Col>

                        <Col xs={12} sm={3} className="px-2">
                            <SocialButton
                                appId={process.env.NEXT_PUBLIC_GOOGLE_ID}
                                onLoginSuccess={handleSocialLoginSuccess}
                                onLoginFailure={handleSocialLoginFailure}
                                provider="google"
                                variant="google"
                            >
                                <FaGooglePlusG /> Sign up with Google
                            </SocialButton>
                        </Col>

                        <Col xs={12} sm={3} className="px-2">
                            <SocialButton
                                appId=""
                                provider="google"
                                variant="twitter"
                                onLoginSuccess={handleSocialLoginSuccess}
                                onLoginFailure={handleSocialLoginFailure}
                            >
                                <FaTwitter /> Sign up with Twitter
                            </SocialButton>
                        </Col>

                        <Col xs={12} sm={3} className="px-2">
                            <SocialButton
                                appId=""
                                provider="linkedin"
                                variant="linkedin"
                                onLoginSuccess={handleSocialLoginSuccess}
                                onLoginFailure={handleSocialLoginFailure}
                            >
                                <FaLinkedinIn /> Sign up with LinkedIn
                            </SocialButton>
                        </Col>
                    </Row>
                </div>
            </>
        </Formik>
    )
}