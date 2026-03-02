import React from 'react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Card } from '../ui/card';
import { MessageSquare, Trash2 } from 'lucide-react';
import { useChatStore } from './useChatStore';

export function Menu({ onNewChat, onSelectChat, onDeleteChat }) {
  const { chats, currentChatId } = useChatStore();

  return (
    <Card className="w-64 h-full rounded-none border-r">
      <div className="p-4 border-b">
        <Button onClick={onNewChat} className="w-full" size="sm">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100 ${
                currentChatId === chat.id ? 'bg-primary-50' : ''
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {chat.title}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(chat.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
                className="ml-2"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
