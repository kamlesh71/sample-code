import React from 'react'
import Link from 'next/link'
import { detect } from 'detect-browser';
import * as yup from 'yup'
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router'
import { Modal, Button, Row, Col, Image, Card, CardDeck } from 'react-bootstrap'

import { TextField, PhoneInput } from 'components/common/Field'
import styles from './Register.module.scss'
import { useMutation, useReactiveVar } from '@apollo/client';
import { REGISTER_MUTATION } from 'graphql/mutations/auth'
import { isValidationError, getValidationErrors } from 'helpers'

import { CompanySchema, RegisterSchema } from 'validations/AuthSchema'
import routes from 'constants/routes';
import { useAuth } from 'hooks';

import classNames from 'classnames';

import { SocialButton } from 'components/common'
import { FaBuilding, FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaTwitter, FaUser } from 'react-icons/fa';
import { ShowSignUp } from 'graphql/variables';

const emptySchema = yup.object().shape({

});

const browser = detect();

const DEVICE_NAME = browser ? `${browser.name}|${browser.os}` : 'Unknown';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: ''
};

const selectorInitialValues = {
    company: ''
};

function RegisterLink() {

    const showSignUp = useReactiveVar(ShowSignUp);

    const [isCompany, setIsCompany] = React.useState(true);
    const [showSelector, setShowSelector] = React.useState(false);
    const [registerValues, setRegisterValues] = React.useState({});

    const setErrorRef = React.useRef(f => f);

    const [register, { loading }] = useMutation(REGISTER_MUTATION);

    const { push } = useRouter();

    const { setLoggedIn } = useAuth();

    const handleSignUp = React.useCallback((values, { setErrors }) => {

        register({
            variables: {
                ...registerValues,
                company: values.company,
                deviceName: DEVICE_NAME
            }
        }).then(res => {

            setLoggedIn(res.data.register.user, res.data.register.token);
            push(routes.verification.code);

        }).catch(error => {

            if (isValidationError(error)) {
                setErrorRef.current(getValidationErrors(error, 'inputs.'))
                setShowSelector(false);
            }
        });

    }, [register, registerValues, push, setLoggedIn]);

    const handleLogin = React.useCallback(() => {
        handleHide();
        push(routes.auth.login);
    }, []);

    const handleContinue = React.useCallback((values, { setErrors }) => {

        setErrorRef.current = setErrors;

        setRegisterValues(values);
        setShowSelector(true);
    }, [setShowSelector, setRegisterValues, setErrorRef]);

    const handleHide = React.useCallback(() => {
        ShowSignUp(false);
    }, [ShowSignUp]);

    const handleResetAll = React.useCallback(() => {
        setShowSelector(false);
        setRegisterValues({});
    }, [setRegisterValues, setShowSelector]);

    return (
        <>
            <Button variant="secondary" onClick={() => ShowSignUp(true)} size="lg">
                Register
            </Button>

            <div className={styles.registerWrapper}>

                <Modal
                    onExited={handleResetAll}
                    show={showSignUp}
                    onHide={handleHide}
                    size="lg"
                    aria-labelledby="register-modal"
                    centered
                    className={styles.registerModal}
                >
                    <div className={styles.registerLayout}>

                        <div className={classNames(styles.registerTabLayout, { 'd-none': !showSelector })}>
                            <Modal.Header closeButton className={styles.modalHeader}>
                                <Modal.Title
                                    id="register-modal"
                                    className={styles.modalHeading}
                                >
                                    <h1>Welcome to Opyl</h1>
                                    <h2>Choose your account type to proceed</h2>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className={styles.tabWrapper}>
                                    <CardDeck className="mx-2">
                                        <Card onClick={() => setIsCompany(true)} className={classNames(isCompany ? styles.tabActive : '', "text-center", " bg-secondary", "mx-3")} >
                                            <Card.Body>
                                                <div className={styles.iconWrapper}>
                                                    <FaBuilding />
                                                </div>
                                                <div className={styles.contentWrapper}>
                                                    <h4>Company</h4>
                                                    <p>You are here because you want to Opyl to recruit for your clinical trial</p>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        <Card onClick={() => setIsCompany(false)} className={classNames(!isCompany ? styles.tabActive : '', "text-center", " bg-secondary", "mx-3")}>
                                            <Card.Body>
                                                <div className={styles.iconWrapper}>
                                                    <FaUser />
                                                </div>
                                                <div className={styles.contentWrapper}>
                                                    <h4>Participant</h4>
                                                    <p>You are here because you want to be recruited to a clinical trial</p>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </CardDeck>
                                </div>

                                <Formik
                                    initialValues={selectorInitialValues}
                                    onSubmit={handleSignUp}
                                    validationSchema={isCompany ? CompanySchema : emptySchema}
                                >
                                    <Form className={'auth-form'}>

                                        {isCompany ? (
                                            <>
                                                <label>Please enter your company name</label>

                                                <TextField
                                                    icon={<Image src={require('../../assets/images/icons/email-icon.svg')} />}
                                                    name="company"
                                                    size="lg"
                                                    placeholder="Company Name"
                                                />
                                            </>
                                        ) : null}

                                        <Button disabled={loading} variant="auth" type="submit" size="lg" block>
                                            Proceed to creating your account
                                                </Button>
                                    </Form>
                                </Formik>
                            </Modal.Body>
                        </div>

                        <div className={classNames(styles.registerFormWrapper, { 'd-none': showSelector })}>

                            <Modal.Header closeButton className={styles.modalHeader}>
                                <Modal.Title
                                    id="register-modal"
                                    className={styles.modalHeading}
                                >
                                    <h1>Sign up to Opyl</h1>
                                    <h2>Please register to see your search results.</h2>
                                    <p className={'d-flex align-items-center justify-content-center'}>Already have account?
                                            <Button className="py-0 px-0 ml-1" variant="link" onClick={handleLogin}>Sign in here</Button>
                                    </p>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={RegisterSchema}
                                    onSubmit={handleContinue}
                                >
                                    <Form className={'auth-form'}>
                                        <Row>
                                            <Col sm={6}>
                                                <TextField
                                                    icon={<Image src={require('../../assets/images/icons/name.svg')} />}
                                                    name="firstName"
                                                    size="lg"
                                                    placeholder="First Name"
                                                />
                                            </Col>

                                            <Col sm={6}>
                                                <TextField
                                                    icon={<Image src={require('../../assets/images/icons/name.svg')} />}
                                                    name="lastName"
                                                    size="lg"
                                                    placeholder="Last Name"
                                                />
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col sm={6} className={styles.colWrapper}>
                                                <TextField
                                                    icon={<Image src={require('../../assets/images/icons/email-icon.svg')} />}
                                                    name="email"
                                                    size="lg"
                                                    placeholder="Email"
                                                    type="email"
                                                />
                                            </Col>

                                            <Col sm={6}>
                                                <PhoneInput
                                                    placeholder="Contact Number"
                                                    name="contactNumber"
                                                    className="phone-input-input"
                                                />
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col sm={6}>
                                                <TextField
                                                    icon={<Image src={require('../../assets/images/icons/lock.svg')} />}
                                                    name="password"
                                                    size="lg"
                                                    placeholder="Password"
                                                    type="password"
                                                />
                                            </Col>

                                            <Col sm={6}>
                                                <TextField
                                                    icon={<Image src={require('../../assets/images/icons/lock.svg')} />}
                                                    name="confirmPassword"
                                                    size="lg"
                                                    placeholder="Confirm Password"
                                                    type="password"
                                                />
                                            </Col>
                                        </Row>

                                        <div>
                                            <p>The password must be at least one uppercase/lowercase letters, one number, one special character and minimum 8 characters long.</p>
                                        </div>

                                        <Button disabled={loading} variant="auth" type="submit" size="lg" block>
                                            Create Account
                                            </Button>

                                        <div>
                                            <p>
                                                <span className="mr-1">By signing up, you agree to our</span>
                                                <Link href={routes.terms}><a target="_blank">T&amp;C</a></Link> <span className="mr-1">and</span>
                                                <Link href={routes.privacyPolicy}><a target="_blank">Privacy Policy</a></Link>
                                            </p>
                                        </div>
                                    </Form>
                                </Formik>

                                <div className={styles.orWrapper}>
                                    <h3>or</h3>
                                </div>

                                <div className={styles.socialLinks}>
                                    <Row className="mx-n2 align-items-center">
                                        <Col xs={12} sm={3} className="px-2">
                                            <SocialButton
                                                appId=""
                                                provider="facebook"
                                                variant="facebook"
                                            >
                                                <FaFacebookF /> Sign up with Facebook
                                                </SocialButton>
                                        </Col>

                                        <Col xs={12} sm={3} className="px-2">
                                            <SocialButton
                                                appId=""
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
                                            >
                                                <FaTwitter /> Sign up with Twitter
                                                </SocialButton>
                                        </Col>

                                        <Col xs={12} sm={3} className="px-2">
                                            <SocialButton
                                                appId=""
                                                provider="linkedin"
                                                variant="linkedin"
                                            >
                                                <FaLinkedinIn /> Sign up with LinkedIn
                                            </SocialButton>
                                        </Col>
                                    </Row>
                                </div>
                            </Modal.Body>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default RegisterLink;