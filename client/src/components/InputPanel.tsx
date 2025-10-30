import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

interface InputPanelProps {
  onGenerate?: (prompt: string) => void;
  isGenerating?: boolean;
}

const examplePrompts = [
  "Modern living room with L-shaped sofa and coffee table",
  "Minimalist bedroom with queen bed and two nightstands",
  "Open kitchen with island and bar stools",
  "Home office with desk, chair, and bookshelf",
  "Cozy reading nook with armchair and floor lamp",
  "Dining room with rectangular table for 6 people",
];

export default function InputPanel({ onGenerate, isGenerating = false }: InputPanelProps) {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (prompt.trim() && onGenerate) {
      onGenerate(prompt);
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Describe Your Interior</h2>
        <p className="text-sm text-muted-foreground">
          Enter a description of the interior design you want to visualize
        </p>
      </div>

      <div className="flex-1 flex flex-col space-y-4">
        <div className="relative">
          <Textarea
            placeholder="e.g., A modern living room with a sectional sofa, coffee table, and media console..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-32 resize-none"
            data-testid="input-prompt"
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {prompt.length} characters
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full h-12"
          data-testid="button-generate"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Design
            </>
          )}
        </Button>

        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-3">Example Prompts</h3>
          <div className="grid grid-cols-2 gap-3">
            {examplePrompts.map((example, index) => (
              <Card
                key={index}
                className="p-3 cursor-pointer hover-elevate active-elevate-2 transition-all"
                onClick={() => handleExampleClick(example)}
                data-testid={`card-example-${index}`}
              >
                <p className="text-xs leading-relaxed">{example}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
