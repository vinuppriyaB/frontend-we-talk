import React from "react";

export const getSender = (loggedinUser, users) => {
  return users[0]._id === loggedinUser._id
    ? users[1].userName
    : users[0].userName;
};
