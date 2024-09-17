import React, { useEffect, useRef, useState } from "react";

import './App.css';
import { QRCodeCanvas } from "qrcode.react";



function App() {

  const [url, setUrl] = useState('');
  const [displayQr, setDisplayQr] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const canvasRef: any = useRef();
  // const inputRef: any = useRef();


  useEffect(() => {
    callURIFromTab()
   
  },[])

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

  const updateUrl=(e)=>{
    console.log("e:" ,e.target.value)
    // console.log("inputRef.current: ",inputRef.current.value);
    
    if(e.target.value !== undefined){
      setUrl(e.target.value)
    }
    
  }
  return (
      <div className="centerBox">
        <h4>Share & Download URL</h4>
        <div>
          {displayQr ? (
            <>
              <div style={{ padding: '10px', borderRadius: '15px', border: '2px solid #0a66c2', display: 'inline-block', backgroundColor: '#fbfbfb' }}>
                <QRCodeCanvas
                  id="qrCode"
                  value={url}
                  size={300}
                  bgColor={"#fbfbfb"}
                  level={"H"}
                  ref={canvasRef}
                />
              </div>
              {/* <p>{url}</p> */}
                  
                  <input  id="text-box" type="text" value={url} onChange={updateUrl}  />
              <div className="custom-button-flex">
                <button onClick={() => copy(url)}>Copy</button>
                <form onSubmit={downloadQRCode}>
                  <button type="submit" disabled={!url}>
                    Download QR code
                  </button>
                </form>
              </div>
              <div className="copy">
                <p>{copySuccess}</p>
              </div>
            </>
          ) : (
            <p className="errorContent">Not Available for this Page.</p>
          )}
        </div>
      </div>
  );
};

export default App;