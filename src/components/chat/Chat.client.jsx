import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Card } from '../ui/card';
import { Send, Plus, Settings } from 'lucide-react';
import { useChatStore } from './useChatStore';
import { Messages } from './Messages.client';
import { Menu } from './Menu.client';
import { ControlPanel } from './ControlPanel';

export function Chat() {
  const [input, setInput] = useState('');
  const [showControlPanel, setShowControlPanel] = useState(false);
  const messagesEndRef = useRef(null);
  const {
    messages,
    isLoading,
    addMessage,
    setLoading,
    clearMessages,
    createNewChat,
    selectChat,
    deleteChat,
    saveCurrentChat,
  } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    addMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      // Simulate AI response - replace with actual API call
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
          history: messages,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString(),
        };
        addMessage(aiMessage);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      addMessage(errorMessage);
    } finally {
      setLoading(false);
      saveCurrentChat();
    }
  };

  const handleNewChat = () => {
    saveCurrentChat();
    createNewChat();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Menu onNewChat={handleNewChat} onSelectChat={selectChat} onDeleteChat={deleteChat} />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-semibold">Chat Assistant</h1>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowControlPanel(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button
                onClick={handleNewChat}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <Messages messages={messages} />
            <div ref={messagesEndRef} />
          </ScrollArea>

          <Card className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <ControlPanel
        isOpen={showControlPanel}
        onClose={() => setShowControlPanel(false)}
      />
    </div>
  );
}
