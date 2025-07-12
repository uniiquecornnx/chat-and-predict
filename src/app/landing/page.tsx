'use client';

import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey! I'm your prediction market advisor. Tell me about a bet you're thinking of making, like 'I want to short SOL at $150' and I'll analyze it for you! 🚀",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response (we'll replace this with real API call later)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing your bet... This is a placeholder response. The real analysis will come from the backend API! 📊",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-emerald-900 flex flex-col">
      {/* Header */}
      <div className="bg-purple-800/50 backdrop-blur-sm border-b border-purple-600/30 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">I am your Prediction companion🦾</h1>
            <p className="text-purple-200 text-sm">Are you ready to take a bet?</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                    : 'bg-gradient-to-r from-emerald-600/80 to-emerald-700/80 text-white'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === 'bot' && (
                    <Bot className="w-5 h-5 text-emerald-200 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <User className="w-5 h-5 text-purple-200 mt-0.5 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-emerald-600/80 to-emerald-700/80 text-white rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-emerald-200" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-emerald-200 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-200 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-emerald-200 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-purple-800/30 backdrop-blur-sm rounded-2xl p-4 border border-purple-600/30">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me about your bet... e.g., 'I want to short SOL at $150'"
                className="w-full bg-purple-900/50 border border-purple-600/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={2}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3 flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 