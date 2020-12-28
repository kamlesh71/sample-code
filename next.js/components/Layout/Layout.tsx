import React from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { Navbar, Nav, Button, Container, Row, Col, NavDropdown, Image } from 'react-bootstrap';
import styles from './Layout.module.scss';
import { NavSearch, Newsletter } from 'components/Form';
import classNames from "classnames";
import { FaGoogle, FaTwitter, FaFacebookF, FaLinkedin, FaInstagram } from 'react-icons/fa';
import RegisterLink from 'components/Auth/Register'
import { CookieModel } from 'components/common/CookieModel';
import routes from 'constants/routes'
import { useMutation, useReactiveVar } from '@apollo/client';
import { ActiveUser, IsLoggedIn } from 'graphql/variables';
import { LOGOUT_MUTATION } from 'graphql/mutations/auth';
import { useAuth } from 'hooks';

interface ActiveLinkProps extends LinkProps {
    as: any,
    href: string
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ as: Element, children, href, ...props }) => {

    const router = useRouter();

    const active = router.pathname === href;

    return (
        <Link href={href} {...props}>
            <Element className={classNames({ active })}>{children}</Element>
        </Link>
    )
}

const Layout: React.FC = ({ children }) => {

    const { clearLocalSession } = useAuth();

    const [logout] = useMutation(LOGOUT_MUTATION);

    const user = useReactiveVar(ActiveUser);

    const handleLogout = React.useCallback(() => {
        logout().then(() => {
            clearLocalSession();
        });
    }, []);

    return (
        <div id="app">
            <header className={styles.header}>
                <Container>
                    <Navbar expand="lg" variant="dark">
                        <Link href={routes.home} passHref>
                            <Navbar.Brand className={styles.logo}>
                                <Image src={require("../../assets/images/logo.png?webp")} />
                            </Navbar.Brand>
                        </Link>
                        {/* <div className={classNames(styles.searchXs, 'd-xs-block','d-lg-none')}>
                            <FaSearch/>
                            <NavSearch />
                        </div> */}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" >
                            <div className={classNames(styles.navWrapper, 'd-flex', 'flex-column', 'flex-lg-row', 'align-items-lg-center')}>
                                <Nav className={classNames(styles.navLeft, 'ml-lg-auto', 'order-2', 'order-lg-1')}>
                                    <ActiveLink as={Nav.Link} href={routes.home} passHref>Home</ActiveLink>
                                    <ActiveLink href={routes.about} as={Nav.Link} passHref>About Us</ActiveLink>
                                    {/* <Link href="/contact" passHref>
                                    <Nav.Link>Contact</Nav.Link>
                                    </Link> */}
                                </Nav>

                                <div className={classNames(styles.navSearchWrapper, 'order-1', 'order-lg-2')}>
                                    <NavSearch />
                                </div>

                                <Nav className={classNames(styles.navRight, 'order-3')}>
                                    {user ? (
                                        <div className={classNames(styles.userNav, 'd-flex', 'align-items-lg-center')}>
                                            <NavDropdown title={user.fullName} id="basic-nav-dropdown" className="order-2 order-lg-1">
                                                {user.hasVerifiedEmail ? (
                                                    <>
                                                        <Link href={routes.account.dashboard} passHref>
                                                            <NavDropdown.Item>My Searches</NavDropdown.Item>
                                                        </Link>
                                                        <NavDropdown.Divider />
                                                        <Link href={routes.account.profile} passHref>
                                                            <NavDropdown.Item>My Profile</NavDropdown.Item>
                                                        </Link>
                                                        <NavDropdown.Divider />
                                                    </>
                                                ) : (
                                                        <>
                                                            <Link href={routes.verification.code} passHref>
                                                                <NavDropdown.Item>Account Verification</NavDropdown.Item>
                                                            </Link>
                                                            <NavDropdown.Divider />
                                                        </>
                                                    )}
                                                <NavDropdown.Item as={Button} onClick={handleLogout}>Logout</NavDropdown.Item>
                                            </NavDropdown>
                                            <Link href='/'>
                                                <Nav.Link className={classNames(styles.userImg, 'order-1')}><Image src={user.photoTiny} /></Nav.Link>
                                            </Link>
                                        </div>
                                    ) : (
                                            <>
                                                <Link href={routes.auth.login} passHref>
                                                    <Button variant='secondary' size='lg' >Login</Button>
                                                </Link>
                                                <RegisterLink />
                                            </>
                                        )
                                    }
                                </Nav>
                            </div>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </header>
            <main>
                {children}
            </main>
            <footer className={styles.footer}>
                <div className={classNames(styles.footerMain, 'bg-grey')}>
                    <div className={'container-footer'}>
                        <div className={classNames(styles.footerTop, 'bg-primary')}>
                            <Row noGutters>
                                <Col md={6} lg={4} className={styles.newsletterContent}>
                                    <div className={styles.imgWrapper}>
                                        <Image src={require("../../assets/images/icons/email.svg")} />
                                    </div>
                                    <div className={styles.contentWrapper}>
                                        <h3>Newsletters</h3>
                                        <p>Vestibulum mollis convallis
                                        laoreet. Sed vestibulum lacus
                                            non</p>
                                    </div>
                                </Col>
                                <Col md={6} lg={8}>
                                    <Newsletter />
                                </Col>
                            </Row>
                        </div>

                        <div className={styles.footerMiddle}>
                            <Row>
                                <Col md={6} sm={12}>
                                    <div className={styles.aboutContent}>
                                        <h3>About opyl</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat.</p>
                                    </div>
                                    <div className={styles.socialLinks}>
                                        <ul>
                                            <li>
                                                <Link href={'https://www.facebook.com/OpylAI'}>
                                                    <a className={styles.facebook}><FaFacebookF /></a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={'https://twitter.com/OpylAI'}>
                                                    <a className={styles.twitter}><FaTwitter /></a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={'https://www.linkedin.com/company/34582808'}>
                                                    <a className={styles.linkedin}><FaLinkedin /></a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={'https://www.instagram.com/opylai/'}>
                                                    <a className={styles.instagram}><FaInstagram /></a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col xs={6} md={3}>
                                    <div className={styles.footerMenu}>
                                        <h3>quick links</h3>
                                        <ul>
                                            <li>
                                                <Link href={routes.about}>
                                                    <a>about</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={'#'}>
                                                    <a>guidelines</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={'#'}>
                                                    <a>team</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={'#'}>
                                                    <a>testimonials</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={'#'}>
                                                    <a>blog</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={routes.terms}>
                                                    <a>terms</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={routes.privacyPolicy}>
                                                    <a>privacy</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>

                                <Col xs={6} md={3}>
                                    <div className={styles.footerMenu}>
                                        <h3>resources</h3>
                                        <ul>
                                            <li>
                                                <Link href={'#'}>
                                                    <a>Help</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={'#'}>
                                                    <a>Career</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={routes.faq}>
                                                    <a>FAQ's</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={routes.contactUs}>
                                                    <a>contact us</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={'#'}>
                                                    <a>pricing</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={'#'}>
                                                    <a>podcasts</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div className={'container-footer'}>
                        <Row className={classNames(styles.rowWrapper, 'align-items-center')} noGutters>
                            <Col xs={8} sm={6} md={6} className='order-2 order-sm-1'>
                                <div className={styles.copyright}>
                                    <p>&copy; 2020 Opyl. All rights reserved.</p>
                                </div>
                            </Col>
                            <Col xs={4} sm={6} md={6} className='order-1'>
                                <div className={styles.footerLogo}>
                                    <Link href={routes.home} passHref>
                                        <Image src={require("../../assets/images/logo.png?webp")} />
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </footer>
            <CookieModel />
        </div >
    )
}

export { Layout };