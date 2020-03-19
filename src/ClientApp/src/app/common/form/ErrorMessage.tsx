import React from 'react';
import {AxiosResponse} from "axios";
import {Message, MessageContent, MessageHeader, MessageItem, MessageList} from "semantic-ui-react";

interface IProps {
  error: AxiosResponse,
  text?: string
}

const ErrorMessage: React.FC<IProps> = ({error, text}) => {
  return (
    <Message error>
      <MessageHeader>{error.statusText}</MessageHeader>
      {error.data && Object.keys(error.data.errors.length > 0) && (
        <MessageList>
          {Object.values(error.data.errors).flat().map((err, i) => <MessageItem key={i} content={err}/>)}
        </MessageList>
      )}
      {text && <MessageContent content={text}/>}
    </Message>
  );
};

export default ErrorMessage;