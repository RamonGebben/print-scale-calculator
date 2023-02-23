import { useState } from "react";
import "./styles.css";

const getScale = (newSize: number, oldSize: number): number =>
  ((newSize - oldSize) / oldSize) * 100;

export default function App() {
  const [newSize, setNewSize] = useState("0");
  const [oldSize, setOldSize] = useState("0");

  const scale =
    100 - Math.abs(getScale(parseFloat(newSize), parseFloat(oldSize)));
  return (
    <div className="App">
      <h1>Calculate scaling percentage for 3d prints</h1>
      <div>
        <label htmlFor="newSize">New Size(mm)</label>
        <input
          id="newSize"
          type="text"
          onChange={(ev) => setNewSize(ev.target.value)}
          value={newSize}
        />
      </div>
      <div>
        <label htmlFor="oldSize">Previous Size(mm)</label>
        <input
          id="oldSize"
          type="text"
          onChange={(ev) => setOldSize(ev.target.value)}
          value={oldSize}
        />
      </div>
      {!isNaN(scale) && <h1>Set scale to: {scale}%</h1>}
    </div>
  );
}
