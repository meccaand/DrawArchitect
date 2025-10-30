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
  const [showAxis, setShowAxis] = useState(true);
  const { toast } = useToast();

  const generateSampleWireframe = (prompt: string) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const sampleData = {
        lines: [
          [[0, 0, 0], [0, 5, 0], [0, 5, 8], [0, 0, 8], [0, 0, 0]],
          [[10, 0, 0], [10, 5, 0], [10, 5, 8], [10, 0, 8], [10, 0, 0]],
          [[0, 0, 0], [10, 0, 0]],
          [[0, 5, 0], [10, 5, 0]],
          [[0, 5, 8], [10, 5, 8]],
          [[0, 0, 8], [10, 0, 8]],
          [[2, 0, 0], [2, 3, 0], [4, 3, 0], [4, 0, 0]],
          [[6, 0, 0], [6, 4, 0], [8, 4, 0], [8, 0, 0]],
          [[3, 5, 0], [3, 5, 8], [7, 5, 8], [7, 5, 0], [3, 5, 0]],
        ],
      };
      
      setWireframeData(sampleData);
      setIsGenerating(false);
      
      toast({
        title: 'Wireframe Generated',
        description: 'Your 3D architectural wireframe is ready.',
      });
    }, 2000);
  };

  const handleExport = (format: string, resolution: string) => {
    toast({
      title: 'Export Started',
      description: `Exporting wireframe as ${format.toUpperCase()} at ${resolution}`,
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
            <p className="text-xs text-muted-foreground">3D Architectural Drawing Generator</p>
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
            showAxis={showAxis}
          />
          
          <div className="absolute bottom-4 right-4 z-10">
            <ViewportControls
              onReset={() => handleViewportControl('reset')}
              onZoomIn={() => handleViewportControl('zoom in')}
              onZoomOut={() => handleViewportControl('zoom out')}
              onFitToScreen={() => handleViewportControl('fit to screen')}
            />
          </div>

          {wireframeData && (
            <div className="absolute top-4 left-4 z-10 bg-card/80 backdrop-blur-sm border rounded-lg px-3 py-2">
              <p className="text-xs font-mono text-muted-foreground">
                Camera: Perspective | Objects: {wireframeData.lines?.length || 0}
              </p>
            </div>
          )}
        </main>

        <aside className="w-64 border-l bg-card flex-shrink-0 overflow-y-auto">
          <SettingsPanel
            lineThickness={lineThickness}
            onLineThicknessChange={setLineThickness}
            showGrid={showGrid}
            onShowGridChange={setShowGrid}
            showAxis={showAxis}
            onShowAxisChange={setShowAxis}
            onExport={handleExport}
          />
        </aside>
      </div>
    </div>
  );
}
