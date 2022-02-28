import React, { useState, useEffect } from "react";
import "./ChatAccount.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ChatState } from "../../Context/chatContext/ChatProvider";
import axios from "axios";
import { getSender } from "./getSender.js";
import ChatModal from "./ChatModal";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import ListUser from "./ListUser";
import SelectedGroupUser from "./SelectedGroupUser";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};
const ChatAccount = ({ fetchAgain }) => {
  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  console.log(ChatState());
  const [loggedinUser, setLoggedinUser] = useState();
  const users = JSON.parse(localStorage.getItem("userInfo"));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [groupChatName, setGroupChatName] = useState();
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, settLoading] = useState();

  useEffect(() => {
    setLoggedinUser(JSON.parse(localStorage.getItem("userInfo")));

    const fetchChatdata = async () => {
      console.log(users.token);
      const headerdata = {
        headers: {
          token: users.token,
        },
      };

      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/chat",
          headerdata
        );
        console.log(data);
        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

        setChats(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchChatdata();
  }, []);

  const searchgroupChat = async (query) => {
    setSearch(query);
    console.log(query);
    const headerdata = {
      headers: {
        token: user.token,
      },
    };

    console.log(headerdata);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/getuser?search=${query}`,
        headerdata
      );
      console.log(res.data);
      setSearchResult(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleGroup = (userToAdd) => {
    if (selectedUser.includes(userToAdd)) return;
    else {
      setSelectedUser([...selectedUser, userToAdd]);
    }
    console.log(selectedUser);
  };
  const deleteUserGroup = (userToDelete) => {
    if (selectedUser.includes(userToDelete)) {
      setSelectedUser(selectedUser.filter((u) => u._id !== userToDelete._id));
    } else {
      return;
    }
    console.log(selectedUser);
  };
  const handleCreateGroup = async () => {
    const bodydata = {
      chatName: groupChatName,
      users: JSON.stringify(selectedUser.map((u) => u._id)),
    };
    const headerdata = {
      headers: {
        token: user.token,
      },
    };

    // console.log(headerdata, data);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/chat/creategroup",
        bodydata,
        headerdata
      );

      setChats([data, ...chats]);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      sx={{
        height: 500,

        backgroundColor: "black",
        display: { xs: `${selectedChat ? "none" : "block"}`, sm: "block" },
      }}
    >
      <Box
        sx={{
          p: "10px",
          backgroundColor: "black",
        }}
      >
        <div className="myAccount">
          <h3>My Account</h3>
          <Button
            variant="contained"
            className="createGroupbtn"
            onClick={handleOpen}
          >
            create group
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="createChat_modal">
                <h2>CREATE GROUP CHAT</h2>
                <TextField
                  id="standard-basic"
                  label="ChatName"
                  variant="standard"
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Search by Name"
                  variant="standard"
                  value={search}
                  onChange={(e) => searchgroupChat(e.target.value)}
                />
                <div className="selecteduser_container">
                  {selectedUser &&
                    selectedUser.map((user, index) => (
                      <SelectedGroupUser
                        user={user}
                        handleFunction={(user) => deleteUserGroup(user)}
                      />
                    ))}
                </div>
                <div>
                  {searchResult &&
                    searchResult.map((user, index) => (
                      <ListUser
                        key={index}
                        user={user}
                        handleFunction={(user) => handleGroup(user)}
                      ></ListUser>
                    ))}
                </div>
                <div>
                  <Button onClick={(e) => handleCreateGroup(e)}>create</Button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
        <div>
          {chats &&
            chats.map((c, index) => (
              <Box
                sx={{
                  backgroundColor: `${
                    selectedChat === c ? "orangered" : "white"
                  }`,
                  color: `${selectedChat === c ? "white" : "black"}`,
                }}
                key={index}
                onClick={() => setSelectedChat(c)}
              >
                <h4 className="chatAccount_list">{c.chatName}</h4>
              </Box>
            ))}
        </div>
      </Box>
    </Box>
  );
};

export default ChatAccount;

// <div className="otherAccount">fvbjdfbv</div>

// {
//   c.isGroupChat === true
//     ? c.chatName
//     : users[0]._id === loggedinUser._id
//     ? users[1].userName
//     : users[0].userName;
// }
