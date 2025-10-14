import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ArrowLeft, Send, MoreVertical, Phone, Video } from 'lucide-react';
import { Conversation } from '../types';

const mockConversations: Conversation[] = [
  {
    id: 1,
    userName: 'Maria Santos',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    lastMessage: 'Great! See you tomorrow at 2 PM',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 0,
    online: true,
    messages: [
      { id: 1, senderId: 1, text: 'Hi! I saw your request for web development tutoring.', timestamp: new Date(Date.now() - 1000 * 60 * 30), read: true },
      { id: 2, senderId: 0, text: 'Yes! I would love to learn React.', timestamp: new Date(Date.now() - 1000 * 60 * 28), read: true },
      { id: 3, senderId: 1, text: 'Perfect! I have availability tomorrow afternoon.', timestamp: new Date(Date.now() - 1000 * 60 * 25), read: true },
      { id: 4, senderId: 0, text: 'Tomorrow at 2 PM works for me!', timestamp: new Date(Date.now() - 1000 * 60 * 20), read: true },
      { id: 5, senderId: 1, text: 'Great! See you tomorrow at 2 PM', timestamp: new Date(Date.now() - 1000 * 60 * 5), read: true },
    ]
  },
  {
    id: 2,
    userName: 'Juan dela Cruz',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
    lastMessage: 'Do you have your own guitar?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 2,
    online: false,
    messages: [
      { id: 1, senderId: 0, text: 'Hi Juan! Interested in guitar lessons.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), read: true },
      { id: 2, senderId: 2, text: 'Hey! That is awesome. What is your skill level?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), read: true },
      { id: 3, senderId: 0, text: 'Complete beginner!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.2), read: true },
      { id: 4, senderId: 2, text: 'Do you have your own guitar?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), read: false },
    ]
  },
  {
    id: 3,
    userName: 'Ana Reyes',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    lastMessage: 'Salamat! 🙏',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0,
    online: true,
    messages: [
      { id: 1, senderId: 3, text: 'Kumusta! Ready for our lesson?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5), read: true },
      { id: 2, senderId: 0, text: 'Yes! Excited to learn Tagalog!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.2), read: true },
      { id: 3, senderId: 3, text: 'Salamat! 🙏', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), read: true },
    ]
  }
];

interface MessagesPageProps {
  onBack?: () => void;
}

export function MessagesPage({ onBack }: MessagesPageProps) {
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Conversation['messages']>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedConversation) {
      setMessages(selectedConversation.messages);
      // Simulate typing indicator after a delay
      const timeout = setTimeout(() => {
        // Could add typing indicator logic here
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage = {
      id: messages.length + 1,
      senderId: 0,
      text: messageText,
      timestamp: new Date(),
      read: false
    };

    setMessages([...messages, newMessage]);
    setMessageText('');

    // Simulate response
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        senderId: selectedConversation.id,
        text: 'Thanks for your message! I will get back to you soon.',
        timestamp: new Date(),
        read: false
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  if (selectedConversation) {
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b-2 border-[#134686]/10 bg-white">
          <button
            onClick={() => setSelectedConversation(null)}
            className="p-2 hover:bg-[#FDF4E3] rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#134686]" />
          </button>
          
          <Avatar className="w-10 h-10 border-2 border-[#FEB21A]">
            <AvatarImage src={selectedConversation.userAvatar} />
            <AvatarFallback>{selectedConversation.userName[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <p className="font-semibold text-[#134686]">{selectedConversation.userName}</p>
            <p className="text-xs text-[#134686]/60">
              {selectedConversation.online ? 'Online' : 'Offline'}
            </p>
          </div>

          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="text-[#134686]">
              <Phone className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-[#134686]">
              <Video className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-[#134686]">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => {
              const isOwn = message.senderId === 0;
              const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;

              return (
                <div key={message.id} className={`flex gap-2 ${isOwn ? 'flex-row-reverse' : ''}`}>
                  {showAvatar ? (
                    <Avatar className="w-8 h-8 border-2 border-[#FEB21A]">
                      <AvatarImage src={isOwn ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1' : selectedConversation.userAvatar} />
                      <AvatarFallback>{isOwn ? 'ME' : selectedConversation.userName[0]}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-8" />
                  )}
                  
                  <div className={`flex flex-col max-w-[70%] ${isOwn ? 'items-end' : ''}`}>
                    <div
                      className={`p-3 rounded-2xl ${
                        isOwn
                          ? 'bg-[#134686] text-white rounded-br-sm'
                          : 'bg-[#FDF4E3] text-[#134686] rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <p className="text-xs text-[#134686]/40 mt-1 px-1">
                      {message.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t-2 border-[#134686]/10 bg-white">
          <div className="flex gap-2">
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 border-2 border-[#134686]/20 focus:border-[#FEB21A] rounded-full"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="bg-[#134686] hover:bg-[#0f3666] text-white rounded-full px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Conversations List
  return (
    <ScrollArea className="h-full bg-[#FDF4E3]">
      <div className="max-w-lg mx-auto">
        <div className="p-4 bg-[#134686] text-white">
          <h2 className="text-2xl">Messages</h2>
          <p className="text-sm opacity-80 mt-1">
            {conversations.reduce((sum, c) => sum + c.unreadCount, 0)} unread messages
          </p>
        </div>

        <div className="p-4 space-y-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className="w-full flex items-start gap-3 p-3 bg-white rounded-xl hover:bg-[#FDF4E3] transition-colors border-2 border-[#134686]/10 hover:border-[#FEB21A]"
            >
              <div className="relative">
                <Avatar className="w-14 h-14 border-2 border-[#FEB21A]">
                  <AvatarImage src={conversation.userAvatar} />
                  <AvatarFallback>{conversation.userName[0]}</AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-[#134686] truncate">{conversation.userName}</p>
                  <span className="text-xs text-[#134686]/60">
                    {conversation.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-[#134686]/70 truncate">{conversation.lastMessage}</p>
              </div>

              {conversation.unreadCount > 0 && (
                <Badge className="bg-[#ED3F27] text-white hover:bg-[#ED3F27] shrink-0">
                  {conversation.unreadCount}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
