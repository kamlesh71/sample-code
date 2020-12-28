import React from 'react'
import styles from './Heading.module.scss'


export const SectionHeading = ({ children }) => (
    <div className={styles.sectionHeading}>
        <h2>{children}</h2>
    </div>
)