import { useState } from 'react';
import Viewer from './components/Viewer';
import './styles.css';

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
  const [newSize, setNewSize] = useState<string | null>(null);
  const [oldSize, setOldSize] = useState<string | null>(null);

  const scale =
    newSize !== null && oldSize !== null
      ? getScale({
          newSize: parseFloat(newSize),
          oldSize: parseFloat(oldSize),
        })
      : NaN;

  return (
    <>
      <Viewer
        scale={scale}
        onFinishLoading={({ height }) => {
          // Only set initially
          if (oldSize === null && newSize === null) {
            setOldSize(`${height}`);

            // Make them equal so scale works out
            setNewSize(`${height}`);
          }
        }}
      />
      <div className="App">
        <h1>Calculate scaling percentage for 3d prints</h1>
        <div>
          <div>
            <label htmlFor="newSize">New Size(mm)</label>
            <br />
            <input
              id="newSize"
              type="text"
              onChange={ev => setNewSize(ev.target.value)}
              value={newSize ?? ''}
            />
          </div>
          <br />
          <div>
            <label htmlFor="oldSize">Previous Size(mm)</label>
            <br />
            <input
              id="oldSize"
              type="text"
              onChange={ev => setOldSize(ev.target.value)}
              value={oldSize ?? ''}
            />
          </div>
          {!isNaN(scale) && <h1>Set scale to: {scale}%</h1>}
        </div>
      </div>
    </>
  );
}
