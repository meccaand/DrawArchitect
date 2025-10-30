import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface InputPanelProps {
  onGenerate?: (prompt: string) => void;
  isGenerating?: boolean;
}

const examplePrompts = [
  "Modern living room with L-shaped sofa",
  "Minimalist bedroom with queen bed",
  "Open kitchen with island",
  "Home office with desk",
  "Cozy reading nook",
  "Dining room with table for 6",
];

export default function InputPanel({ onGenerate, isGenerating = false }: InputPanelProps) {
  const [prompt, setPrompt] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  const handleGenerate = () => {
    if (prompt.trim() && onGenerate) {
      onGenerate(prompt);
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
    setShowExamples(false);
  };

  return (
    <div className="flex flex-col p-4 space-y-3">
      <div className="relative">
        <Textarea
          placeholder="Describe your interior design..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-20 resize-none pr-16"
          data-testid="input-prompt"
        />
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
          {prompt.length}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="flex-1"
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
              Generate
            </>
          )}
        </Button>
      </div>

      <Collapsible open={showExamples} onOpenChange={setShowExamples}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between" size="sm">
            <span className="text-sm">Example Prompts</span>
            {showExamples ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="grid grid-cols-2 gap-2">
            {examplePrompts.map((example, index) => (
              <Card
                key={index}
                className="p-2 cursor-pointer hover-elevate active-elevate-2 transition-all"
                onClick={() => handleExampleClick(example)}
                data-testid={`card-example-${index}`}
              >
                <p className="text-xs leading-relaxed">{example}</p>
              </Card>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
