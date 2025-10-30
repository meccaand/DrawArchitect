import ViewportControls from '../ViewportControls';

export default function ViewportControlsExample() {
  return (
    <ViewportControls
      onReset={() => console.log('Reset view')}
      onZoomIn={() => console.log('Zoom in')}
      onZoomOut={() => console.log('Zoom out')}
      onFitToScreen={() => console.log('Fit to screen')}
    />
  );
}
