import React, { Fragment, useRef } from "react";

import { ReactComponent as ClipBoardIcon } from "../assets/ClipboardOutlined.svg";
import { Button } from "./utils";

const Header = ({ data, setData }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const onChangeHandler = (event) => {
    const file = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = (e) => {
      setData(JSON.parse(e.target.result));
    };
  };

  const onDownloadHandler = () => {
    const file = new Blob([JSON.stringify(data)], { type: "application/json" });
    const fileName = "resume.json";
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
  };

  return (
    <Fragment>
      <header className="flex justify-between py-3 px-16">
        <div className="flex font-semibold items-center justify-center">
          <ClipBoardIcon className="inline-block" />
          <span className="text-2xl text-secondary">Resume Builder</span>
        </div>
        <div className="font-medium">
          <Button
            text="Import"
            type="black"
            onClickHandler={() => handleClick()}
          />
          <input
            ref={fileInputRef}
            type="file"
            id="file-input"
            className="hidden"
            onChange={onChangeHandler}
          />
          <Button text="Export" type="red" onClickHandler={onDownloadHandler} />
        </div>
      </header>
      <hr />
    </Fragment>
  );
};

export default Header;
