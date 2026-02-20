import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Settings, X } from 'lucide-react';

export function ControlPanel({ isOpen, onClose }) {
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([1000]);
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [streaming, setStreaming] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Chat Settings
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="model">Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="claude-3">Claude 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Temperature: {temperature[0]}</Label>
            <Slider
              value={temperature}
              onValueChange={setTemperature}
              max={2}
              min={0}
              step={0.1}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Max Tokens: {maxTokens[0]}</Label>
            <Slider
              value={maxTokens}
              onValueChange={setMaxTokens}
              max={4000}
              min={100}
              step={100}
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="streaming">Streaming Response</Label>
            <Switch
              id="streaming"
              checked={streaming}
              onCheckedChange={setStreaming}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button onClick={onClose} className="flex-1">
            Apply Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}
