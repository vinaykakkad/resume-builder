import React from "react";

import Education from "../Education";
import WorkExperience from "../Experience";
import Achievements from "../Achievements";
import { sectionList } from "../../data";

const Tabs = ({ currentSection, setSection }) => (
  <div className="container max-w-full mt-8">
    <div className="flex justify-center">
      {sectionList.map((item) => {
        return (
          <div
            key={item.sectionId}
            className={`flex align-middle mr-10 pb-2  text-lg font-medium cursor-pointer ${
              item.name === currentSection
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setSection(item.name)}
          >
            {item.displayName}
          </div>
        );
      })}
    </div>
    <hr />
  </div>
);

const BackgroundBody = ({ currentSection, data, setData }) => {
  switch (currentSection) {
    case "education":
      return <Education data={data} setData={setData} />;
    case "experience":
      return <WorkExperience data={data} setData={setData} />;

    case "achievements":
      return <Achievements data={data} setData={setData} />;

    default:
      break;
  }
};

export { Tabs, BackgroundBody };
