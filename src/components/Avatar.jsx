import React from "react";
import PropTypes from 'prop-types';
const Avatar = ({ src }) => {
  return (
    <img
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={src || '/images/placeholder.jpg'}
    />
  );
};
Avatar.propTypes = {
  src: PropTypes.string,
};
export default Avatar;