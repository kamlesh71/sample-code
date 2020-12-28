import React from 'react'
import { Container } from 'react-bootstrap';
import styles from './PageBanner.module.scss';
import classnames from 'classnames'
import { ClinicalTrialsHorizontal } from 'components/Form';

interface Props {
    backgroundImage: any 
    title: string
    children?: any
    className? : string
}

export const HomeBanner: React.FC = () => {
    return (
        <section className={classnames(styles.HomePageBanner, styles.pageBanner)}>
            <Container>
                <div className={styles.contentWrapper}>
                    <h1>Clinical trial awareness is the largest barrier to participating in clinical trials.</h1>
                    <ClinicalTrialsHorizontal title="Find clinical trials you might qualify for!" />
                </div>   
            </Container>

            <style jsx>{`
                section {
                    background-image: url(${require("../../assets/images/banner/search.png?webp")});
                    background-position: center;
                    background-size: cover;
                    background-repeat:no-repeat;
                }
            `}
            </style>
        </section>
    )
};

export const PageBanner: React.FC<Props> = ({ title, backgroundImage, children, className }) => {

    return (
        <section className={classnames(styles.pageBanner, styles.InnerPageBanner, className)}>
            <Container>
                <div className={styles.contentWrapper}>
                    <h1>{title}</h1>
                    {children}
                </div>   
            </Container>

            <style jsx>{`
                section {
                    background-image: url(${backgroundImage});
                    background-position: center;
                    background-size: cover;
                    background-repeat:no-repeat;
                }
            `}</style>
        </section>
    )
};