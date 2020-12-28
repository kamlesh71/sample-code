import React from 'react'
import { SectionHeading } from 'components/common'
import { Container, Form, Button, Col } from 'react-bootstrap'
import styles from './TrialsResultNotFound.module.scss'
import Select from 'react-select'
import classNames from 'classnames'

const AdvanceSearch: React.FC = () => {
    return (
        <>

            <section className={classNames(styles.advanceSearch, 'pb-1')}>
                <Container>
                    <div className={styles.heading}>
                        <h2>We couldn't find your your Clinical Trial in our DB.</h2>
                        <h3>We will advise you on the trial when it is available.</h3>
                    </div>

                    <h4>
                        Please Enter details below so we can provide you better results.
                    </h4>

                    <div className={styles.formWrapper}>
                        <Form className={styles.advanceSearchForm}>
                            <Form.Row>
                                <Form.Group as={Col} md={'6'}>
                                    <Form.Label>Clinical Trial Name *</Form.Label>
                                    <Select
                                        isMulti
                                        theme={theme => ({
                                            ...theme,
                                            borderRadius: 0,
                                            colors: {
                                            ...theme.colors,                        
                                            primary: ' #4f4883',
                                            },
                                        })}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md={'6'}>
                                    <Form.Label>Condition *</Form.Label>
                                    <Select
                                        isMulti
                                        theme={theme => ({
                                            ...theme,
                                            borderRadius: 0,
                                            colors: {
                                            ...theme.colors,                        
                                            primary: ' #4f4883',
                                            },
                                        })}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md={'6'}>
                                    <Form.Label>Type of Clinical Trial *</Form.Label>
                                    <Select
                                        isMulti
                                        theme={theme => ({
                                            ...theme,
                                            borderRadius: 0,
                                            colors: {
                                            ...theme.colors,                        
                                            primary: ' #4f4883',
                                            },
                                        })}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md={'6'}>
                                    <Form.Label>Clinical Trial Location Center *</Form.Label>
                                    <Select
                                        isMulti
                                        theme={theme => ({
                                            ...theme,
                                            borderRadius: 0,
                                            colors: {
                                            ...theme.colors,                        
                                            primary: ' #4f4883',
                                            },
                                        })}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <div className={styles.formButton}>
                                <Button variant="secondary" type="submit" size="lg">
                                    Submit Information
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Container>
            </section>
    
        </>
    );
}

export default AdvanceSearch;