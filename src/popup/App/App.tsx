import React, { useEffect, useRef, useState } from "react";

import './App.css';
import QRCode from "react-qr-code";
import { QRCodeCanvas } from "qrcode.react";
import Button from "./Button";



function App() {

  const [url, setUrl] = useState('');
  const [displayQr, setDisplayQr] = useState(false);
  const ref: any = useRef();


  useEffect(() => {

    callURIFromTab()
  })

  const callURIFromTab = () => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {

      const url: any = tabs[0].url;
      console.log("url: ", url);

      setUrl(url);
      const urlHttp = url?.split(":")[0];
      const validHttp = ['https', 'http']
      if (validHttp.includes(urlHttp)) {
        setDisplayQr(true);
      }

    });
  }

  const downloadQRCode = (e) => {
    e.preventDefault();
    console.log("qrRef: ",ref.current);
    console.log("qrRef C: ",ref.current);
    
    let canvas = ref.current;
    // let canvas = document.getElementById("qrCode");
    console.log("canvas: ",canvas);
    
    let image = canvas.toDataURL("image/png")
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };
  return (
    <>
      <div className="centerBox" onClick={callURIFromTab}>
        Hello: {url}
      </div>
      <div style={{ background: 'white', padding: '16px' }}>
        {/* { displayQr === true ? <QRCode value={url}   /> : <h4>Please Open any website.</h4> } */}
        {displayQr === true ?
          <>
            <QRCodeCanvas
              id="qrCode"
              value={url}
              size={300}
              bgColor={"#00ff00"}
              level={"H"}
              ref={ref} 
            />
            {/* <Button propClick={downloadQRCode}/> */}
            <form onSubmit={downloadQRCode}>
              <label>Enter URL</label>
              <input
                type="text"
                value={url}
              />
              <button type="submit" disabled={!url}>
                Download QR code
              </button>
            </form>
          </>
          : <h4>Please Open any website.</h4>}
      </div>
    </>
  );
}

export default App;