import React, { useState } from 'react'
import explorer from './data/FolderData'
import Folder from './components/FileExplorer'
import './App.css'
import useTraverseTree from './hooks/useTraverseTree'
import Logo from './components/Logo';

const App = () => {
  const [explorerData, setExplorerData] = useState(explorer)
  
  const {insertNode} = useTraverseTree();

  const handleInsertNode = (folderId,item,isFolder)=>{
      const finalTree = insertNode(explorerData,folderId,item,isFolder);
      setExplorerData(finalTree);
  }
  return (
    <div className='app'>
      <Logo className="logo"/>

      <div className='content'>
        <Folder 
        handleInsertNode={handleInsertNode} 
        explorer={explorerData} />
      </div>

    </div>
  )
}

export default App