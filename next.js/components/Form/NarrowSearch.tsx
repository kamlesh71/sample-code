import React from 'react';
import { Form, FormControl, Button, Col } from 'react-bootstrap';
import { useRouter } from 'next/router'
import styles from './NarrowSearch.module.scss';

export const NarrowSearch = () => {

    const { push } = useRouter();

    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();

        push('/trials-results')
    }, [push]);

    return (
        <Form className={styles.narrowSearchForm} onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Name *</Form.Label>
                <Form.Control type="text" size="lg" />
            </Form.Group>

            <Form.Group controlId="age">
                <Form.Label>Age *</Form.Label>
                <Form.Control type="number" size="lg" />
            </Form.Group>

            <Form.Group controlId="gender">
                <Form.Label>Gender *</Form.Label>
                <Form.Control type="text" size="lg" />
            </Form.Group>

            <Form.Group controlId="diagnosedNumber">
                <Form.Label>How long ago were you diagnosed? *</Form.Label>
                <Form.Control type="text" size="lg" />
            </Form.Group>

            <Form.Group controlId="conditionName">
                <Form.Label>Exact name of condition *</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="trialInfo">
                <Form.Label>Have you been informed about any trials from your GP or specialist? *</Form.Label>
                <Form.Control type="text" size="lg" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Have you been involved in any other clinical trials? *</Form.Label>
                <Form.Control type="text" size="lg" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Information x *</Form.Label>
                <Form.Control type="text" size="lg" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Information y</Form.Label>
                <Form.Control type="text" size="lg" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Address *</Form.Label>
                <Form.Control type="text" size="lg" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Phone number *</Form.Label>
                <Form.Control type="tel" size="lg" />
            </Form.Group>

            <div className={styles.formButton}>
                <Button variant="secondary" type="submit" size="lg">
                    Submit information to our trial research team
                </Button>
            </div>
        </Form>
    )
}
