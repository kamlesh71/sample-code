import React from 'react'
import { useRouter } from 'next/router'
import { Row, Col, Form, Button } from 'react-bootstrap';
import styles from './ClinicalTrials.module.scss';
import { FaAngleDown } from 'react-icons/fa';
import routes from 'constants/routes';
import { useAuth } from 'hooks';
import { IntendedRedirect, ShowSignUp } from 'graphql/variables';

interface Props {
    title: string
}

const ClinicalTrialsVertical: React.FC<Props> = ({ title }) => {
    return (
        <div className={styles.clinicalTrialsVertical}>
            <h2 className={styles.formHeading}>{title}</h2>
            <Form className={styles.formWrapper}>
                <Form.Group as={Row} controlId="formPlaintextEmail" noGutters>
                    <Form.Label column sm="4" lg={3}>Condition </Form.Label>
                    <Col sm='8' lg={9}>
                        <Form.Control as="select" defaultValue="Please Select" size="sm">
                            <option>Please Select</option>
                            <option>...</option>
                        </Form.Control>
                        <div className={styles.iconWrapper}>
                            <FaAngleDown />
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridState" noGutters>
                    <Form.Label column sm="4" lg={3}>Country </Form.Label>
                    <Col sm='8' lg={9}>
                        <Form.Control as="select" defaultValue="Please Select" size="sm">
                            <option>Please Select</option>
                            <option>...</option>
                        </Form.Control>
                        <div className={styles.iconWrapper}>
                            <FaAngleDown />
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridState" noGutters>
                    <Form.Label column sm="4" lg={3}>City</Form.Label>
                    <Col sm='8' lg={9}>
                        <Form.Control as="select" defaultValue="Please Select" size="sm">
                            <option>Please Select</option>
                            <option>...</option>
                        </Form.Control>
                        <div className={styles.iconWrapper}>
                            <FaAngleDown />
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword" noGutters>
                    <Form.Label column sm="4" lg={3}>
                        Email
                                </Form.Label>
                    <Col sm="8" lg={9}>
                        <Form.Control type="email" placeholder="Enter Email" size="sm" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword" noGutters>
                    <Col sm="4" lg={3}></Col>
                    <Col sm="8" lg={9}>
                        <div className={styles.formButton}>
                            <Button variant="search" type="submit">
                                Start Search
                            </Button>
                        </div>
                    </Col>
                </Form.Group>

            </Form>
        </div>
    )
};

interface Props {
    title: string
}

const ClinicalTrialsHorizontal: React.FC<Props> = ({ title }) => {

    const { activeUser } = useAuth();

    const { push } = useRouter();

    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();

        if (activeUser) {
            push(routes.trialResults);
        } else {
            IntendedRedirect({
                url: routes.trialResults
            });
            ShowSignUp(true)
        }
    }, [push]);

    return (
        <div className={styles.clinicalTrialsHorizontal}>
            <h2 className={styles.formHeading}>{title}</h2>

            <Form className={styles.formWrapper} onSubmit={handleSubmit}>
                <Form.Row className="align-items-center">
                    <Col sm={6} md={3}>
                        <div className={styles.colWrapper}>
                            <Form.Control as="select" defaultValue="Please Select" size="sm">
                                <option>Please Select</option>
                                <option>...</option>
                            </Form.Control>
                            <div className={styles.iconWrapper}>
                                <FaAngleDown />
                            </div>
                        </div>
                    </Col>
                    <Col sm={6} md={3}>
                        <div className={styles.colWrapper}>
                            <Form.Control as="select" defaultValue="Please Select" size="sm">
                                <option>Please Select</option>
                                <option>...</option>
                            </Form.Control>
                            <div className={styles.iconWrapper}>
                                <FaAngleDown />
                            </div>
                        </div>
                    </Col>
                    <Col sm={6} md={3}>
                        <div className={styles.colWrapper}>
                            <Form.Control as="select" defaultValue="Please Select" size="sm">
                                <option>Please Select</option>
                                <option>...</option>
                            </Form.Control>
                            <div className={styles.iconWrapper}>
                                <FaAngleDown />
                            </div>
                        </div>
                    </Col>
                    <Col sm={6} md={3}>
                        <Form.Control type="email" placeholder="Enter Email" size="sm" />
                    </Col>
                </Form.Row>
                <div >
                    <Button variant="search" type="submit" >Start Search</Button>
                </div>
            </Form>

        </div>
    )
};

export { ClinicalTrialsVertical, ClinicalTrialsHorizontal };