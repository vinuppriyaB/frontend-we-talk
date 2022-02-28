import React from "react";
import "./ListUser.css";
import Avatar from "@mui/material/Avatar";

const ListUser = ({ user, handleFunction }) => {
  //   console.log(handleFunction(user));
  return (
    <div className="listUser_container" onClick={() => handleFunction(user)}>
      <div className="listUser_pic">
        <Avatar alt="Travis Howard" src={user.pic} />
      </div>
      <div className="listUser_details">
        <p>{user.userName}</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default ListUser;
