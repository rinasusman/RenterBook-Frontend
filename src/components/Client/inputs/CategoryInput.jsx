import React from 'react'
import PropTypes from 'prop-types';

const CategoryInput = ({

  icon: Icon,
  label,
  selected,
  onClick
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">
        {label}
      </div>
    </div>
  );
}
CategoryInput.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default CategoryInput;
