import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Option {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface ChipInterfaceProps {
  onAction?: (action: string, data: any) => void;
}

// Simple wireframe SVG icons
const CabinetIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="10" y="8" width="20" height="24" />
    <line x1="10" y1="20" x2="30" y2="20" />
    <circle cx="20" cy="14" r="1" fill="currentColor" />
    <circle cx="20" cy="26" r="1" fill="currentColor" />
  </svg>
);

const SofaIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="8" y="18" width="24" height="10" />
    <rect x="6" y="16" width="3" height="14" />
    <rect x="31" y="16" width="3" height="14" />
    <rect x="8" y="12" width="24" height="6" />
  </svg>
);

const TableIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="10" y="12" width="20" height="3" />
    <line x1="12" y1="15" x2="12" y2="28" />
    <line x1="28" y1="15" x2="28" y2="28" />
    <line x1="12" y1="28" x2="16" y2="28" />
    <line x1="28" y1="28" x2="24" y2="28" />
  </svg>
);

const ChairIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="12" y="18" width="16" height="3" />
    <line x1="14" y1="21" x2="14" y2="28" />
    <line x1="26" y1="21" x2="26" y2="28" />
    <rect x="12" y="10" width="16" height="8" />
  </svg>
);

const ShelfIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="10" y1="10" x2="30" y2="10" />
    <line x1="10" y1="17" x2="30" y2="17" />
    <line x1="10" y1="24" x2="30" y2="24" />
    <line x1="10" y1="10" x2="10" y2="24" />
    <line x1="30" y1="10" x2="30" y2="24" />
  </svg>
);

const CounterIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="8" y="16" width="24" height="10" />
    <rect x="10" y="26" width="4" height="6" />
    <rect x="26" y="26" width="4" height="6" />
  </svg>
);

const furnitureTypes = {
  cabinet: [
    { id: 'base', label: 'Base Cabinet', icon: <CabinetIcon /> },
    { id: 'wall', label: 'Wall Cabinet', icon: <CabinetIcon /> },
    { id: 'tall', label: 'Tall Cabinet', icon: <ShelfIcon /> },
    { id: 'corner', label: 'Corner Cabinet', icon: <CabinetIcon /> },
    { id: 'pantry', label: 'Pantry', icon: <ShelfIcon /> },
    { id: 'counter', label: 'Counter', icon: <CounterIcon /> },
  ],
  seating: [
    { id: 'sofa', label: 'Sofa', icon: <SofaIcon /> },
    { id: 'sectional', label: 'Sectional', icon: <SofaIcon /> },
    { id: 'chair', label: 'Chair', icon: <ChairIcon /> },
    { id: 'loveseat', label: 'Loveseat', icon: <SofaIcon /> },
  ],
  table: [
    { id: 'dining', label: 'Dining Table', icon: <TableIcon /> },
    { id: 'coffee', label: 'Coffee Table', icon: <TableIcon /> },
    { id: 'desk', label: 'Desk', icon: <TableIcon /> },
    { id: 'console', label: 'Console', icon: <TableIcon /> },
  ],
};

const quantities = [
  { id: '1', label: '1' },
  { id: '2', label: '2' },
  { id: '3', label: '3' },
  { id: '4', label: '4' },
  { id: '5', label: '5' },
  { id: '6', label: '6' },
];

export default function ChipInterface({ onAction }: ChipInterfaceProps) {
  const [currentStep, setCurrentStep] = useState<'main' | 'category' | 'type' | 'quantity'>('main');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<any>(null);
  const [prompt, setPrompt] = useState('What would you like to do?');

  const mainActions = [
    { id: 'create', label: 'Create' },
    { id: 'delete', label: 'Delete' },
    { id: 'move', label: 'Move' },
    { id: 'modify', label: 'Modify' },
  ];

  const categories = [
    { id: 'cabinet', label: 'Cabinets' },
    { id: 'seating', label: 'Seating' },
    { id: 'table', label: 'Tables' },
  ];

  const handleMainAction = (action: Option) => {
    if (action.id === 'create') {
      setCurrentStep('category');
      setPrompt('What type of furniture?');
    } else {
      setPrompt(`Select an item to ${action.label.toLowerCase()}`);
    }
  };

  const handleCategorySelect = (category: Option) => {
    setSelectedCategory(category.id);
    setCurrentStep('type');
    setPrompt(`Select ${category.label.toLowerCase()} type`);
  };

  const handleTypeSelect = (type: Option) => {
    setSelectedType(type);
    setCurrentStep('quantity');
    setPrompt('How many?');
  };

  const handleQuantitySelect = (quantity: Option) => {
    if (onAction) {
      onAction('create_furniture', {
        category: selectedCategory,
        type: selectedType,
        quantity: quantity.id,
      });
    }
    // Reset to main
    setCurrentStep('main');
    setSelectedCategory(null);
    setSelectedType(null);
    setPrompt('What would you like to do?');
  };

  const handleBack = () => {
    if (currentStep === 'quantity') {
      setCurrentStep('type');
      setPrompt(`Select ${categories.find(c => c.id === selectedCategory)?.label.toLowerCase()} type`);
    } else if (currentStep === 'type') {
      setCurrentStep('category');
      setSelectedCategory(null);
      setPrompt('What type of furniture?');
    } else if (currentStep === 'category') {
      setCurrentStep('main');
      setPrompt('What would you like to do?');
    }
  };

  const renderOptions = () => {
    if (currentStep === 'main') {
      return (
        <div className="flex flex-wrap gap-2">
          {mainActions.map((action) => (
            <Card
              key={action.id}
              className="px-4 py-2 cursor-pointer hover-elevate active-elevate-2 transition-all"
              onClick={() => handleMainAction(action)}
              data-testid={`chip-${action.id}`}
            >
              <p className="text-sm font-mono uppercase tracking-wide">{action.label}</p>
            </Card>
          ))}
        </div>
      );
    }

    if (currentStep === 'category') {
      return (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="px-4 py-2 cursor-pointer hover-elevate active-elevate-2 transition-all"
              onClick={() => handleCategorySelect(category)}
              data-testid={`chip-${category.id}`}
            >
              <p className="text-sm font-mono uppercase tracking-wide">{category.label}</p>
            </Card>
          ))}
        </div>
      );
    }

    if (currentStep === 'type' && selectedCategory) {
      const types = furnitureTypes[selectedCategory as keyof typeof furnitureTypes];
      return (
        <div className="grid grid-cols-3 gap-3">
          {types.map((type) => (
            <Card
              key={type.id}
              className="p-3 cursor-pointer hover-elevate active-elevate-2 transition-all flex flex-col items-center justify-center gap-2 aspect-square"
              onClick={() => handleTypeSelect(type)}
              data-testid={`chip-${type.id}`}
            >
              <div className="text-foreground/80">{type.icon}</div>
              <p className="text-xs text-center leading-tight font-mono uppercase">
                {type.label}
              </p>
            </Card>
          ))}
        </div>
      );
    }

    if (currentStep === 'quantity') {
      return (
        <div className="flex flex-wrap gap-2">
          {quantities.map((quantity) => (
            <Card
              key={quantity.id}
              className="px-6 py-3 cursor-pointer hover-elevate active-elevate-2 transition-all"
              onClick={() => handleQuantitySelect(quantity)}
              data-testid={`chip-${quantity.id}`}
            >
              <p className="text-sm font-mono">{quantity.label}</p>
            </Card>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {currentStep !== 'main' && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="flex-shrink-0"
            data-testid="button-back"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-wide">
          {prompt}
        </p>
      </div>
      {renderOptions()}
    </div>
  );
}
