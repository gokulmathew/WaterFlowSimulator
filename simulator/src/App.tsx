import {useState} from 'react';
import RowColumnBlockSelector from "./components/RowColumnBlockSelector";
import WaterSimulator from "./components/WaterSimulator";
import './App.css';

function App() {

  const[rowCount, setRowCount]= useState<number>(5);
  const[columnCount, setColumnCount]= useState<number>(5);
  const[blockCount, setBlockCount]= useState<number>(5);
  const[showWaterSimulator, setShowWaterSimulator]= useState<boolean>(false);

  return (
    <div className="app">
    <h1 className="header">Waterflow Simulator</h1>

{/* Info: By deafult showing row,column, block selection page */}
   {!showWaterSimulator && (
      <RowColumnBlockSelector
        rowCount={rowCount}
        setRowCount={setRowCount}
        columnCount={columnCount}
        setColumnCount={setColumnCount}
        blockCount={blockCount}
        setBlockCount={setBlockCount}
        showWaterSimulator={showWaterSimulator}
        setShowWaterSimulator={setShowWaterSimulator}  
      />
    )}

{/* On click of next button, Water simulator component is shown  */}
    {showWaterSimulator && (
      <WaterSimulator
        rowCount={rowCount}
        blockCount={blockCount}
        columnCount={columnCount}
        setShowWaterSimulator={setShowWaterSimulator}  
      />
    )} 
  </div>
  );
}

export default App;
