import React, { useState } from 'react';
import { Icons } from './Icons';
import { supabase } from '../services/supabaseClient';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void; // New prop for switching
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [userType, setUserType] = useState<'client' | 'partner'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    terms: false,
    privacy: false
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Clean input
    const cleanedEmail = formData.email.trim();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanedEmail,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            role: userType === 'partner' ? 'owner' : 'client'
          }
        }
      });

      if (error) throw error;

      setIsSuccess(true);
      
      // Close modal after success message
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          terms: false,
          privacy: false
        });
      }, 3000);

    } catch (error: any) {
      console.error('Sign up error:', error);
      setErrorMessage(error.message || 'Error al registrarse. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex animate-fade-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Icons.Close className="w-6 h-6" />
        </button>

        {/* Left Side - Visual / Branding */}
        <div className="hidden md:flex w-2/5 bg-gray-900 relative flex-col justify-between p-8 text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                 <Icons.MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl">RinconIQQ</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-4">
              Crea experiencias inolvidables.
            </h2>
            <p className="text-gray-300">
              Únete a la comunidad líder en gestión de eventos de Tarapacá. Accede a precios exclusivos y gestión simplificada.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-white/10 rounded-full"><Icons.Check className="w-4 h-4 text-primary" /></div>
              <span>Sin costos ocultos</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-white/10 rounded-full"><Icons.Check className="w-4 h-4 text-primary" /></div>
              <span>Soporte 24/7</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-white/10 rounded-full"><Icons.Check className="w-4 h-4 text-primary" /></div>
              <span>Pagos Seguros</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in py-10">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-500">
                <Icons.CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Cuenta Creada!</h3>
              <p className="text-gray-500 mb-8 max-w-xs">
                Por favor verifica tu correo electrónico para confirmar tu cuenta y comenzar a usar RinconIQQ.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Crear Cuenta</h2>
                <p className="text-gray-500 text-sm mt-1">Completa tus datos para comenzar.</p>
              </div>

              {/* Account Type Toggle */}
              <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                <button
                  onClick={() => setUserType('client')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    userType === 'client' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icons.User className="w-4 h-4" />
                  Busco Espacio
                </button>
                <button
                  onClick={() => setUserType('partner')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    userType === 'partner' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icons.Briefcase className="w-4 h-4" />
                  Soy Dueño
                </button>
              </div>
              
              {errorMessage && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
                  <Icons.AlertTriangle className="w-4 h-4" />
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Nombre Completo</label>
                  <div className="relative">
                    <Icons.User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Email</label>
                    <div className="relative">
                      <Icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        required
                        type="email"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="juan@ejemplo.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Teléfono</label>
                    <div className="relative">
                      <Icons.Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        required
                        type="tel"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="+56 9 ..."
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Contraseña</label>
                  <div className="relative">
                    <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Mínimo 8 caracteres"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <Icons.EyeOff className="w-4 h-4" /> : <Icons.Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Compliance Checkboxes */}
                <div className="pt-2 space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        required
                        checked={formData.terms}
                        onChange={e => setFormData({...formData, terms: e.target.checked})}
                        className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-primary checked:border-primary transition-colors"
                      />
                      <Icons.Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" />
                    </div>
                    <span className="text-xs text-gray-500 leading-snug group-hover:text-gray-700 transition-colors">
                      Acepto los <a href="#" className="text-primary hover:underline">Términos y Condiciones</a> y confirmo que he leído las políticas de uso de RinconIQQ.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        required
                        checked={formData.privacy}
                        onChange={e => setFormData({...formData, privacy: e.target.checked})}
                        className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-primary checked:border-primary transition-colors"
                      />
                       <Icons.Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" />
                    </div>
                    <span className="text-xs text-gray-500 leading-snug group-hover:text-gray-700 transition-colors">
                      Acepto la <a href="#" className="text-primary hover:underline">Política de Privacidad</a> y el procesamiento de mis datos personales para fines del servicio.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/25 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Procesando...
                    </>
                  ) : (
                    "Crear Cuenta"
                  )}
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  ¿Ya tienes cuenta? <button type="button" onClick={onSwitchToLogin} className="text-primary font-bold hover:underline">Iniciar Sesión</button>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;