import { useEffect, useState } from "react";
import Container from "./components/container";
import useMessageHandler from "./hooks/useMessageHandler"
import post from "./utils/post"
import "./layout.css"

export default () => {
  const { addActionHandler } = useMessageHandler();
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    post('ready')
    addActionHandler('visible', (data) => {
      console.log('visible', data)
      setVisible(data)
    });
    setTimeout(() => {
      window.postMessage({ action: "visible", data: true }, '*')
    }, 1000);
  }, [addActionHandler]);

  return (
    <Container className={`${visible ? "visible-true" : "visible-false"}`}>
      Hi FiveM
    </Container>
  );
};