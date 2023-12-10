import React from 'react'
import PropTypes from 'prop-types';

const DropDown = ({ id, label, options, selectedValue, onChange }) => {
    return (

        <div
        >
            <label htmlFor={id}>{label}</label>


            <select className="
            relative
            peer
            w-full
            p-2
            pt-5
            font-light
            bg-white
            border-2
            border-y-gray-400
            rounded-md
            outline-none
            transition"
                id={id} value={selectedValue} onChange={onChange} >
                {
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                }
            </select >
        </div >
    )
}
DropDown.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.string,
        })
    ).isRequired,
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
};
export default DropDown