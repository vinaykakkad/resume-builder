import React, { useRef, useState } from "react";
import uuid from "react-uuid";

import { AchievementItem, AchievementModalBody } from "./component";
import { Button, Modal, handleOpen, handleClose, handleSort } from "../utils";

const Achievements = ({ data, setData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const onSubmitHandler = (formData) => {
    setData(() => {
      const newData = { ...data };
      newData.background.achievements.push(formData);
      return newData;
    });
    handleClose(setIsOpen);
  };

  return (
    <div className="container w-1/2 mx-auto my-8">
      <Button
        text="Add Achievement"
        type="blackFull"
        onClickHandler={() => handleOpen(setIsOpen)}
      />
      {data.background.achievements.map((item, dragIndex) => (
        <AchievementItem
          key={uuid()}
          achievementItemTitle={item.title}
          data={data}
          setData={setData}
          dragIndex={dragIndex}
          dragItem={dragItem}
          dragOverItem={dragOverItem}
          handleSort={() =>
            handleSort(data, dragItem, dragOverItem, setData, "achievements")
          }
        />
      ))}
      <Modal
        identifier={`modalAchievementAdd`}
        isOpen={isOpen}
        handleClose={() => handleClose(setIsOpen)}
        children={
          <AchievementModalBody
            title="Add Achievement"
            onSubmitHandler={onSubmitHandler}
            handleClose={() => handleClose(setIsOpen)}
          />
        }
      />
    </div>
  );
};

export default Achievements;
