import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Send, ChevronLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  options?: Option[];
}

interface Option {
  id: string;
  label: string;
  icon?: string;
  preview?: string;
}

interface ConversationalChatProps {
  onAction?: (action: string, data: any) => void;
}

// Sample cabinet types for demonstration
const cabinetTypes = [
  { id: 'base', label: 'Base Cabinet', icon: '🗄️' },
  { id: 'wall', label: 'Wall Cabinet', icon: '📦' },
  { id: 'tall', label: 'Tall Cabinet', icon: '🚪' },
  { id: 'corner', label: 'Corner Cabinet', icon: '📐' },
  { id: 'drawer', label: 'Drawer Unit', icon: '🗃️' },
  { id: 'pantry', label: 'Pantry', icon: '🏢' },
];

export default function ConversationalChat({ onAction }: ConversationalChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'What would you like to add to your room?',
    },
  ]);
  const [input, setInput] = useState('');
  const [conversationState, setConversationState] = useState<any>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simple pattern matching for demo
    setTimeout(() => {
      const lowercaseInput = input.toLowerCase();
      
      if (lowercaseInput.includes('cabinet') || lowercaseInput.includes('kitchen')) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Great! What type of cabinet would you like to add?',
          options: cabinetTypes,
        };
        setMessages(prev => [...prev, assistantMessage]);
        setConversationState({ action: 'select_cabinet', input: lowercaseInput });
      } else if (lowercaseInput.includes('sofa') || lowercaseInput.includes('couch')) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'What style of sofa?',
          options: [
            { id: 'sectional', label: 'L-Shaped Sectional', icon: '🛋️' },
            { id: 'loveseat', label: 'Loveseat', icon: '🪑' },
            { id: 'standard', label: 'Standard Sofa', icon: '🛋️' },
          ],
        };
        setMessages(prev => [...prev, assistantMessage]);
        setConversationState({ action: 'select_sofa', input: lowercaseInput });
      } else if (lowercaseInput.includes('table')) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'What type of table?',
          options: [
            { id: 'dining', label: 'Dining Table', icon: '🍽️' },
            { id: 'coffee', label: 'Coffee Table', icon: '☕' },
            { id: 'desk', label: 'Desk', icon: '💼' },
            { id: 'console', label: 'Console Table', icon: '📺' },
          ],
        };
        setMessages(prev => [...prev, assistantMessage]);
        setConversationState({ action: 'select_table', input: lowercaseInput });
      } else {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'I can help you add furniture and fixtures. Try saying "Add kitchen cabinets" or "Add a sofa".',
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    }, 500);
  };

  const handleOptionSelect = (option: Option) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: option.label,
    };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `How many ${option.label.toLowerCase()}s would you like to add?`,
        options: [
          { id: '1', label: '1' },
          { id: '2', label: '2' },
          { id: '3', label: '3' },
          { id: '4', label: '4' },
          { id: 'custom', label: 'Custom amount' },
        ],
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      if (onAction) {
        onAction('option_selected', { option, state: conversationState });
      }
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-lg px-4 py-2'
                    : 'space-y-3'
                }`}
              >
                {message.role === 'assistant' && (
                  <p className="text-sm text-foreground">{message.content}</p>
                )}
                {message.role === 'user' && (
                  <p className="text-sm">{message.content}</p>
                )}
                
                {message.options && message.options.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {message.options.map((option) => (
                      <Card
                        key={option.id}
                        className="p-3 cursor-pointer hover-elevate active-elevate-2 transition-all flex flex-col items-center justify-center gap-2 aspect-square"
                        onClick={() => handleOptionSelect(option)}
                        data-testid={`option-${option.id}`}
                      >
                        {option.icon && (
                          <span className="text-2xl">{option.icon}</span>
                        )}
                        <p className="text-xs text-center leading-tight font-medium">
                          {option.label}
                        </p>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-3 bg-card">
        <div className="flex gap-2">
          <Textarea
            placeholder="Describe what you'd like to add..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[44px] max-h-32 resize-none"
            data-testid="input-chat"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            size="icon"
            className="flex-shrink-0 h-[44px] w-[44px]"
            data-testid="button-send"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
