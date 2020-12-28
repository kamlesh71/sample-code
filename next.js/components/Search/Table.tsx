import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import _ from 'lodash'
import styles from './GridTable.module.scss'
import classnames from 'classnames'
import FilterSelect from './Dropdown'

export interface RowType {
    id: number,
    status: string,
    trialName: string,
    type: string,
    condition: string[],
    locationCenter: string[]

}

interface HeaderProps {
    onCheckAllChange(e: React.ChangeEvent<HTMLInputElement>): void,
    checkAll: boolean
}

const TableHeader: React.FC<HeaderProps> = ({ onCheckAllChange, checkAll }) => {

    return (
        <div className={classnames(styles.tableHeader)}>
            <Row className={styles.rowWrapper} noGutters>
                <Col lg={'auto'} className="align-self-center">
                    <div className={classnames(styles.status, styles.colWrapper)}>
                        <Form.Check
                            custom
                            type='checkbox'
                            inline
                            onChange={onCheckAllChange}
                            checked={checkAll}
                        />
                    </div>
                </Col>
                <Col lg={1} className={styles.colWrapper}>
                    <FilterSelect
                        placeholder="Status"
                    />
                </Col>
                <Col lg={3} className={styles.colWrapper}>
                    <FilterSelect
                        placeholder="Clinical Trial Name"
                    />
                </Col>

                <Col lg={2} className={styles.colWrapper}>
                    <FilterSelect
                        placeholder="Type of Clinical Trial"
                    />

                </Col>


                <Col lg={2} className={styles.colWrapper}>
                    <FilterSelect
                        placeholder="Condition"
                    />
                </Col>
                <Col className={styles.colWrapper}>
                    <FilterSelect
                        placeholder="Clinical Trial Location Center"
                    />
                </Col>
            </Row>
        </div>
    )
};

interface TableRowProps {
    item: RowType,
    selected: boolean,
    onChangeSelected(e: React.ChangeEvent<HTMLInputElement>): void
}

const TableRow: React.FC<TableRowProps> = ({ item, selected, onChangeSelected }) => {

    return (
        <div className={styles.gridTable}>
            <Row className={styles.rowWrapper} noGutters>
                <Col md={'auto'}>
                    <div className={classnames(styles.status, styles.colWrapper)}>
                        <Form.Check
                            onChange={onChangeSelected}
                            custom
                            type='checkbox'
                            inline
                            checked={selected}
                        />
                    </div>
                </Col>
                <Col lg={1}>
                    <div className={styles.colWrapper}>
                        {item.status}
                    </div>
                </Col>
                <Col lg={3}>
                    <div className={styles.colWrapper}>
                        {item.trialName}
                    </div>
                </Col>

                <Col lg={2}>
                    <div className={styles.colWrapper}>
                        {item.type}
                    </div>
                </Col>
                <Col lg={2}>
                    <div className={styles.colWrapper}>
                        <ul>
                            {item.condition.map(item => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </Col>
                <Col>
                    <div className={styles.colWrapper}>
                        <ul>
                            {item.locationCenter.map(item => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
    );
};


interface Props {
    items: RowType[]
    onChangeSelected(items: RowType[]): void
    selected: RowType[]
}

const Table: React.FC<Props> = ({ items, selected, onChangeSelected }) => {

    const [checkAll, setCheckAll] = React.useState(false);

    const handleChangeSelectAll = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            onChangeSelected(items);
        } else {
            onChangeSelected([]);
        }
    }, [onChangeSelected, items]);

    const handleChangeSelected = React.useCallback((e: React.ChangeEvent<HTMLInputElement>, item: RowType) => {

        const newSelectedItems = [...selected];
        const index = _.findIndex(selected, s => s.id === item.id);

        if (index !== -1) {
            newSelectedItems.splice(index, 1);
        } else {
            newSelectedItems.push(item);
        }

        onChangeSelected(newSelectedItems);

    }, [onChangeSelected, selected]);

    React.useEffect(() => {
        setCheckAll(selected.length === items.length);
    }, [selected, items, setCheckAll]);

    return (
        <div className="history-table">

            <TableHeader
                onCheckAllChange={handleChangeSelectAll}
                checkAll={checkAll}
            />
            {items.map((item, index) => (
                <TableRow
                    key={index}
                    item={item}
                    selected={_.findIndex(selected, s => s.id === item.id) !== -1}
                    onChangeSelected={e => handleChangeSelected(e, item)}
                />
            ))}
        </div>
    )
};

export default Table;