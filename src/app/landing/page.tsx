'use client';

import { useState, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date | null;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey! I'm your prediction market advisor. Tell me about a bet you're thinking of making, like 'I want to short SHIBA' and I'll analyze it for you!",
      sender: 'bot',
      timestamp: null
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to call Nodit API via backend for eth_blockNumber
  async function fetchBlockNumber() {
    const response = await fetch('/api/nodit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1
      })
    });
    return await response.json();
  }

  // Helper to map user token to price token for wrapped assets
  function getPriceToken(token: string) {
    const mapping: Record<string, string> = {
      BTC: 'WBTC',
      DOGE: 'WDOGE', 
      SOL: 'WSOL',
      // Add more as needed
    };
    return mapping[token] || token;
  }

  // Function to call /api/analyze for bet advice with real token
  async function fetchBetAdvice(token: string) {
    const priceToken = getPriceToken(token);
    // For demo, use mock values for probabilities/odds, but real token
    const marketProbability = 0.55; // 55% market implied
    const botProbability = 0.60;    // 60% bot model
    const marketOdds = 1.8;         // decimal odds
    const bankroll = 1000;          // user bankroll (optional)
    const priceHistory = [1.7, 1.8, 2.1]; // mock odds history
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, priceToken, marketProbability, botProbability, marketOdds, bankroll, priceHistory })
    });
    return await response.json();
  }

  // Helper to parse action and token from user message
  function parseActionAndToken(msg: string) {
    const actions = ['long', 'short', 'buy', 'sell', 'longing', 'shorting'];
    const tokens = ['SOL', 'ETH', 'BTC', 'AVAX', 'USDT', 'USDC', 'BNB', 'DOGE', 'MATIC', 'ADA', 'BONK' , 'PEPE' , 'TON' , 'SHIBA'];
    const words = msg.toUpperCase().split(/\s+/);
    let foundAction = null;
    let foundToken = null;
    for (let i = 0; i < words.length; i++) {
      const wordLower = words[i].toLowerCase();
      if (actions.includes(wordLower)) {
        foundAction = wordLower;
        // Look for token after action
        if (i + 1 < words.length && tokens.includes(words[i + 1])) {
          foundToken = words[i + 1];
        }
      } else if (tokens.includes(words[i])) {
        foundToken = words[i];
      }
    }
    return { action: foundAction, token: foundToken };
  }

  // Updated handleSendMessage to use keyword matching and bet advice
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

    const msg = inputValue.toLowerCase();
    let botMessage: Message;

    try {
      // Parse action and token
      const { action, token } = parseActionAndToken(inputValue);
      if (msg.includes('block number')) {
        const noditData = await fetchBlockNumber();
        botMessage = {
          id: (Date.now() + 1).toString(),
          text: `Avalanche Fuji block number: ${noditData.result}`,
          sender: 'bot',
          timestamp: new Date()
        };
      } else if (action && token) {
        const advice = await fetchBetAdvice(token);
        botMessage = {
          id: (Date.now() + 2).toString(),
          text: `You want to ${action} ${token}.
` +
            (advice.price ? `Current price: $${advice.price}\n` : '') +
            `Here's my analysis of your bet:\n\n` +
            ` Odds: ${advice.oddsAdvice}\n` +
            ` Trend: ${advice.trendAdvice}\n` +
            ` Sentiment: ${advice.sentimentAdvice}`,
          sender: 'bot',
          timestamp: new Date()
        };
      } else {
        botMessage = {
          id: (Date.now() + 3).toString(),
          text: "I'm not sure how to help with that yet. Try asking for the block number or tell me if you want to go long or short on a token!",
          sender: 'bot',
          timestamp: new Date()
        };
      }
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 4).toString(),
          text: "Sorry, something went wrong while processing your request. Please try again or rephrase your question.",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    setMessages(prev => prev.map(msg =>
      msg.timestamp === null ? { ...msg, timestamp: new Date() } : msg
    ));
  }, []);

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
                      {message.timestamp ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
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