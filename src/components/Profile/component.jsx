import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { ReactComponent as UploadIcon } from "../../assets/UploadOutlined.svg";
import { Input, Textarea, Button } from "../utils";
import { ProfileFields } from "../../data";

const ImageUploadButton = ({ onClickHandler, imageError }) => {
  return (
    <div className="text-center">
      <button
        onClick={(event) => onClickHandler(event)}
        className="w-52 h-52 mx-auto rounded-full flex items-center justify-center  cursor-pointer bg-gray-100/30 border border-dashed border-gray-300 border-spacing-2"
      >
        <div className="flex items-center  font-semibold text-gray-500 text-sm bg-white border border-gray-300 py-2 px-4 rounded">
          <UploadIcon className="w-4 h-5 mr-2" />
          Upload Photo
        </div>
      </button>
      <p
        className={`text-danger text-sm mx-auto  ${
          imageError ? "visible" : "invisible"
        }`}
      >
        An image is required
      </p>
    </div>
  );
};

const ProfileFilled = ({ data, setShowForm }) => {
  const { profile } = data;
  return (
    <div className="grid grid-cols-12 gap-4 py-8 w-4/5 mx-auto">
      <div className="col-span-3 flex items-center justify-center">
        <div className="rounded-full">
          <img
            src={profile.photo_url}
            alt={profile.name}
            className="rounded-full aspect-square max-h-52 object-cover"
          />
        </div>
      </div>
      <div className="col-span-9">
        <p className="text-2xl font-bold my-4">{profile.name}</p>
        <p className="text-lg font-medium text-gray-500 my-3">
          {profile.email}
        </p>
        <p className="mb-8 text-sm font-medium">{profile.bio}</p>
        <Button
          text="Edit"
          type="gray"
          onClickHandler={() => setShowForm(true)}
        />
      </div>
    </div>
  );
};

// Image will be displayed when:
//     - it is readily available from data (profile.photo_url)
//     - someone uploads in the blank form (preview)
const ProfileBlank = ({ data, setData, setShowForm }) => {
  const { profile } = data;

  const fileInputRef = useRef();

  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [imageError, setImageError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image, setPreview]);

  const onClickHandler = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const onChangeHandler = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const onSubmitHandler = (formData) => {
    if (preview || data.profile.photo_url) {
      setData(() => {
        const newData = { ...data };
        const newProfile = {
          ...formData,
          photo_url: preview || data.profile.photo_url,
        };

        newData.profile = newProfile;
        return newData;
      });
      setImageError(false);
      setShowForm(false);
    } else {
      setImageError(true);
    }
  };

  return (
    <form
      className="grid grid-cols-12 gap-4 py-8 w-4/5 mx-auto"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="col-span-3 flex items-center justify-center">
        <div className="w-full">
          {preview || profile.photo_url ? (
            <img
              src={preview || profile.photo_url}
              alt={profile.name}
              className="w-52 h-52 rounded-full object-cover cursor-pointer mx-auto"
              onClick={(event) => onClickHandler(event)}
            />
          ) : (
            <ImageUploadButton
              onClickHandler={onClickHandler}
              imageError={imageError}
            />
          )}
          <input
            type="file"
            name="file"
            accept="image/*"
            id="file"
            className="hidden"
            ref={fileInputRef}
            onChange={(event) => onChangeHandler(event)}
          />
        </div>
      </div>
      <div className="col-span-9 flex justify-between gap-16">
        <div className="flex flex-col gap-4 w-full">
          <Input
            fieldDetails={ProfileFields[0]}
            register={register}
            defaultValue={profile.name}
            errors={errors}
          />
          <Input
            fieldDetails={ProfileFields[1]}
            register={register}
            defaultValue={profile.email}
            errors={errors}
          />
          <button
            type="submit"
            className="border rounded bg-primary mt-6 text-white font-medium py-2 px-4 text-md mr-4 w-fit"
          >
            Save
          </button>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Textarea
            fieldDetails={ProfileFields[2]}
            register={register}
            defaultValue={profile.bio}
            errors={errors}
          />
        </div>
      </div>
    </form>
  );
};

export { ProfileFilled, ProfileBlank };
