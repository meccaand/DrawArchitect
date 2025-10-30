import ViewportCanvas from '../ViewportCanvas';

const sampleWireframe = {
  lines: [
    [[3, 0, 3], [12, 0, 3], [12, 0, 6], [3, 0, 6], [3, 0, 3]],
    [[3, 1.5, 3], [12, 1.5, 3], [12, 1.5, 6], [3, 1.5, 6], [3, 1.5, 3]],
    [[3, 0, 3], [3, 1.5, 3]],
    [[12, 0, 3], [12, 1.5, 3]],
    [[12, 0, 6], [12, 1.5, 6]],
    [[3, 0, 6], [3, 1.5, 6]],
  ],
};

export default function ViewportCanvasExample() {
  return <ViewportCanvas wireframeData={sampleWireframe} showGrid={true} roomWidth={15} roomLength={15} roomHeight={9} />;
}
