"use client"
// pages/financial-chat.tsx
import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import axios from 'axios';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const FinancialChat: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m Joji, your AI financial assistant. Ask me anything about investments, business, or financial planning.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage: Message = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('api/financial-chat', {
        messages: [...messages, userMessage],
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your request. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Financial AI Assistant</title>
        <meta name="description" content="Your AI-powered financial advisor" />
      </Head>

      <div className="flex flex-col h-screen bg-gray-50">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <h1 className="text-xl font-bold">Financial AI Assistant</h1>
          <p className="text-sm opacity-90">Get expert guidance on investments, business, and money matters</p>
        </header>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  message.role === 'assistant'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'bg-blue-600 text-white ml-auto'
                } ${message.role === 'assistant' ? 'max-w-3xl' : 'max-w-2xl'}`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white p-4 rounded-lg text-gray-800 shadow-sm animate-pulse">
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <footer className="border-t border-gray-200 p-4 bg-white">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about investments, business strategies, or financial planning..."
              className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isLoading}
            >
              Send
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            This AI assistant will only provide general financial information. Not financial advice.
          </p>
        </footer>
      </div>
    </>
  );
};

export default FinancialChat;