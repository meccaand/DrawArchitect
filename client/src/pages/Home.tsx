import { useState } from 'react';
import ViewportCanvas from '@/components/ViewportCanvas';
import ChipInterface from '@/components/ChipInterface';
import ViewportControls from '@/components/ViewportControls';
import ThemeToggle from '@/components/ThemeToggle';
import RoomDimensions from '@/components/RoomDimensions';
import { useToast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

export default function Home() {
  const [wireframeData, setWireframeData] = useState<any>(null);
  const [lineThickness, setLineThickness] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [roomWidth, setRoomWidth] = useState(15);
  const [roomLength, setRoomLength] = useState(15);
  const [roomHeight, setRoomHeight] = useState(9);
  const { toast } = useToast();

  const handleChipAction = (action: string, data: any) => {
    console.log('Chip action:', action, data);
    
    if (action === 'create_furniture') {
      const { dimensions, position } = data;
      const { width, height, depth } = dimensions;
      const { x, z } = position;
      
      // Generate wireframe box based on actual dimensions
      const wireframeData = {
        lines: [
          // Bottom face
          [[x, 0, z], [x + width, 0, z], [x + width, 0, z + depth], [x, 0, z + depth], [x, 0, z]],
          // Top face
          [[x, height, z], [x + width, height, z], [x + width, height, z + depth], [x, height, z + depth], [x, height, z]],
          // Vertical edges
          [[x, 0, z], [x, height, z]],
          [[x + width, 0, z], [x + width, height, z]],
          [[x + width, 0, z + depth], [x + width, height, z + depth]],
          [[x, 0, z + depth], [x, height, z + depth]],
        ],
        dimensions: {
          width,
          height,
          depth,
          position: { x, y: 0, z }
        }
      };
      
      setWireframeData(wireframeData);
      toast({
        title: 'Item Added',
        description: `${data.type.label} added to your design`,
      });
    }
  };

  const handleViewportControl = (action: string) => {
    console.log(`Viewport control: ${action}`);
  };

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] relative overflow-hidden">
      {/* Main viewport - full screen */}
      <div className="absolute inset-0">
        <ViewportCanvas
          wireframeData={wireframeData}
          lineThickness={lineThickness}
          showGrid={showGrid}
          roomWidth={roomWidth}
          roomLength={roomLength}
          roomHeight={roomHeight}
        />
      </div>

      {/* Overlaid UI components */}
      <div className="relative z-10 pointer-events-none h-full flex flex-col">
        {/* Top bar */}
        <header className="p-4 flex items-start justify-between pointer-events-auto">
          <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2">
            <p className="text-xs font-mono text-white/70 uppercase tracking-wider">
              {roomWidth}' × {roomLength}' × {roomHeight}'
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-black/60 backdrop-blur-sm border border-white/10 hover:bg-white/10"
                  data-testid="button-settings"
                >
                  <Settings className="w-4 h-4 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-black/95 backdrop-blur-md border-white/10">
                <SheetHeader>
                  <SheetTitle className="font-mono uppercase tracking-wide">Room Settings</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <RoomDimensions
                    width={roomWidth}
                    length={roomLength}
                    height={roomHeight}
                    onWidthChange={setRoomWidth}
                    onLengthChange={setRoomLength}
                    onHeightChange={setRoomHeight}
                  />

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="line-thickness" className="text-sm font-mono uppercase">
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
                      onValueChange={(values) => setLineThickness(values[0])}
                      data-testid="slider-line-thickness"
                    />
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between h-10">
                      <Label htmlFor="show-grid" className="text-sm font-mono uppercase">
                        Show Grid
                      </Label>
                      <Switch
                        id="show-grid"
                        checked={showGrid}
                        onCheckedChange={setShowGrid}
                        data-testid="switch-grid"
                      />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <ThemeToggle />
          </div>
        </header>

        {/* Bottom controls */}
        <div className="mt-auto p-4 flex flex-col gap-4 pointer-events-auto">
          {/* Chip interface */}
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4">
            <ChipInterface onAction={handleChipAction} />
          </div>
        </div>

        {/* Viewport controls - bottom right */}
        <div className="absolute bottom-4 right-4 pointer-events-auto">
          <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-1">
            <ViewportControls
              onReset={() => handleViewportControl('reset')}
              onZoomIn={() => handleViewportControl('zoom in')}
              onZoomOut={() => handleViewportControl('zoom out')}
              onFitToScreen={() => handleViewportControl('fit to screen')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
