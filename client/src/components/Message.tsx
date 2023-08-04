const Message = ({ icon, message, type }: MessagePropsType) => {
  return (
    <div className={`alert-component alert alert-${type} relative`}>
      {icon}
      <p>{message}</p>
    </div>
  );
};

export default Message;
