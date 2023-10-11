import { Stack } from "@mui/material";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import styled from "styled-components";

const MessageForm = () => {
  const [messageValue, setMessageValue] = useState<string>("");

  const handleResize = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const element = e.currentTarget;
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
    setMessageValue(element.value);
  };

  const handlePressShiftEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const keyCode = e.which || e.key;

    // 13 represents the Enter key
    if (keyCode === 13 && !e.shiftKey) {
      // Don't generate a new line
      e.preventDefault();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Stack>
      <Form onSubmit={handleSubmit}>
        <CustomTextArea
          name=""
          id=""
          cols={50}
          rows={1}
          onChange={handleResize}
          onKeyDown={handlePressShiftEnter}
          value={messageValue}
          maxLength={250}
          placeholder="Your message"
        ></CustomTextArea>
        <SendButton type="submit">Send</SendButton>
      </Form>
    </Stack>
  );
};

const Form = styled("form")`
  display: flex;
  align-items: center;
  position: relative;
  width: 80%;
  font-family: "Nunito", sans-serif;
`;

const CustomTextArea = styled("textarea")`
  width: 100%;
  padding: 10px 60px 10px 15px;
  background: #efefef;
  outline: none;
  border: none;
  border-radius: 8px;
  resize: none;
  font-size: 16px;
  font-family: inherit;
  font-weight: 600;
  max-height: 200px;

  &::-webkit-scrollbar {
    display: none;
  }

  &::placeholder {
    font-size: 14px;
  }
`;

const SendButton = styled("button")`
  background: none;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 700;
  position: absolute;
  right: 10px;
  bottom: 8px;
  font-family: inherit;
  cursor: pointer;
  color: #353849;
  transition: 0.3s;
  &:hover {
    color: #5463bc;
  }
`;

export default MessageForm;
