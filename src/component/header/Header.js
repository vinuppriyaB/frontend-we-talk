import React, { useState, useEffect } from "react";
import "./Header.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import Modal from "@mui/material/Modal";
import { useHistory } from "react-router";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import axios from "axios";
import { ChatState } from "../../Context/chatContext/ChatProvider";

const Header = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [loadingChat, setLoadingChat] = useState(false);
  const [loading, setLoading] = useState();

  const {
    setSelectedChat,
    user,
    setUser,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  // console.log(ChatState());
  // console.log(user);
  // const users = JSON.parse(localStorage.getItem("userInfo"));

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleSearch = async (e, search) => {
    e.preventDefault();
    console.log(user.token, search);
    const headerdata = {
      headers: {
        token: user.token,
      },
    };
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/user/getuser?search=${search}`,
        headerdata
      );
      console.log(res.data);
      setLoading(false);
      setSearchResult(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const accessChat = async (userId, anchor) => {
    console.log(user.token);
    const headerdata = {
      headers: {
        token: user.token,
      },
    };
    const data = {
      userId: userId,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        data,
        headerdata
      );
      console.log(res.data);
      setSelectedChat(res.data);
      toggleDrawer(anchor, false);
    } catch (e) {
      console.log(e);
    }
  };

  const hangleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser("");
    history.push("/");
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem onClick={toggleDrawer(anchor, false)}>
          <ArrowBackIcon />
          <input
            type="text"
            className="searchbar"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="outlined"
            className="profile_buttton"
            onClick={(e) => {
              handleSearch(e, search);
            }}
          >
            search
          </Button>
        </ListItem>
      </List>
      <List>
        {searchResult &&
          searchResult.map((user, index) => (
            <ListItem
              className="sideDraw_listItem"
              button
              key={user._id}
              // onClick={toggleDrawer(anchor, false)}
              onClick={() => {
                accessChat(user._id, anchor);
                toggleDrawer(anchor, false);
              }}
            >
              <ListItemIcon>
                <Avatar alt="Travis Howard" src={user.pic} />
              </ListItemIcon>
              <div className="sideDraw_listItem_text">
                <p className="sideDraw_listItem_name">{user.userName}</p>
                <p className="sideDraw_listItem_email">{user.email}</p>
              </div>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [Open, setOpen] = useState(false);
  const ModalhandleOpen = () => setOpen(true);
  const ModalhandleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "50vw",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="header_container">
      <div className="search_wrapper">
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              className="profile_buttton"
              onClick={toggleDrawer(anchor, true)}
            >
              <SearchIcon />
              Search User
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
      <div className="heading_wrapper">
        <h2>WE TALK</h2>
      </div>
      {user && (
        <div className="profile_wrapper">
          <Button
            className="profile_buttton"
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            <Avatar alt={user.userName} src={user.pic} />
            <ExpandMoreIcon />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <List
              sx={{ width: "300px", bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton>
                <ListItemIcon></ListItemIcon>
                <h3>{user.userName}</h3>
              </ListItemButton>

              <ListItemButton onClick={() => ModalhandleOpen()}>
                <ListItemIcon>
                  <AccountBoxOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Your Profile" />
              </ListItemButton>

              <ListItemButton onClick={() => hangleLogout()}>
                <ListItemIcon>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </List>
          </Popover>

          <Modal
            open={Open}
            onClose={ModalhandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="Modal_box">
              <div className="MadalAvatar">
                <Avatar
                  className="profile_avatar"
                  alt={user.userName}
                  src={user.pic}
                />
              </div>
              <Typography
                id="modal-modal-title"
                sx={{ mt: 2, fontSize: "20px" }}
              >
                Name: {user.userName}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, fontSize: "20px" }}
              >
                Email: {user.email}
              </Typography>

              <Button
                variant="contained"
                onClick={() => {
                  ModalhandleClose();
                }}
              >
                close
              </Button>
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Header;

//       <Divider />
//   <List>
//     {["All mail", "Trash", "Spam"].map((text, index) => (
//       <ListItem button key={text}>
//         <ListItemIcon>
//           {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//         </ListItemIcon>
//         <ListItemText primary={text} />
//       </ListItem>
//     ))}
//   </List>
//
