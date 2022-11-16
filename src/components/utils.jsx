import React from "react";
import ReactModal from "react-modal";

const buttonStyles = {
  primary: "bg-primary text-white w-fit",
  gray: "border-gray-300 text-gray-500 w-fit",
  black: "border-gray-900 text-gray-900 w-fit",
  blackFull: "border-gray-500 text-black w-full",
  red: "bg-danger text-white w-fit",
};

const accordionToggler = (id) => {
  const toggler = document.getElementById(`toggler_${id}`);
  const expand = document.getElementById(`expand_${id}`);

  toggler.classList.toggle("toggler_active");

  if (expand.style.height === 0 + "px" || expand.style.height === "") {
    expand.style.height = expand.scrollHeight + "px";
    toggler.style.transform = "rotate(90deg)";
  } else {
    expand.style.height = 0 + "px";
    toggler.style.transform = "rotate(0deg)";
  }
};

// Functions for Modal
const handleOpen = (setIsOpen) => {
  setIsOpen(true);
};

const handleClose = (setIsOpen) => {
  setIsOpen(false);
};

// Function for Drag n Move
const handleSort = (data, dragItem, dragOverItem, setData, section) => {
  const newData = { ...data };

  const draggedItem = newData.background[section].splice(
    dragItem.current,
    1
  )[0];
  newData.background[section].splice(dragOverItem.current, 0, draggedItem);

  dragItem.current = null;
  dragOverItem.current = null;

  setData(newData);
};

const Button = ({ text, type, onClickHandler }) => {
  return (
    <button
      className={`border rounded ${buttonStyles[type]} font-medium py-2 px-4 text-md mr-4`}
      onClick={() => onClickHandler()}
    >
      {text}
    </button>
  );
};

const Modal = ({ identifier, isOpen, handleClose, children }) => {
  return (
    <ReactModal
      key={identifier}
      isOpen={isOpen}
      className="max-w-screen-sm h-min mx-auto bg-white my-8 p-8 rounded-lg"
      overlayClassName=" fixed left-0 right-0 top-0 bottom-0 bg-gray-900/60"
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleClose}
      appElement={document.getElementById("root") || undefined}
    >
      <div className="modal-body">{children}</div>
    </ReactModal>
  );
};

const Input = ({ fieldDetails, errors, register, defaultValue }) => {
  return (
    <label className="w-full">
      <p className="capitalize label">{fieldDetails.label}</p>
      <input
        type={fieldDetails.type}
        defaultValue={defaultValue}
        placeholder={fieldDetails.placeholder}
        {...register(fieldDetails.name, fieldDetails.validation)}
      />
      {errors[fieldDetails.name] && (
        <p className="text-danger text-sm">This field is required</p>
      )}
    </label>
  );
};

const Textarea = ({ fieldDetails, errors, register, defaultValue }) => (
  <label className="w-full">
    <p className="capitalize label">{fieldDetails.label}</p>
    <textarea
      cols={30}
      rows={5.5}
      defaultValue={defaultValue}
      placeholder={fieldDetails.placeholder}
      {...register(fieldDetails.name, fieldDetails.validation)}
    />
    {errors[fieldDetails.name] && (
      <p className="text-danger text-sm">This field is required</p>
    )}
  </label>
);

export {
  accordionToggler,
  Button,
  Modal,
  Input,
  Textarea,
  handleOpen,
  handleClose,
  handleSort,
};
