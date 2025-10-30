import { Button } from '@/components/ui/button';
import { RotateCcw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ViewportControlsProps {
  onReset?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFitToScreen?: () => void;
}

export default function ViewportControls({
  onReset,
  onZoomIn,
  onZoomOut,
  onFitToScreen,
}: ViewportControlsProps) {
  return (
    <div className="flex gap-2 p-2 rounded-lg bg-card/80 backdrop-blur-sm border">
      <Button
        size="icon"
        variant="ghost"
        onClick={onReset}
        data-testid="button-reset-view"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onZoomIn}
        data-testid="button-zoom-in"
      >
        <ZoomIn className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onZoomOut}
        data-testid="button-zoom-out"
      >
        <ZoomOut className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onFitToScreen}
        data-testid="button-fit-screen"
      >
        <Maximize2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
