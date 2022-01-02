import "./index.css";

interface IGridCreator
{
  gridRowCount:number;
  setGridRowCount:(e:any)=>void;
  gridColumnCount:number;
  setGridColumnCount:(e:any)=>void;
  gridBlockCount:number;
  setGridBlockCount:(e:any)=>void;
  showWaterSimulator:boolean
  setShowWaterSimulator:(e:any)=>void;
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
}:IGridCreator) {

  const gridProperties = [
    {
      label: "Rows",
      count: gridRowCount,
      id: "gridRowCount"
    },
    {
      label: "Columns",
      count: gridColumnCount,
      id: "gridColumnCount"
    },
    {
      label: "Blocks",
      count: gridBlockCount,
      id: "gridBlockCount"
    }
  ];

  // Info: Updating grid properties
  const updateGridProperties = ( id:string, e:any)=>
  {
    let  { value } = e.target;
    value = parseInt(value)
if(id === 'gridRowCount') setGridRowCount(value)
if(id === 'gridColumnCount') setGridColumnCount(value)
if(id === 'gridBlockCount') setGridBlockCount(value)
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
                onChange={(e:any) => updateGridProperties(gridProperty.id, e)}
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
