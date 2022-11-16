import React, { useRef, useState } from "react";
import uuid from "react-uuid";

import { EducationItem, EducationModalBody } from "./component";
import { Button, Modal, handleOpen, handleClose, handleSort } from "../utils";

const Education = ({ data, setData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const onSubmitHandler = (formData) => {
    setData(() => {
      const newData = { ...data };
      newData.background.education.push(formData);
      return newData;
    });
    handleClose(setIsOpen);
  };

  return (
    <div className="container w-1/2 mx-auto my-8">
      <Button
        text="Add Education"
        type="blackFull"
        onClickHandler={() => handleOpen(setIsOpen)}
      />
      {data.background.education.map((item, dragIndex) => (
        <EducationItem
          key={uuid()}
          educationItemInstitute={item.institute}
          data={data}
          setData={setData}
          dragIndex={dragIndex}
          dragItem={dragItem}
          dragOverItem={dragOverItem}
          handleSort={() =>
            handleSort(data, dragItem, dragOverItem, setData, "education")
          }
        />
      ))}
      <Modal
        identifier={`modalEducationAdd`}
        isOpen={isOpen}
        handleClose={() => handleClose(setIsOpen)}
        children={
          <EducationModalBody
            title="Add Education"
            onSubmitHandler={onSubmitHandler}
            handleClose={() => handleClose(setIsOpen)}
          />
        }
      />
    </div>
  );
};

export default Education;
