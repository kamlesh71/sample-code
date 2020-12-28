import React from 'react'
import { Form, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import styles from './NavSearch.module.scss';

export const NavSearch = () => (
    <Form inline className={styles.searchForm}>
        <FormControl type="text" placeholder="Find a Trial" size="lg" />
        <FaSearch/>
    </Form>
)

