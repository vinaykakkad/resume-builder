import React, { useRef, useState } from "react";
import uuid from "react-uuid";

import { ExperienceItem, ExperienceModalBody } from "./component";
import { Button, Modal, handleOpen, handleClose, handleSort } from "../utils";

const WorkExperience = ({ data, setData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const onSubmitHandler = (formData) => {
    setData(() => {
      const newData = { ...data };
      newData.background.experience.push(formData);
      return newData;
    });
    handleClose(setIsOpen);
  };

  return (
    <div className="container w-1/2 mx-auto my-8">
      <Button
        text="Add Work Experience"
        type="blackFull"
        onClickHandler={() => handleOpen(setIsOpen)}
      />
      {data.background.experience.map((item, dragIndex) => (
        <ExperienceItem
          key={uuid()}
          experienceItemCompany={item.company}
          data={data}
          setData={setData}
          dragIndex={dragIndex}
          dragItem={dragItem}
          dragOverItem={dragOverItem}
          handleSort={() =>
            handleSort(data, dragItem, dragOverItem, setData, "experience")
          }
        />
      ))}
      <Modal
        identifier={`modalExperienceAdd`}
        isOpen={isOpen}
        handleClose={() => handleClose(setIsOpen)}
        children={
          <ExperienceModalBody
            title="Add Experience"
            onSubmitHandler={onSubmitHandler}
            handleClose={() => handleClose(setIsOpen)}
          />
        }
      />
    </div>
  );
};

export default WorkExperience;
