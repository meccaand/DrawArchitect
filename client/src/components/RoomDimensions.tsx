import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface RoomDimensionsProps {
  width?: number;
  length?: number;
  height?: number;
  onWidthChange?: (value: number) => void;
  onLengthChange?: (value: number) => void;
  onHeightChange?: (value: number) => void;
}

export default function RoomDimensions({
  width = 15,
  length = 15,
  height = 9,
  onWidthChange,
  onLengthChange,
  onHeightChange,
}: RoomDimensionsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Room Dimensions (ft)</h3>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Label htmlFor="room-width" className="text-sm w-16">
            Width
          </Label>
          <Input
            id="room-width"
            type="number"
            min="5"
            max="50"
            value={width}
            onChange={(e) => onWidthChange?.(Number(e.target.value))}
            className="flex-1"
            data-testid="input-width"
          />
          <span className="text-xs text-muted-foreground w-8">ft</span>
        </div>

        <div className="flex items-center gap-3">
          <Label htmlFor="room-length" className="text-sm w-16">
            Length
          </Label>
          <Input
            id="room-length"
            type="number"
            min="5"
            max="50"
            value={length}
            onChange={(e) => onLengthChange?.(Number(e.target.value))}
            className="flex-1"
            data-testid="input-length"
          />
          <span className="text-xs text-muted-foreground w-8">ft</span>
        </div>

        <div className="flex items-center gap-3">
          <Label htmlFor="room-height" className="text-sm w-16">
            Height
          </Label>
          <Input
            id="room-height"
            type="number"
            min="7"
            max="20"
            value={height}
            onChange={(e) => onHeightChange?.(Number(e.target.value))}
            className="flex-1"
            data-testid="input-height"
          />
          <span className="text-xs text-muted-foreground w-8">ft</span>
        </div>
      </div>
    </div>
  );
}
