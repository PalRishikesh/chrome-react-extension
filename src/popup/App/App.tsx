import React, { useEffect, useState } from "react";

import './App.css';
import QRCode from "react-qr-code";


  
function App() {

  const [url, setUrl] = useState('');
  const [displayQr, setDisplayQr] = useState(false);

  useEffect(()=>{

    callURIFromTab()
  })

const callURIFromTab=()=>{
  const queryInfo = {active: true, lastFocusedWindow: true};

  chrome.tabs && chrome.tabs.query(queryInfo, tabs => {

      const url:any = tabs[0].url;
      console.log("url: ",url);
      
      setUrl(url);
      const urlHttp = url?.split(":")[0];
      const validHttp = ['https','http']
      if(validHttp.includes(urlHttp)){
        setDisplayQr(true);
      }

  });
}
  return (
        <>
          <div className="centerBox" onClick={callURIFromTab}>
          Hello: {url}
          </div>
          <div style={{ background: 'white', padding: '16px' }}>
           { displayQr === true ? <QRCode value={url}/> : <h4>Please Open any website.</h4> }
          </div>
        </>
  );
}

export default App;