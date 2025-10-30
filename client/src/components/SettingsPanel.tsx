import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download } from 'lucide-react';
import RoomDimensions from './RoomDimensions';

interface SettingsPanelProps {
  lineThickness?: number;
  onLineThicknessChange?: (value: number) => void;
  showGrid?: boolean;
  onShowGridChange?: (value: boolean) => void;
  roomWidth?: number;
  roomLength?: number;
  roomHeight?: number;
  onRoomWidthChange?: (value: number) => void;
  onRoomLengthChange?: (value: number) => void;
  onRoomHeightChange?: (value: number) => void;
  onExport?: (format: string, resolution: string) => void;
}

export default function SettingsPanel({
  lineThickness = 1,
  onLineThicknessChange,
  showGrid = true,
  onShowGridChange,
  roomWidth = 15,
  roomLength = 15,
  roomHeight = 9,
  onRoomWidthChange,
  onRoomLengthChange,
  onRoomHeightChange,
  onExport,
}: SettingsPanelProps) {
  const handleExport = () => {
    if (onExport) {
      onExport('png', '1920x1080');
    }
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Room Settings</h2>
        <p className="text-sm text-muted-foreground">
          Customize room dimensions and display
        </p>
      </div>

      <div className="space-y-6">
        <RoomDimensions
          width={roomWidth}
          length={roomLength}
          height={roomHeight}
          onWidthChange={onRoomWidthChange}
          onLengthChange={onRoomLengthChange}
          onHeightChange={onRoomHeightChange}
        />

        <div className="pt-4 border-t space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="line-thickness" className="text-sm font-medium">
              Line Thickness
            </Label>
            <span className="text-xs font-mono text-muted-foreground">
              {lineThickness}px
            </span>
          </div>
          <Slider
            id="line-thickness"
            min={1}
            max={5}
            step={1}
            value={[lineThickness]}
            onValueChange={(values) => onLineThicknessChange?.(values[0])}
            data-testid="slider-line-thickness"
          />
        </div>

        <div className="pt-4 border-t space-y-4">
          <h3 className="text-sm font-medium">Display Options</h3>
          
          <div className="flex items-center justify-between h-10">
            <Label htmlFor="show-grid" className="text-sm">
              Show Room Grid
            </Label>
            <Switch
              id="show-grid"
              checked={showGrid}
              onCheckedChange={onShowGridChange}
              data-testid="switch-grid"
            />
          </div>
        </div>

        <div className="pt-4 border-t space-y-4">
          <h3 className="text-sm font-medium">Export</h3>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="format" className="text-sm">
                Format
              </Label>
              <Select defaultValue="png">
                <SelectTrigger id="format" className="w-full mt-2" data-testid="select-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG Image</SelectItem>
                  <SelectItem value="svg">SVG Vector</SelectItem>
                  <SelectItem value="obj">OBJ 3D Model</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="resolution" className="text-sm">
                Resolution
              </Label>
              <Select defaultValue="1920x1080">
                <SelectTrigger id="resolution" className="w-full mt-2" data-testid="select-resolution">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1920x1080">1920 × 1080 (HD)</SelectItem>
                  <SelectItem value="2560x1440">2560 × 1440 (2K)</SelectItem>
                  <SelectItem value="3840x2160">3840 × 2160 (4K)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleExport}
              className="w-full h-10 mt-4"
              variant="secondary"
              data-testid="button-export"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Design
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
