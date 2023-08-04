import { useState } from "react";

const Message = ({ icon, message, type }: MessageType) => {
  // trigger(() => {
  //   debugger;
  //   setClassName((_) => "show");
  //   let interval = setTimeout(() => {
  //     setClassName((_) => "hide");
  //   }, timeout);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div className={`alert-component alert alert-${type} relative`}>
      {icon}
      <p>{message}</p>
    </div>
  );
};

export default Message;
