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
      text: '¡Hola! Soy Nova, tu experta en innovación industrial y capital. ¿Necesitas ayuda para estructurar tu ronda de inversión o optimizar tu proceso de manufactura?',
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
        text: 'Lo siento, tuve problemas para conectar con mis servidores neurales. Inténtalo de nuevo.',
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
    doc.setTextColor(99, 102, 241); // Indigo color
    doc.text("Reporte Estratégico Nova", 10, 15);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, 22);
    doc.line(10, 25, 200, 25);
    
    y = 35;

    messages.forEach((msg) => {
      // Check for page break
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      const isUser = msg.role === 'user';
      const roleTitle = isUser ? "Emprendedor:" : "Nova IA:";
      
      // Role Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(isUser ? 75 : 16, isUser ? 85 : 185, isUser ? 99 : 129); // Gray or Emerald-ish
      doc.text(roleTitle, 10, y);
      y += 5;

      // Message Body
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(0);
      
      const textLines = doc.splitTextToSize(msg.text, 190);
      doc.text(textLines, 10, y);
      
      y += (textLines.length * 5) + 10; // Add spacing between messages
    });

    doc.save(`nova-estrategia-${Date.now()}.pdf`);
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
    <div className="h-[calc(100vh-8rem)] flex flex-col glass-panel rounded-xl overflow-hidden animate-fade-in relative">
      
      {/* Notifications/Toasts */}
      {emailSuccess && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-500/90 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur flex items-center animate-fade-in">
          <Icons.CheckCircle className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Enviado al correo vinculado</span>
        </div>
      )}

      {/* Chat Header with Actions */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-3 shadow-lg shadow-primary/20">
            <Icons.Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Asistente Industrial Nova</h3>
            <div className="flex items-center text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              En línea - Experta en Manufactura
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSendEmail}
            disabled={isEmailSending}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs font-medium text-gray-300 hover:text-white"
            title="Enviar transcripción al correo"
          >
            {isEmailSending ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Icons.Mail className="w-3.5 h-3.5" />
            )}
            <span>{isEmailSending ? 'Enviando...' : 'Enviar a Correo'}</span>
          </button>
          
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-colors text-xs font-medium text-primary hover:text-primary-100"
            title="Descargar plan en PDF"
          >
            <Icons.Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <Icons.Cpu className="w-4 h-4 text-primary" />
                </div>
              )}
              <div 
                className={`
                  max-w-[80%] rounded-2xl p-4 shadow-sm
                  ${isUser 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-surface border border-white/10 text-gray-200 rounded-tl-none'}
                  ${msg.isError ? 'border-red-500/50 text-red-200 bg-red-900/10' : ''}
                `}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <p className={`text-[10px] mt-2 opacity-60 ${isUser ? 'text-primary-100' : 'text-gray-500'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {isUser && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ml-2 flex-shrink-0 mt-1">
                  <Icons.User className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center mr-2">
              <Icons.Cpu className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-surface border border-white/10 rounded-2xl rounded-tl-none p-4 flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-surface border-t border-white/10">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Consulta sobre proveedores, costos o estrategias de inversión..."
            className="w-full bg-background/50 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`
              absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors
              ${!input.trim() || isLoading ? 'text-gray-600 cursor-not-allowed' : 'text-primary hover:bg-primary/10'}
            `}
          >
            <Icons.Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Mobile Quick Action for Email (visible only on small screens below input) */}
        <div className="mt-3 flex sm:hidden justify-end">
           <button 
             onClick={handleSendEmail}
             disabled={isEmailSending}
             className="text-[10px] text-gray-400 flex items-center hover:text-primary transition-colors"
           >
             {isEmailSending ? (
                <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin mr-1.5"></div>
             ) : (
                <Icons.Mail className="w-3 h-3 mr-1.5" />
             )}
             Enviar transcripción a mi correo
           </button>
        </div>

        <p className="text-center text-[10px] text-gray-600 mt-2 sm:mt-2 hidden sm:block">
          Nova utiliza inteligencia artificial para escalar tu negocio. Verifica datos financieros críticos.
        </p>
      </div>
    </div>
  );
};

export default AIChatView;