import React, { useState } from "react";

import { ProfileBlank, ProfileFilled } from "./component";

const Profile = ({ data, setData }) => {
  const [showForm, setShowForm] = useState(data.profile.name ? false : true);

  return showForm ? (
    <ProfileBlank data={data} setData={setData} setShowForm={setShowForm} />
  ) : (
    <ProfileFilled data={data} setShowForm={setShowForm} />
  );
};

export default Profile;
