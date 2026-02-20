import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useChatStore = create(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,
      error: null,
      currentChatId: null,
      chats: [],

      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

      setMessages: (messages) => set({ messages }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearMessages: () => set({ messages: [] }),

      createNewChat: () => {
        const newChatId = Date.now().toString();
        const newChat = {
          id: newChatId,
          title: 'New Chat',
          messages: [],
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          currentChatId: newChatId,
          messages: [],
        }));
        return newChatId;
      },

      selectChat: (chatId) => {
        const chat = get().chats.find((c) => c.id === chatId);
        if (chat) {
          set({
            currentChatId: chatId,
            messages: chat.messages,
          });
        }
      },

      updateChatTitle: (chatId, title) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, title } : chat
          ),
        })),

      deleteChat: (chatId) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
          currentChatId: state.currentChatId === chatId ? null : state.currentChatId,
          messages: state.currentChatId === chatId ? [] : state.messages,
        })),

      saveCurrentChat: () => {
        const { currentChatId, messages, chats } = get();
        if (currentChatId && messages.length > 0) {
          set({
            chats: chats.map((chat) =>
              chat.id === currentChatId
                ? { ...chat, messages, title: messages[0]?.content?.slice(0, 50) || 'New Chat' }
                : chat
            ),
          });
        }
      },
    }),
    {
      name: 'chat-store',
      partialize: (state) => ({
        chats: state.chats,
        currentChatId: state.currentChatId,
      }),
    }
  )
);
