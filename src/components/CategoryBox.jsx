import React from 'react';
import { useCallback } from "react";
import PropTypes from 'prop-types';

function CategoryBox({
  icon: Icon,
  label,
  selected,
  onClick
}) {



  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);






  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  );
}
CategoryBox.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default CategoryBox;
