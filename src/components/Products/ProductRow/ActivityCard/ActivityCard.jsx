import React from "react";

const ActivityCard = ({ status, isExpand, renderTaskCards }) => {
  return (
    <>
      {renderTaskCards(status, isExpand)}
    </>
  );
};

export default ActivityCard;