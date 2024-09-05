import React, { useEffect, useRef, useState } from "react";

import './App.css';
import QRCode from "react-qr-code";
import { QRCodeCanvas } from "qrcode.react";



function App() {

  const [url, setUrl] = useState('');
  const [displayQr, setDisplayQr] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const canvasRef: any = useRef();


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

    let canvas = canvasRef.current;
    let image = canvas.toDataURL("image/png")

    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    // setUrl("");
  };




  function copy(text) {
    navigator.clipboard.writeText(text)
    setCopySuccess('Copied!');
  }

  return (
    <>
      <div className="centerBox">
        Share & Download URL
      </div>
      <div style={{ background: 'white', padding: '16px' }}>
        {displayQr === true ?
          <>
            <QRCodeCanvas
              id="qrCode"
              value={url}
              size={300}
              bgColor={"#fbfbfb"}
              level={"H"}
              ref={canvasRef}
            />
            <p>{url}</p>

            <div className="custom-button-flex">
              <button onClick={() => copy(url)}>Copy</button>
              &nbsp;
              <form onSubmit={downloadQRCode}>
                <button type="submit" disabled={!url}>
                  Download QR code
                </button>
              </form>
            </div>
            <div>
            {copySuccess}
            </div>
          </>
          : <p className="errorContent">Please Open any website.</p>}
      </div>
    </>
  );
}


export default App;