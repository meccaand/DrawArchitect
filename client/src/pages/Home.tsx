import { useState } from 'react';
import ViewportCanvas from '@/components/ViewportCanvas';
import InputPanel from '@/components/InputPanel';
import SettingsPanel from '@/components/SettingsPanel';
import ViewportControls from '@/components/ViewportControls';
import ThemeToggle from '@/components/ThemeToggle';
import { useToast } from '@/hooks/use-toast';
import { Box } from 'lucide-react';

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

  const handleExport = (format: string, resolution: string) => {
    toast({
      title: 'Export Started',
      description: `Exporting design as ${format.toUpperCase()} at ${resolution}`,
    });
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
      <header className="h-16 border-b flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
            <Box className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">WireFrame AI</h1>
            <p className="text-xs text-muted-foreground">Interior Design Generator</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-80 border-r bg-card flex-shrink-0 overflow-y-auto">
          <InputPanel
            onGenerate={generateSampleWireframe}
            isGenerating={isGenerating}
          />
        </aside>

        <main className="flex-1 relative bg-background">
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
              Room: {roomWidth}' × {roomLength}' × {roomHeight}' {wireframeData && `| Objects: ${wireframeData.lines?.length || 0}`}
            </p>
          </div>
        </main>

        <aside className="w-64 border-l bg-card flex-shrink-0 overflow-y-auto">
          <SettingsPanel
            lineThickness={lineThickness}
            onLineThicknessChange={setLineThickness}
            showGrid={showGrid}
            onShowGridChange={setShowGrid}
            roomWidth={roomWidth}
            roomLength={roomLength}
            roomHeight={roomHeight}
            onRoomWidthChange={setRoomWidth}
            onRoomLengthChange={setRoomLength}
            onRoomHeightChange={setRoomHeight}
            onExport={handleExport}
          />
        </aside>
      </div>
    </div>
  );
}
