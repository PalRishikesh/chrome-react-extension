import React, { useEffect, useState } from "react";

import './App.css';
import QRCode from "react-qr-code";


  
function App() {

  const [url, setUrl] = useState('');

  useEffect(()=>{

    callURIFromTab()
  })

const callURIFromTab=()=>{
  const queryInfo = {active: true, lastFocusedWindow: true};

  chrome.tabs && chrome.tabs.query(queryInfo, tabs => {

      const url:any = tabs[0].url;

      setUrl(url);

  });
}
  return (
        <>
          <div className="centerBox" onClick={callURIFromTab}>
          Hello: {url}
          </div>
          <div style={{ background: 'white', padding: '16px' }}>
          { url && <QRCode value={url}/>}
          </div>
        </>
  );
}

export default App;