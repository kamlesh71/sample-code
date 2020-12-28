import { useField, useFormikContext } from 'formik';
import React from 'react'
import classnames from 'classnames'
import { FormControlProps, Form } from 'react-bootstrap'
import RNPhoneInput from 'react-phone-number-input'
import styles from './Field.module.scss';

interface Props extends FormControlProps {
    label?: String,
    icon?: any,
    name: string,
    fieldWrapperClasses?: String,
    containerClass?: String,
    helpText?: string,
    placeholder?: String
    inputStyle?: "line" | "default"
}

interface FieldProps extends Props {
    InputComponent: any
}

const Field: React.FC<FieldProps> = ({ label, icon, fieldWrapperClasses, containerClass, helpText, InputComponent, ...props }) => {

    const [field, meta] = useField({
        name: props.name
    });

    return (
        <Form.Group className={classnames(containerClass)} controlId={props.name}>
            <div className={classnames(styles.fieldWrapper, fieldWrapperClasses)}>
                {label ? <Form.Label>{label}</Form.Label> : null}
                <div className={classnames(styles.inputWrapper, icon ? styles.hasIcon : '')}>
                    {icon}
                    <InputComponent
                        {...field}
                        {...props}
                        isInvalid={meta.touched && !!meta.error}
                    />
                </div>

                {helpText ? (
                    <Form.Text className="text-muted">
                        {helpText}
                    </Form.Text>
                ) : null}

                {meta.touched && meta.error ? (
                    <div className="invalid-feedback" style={{ display: 'block' }}>
                        {meta.error}
                    </div>
                ) : null}
            </div>
        </Form.Group>
    )
}

export const TextField: React.FC<Props> = (props) => {

    return (
        <Field
            {...props}
            InputComponent={Form.Control}
        />
    )
};

interface PhoneInputProps extends Props {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ label, icon, fieldWrapperClasses, containerClass, inputStyle = "default", inputProps = {}, ...props }) => {

    const { setFieldValue } = useFormikContext();

    const [field, meta] = useField({
        name: props.name
    });

    const isInvalid = meta.touched && meta.error;

    const inputClasses = classnames(inputProps.className, styles.phoneInput, {
        [styles.phoneInputDefault]: inputStyle === "default",
        [styles.phoneLineInput]: inputStyle === "line",
        [styles.invalidPhoneInput]: isInvalid,
        "form-control": true,
    })

    
    const inputWrapperClasses = classnames(styles.phoneInputWrapper, {
        [styles.phoneInputWrapperDefault]: inputStyle === "default",
        [styles.phoneLineWrapperInput]: inputStyle === "line",
        [styles.invalidPhoneInputWrapper]: isInvalid
    });

    return (
        <Form.Group className={classnames(containerClass)} controlId={props.name}>
            {label ? <Form.Label>{label}</Form.Label> : null}
            <div className={styles.fieldWrapper}>
                <div className={classnames(styles.inputWrapper, styles.HasIcon, inputWrapperClasses)}>
                    {icon}
                    <RNPhoneInput
                        {...field}
                        onChange={value => setFieldValue(props.name, value || '')}
                        value={field.value}
                        defaultCountry="AU"
                        international
                        numberInputProps={{
                            placeholder: props.placeholder,
                            ...inputProps,
                            className: inputClasses
                        }}
                    />
                </div>
                {isInvalid ? (
                    <div className="invalid-feedback" style={{ display: 'block' }}>
                        {meta.error}
                    </div>
                ) : null}
            </div>
        </Form.Group>
    )
}

interface CheckboxProps {
    label: string,
    name: string
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {

    const [field, meta, helpers] = useField({
        name: props.name
    });

    return (
        <Form.Check
            {...field}
            type={"checkbox"}
            id={props.name}
            label={label}
            checked={field.value}
            inline
        />
    )
};

