import React from 'react'
import { Col, Form, Button } from 'react-bootstrap';
import styles from './Newsletter.module.scss';


const Newsletter = () => {
    return (
        <div className={styles.newsletterForm}>
            <Form>
                <Form.Row className={styles.itemBottom}>
                    <Form.Group as={Col} sm={6} lg={5}>
                        <div className={styles.fieldWrapper}>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" size="lg" />
                        </div>
                    </Form.Group>

                    <Form.Group as={Col} sm={6} lg={5}>
                        <div className={styles.fieldWrapper}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" size="lg" />
                        </div>
                    </Form.Group>

                    <Form.Group as={Col} md={12} lg={2}>
                        <Button variant="secondary" type="submit" size="lg">
                            Submit
                        </Button>
                    </Form.Group>

                </Form.Row>
            </Form>
        </div>
    )
};

export { Newsletter };