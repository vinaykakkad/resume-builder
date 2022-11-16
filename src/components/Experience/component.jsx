import React, { useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

import { ReactComponent as CaretRightIcon } from "../../assets/CaretRightFilled.svg";
import { ExperienceFields } from "../../data";
import {
  accordionToggler,
  Input,
  Textarea,
  Button,
  Modal,
  handleOpen,
  handleClose,
} from "../utils";

const ExperienceItem = ({
  experienceItemCompany,
  data,
  setData,
  dragIndex,
  dragItem,
  dragOverItem,
  handleSort,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { startDate, endDate, role, company, description } =
    data.background.experience.find(
      (item) => item.company === experienceItemCompany
    );

  const onSubmitHandler = (formData) => {
    setData(() => {
      const newData = { ...data };
      const idx = newData.background.experience.findIndex(
        (item) => item.company === experienceItemCompany
      );

      newData.background.experience[idx] = formData;
      return newData;
    });
    handleClose(setIsOpen);
  };

  const onDeleteHandler = () => {
    setData(() => {
      const newData = { ...data };
      newData.background.experience = newData.background.experience.filter(
        (item) => item.company !== experienceItemCompany
      );
      return newData;
    });
  };

  return (
    <div
      className="border border-gray-300 p-4 mt-4  cursor-move rounded"
      draggable
      onDragStart={() => (dragItem.current = dragIndex)}
      onDragEnter={() => (dragOverItem.current = dragIndex)}
      onDragEnd={() => handleSort()}
      onDragOver={(e) => e.preventDefault()}
    >
      <div
        className="flex justify-between"
        onClick={() => accordionToggler(experienceItemCompany)}
      >
        <div className="flex items-center text-lg font-medium">
          <CaretRightIcon
            className="inline-block"
            id={`toggler_${experienceItemCompany}`}
          />
          {company}
        </div>
        <div className="flex items-center text-sm text-gray-500">{`${moment(
          startDate
        ).format("MMM YYYY")} - ${moment(endDate).format("MMM YYYY")}`}</div>
      </div>
      <div
        className="pl-6 h-0 overflow-hidden text-gray-900"
        id={`expand_${experienceItemCompany}`}
      >
        <p className="text-sm mt-5 font-medium">Role</p>
        <p className="font-medium mt-1">{role}</p>
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
        identifier={`modal_${experienceItemCompany}`}
        isOpen={isOpen}
        handleClose={() => handleClose(setIsOpen)}
        children={
          <ExperienceModalBody
            title="Edit Experience"
            onSubmitHandler={onSubmitHandler}
            handleClose={() => handleClose(setIsOpen)}
            company={company}
            role={role}
            startDate={startDate}
            endDate={endDate}
            description={description}
          />
        }
      />
    </div>
  );
};

const ExperienceModalBody = ({
  title,
  onSubmitHandler,
  handleClose,
  ...experienceItem
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
          value={experienceItem.company}
          {...register("oldCompany")}
        ></input>
        <Input
          fieldDetails={ExperienceFields[0]}
          defaultValue={experienceItem.company}
          register={register}
          errors={errors}
        />
        <Input
          fieldDetails={ExperienceFields[1]}
          defaultValue={experienceItem.role}
          register={register}
          errors={errors}
        />
        <div className="flex justify-between gap-4">
          <Input
            fieldDetails={ExperienceFields[2]}
            defaultValue={experienceItem.startDate}
            register={register}
            errors={errors}
          />
          <Input
            fieldDetails={ExperienceFields[3]}
            defaultValue={experienceItem.endDate}
            register={register}
            errors={errors}
          />
        </div>
        <Textarea
          fieldDetails={ExperienceFields[4]}
          defaultValue={experienceItem.description}
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

export { ExperienceItem, ExperienceModalBody };
