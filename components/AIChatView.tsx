import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { jsPDF } from "jspdf";

const AIChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '¡Hola! Soy Nova, tu asistente de eventos. ¿Buscas un salón elegante para una boda, una terraza para un cumpleaños o un auditorio para una conferencia? ¡Cuéntame y te ayudaré a encontrarlo!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Lo siento, mis sistemas están recalibrando. Por favor intenta de nuevo en un momento.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(234, 88, 12); // Orange color
    doc.text("Plan de Evento - Nova", 10, 15);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generado: ${new Date().toLocaleString()}`, 10, 22);
    doc.line(10, 25, 200, 25);
    
    y = 35;

    messages.forEach((msg) => {
      // Check for page break
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      const isUser = msg.role === 'user';
      const roleTitle = isUser ? "Tú:" : "Nova:";
      
      // Role Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(isUser ? 75 : 234, isUser ? 85 : 88, isUser ? 99 : 12); 
      doc.text(roleTitle, 10, y);
      y += 5;

      // Message Body
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(0);
      
      const textLines = doc.splitTextToSize(msg.text, 190);
      doc.text(textLines, 10, y);
      
      y += (textLines.length * 5) + 10; 
    });

    doc.save(`nova-evento-${Date.now()}.pdf`);
  };

  const handleSendEmail = () => {
    setIsEmailSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsEmailSending(false);
      setEmailSuccess(true);
      setTimeout(() => setEmailSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden relative">
      
      {/* Notifications/Toasts */}
      {emailSuccess && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center animate-fade-in">
          <Icons.CheckCircle className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Recomendaciones enviadas</span>
        </div>
      )}

      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3 shadow-lg shadow-primary/20">
            <Icons.Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Nova Event Planner</h3>
            <div className="flex items-center text-xs text-primary font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse"></span>
              Ayudándote a planificar
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSendEmail}
            disabled={isEmailSending}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-xs font-medium text-gray-600"
          >
            {isEmailSending ? (
              <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            ) : (
              <Icons.Mail className="w-3.5 h-3.5" />
            )}
            <span>Email</span>
          </button>
          
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-xs font-medium"
          >
            <Icons.Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center mr-2 flex-shrink-0 mt-1 shadow-sm">
                  <Icons.Cpu className="w-4 h-4 text-primary" />
                </div>
              )}
              <div 
                className={`
                  max-w-[80%] rounded-2xl p-4 shadow-sm
                  ${isUser 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none'}
                  ${msg.isError ? 'border-red-200 text-red-600 bg-red-50' : ''}
                `}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
              {isUser && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2 flex-shrink-0 mt-1">
                  <Icons.User className="w-4 h-4 text-gray-500" />
                </div>
              )}
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center mr-2">
              <Icons.Cpu className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Pregunta por 'bodas en la playa' o 'salones para 100 personas'..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`
              absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors
              ${!input.trim() || isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-primary/10'}
            `}
          >
            <Icons.Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatView;