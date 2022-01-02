import {useState} from 'react';
import RowColumnBlockSelector from "./components/RowColumnBlockSelector";
import WaterSimulator from "./components/WaterSimulator";
import './App.css';

function App() {

  const[gridRowCount, setGridRowCount]= useState<number>(5);
  const[gridColumnCount, setGridColumnCount]= useState<number>(5);
  const[gridBlockCount, setGridBlockCount]= useState<number>(5);
  const[showWaterSimulator, setShowWaterSimulator]= useState<boolean>(false);

  return (
    <div className="app">
    <h1 className="header">Waterflow Simulator</h1>

{/* Info: By deafult showing row,column, block selection page */}
   {!showWaterSimulator && (
      <RowColumnBlockSelector
        gridRowCount={gridRowCount}
        setGridRowCount={setGridRowCount}
        gridColumnCount={gridColumnCount}
        setGridColumnCount={setGridColumnCount}
        gridBlockCount={gridBlockCount}
        setGridBlockCount={setGridBlockCount}
        showWaterSimulator={showWaterSimulator}
        setShowWaterSimulator={setShowWaterSimulator}  
      />
    )}

{/* On click of next button, Water simulator component is shown  */}
    {showWaterSimulator && (
      <WaterSimulator
        gridRowCount={gridRowCount}
        gridColumnCount={gridColumnCount}
        gridBlockCount={gridBlockCount}
        setShowWaterSimulator={setShowWaterSimulator}  
      />
    )} 
  </div>
  );
}

export default App;
