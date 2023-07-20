import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";
import "./App.css";

import { Routes, Route} from "react-router-dom";
import Main from "./pages/Main/Main";
import Stream from "./pages/Stream/Stream";
import Content from "./pages/Content/Content";
import Startup from "./pages/Startup";

export default function App() {
  return (
    <div className="">
        <Routes>
          <Route path="/" element={<Startup/>}/>
          <Route path="/home" element={<Main/>}/>
          <Route path="/stream/:fileUuid" element={<Stream/>} />
          <Route path="/content/:fileUuid" element={<Content />} />
        </Routes>
    </div>
  );
}

