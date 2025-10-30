import { useState } from 'react';
import ViewportCanvas from '@/components/ViewportCanvas';
import InputPanel from '@/components/InputPanel';
import ViewportControls from '@/components/ViewportControls';
import ThemeToggle from '@/components/ThemeToggle';
import RoomDimensions from '@/components/RoomDimensions';
import { useToast } from '@/hooks/use-toast';
import { Box, Settings } from 'lucide-react';
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [wireframeData, setWireframeData] = useState<any>(null);
  const [lineThickness, setLineThickness] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [roomWidth, setRoomWidth] = useState(15);
  const [roomLength, setRoomLength] = useState(15);
  const [roomHeight, setRoomHeight] = useState(9);
  const { toast } = useToast();

  const generateSampleWireframe = (prompt: string) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const sampleData = {
        lines: [
          [[3, 0, 3], [12, 0, 3], [12, 0, 6], [3, 0, 6], [3, 0, 3]],
          [[3, 1.5, 3], [12, 1.5, 3], [12, 1.5, 6], [3, 1.5, 6], [3, 1.5, 3]],
          [[3, 0, 3], [3, 1.5, 3]],
          [[12, 0, 3], [12, 1.5, 3]],
          [[12, 0, 6], [12, 1.5, 6]],
          [[3, 0, 6], [3, 1.5, 6]],
          [[6, 0, 8], [6, 2.5, 8], [9, 2.5, 8], [9, 0, 8], [6, 0, 8]],
          [[6, 2.5, 8], [6, 2.5, 11], [9, 2.5, 11], [9, 2.5, 8]],
          [[6, 0, 8], [6, 0, 11], [9, 0, 11], [9, 0, 8]],
          [[6, 0, 11], [6, 2.5, 11]],
          [[9, 0, 11], [9, 2.5, 11]],
        ],
      };
      
      setWireframeData(sampleData);
      setIsGenerating(false);
      
      toast({
        title: 'Design Generated',
        description: 'Your interior design wireframe is ready.',
      });
    }, 2000);
  };

  const handleViewportControl = (action: string) => {
    console.log(`Viewport control: ${action}`);
    toast({
      title: 'View Updated',
      description: `Camera ${action} applied`,
    });
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="h-14 border-b flex items-center justify-between px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <Box className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-semibold">WireFrame AI</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-settings">
                <Settings className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Room Settings</SheetTitle>
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
                    onValueChange={(values) => setLineThickness(values[0])}
                    data-testid="slider-line-thickness"
                  />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between h-10">
                    <Label htmlFor="show-grid" className="text-sm">
                      Show Room Grid
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 relative bg-background min-h-0">
          <ViewportCanvas
            wireframeData={wireframeData}
            lineThickness={lineThickness}
            showGrid={showGrid}
            roomWidth={roomWidth}
            roomLength={roomLength}
            roomHeight={roomHeight}
          />
          
          <div className="absolute bottom-4 right-4 z-10">
            <ViewportControls
              onReset={() => handleViewportControl('reset')}
              onZoomIn={() => handleViewportControl('zoom in')}
              onZoomOut={() => handleViewportControl('zoom out')}
              onFitToScreen={() => handleViewportControl('fit to screen')}
            />
          </div>

          <div className="absolute top-4 left-4 z-10 bg-card/80 backdrop-blur-sm border rounded-lg px-3 py-2">
            <p className="text-xs font-mono text-muted-foreground">
              {roomWidth}' × {roomLength}' × {roomHeight}'
            </p>
          </div>
        </main>

        <div className="border-t bg-card">
          <InputPanel
            onGenerate={generateSampleWireframe}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </div>
  );
}
