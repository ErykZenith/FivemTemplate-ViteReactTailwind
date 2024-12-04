import { useEffect, useState } from "react";
import Container from "./components/container";
import useMessageHandler from "./hooks/useMessageHandler"
import post from "./utils/post"
import "./layout.css"

const getConfig = new Promise(async (resolve, reject) => {
  try {
    const res = await fetch('/config.json');
    const config = await res.json();
    resolve(config);
  } catch (e) {
    reject(e);
  }
});

export default () => {
  const { addActionHandler } = useMessageHandler();
  const [visible, setVisible] = useState<boolean>(false);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {

    getConfig.then((d) => {
      setConfig(d);
    }).catch((e) => {
      console.error(e);
    });

    addActionHandler('visible', (data) => {
      console.log('visible', data)
      setVisible(data)
    });

    setTimeout(() => {
      window.postMessage({ action: "visible", data: true }, '*')
    }, 1000);

    post('ready')
    
  }, [addActionHandler]);

  return (
    <Container className={`${visible ? "visible-true" : "visible-false"}`}>
      <div className="bg-[#111] bg-opacity-95">
        {config?.text}
      </div>
    </Container>
  );
};