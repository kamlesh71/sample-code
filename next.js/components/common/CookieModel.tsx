import Link from 'next/link';
import React from 'react'
import classNames from 'classnames'
import { useCookies } from 'react-cookie'
import { Button, Col, Row } from 'react-bootstrap';

import styles from './CookieModel.module.scss'

const COOKIE_POLICY = 'cookie-policy-reviewed';

export const CookieModel = () => {

    const [cookies, setCookie] = useCookies([COOKIE_POLICY]); 

    const [ visible, setVisible ] = React.useState(false);


    React.useEffect(() => {

        const isCookiePolicyReviewed = cookies.hasOwnProperty(COOKIE_POLICY);

        let interval = null;

        if (! isCookiePolicyReviewed) {
            interval = setTimeout(() => {
                setVisible(true)
            }, 5000);
        }

        return () => {
            if (interval !== null) {
                clearTimeout(interval);
            }
        };
    }, []);

    const handleHide = React.useCallback(() => {
        setVisible(false);
        setCookie(COOKIE_POLICY, 1);
    }, [setVisible, setCookie]);

    if (! visible) {
        return null;
    }

    return (
        <div className={classNames(styles.cookieWrapper)}>
           
            <p>This website uses cookies to ensure you get the best experience on our website. By continuing to use this site you are giving us your consent to do this.</p>

            <Row className="align-items-center">
                <Col>
                    <Link href={'/privacy-policy'}>
                        <a>Learn More</a>
                    </Link>
                </Col>
                <Col className={'text-sm-right mt-3 mt-sm-0'}>
                    <Button onClick={handleHide} variant="secondary" block>Got It</Button>
                </Col>

            </Row>
        </div>
    )
};