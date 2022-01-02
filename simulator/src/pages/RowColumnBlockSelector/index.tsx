import RangeComponent from "../../components/RangeComponent";
import "./index.css";

interface IGridCreator {
  gridRowCount: number;
  setGridRowCount: (e: any) => void;
  gridColumnCount: number;
  setGridColumnCount: (e: any) => void;
  gridBlockCount: number;
  setGridBlockCount: (e: any) => void;
  showWaterSimulator: boolean;
  setShowWaterSimulator: (e: any) => void;
}

export default function RowColumnBlockSelector({
  gridRowCount,
  gridColumnCount,
  gridBlockCount,
  setGridRowCount,
  setGridColumnCount,
  setGridBlockCount,
  setShowWaterSimulator,
  showWaterSimulator,
}: IGridCreator) {


  return (
    <>
      <h2>Grid Creation</h2>

      <div className="range-container">
        <RangeComponent
          label="Number of Rows"
          count={gridRowCount}
          min={1}
          step={1}
          max={10}
          updateCount={setGridRowCount}
        />
        <RangeComponent
          label="Number of Columns"
          count={gridColumnCount}
          min={1}
          step={1}
          max={10}
          updateCount={setGridColumnCount}
        />
        <RangeComponent
          label="Number of Blocks"
          count={gridBlockCount}
          min={1}
          step={1}
          max={10}
          updateCount={setGridBlockCount}
        />
      </div>

      <button
        className="btn"
        onClick={() => setShowWaterSimulator(!showWaterSimulator)}
      >
        Next
      </button>
    </>
  );
}
