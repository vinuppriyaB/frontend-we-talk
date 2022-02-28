import React from "react";
import "./ScrollableChat.css";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./ChatDisplayLogic";
import Avatar from "@mui/material/Avatar";
import { ChatState } from "../../Context/chatContext/ChatProvider";

const ScrollableChat = ({ message }) => {
  const { user } = ChatState();
  console.log(message);
  return (
    <ScrollableFeed>
      {message &&
        message.map((m, i) => (
          <div key={i} className="scroll_container">
            <div
              className="display_message"
              style={{
                // marginLeft: isSameSenderMargin(message, m, i, user._id),
                alignItems: isSameUser(message, m, i, user._id),
                // justifyContent: "flex-end",
              }}
            >
              <p
                style={{
                  background: `${
                    user._id === m.sender._id ? " #0bf373" : "pink"
                  }`,
                }}
              >
                {m.content}
              </p>
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;

// {(isSameSender(message, m, i, user._id) ||
//   isLastMessage(message, m, i, user._id)) && (
//   <span>
//     <Avatar alt="Travis Howard" src={m.sender.pic} />
//   </span>
// )}
