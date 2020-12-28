import { FormCard } from 'components/common'
import React from 'react'
import { Button } from 'react-bootstrap';
import OtpInput from 'react-otp-input'

import styles from './OTPForm.module.scss'

export const CODE_LENGTH = 6;

interface Props {
    title: string,
    value: string,
    onChange: (value: string) => void
    onRequest: () => void,
    loading?: boolean
}

export const OTPForm: React.FC<Props> = ({ title, value, onChange, onRequest, loading = false }) => {


    return (
        <div className={styles.otpWrapper}>
            <FormCard
                className={styles.heading} title={title}
            >
                <OtpInput
                    numInputs={CODE_LENGTH}
                    onChange={onChange}
                    value={value}
                    isInputNum
                    shouldAutoFocus
                    separator={<span>-</span>}
                    containerStyle={styles.otpContainer}
                />

                <div className={styles.btnWrapper}>
                    <Button
                        variant='auth'
                        type="submit"
                        size="lg"
                        block
                        onClick={onRequest}
                        disabled={loading}
                    >Resend Code</Button>
                </div>

            </FormCard>
        </div>
    )
}