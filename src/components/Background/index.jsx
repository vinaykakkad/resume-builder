import React, { Fragment, useState } from "react";

import { sectionList } from "../../data";
import { Tabs, BackgroundBody } from "./component";

const Background = ({ data, setData }) => {
  const [section, setSection] = useState(sectionList[0].name);

  return (
    <Fragment>
      <Tabs currentSection={section} setSection={setSection} />
      <BackgroundBody currentSection={section} data={data} setData={setData} />
    </Fragment>
  );
};

export default Background;
