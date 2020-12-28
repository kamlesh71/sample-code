import React from 'react'
import Link from 'next/link'
import { Row, Col, Button } from 'react-bootstrap'
import styles from './UpdateProfileForm.module.scss'
import routes from 'constants/routes'
import { useMutation, useReactiveVar } from '@apollo/client'
import { ActiveUser } from 'graphql/variables'
import { Formik, Form } from 'formik'
import { PhoneInput, TextField } from 'components/common/Field'
import { UPDATE_PROFILE_MUTATION } from 'graphql/mutations/account'
import { UpdateProfileSchema } from 'validations/AccountSchema'
import { toast } from 'react-toastify'
import { getValidationErrors, isValidationError } from 'helpers'
import { useRouter } from 'next/router'

const TOAST_ID = 'UPDATE_PROFILE_TOAST';

const UpdateProfileForm: React.FC = () => {

    const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE_MUTATION);
    const user = useReactiveVar(ActiveUser);
    const router = useRouter();

    const handleSubmit = React.useCallback((values, { setErrors }) => {

        if (toast.isActive(TOAST_ID)) {
            toast.dismiss(TOAST_ID)
        }

        updateProfile({
            variables: values
        }).then(res => {

            const user = res.data.updateProfile;

            ActiveUser(user);

            toast.success('Your profile has been updated successfully!', {
                toastId: TOAST_ID
            })

            router.replace(routes.account.profile);

        }).catch(error => {
            if (isValidationError(error)) {
                setErrors(getValidationErrors(error, 'inputs.'))
            }
        });

    }, [updateProfile]);

    if (!user) {
        return null;
    }

    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        password: '',
        confirmPassword: ''
    }

     
    return (
        <div className={styles.updateProfileForm}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={UpdateProfileSchema}
            >
                {({ values }) => {

                    return (
                        <Form className={'update-form'}>

                            <TextField
                                name="firstName"
                                className="form-control-line"
                                label="First Name"
                            />

                            <TextField
                                name="lastName"
                                className="form-control-line"
                                label="Last Name"
                            />

                            <PhoneInput
                                name="contactNumber"
                                inputStyle="line"
                                label="Contact Number"
                            />

                            <TextField
                                name="password"
                                className="form-control-line"
                                label="Password"
                                type="password"
                                helpText="Enter new password, If you wish to change."
                            />

                            {/* <TextField
                                type="password"
                                name="confirmPassword"
                                className="form-control-line"
                                label="Confirm Password"
                            /> */}

                            {values.password ? (
                                <TextField
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control-line"
                                    label="Confirm Password"
                                />
                            ) : null}

                            <div className={styles.btnWrapper}>
                                <Row className="mx-n2">
                                    <Col xs={'12'} sm={'auto'} className={'pl-4'}>
                                        <Button variant="fontLarge" disabled={loading} type="submit" size="lg">
                                            Update Profile
                                        </Button>
                                    </Col>
                                    <Col className={'pl-4 pl-sm-0 mt-4 mt-sm-0'}>
                                        <Link replace href={routes.account.profile} passHref>
                                            <Button variant="fontLarge" disabled={loading} type="button" size="lg">
                                                Cancel
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
}

export default UpdateProfileForm;