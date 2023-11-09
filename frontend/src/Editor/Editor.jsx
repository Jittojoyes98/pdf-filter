import React from "react";
import { getCurrentFile } from "../helpers/apiServices";

const Editor = () => {
  React.useEffect(() => {
    getCurrentFile();
  }, []);
  return <div>Editor</div>;
};

export default Editor;
