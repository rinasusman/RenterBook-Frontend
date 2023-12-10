import React from 'react'
import PropTypes from 'prop-types';
import Button from "./Button";
import Heading from "./Heading";
const EmptyPage = ({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters.",
    showReset,
    onReset
}) => {


    return (
        <div
            className="
          h-[60vh]
          flex
          flex-col
          gap-2
          justify-center
          items-center
        "
        >
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        outline
                        label="Remove all filters"
                        onClick={onReset}
                    />
                )}
            </div>
        </div>
    );
};

EmptyPage.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    showReset: PropTypes.bool,
    onReset: PropTypes.func,
};
export default EmptyPage