import { MessageState } from "../../../enums/Messages/MessageState";

export const getMessageStatusIcon = (state?: MessageState) => {
  switch (state) {

    case MessageState.SENT:
      return <span className="glyphicon glyphicon-ok"></span>;

    case MessageState.NOTIFIED:
      return (
        <>
          <span className="glyphicon glyphicon-ok"></span>
          <span className="glyphicon glyphicon-ok"></span>
        </>
      );

    case MessageState.SEEN:
      return (
        <>
          <span className="glyphicon glyphicon-ok" style={{ color: '#00BFFF' }}></span>
          <span className="glyphicon glyphicon-ok" style={{ color: '#00BFFF' }}></span>
        </>
      );
    case MessageState.DELETED:
      return (
        <>
        </>
      );
    default:
      return null;
  }
};