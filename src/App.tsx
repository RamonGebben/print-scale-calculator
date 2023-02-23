import { useState } from "react";
import "./styles.css";

const getScale = ({
  newSize,
  oldSize,
}: {
  newSize: number;
  oldSize: number;
}): number => {
  const quotient = Math.floor(newSize / oldSize);
  const remainder = newSize % oldSize;

  return (
    quotient * 100 + (100 - Math.abs(((remainder - oldSize) / oldSize) * 100))
  );
};

export default function App() {
  const [newSize, setNewSize] = useState("0");
  const [oldSize, setOldSize] = useState("0");

  const scale = getScale({
    newSize: parseFloat(newSize),
    oldSize: parseFloat(oldSize),
  });

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
