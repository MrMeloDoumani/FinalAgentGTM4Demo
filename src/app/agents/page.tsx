"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Upload, Save, Users, Calendar, X, FileText, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  image?: {
    id: string;
    url: string;
    type: string;
    industry: string;
    title: string;
    generatedAt: string;
  };
  mediaAssets?: Array<{
    id: string;
    type: string;
    title: string;
    industry: string;
    content: string;
    fileUrl: string;
    generatedAt: string;
    styleUsed?: string;
  }>;
  jammyId?: string;
  confidence?: number;
}

const actionOptions = [
  { id: "save", label: "Save", icon: Save },
  { id: "upload", label: "Upload", icon: Upload },
  { id: "send-team", label: "Send to Team", icon: Users },
  { id: "send-planner", label: "Send to Planner", icon: Calendar },
  { id: "download", label: "Download", icon: Download },
];

export default function AgentsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello Yasser! I'm Jammy, your intelligent AI assistant for e& GTM. I can create media assets, analyze markets, learn from your uploads, and get smarter with every interaction. What would you like to work on today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/jammy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          context: 'sales-enablement',
          uploadedFiles: uploadedFiles.map(file => ({
            name: file.name,
            type: file.type,
            size: file.size
          }))
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: data.response,
          timestamp: new Date(),
          image: data.image,
          mediaAssets: data.mediaAssets,
          jammyId: data.jammyId,
          confidence: data.confidence
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        throw new Error(data.error || 'Failed to get Jammy AI response');
      }
    } catch (error) {
      console.error('Jammy AI Error:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleActionSelect = (actionId: string) => {
    setShowActions(false);
    
    if (actionId === "upload") {
      setShowFileUpload(true);
      return;
    }
    
    // Get the last AI message to work with
    const lastAIMessage = messages.filter(m => m.type === "ai").pop();
    if (!lastAIMessage) return;
    
    let actionMessage: Message;
    
    switch (actionId) {
      case "save":
        actionMessage = {
          id: Date.now().toString(),
          type: "ai",
          content: `✅ Content saved to your knowledge base. This will help me learn and provide better responses in the future.`,
          timestamp: new Date(),
        };
        break;
        
      case "send-team":
        actionMessage = {
          id: Date.now().toString(),
          type: "ai",
          content: `📤 Content shared with the GTM team. Team members will be notified and can access this content in the Planner section.`,
          timestamp: new Date(),
        };
        break;
        
      case "send-planner":
        actionMessage = {
          id: Date.now().toString(),
          type: "ai",
          content: `📋 Content added to Planner as a new project. You can track progress and assign team members in the Planner section.`,
          timestamp: new Date(),
        };
        break;
        
      case "download":
        // Create downloadable content
        const content = lastAIMessage.content;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `jammy-ai-content-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        actionMessage = {
          id: Date.now().toString(),
          type: "ai",
          content: `💾 Content downloaded successfully. The file has been saved to your device.`,
          timestamp: new Date(),
        };
        break;
        
      default:
        actionMessage = {
          id: Date.now().toString(),
          type: "ai",
          content: `Action "${actionOptions.find(a => a.id === actionId)?.label}" has been executed. The content has been processed according to your request.`,
          timestamp: new Date(),
        };
    }
    
    setMessages(prev => [...prev, actionMessage]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png', 'image/gif'];
      return validTypes.includes(file.type);
    });
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
    
    if (validFiles.length > 0) {
      const uploadMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: `I've received ${validFiles.length} file(s) and I'm learning from them to improve my responses. The files will help me understand your preferred style and generate more relevant content.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, uploadMessage]);
    }
    
    setShowFileUpload(false);
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Directory</span>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Jammy AI - Sales Enablement Assistant</h1>
              <p className="text-sm text-gray-500">Yasser Omar Zaki Shaaban - DIRECTOR</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                     className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Actions</span>
              </button>
              
              {showActions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <div className="py-2">
                    {actionOptions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleActionSelect(action.id)}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <action.icon className="h-4 w-4" />
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-3xl px-4 py-3 rounded-lg ${
                message.type === "user"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              
              {/* Display generated image if available */}
              {message.image && (
                <div className="mt-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{message.image.title}</h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {message.image.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-3">
                      {message.image.industry} • Generated {new Date(message.image.generatedAt).toLocaleString()}
                    </div>
                    <img 
                      src={message.image.url} 
                      alt={message.image.title}
                      width={400}
                      height={300}
                      className="w-full max-w-md mx-auto rounded border border-gray-200"
                    />
                    <div className="mt-3 flex space-x-2">
                      <button 
                        onClick={() => window.open(message.image!.url, '_blank')}
                        className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                      >
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </button>
                      <button 
                        onClick={() => navigator.clipboard.writeText(message.image!.url)}
                        className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                      >
                        <FileText className="h-3 w-3" />
                        <span>Copy Link</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Display media assets if available */}
              {message.mediaAssets && message.mediaAssets.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Generated Media Assets:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {message.mediaAssets.map((asset, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{asset.title}</h5>
                          <span className="text-xs text-gray-500 bg-red-100 px-2 py-1 rounded">
                            {asset.type.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 mb-3">
                          {asset.industry} • {asset.styleUsed || 'e& Style'}
                        </div>
                        
                        {/* Display image inline if it's an image type */}
                        {asset.type === 'image' ? (
                          <div className="mt-3">
                            <img 
                              src={asset.fileUrl} 
                              alt={asset.title}
                              width={400}
                              height={300}
                              className="w-full max-w-md mx-auto rounded border border-gray-200"
                            />
                            <div className="mt-3 flex space-x-2">
                              <button 
                                onClick={() => window.open(asset.fileUrl, '_blank')}
                                className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                              >
                                <Download className="h-3 w-3" />
                                <span>Download Image</span>
                              </button>
                              <button 
                                onClick={() => navigator.clipboard.writeText(asset.fileUrl)}
                                className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                              >
                                <FileText className="h-3 w-3" />
                                <span>Copy Link</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* Display download buttons for non-image assets */
                          <div className="mt-3 flex space-x-2">
                            <button 
                              onClick={() => window.open(asset.fileUrl, '_blank')}
                              className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                            >
                              <Download className="h-3 w-3" />
                              <span>Download {asset.type.toUpperCase()}</span>
                            </button>
                            <button 
                              onClick={() => navigator.clipboard.writeText(asset.fileUrl)}
                              className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                            >
                              <FileText className="h-3 w-3" />
                              <span>Copy Link</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Display Jammy AI confidence and ID */}
              {message.jammyId && (
                <div className="mt-2 text-xs text-gray-500">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                    Jammy AI
                  </span>
                  {message.confidence && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded mr-2">
                      Confidence: {Math.round(message.confidence * 100)}%
                    </span>
                  )}
                  <span className="text-gray-400">ID: {message.jammyId}</span>
                </div>
              )}
              
              <p className={`text-xs mt-2 ${
                message.type === "user" ? "text-blue-100" : "text-gray-500"
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about sales enablement, strategic planning, or market analysis..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-black placeholder-gray-500"
              rows={3}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
                  className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Upload files to build knowledge base</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Supports PDF, DOC, TXT, and images</span>
          </div>
        </div>
      </div>

      {/* File Upload Modal */}
      {showFileUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Upload Files to Knowledge Base</h3>
                <button
                  onClick={() => setShowFileUpload(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Upload documents and images to enhance the AI&apos;s knowledge base
              </p>
            </div>
            
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Upload files to build knowledge base
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Drag and drop files here, or click to select
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer inline-block"
                >
                  Choose Files
                </label>
                <p className="text-xs text-gray-400 mt-2">
                  Supported formats: PDF, DOC, TXT, and images
                </p>
              </div>
              
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Uploaded Files:</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                        </div>
                        <button
                          onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
