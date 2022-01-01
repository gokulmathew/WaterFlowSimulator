import {useState} from 'react';
import WaterFlowGridCreator from "./components/WaterFlowGridCreator";
// import WaterSimulator from "./components/WaterSimulator";
import './App.css';

function App() {
  const[rowCount, setRowCount]= useState<number>(5);
  const[columnCount, setColumnCount]= useState<number>(5);
  const[blockCount, setBlockCount]= useState<number>(5);
  const[shouldShowWaterSimulatorScreen, setShouldShowWaterSimulatorScreen]= useState<boolean>(false);

  return (
    <div className="app">
    <h1 className="header">Waterflow Simulator</h1>
   {!shouldShowWaterSimulatorScreen && (
      <WaterFlowGridCreator
        rowCount={rowCount}
        setRowCount={setRowCount}
        columnCount={columnCount}
        setColumnCount={setColumnCount}
        blockCount={blockCount}
        setBlockCount={setBlockCount}
        shouldShowWaterSimulatorScreen={shouldShowWaterSimulatorScreen}
        handleCurrentScreenChange={setShouldShowWaterSimulatorScreen}  
      />
    )}
    {shouldShowWaterSimulatorScreen && <p>dsfdf</p>

    }
    {/* {shouldShowWaterSimulatorScreen && (
      <WaterSimulator
        rowCount={rowCount}
        blockCount={blockCount}
        columnCount={columnCount}
        handleCurrentScreenChange={this.handleCurrentScreenChange}
      />
    )}  */}
  </div>
  );
}

export default App;
