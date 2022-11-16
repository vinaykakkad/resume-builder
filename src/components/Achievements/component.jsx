import React, { useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

import { ReactComponent as CaretRightIcon } from "../../assets/CaretRightFilled.svg";
import { AchievementsFields } from "../../data";
import {
  accordionToggler,
  Input,
  Textarea,
  Button,
  Modal,
  handleOpen,
  handleClose,
} from "../utils";

const AchievementItem = ({
  achievementItemTitle,
  data,
  setData,
  dragIndex,
  dragItem,
  dragOverItem,
  handleSort,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { title, date, description } = data.background.achievements.find(
    (item) => item.title === achievementItemTitle
  );

  const onSubmitHandler = (formData) => {
    setData(() => {
      const newData = { ...data };
      const idx = newData.background.achievements.findIndex(
        (item) => item.title === achievementItemTitle
      );

      newData.background.achievements[idx] = formData;
      return newData;
    });
    handleClose(setIsOpen);
  };

  const onDeleteHandler = () => {
    setData(() => {
      const newData = { ...data };
      newData.background.achievements = newData.background.achievements.filter(
        (item) => item.title !== achievementItemTitle
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
        onClick={() => accordionToggler(achievementItemTitle)}
      >
        <div className="flex items-center text-lg font-medium">
          <CaretRightIcon
            className="inline-block"
            id={`toggler_${achievementItemTitle}`}
          />
          {title}
        </div>
        <div className="flex items-center text-sm text-gray-500">{`${moment(
          date
        ).format("MMM YYYY")}`}</div>
      </div>
      <div
        className="pl-6 h-0 overflow-hidden text-gray-900"
        id={`expand_${achievementItemTitle}`}
      >
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
        identifier={`modal_${achievementItemTitle}`}
        isOpen={isOpen}
        handleClose={() => handleClose(setIsOpen)}
        children={
          <AchievementModalBody
            title="Edit Achievement"
            onSubmitHandler={onSubmitHandler}
            handleClose={() => handleClose(setIsOpen)}
            itemTitle={title}
            date={date}
            description={description}
          />
        }
      />
    </div>
  );
};

const AchievementModalBody = ({
  title,
  onSubmitHandler,
  handleClose,
  ...achievementItem
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
          value={achievementItem.title}
          {...register("oldTitle")}
        ></input>
        <Input
          fieldDetails={AchievementsFields[0]}
          defaultValue={achievementItem.itemTitle}
          register={register}
          errors={errors}
        />
        <Input
          fieldDetails={AchievementsFields[1]}
          defaultValue={achievementItem.date}
          register={register}
          errors={errors}
        />
        <Textarea
          fieldDetails={AchievementsFields[2]}
          defaultValue={achievementItem.description}
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

export { AchievementItem, AchievementModalBody };
