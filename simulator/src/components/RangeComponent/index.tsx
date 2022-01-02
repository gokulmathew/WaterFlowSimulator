import "./index.css";

interface IRangeComponent
{
label:string;
count:number;
min:number;
step:number;
max:number;
updateCount:(e:any)=>void;
}


export default function RangeComponent({
    label,
    count,
    min,
    step,
    max,
    updateCount
}:IRangeComponent)
{
  return(
    <div className="grid-property">
    <label className="grid-property-label">
      Number of {label}: {count}
    </label>
    <input
      type="range"
      className="form-input"
      value={count}
      min={min}
      step={step}
      max={max}
      onChange={(e:any) => updateCount(parseInt(e.target.value))}
    />
  </div>
)
}

