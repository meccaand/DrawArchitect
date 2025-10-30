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
    <div className="flex flex-col gap-1">
      <Button
        size="icon"
        variant="ghost"
        onClick={onReset}
        className="bg-transparent hover:bg-white/10 text-white"
        data-testid="button-reset-view"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onZoomIn}
        className="bg-transparent hover:bg-white/10 text-white"
        data-testid="button-zoom-in"
      >
        <ZoomIn className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onZoomOut}
        className="bg-transparent hover:bg-white/10 text-white"
        data-testid="button-zoom-out"
      >
        <ZoomOut className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onFitToScreen}
        className="bg-transparent hover:bg-white/10 text-white"
        data-testid="button-fit-screen"
      >
        <Maximize2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
