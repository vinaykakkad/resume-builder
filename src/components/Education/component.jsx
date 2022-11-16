import React, { useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

import { ReactComponent as CaretRightIcon } from "../../assets/CaretRightFilled.svg";
import { EducationFields } from "../../data";
import {
  accordionToggler,
  Input,
  Textarea,
  Button,
  Modal,
  handleOpen,
  handleClose,
} from "../utils";

const EducationItem = ({
  educationItemInstitute,
  data,
  setData,
  dragIndex,
  dragItem,
  dragOverItem,
  handleSort,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { startDate, endDate, degree, institute, description } =
    data.background.education.find(
      (item) => item.institute === educationItemInstitute
    );

  const onSubmitHandler = (formData) => {
    setData(() => {
      const newData = { ...data };
      const idx = newData.background.education.findIndex(
        (item) => item.institute === educationItemInstitute
      );

      newData.background.education[idx] = formData;
      return newData;
    });
    handleClose(setIsOpen);
  };

  const onDeleteHandler = () => {
    setData(() => {
      const newData = { ...data };
      newData.background.education = newData.background.education.filter(
        (item) => item.institute !== educationItemInstitute
      );
      return newData;
    });
  };

  return (
    <div
      className="border border-gray-300 p-4 mt-4 cursor-move rounded"
      draggable
      onDragStart={() => (dragItem.current = dragIndex)}
      onDragEnter={() => (dragOverItem.current = dragIndex)}
      onDragEnd={() => handleSort()}
      onDragOver={(e) => e.preventDefault()}
    >
      <div
        className="flex justify-between"
        onClick={() => accordionToggler(educationItemInstitute)}
      >
        <div className="flex items-center text-lg font-medium">
          <CaretRightIcon
            className="inline-block"
            id={`toggler_${educationItemInstitute}`}
          />
          {institute}
        </div>
        <div className="flex items-center text-sm text-gray-500">{`${moment(
          startDate
        ).format("MMM YYYY")} - ${moment(endDate).format("MMM YYYY")}`}</div>
      </div>
      <div
        className="pl-6 h-0 overflow-hidden text-gray-900"
        id={`expand_${educationItemInstitute}`}
      >
        <p className="text-sm mt-5 font-medium">Degree</p>
        <p className="font-medium mt-1">{degree}</p>
        <p className="text-sm font-semibold mt-4">Description</p>
        <p className="text-sm font-medium mt-1">{description}</p>
        <div className="flex mt-5">
          <Button
            text="Edit"
            type="gray"
            onClickHandler={() => handleOpen(setIsOpen)}
          />
          <Button text="Delete" type="gray" onClickHandler={onDeleteHandler} />
        </div>
      </div>
      <Modal
        identifier={`modal_${educationItemInstitute}`}
        isOpen={isOpen}
        handleClose={() => handleClose(setIsOpen)}
        children={
          <EducationModalBody
            title="Edit Education"
            onSubmitHandler={onSubmitHandler}
            handleClose={() => handleClose(setIsOpen)}
            institute={institute}
            degree={degree}
            startDate={startDate}
            endDate={endDate}
            description={description}
          />
        }
      />
    </div>
  );
};

const EducationModalBody = ({
  title,
  onSubmitHandler,
  handleClose,
  ...educationItem
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <p className="text-2xl font-bold mb-8 text-gray-900">{title}</p>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          type="hidden"
          value={educationItem.institute}
          {...register("oldInstitute")}
        ></input>
        <Input
          fieldDetails={EducationFields[0]}
          defaultValue={educationItem.institute}
          register={register}
          errors={errors}
        />
        <Input
          fieldDetails={EducationFields[1]}
          defaultValue={educationItem.degree}
          register={register}
          errors={errors}
        />
        <div className="flex justify-between gap-4">
          <Input
            fieldDetails={EducationFields[2]}
            defaultValue={educationItem.startDate}
            register={register}
            errors={errors}
          />
          <Input
            fieldDetails={EducationFields[3]}
            defaultValue={educationItem.endDate}
            register={register}
            errors={errors}
          />
        </div>
        <Textarea
          fieldDetails={EducationFields[4]}
          defaultValue={educationItem.description}
          register={register}
          errors={errors}
        />
        <div className="flex mt-6">
          <button
            type="submit"
            className="border rounded bg-primary text-white font-medium py-2 px-4 text-md mr-4"
          >
            Save
          </button>
          <Button text="Cancel" type="gray" onClickHandler={handleClose} />
        </div>
      </form>
    </div>
  );
};

export { EducationItem, EducationModalBody };
