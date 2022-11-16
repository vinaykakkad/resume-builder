import React, { Fragment, useState } from "react";

import { EmptyData } from "./data";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Background from "./components/Background";

const App = () => {
  const [data, setData] = useState(EmptyData);

  return (
    <Fragment>
      <Header data={data} setData={setData} />
      <Profile data={data} setData={setData} />
      <Background data={data} setData={setData} />
    </Fragment>
  );
};

export default App;
