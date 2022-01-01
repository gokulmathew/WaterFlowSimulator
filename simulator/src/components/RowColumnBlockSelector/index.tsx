import "./index.css";

interface IGridCreator
{
  rowCount:number
  columnCount:number
  blockCount:number
  showWaterSimulator:boolean
  setShowWaterSimulator:(e:any)=>void;
  setRowCount:(e:any)=>void;
  setColumnCount:(e:any)=>void;
  setBlockCount:(e:any)=>void;
}

export default function RowColumnBlockSelector({
  rowCount,
  columnCount,
  blockCount,
  setShowWaterSimulator,
  showWaterSimulator,
  setRowCount,
  setColumnCount,
  setBlockCount
}:IGridCreator) {

  const gridProperties = [
    {
      label: "Rows",
      count: rowCount,
      id: "rowCount"
    },
    {
      label: "Columns",
      count: columnCount,
      id: "columnCount"
    },
    {
      label: "Blocks",
      count: blockCount,
      id: "blockCount"
    }
  ];

  // Info: Updating grid properties
  const updateGridProperties = ( id:string, value:number)=>
  {
if(id === 'rowCount') setRowCount(value)
if(id === 'columnCount') setColumnCount(value)
if(id === 'blockCount') setBlockCount(value)
  }

  return (
    <>
      <h2>Grid Creation</h2>
      <form className="grid-property-container">
        {gridProperties.map((gridProperty) => {
          return (
            <div className="grid-property" key={gridProperty.id}>
              <label className="grid-property-label">
                Number of {gridProperty.label}: {gridProperty.count}
              </label>
              <input
                type="range"
                className="form-input"
                value={gridProperty.count}
                min={1}
                step={1}
                max={10}
                onChange={(e:any) => updateGridProperties(gridProperty.id, e.target.value)}
              />
            </div>
          );
        })}
      </form>

      <button className="btn" onClick={()=>setShowWaterSimulator(!showWaterSimulator)}>
        Next
      </button>
    </>
  );
}
