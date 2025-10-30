import ViewportCanvas from '../ViewportCanvas';

const sampleWireframe = {
  lines: [
    [[0, 0, 0], [0, 5, 0], [0, 5, 8], [0, 0, 8], [0, 0, 0]],
    [[10, 0, 0], [10, 5, 0], [10, 5, 8], [10, 0, 8], [10, 0, 0]],
    [[0, 0, 0], [10, 0, 0]],
    [[0, 5, 0], [10, 5, 0]],
    [[0, 5, 8], [10, 5, 8]],
    [[0, 0, 8], [10, 0, 8]],
    [[2, 0, 0], [2, 3, 0], [4, 3, 0], [4, 0, 0]],
    [[6, 0, 0], [6, 4, 0], [8, 4, 0], [8, 0, 0]],
  ],
};

export default function ViewportCanvasExample() {
  return <ViewportCanvas wireframeData={sampleWireframe} showGrid={true} showAxis={true} />;
}
