import React from "react";
import "./SelectedGoupUser.css";
import CloseIcon from "@mui/icons-material/Close";

const SelectedGroupUser = ({ user, handleFunction }) => {
  return (
    <div className="name_box" onClick={() => handleFunction(user)}>
      <p>{user.userName}</p>
      <CloseIcon className="closeIcon_style" />
    </div>
  );
};

export default SelectedGroupUser;
