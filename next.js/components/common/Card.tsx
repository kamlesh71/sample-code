import React from 'react'
import classNames from 'classnames'
import { Container, Button, Row, Col, Image, Card } from 'react-bootstrap'

import styles from './Card.module.scss'

interface Props {
    title?: String,
    subTitle?: String,
    footer?: any,
    className? : string
}


export const FormCard: React.FC<Props> = ({ title, subTitle, footer, children, className }) => {

    return (
        <section className={styles.authSection}>
            <Container>
                <Card className={classNames(styles.authCard, 'shadow-card')}>

                    <Card.Body className={styles.cardContent}>
                        {title || subTitle ? (
                            <div className={classNames(styles.authHeading, className)}>
                                <h2>{title}</h2>
                                {subTitle ? <p>{subTitle}</p> : null}
                            </div>
                        ) : null}

                        {children}
                    </Card.Body>

                    {footer ? (
                        <Card.Footer className={styles.authcardFooter}>
                            {footer}
                        </Card.Footer>
                    ) : null}
                </Card>
            </Container>
        </section>
    );
}


export const MessageCard = ({ children }) => {

    return (
        <div className={styles.messageWrapper}>
            <section className={styles.authSection}>
                <Container>
                    <Card className={classNames(styles.authCard, 'shadow-card')}>
                        <Card.Body className={styles.cardContent}>
                            <div className={styles.messageContent}>
                                {children}
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </section>
        </div>
    );
};


export const ProfileCard = ({ children}) => {
    return (
        <div className={styles.userProfile}>
            <section className={styles.userSection}>
                <Container>
                    <Card className={classNames(styles.authCard, 'shadow-card')}>
                        <Card.Body className={styles.cardContent}>
                            {children}     
                        </Card.Body>
                    </Card>
                </Container>
            </section>
        </div>
    );
}