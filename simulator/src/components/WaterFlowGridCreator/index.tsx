import "./index.css";

interface IGridCreator
{
  rowCount:number
  columnCount:number
  blockCount:number
  shouldShowWaterSimulatorScreen:boolean
  handleCurrentScreenChange:(e:any)=>void;
  setRowCount:(e:any)=>void;
  setColumnCount:(e:any)=>void;
  setBlockCount:(e:any)=>void;
}

export default function WaterFlowGridCreator({
  rowCount,
  columnCount,
  blockCount,
  handleCurrentScreenChange,
  shouldShowWaterSimulatorScreen,
  setRowCount,
  setColumnCount,
  setBlockCount
}:IGridCreator) {

  const gridFields = [
    {
      label: "Rows",
      count: rowCount,
      type: "rowCount"
    },
    {
      label: "Columns",
      count: columnCount,
      type: "columnCount"
    },
    {
      label: "Blocks",
      count: blockCount,
      type: "blockCount"
    }
  ];

  const handleGridCreatorChange = ( type:string, value:any)=>
  {
if(type === 'rowCount') setRowCount(value)
if(type === 'columnCount') setColumnCount(value)
if(type === 'blockCount') setBlockCount(value)
  }

  return (
    <>
      <h2>Grid Creation</h2>
      <form className="grid-creator-container">
        {gridFields.map((gridField) => {
          const { count, type, label } = gridField;
          return (
            <div className="grid-field" key={type}>
              <label className="grid-field-label">
                Number of {label}: {count}
              </label>
              <input
                type="range"
                className="form-input"
                value={count}
                min={1}
                step={1}
                max={10}
                onChange={(e:any) => handleGridCreatorChange(type, e.target.value)}
              />
            </div>
          );
        })}
      </form>
      <button className="btn" onClick={()=>handleCurrentScreenChange(!shouldShowWaterSimulatorScreen)}>
        Next
      </button>
    </>
  );
}
