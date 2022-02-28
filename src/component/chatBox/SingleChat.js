import React, { useState, useEffect } from "react";
import "./SingleChat.css";
import { ChatState } from "../../Context/chatContext/ChatProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SelectedGroupUser from "../chatAccount/SelectedGroupUser";
import ListUser from "../chatAccount/ListUser";
import axios from "axios";
import Alert from "@mui/material/Alert";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "https://we-talks.herokuapp.com";
var selectedChatCompare;
var socket = io(ENDPOINT);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState();
  const [renameLoading, setRenameLoading] = useState();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  useEffect(() => {
    if (user) {
      socket.emit("setup", user);
      socket.on("connected", () => setSocketConnected(true));
    }
  }, []);
  const handleRemoveUser = async (userToRemove) => {
    if (selectedChat.groupAdmin._id !== user._id) {
      window.alert("Admin only have Rights");
      return;
    }
    const bodydata = {
      userId: userToRemove._id,
      chatId: selectedChat._id,
    };
    const headerdata = {
      headers: {
        token: user.token,
      },
    };

    console.log(headerdata, bodydata);
    try {
      const { data } = await axios.put(
        "https://we-talks.herokuapp.com/api/chat/deletefromgroup",
        bodydata,
        headerdata
      );

      console.log(data);
      setSelectedChat(data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleAddUserToGroup = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      window.alert("User alrready in group");
      return;
    }
    const bodydata = {
      userId: userToAdd._id,
      chatId: selectedChat._id,
    };
    const headerdata = {
      headers: {
        token: user.token,
      },
    };

    console.log(headerdata, bodydata);
    try {
      const { data } = await axios.put(
        "https://we-talks.herokuapp.com/api/chat/addtogroup",
        bodydata,
        headerdata
      );

      console.log(data);
      setSelectedChat(data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleRenamechat = async () => {
    const bodydata = {
      chatName: groupChatName,
      chatId: selectedChat._id,
    };
    const headerdata = {
      headers: {
        token: user.token,
      },
    };

    console.log(headerdata, bodydata);
    try {
      const { data } = await axios.put(
        "https://we-talks.herokuapp.com/api/chat/renamegroup",
        bodydata,
        headerdata
      );

      console.log(data);
      setSelectedChat(data);
    } catch (e) {
      console.log(e);
    }
  };

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
        `https://we-talks.herokuapp.com/api/user/getuser?search=${query}`,
        headerdata
      );
      console.log(res.data);
      setSearchResult(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchAllMessage = async (e) => {
    if (!selectedChat) return;

    const headerdata = {
      headers: {
        token: user.token,
      },
    };

    // console.log(headerdata, bodydata);
    try {
      const { data } = await axios.get(
        `https://we-talks.herokuapp.com/api/message/getallmessage/${selectedChat._id}`,
        headerdata
      );

      console.log(data);
      setMessage(data);
      socket.emit("join chat", selectedChat._id);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllMessage();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      console.log(message);
      console.log(newMessageReceived);
      console.log("newMessageReceived" + newMessageReceived);
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
      } else {
        console.log(message);
        console.log(newMessageReceived);
        setMessage([...message, newMessageReceived]);
      }
    });
  });

  const handleSendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      const bodydata = {
        content: newMessage,
        chatId: selectedChat._id,
      };
      const headerdata = {
        headers: {
          token: user.token,
        },
      };

      console.log(headerdata, bodydata);
      try {
        const { data } = await axios.post(
          "https://we-talks.herokuapp.com/api/message/createMessage",
          bodydata,
          headerdata
        );

        console.log(data);
        socket.emit("new message", data);
        setMessage([...message, data]);
        setNewMessage("");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      {selectedChat ? (
        <div className="singleChat_container">
          <div className="singleChat_TopContent">
            <div>
              <ArrowBackIcon onClick={() => setSelectedChat("")} />
            </div>

            <div className="singleChat_prrofileDetail">
              <p>{selectedChat.chatName}</p>

              <Button className="view_btn" onClick={handleOpen}>
                view
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className="groupChat_Modal_container">
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      style={{ color: "orangered" }}
                    >
                      {selectedChat.chatName}
                    </Typography>

                    <div className="modal_groupname">
                      <TextField
                        id="standard-basic"
                        label="Rename Group"
                        variant="standard"
                        fullWidth
                        value={groupChatName}
                        onChange={(e) => setGroupChatName(e.target.value)}
                      />
                      <Button
                        onClick={() => handleRenamechat()}
                        style={{ color: "orangered" }}
                      >
                        update
                      </Button>
                    </div>
                    <div className="groupChat_UserList">
                      {selectedChat.users.map((u, index) => (
                        <SelectedGroupUser
                          user={u}
                          handleFunction={(user) => handleRemoveUser(user)}
                        />
                      ))}
                    </div>

                    <div>
                      <TextField
                        id="standard-basic"
                        label="Search by Name"
                        variant="standard"
                        value={search}
                        onChange={(e) => searchgroupChat(e.target.value)}
                      />
                      {searchResult &&
                        searchResult.map((user, index) => (
                          <ListUser
                            key={index}
                            user={user}
                            handleFunction={(user) =>
                              handleAddUserToGroup(user)
                            }
                          ></ListUser>
                        ))}
                    </div>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
          <div className="singleChat_bottomContent">
            <div className="scrollchat_area">
              <ScrollableChat message={message} />
            </div>

            <TextField
              id="outlined-basic"
              // label="false"
              variant="outlined"
              placeholder="Enter the text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => handleSendMessage(e)}
            />
          </div>
        </div>
      ) : (
        <div className="beforeChat_Content">
          <p>click on user to start chatting</p>
        </div>
      )}
    </>
  );
};

export default SingleChat;
