import React from 'react'
import Select, { StylesConfig } from 'react-select'
import { Props as SelectProps } from 'react-select/src/Select'

const selectStyles: StylesConfig = {
    dropdownIndicator: (styles) => ({ ...styles, backgroundColor: ' #4f4883', padding: 0, color: 'white' }),
    control: styles => ({ ...styles, paddingRight: 5, minHeight: 'auto', backgroundColor: " #f7f7f7" }),
    indicatorSeparator: styles => ({ ...styles, display: 'none' }),
    valueContainer: styles => ({ ...styles, padding: "0px 3px", backgroundColor: " #f7f7f7", fontSize: 13 }),
    placeholder: styles => ({ ...styles, color: '#4f4883', fontWeight: 'bold' }),
    container: styles => ({ ...styles, backgroundColor: " #f7f7f7" }),
};

interface Props extends SelectProps {

}

const FilterSelect: React.FC<Props> = (props) => (
    <Select
        styles={selectStyles}
        theme={theme => ({
            ...theme,
            borderRadius: 0,
            colors: {
                ...theme.colors,
                primary: ' #4f4883',
            },
        })}
        {...props}
    />
);

export default FilterSelect;