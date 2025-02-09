import React, { useState } from "react";
import "../App.css";

const Folder = ({ explorer, handleInsertNode }) => {
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [expand, setExpand] = useState(false);

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true)
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder =(e)=>{
    if(e.keyCode === 13 && e.target.value){
      //logic
      handleInsertNode(explorer.id,e.target.value,showInput.isFolder)
      setShowInput({...showInput, visible:false})
    }
  }

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5, marginLeft: 10 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📂{explorer.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>New Folder</button>
            <button onClick={(e) => handleNewFolder(e, false)}>Add File</button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📂" : "🗄"}</span>
              <input
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                type="text"
                className="inputContainer__input"
              />
            </div>
          )}
          {explorer.items.map((item) => {
            return <Folder handleInsertNode={handleInsertNode} explorer={item} key={item.id} />;
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">🗄 {explorer.name}</span>;
  }
};

export default Folder;