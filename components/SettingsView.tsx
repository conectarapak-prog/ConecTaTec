import React, { useState } from 'react';
import { Icons } from './Icons';

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary/50 ${
      checked ? 'bg-primary' : 'bg-gray-600'
    }`}
  >
    <div
      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

const SettingsView: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@nova.platform',
    role: 'Administrador'
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    publicProfile: false
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSaveProfile = () => {
    // Logic to save profile would go here
    alert('Perfil actualizado correctamente');
  };

  const handleUpdatePassword = () => {
    // Logic to update password
    alert('Solicitud de cambio de contraseña enviada');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Header with quick status */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Configuración de Cuenta</h2>
          <p className="text-gray-400 text-sm mt-1">Administra tu perfil y preferencias de seguridad.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <Icons.Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium text-emerald-400">Estado de Seguridad: Óptimo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Profile & General */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Profile Section */}
          <section className="glass-panel rounded-xl p-6">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-lg bg-primary/10 mr-3">
                <Icons.User className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white">Información Personal</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Nombre Completo</label>
                <div className="relative">
                  <Icons.User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-background/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Correo Electrónico</label>
                <div className="relative">
                  <Icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-background/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Rol</label>
                <input
                  type="text"
                  value={profile.role}
                  disabled
                  className="w-full bg-white/5 border border-white/5 rounded-lg py-2.5 px-4 text-sm text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={handleSaveProfile}
                className="flex items-center px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Icons.Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </button>
            </div>
          </section>

          {/* Security Section */}
          <section className="glass-panel rounded-xl p-6">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/10 mr-3">
                <Icons.Key className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Seguridad y Contraseña</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-sm text-gray-300">Contraseña Actual</label>
                    <input 
                      type="password" 
                      className="w-full bg-background/50 border border-white/10 rounded-lg py-2 px-4 text-sm text-white focus:border-emerald-500/50 outline-none"
                      placeholder="••••••••"
                    />
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-sm text-gray-300">Nueva Contraseña</label>
                    <input 
                      type="password" 
                      className="w-full bg-background/50 border border-white/10 rounded-lg py-2 px-4 text-sm text-white focus:border-emerald-500/50 outline-none"
                      placeholder="Mínimo 8 caracteres"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm text-gray-300">Confirmar Contraseña</label>
                    <input 
                      type="password" 
                      className="w-full bg-background/50 border border-white/10 rounded-lg py-2 px-4 text-sm text-white focus:border-emerald-500/50 outline-none"
                      placeholder="••••••••"
                    />
                 </div>
              </div>
              <button 
                onClick={handleUpdatePassword}
                className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Actualizar contraseña
              </button>
            </div>

            <div className="border-t border-white/10 pt-6 space-y-6">
               {/* 2FA Toggle */}
               <div className="flex items-center justify-between">
                 <div className="flex items-start gap-3">
                   <div className="mt-1 text-gray-400">
                     <Icons.Smartphone className="w-5 h-5" />
                   </div>
                   <div>
                     <h4 className="text-sm font-medium text-white">Autenticación de Dos Factores (2FA)</h4>
                     <p className="text-xs text-gray-400 mt-1 max-w-md">Añade una capa extra de seguridad requiriendo un código de tu teléfono al iniciar sesión.</p>
                   </div>
                 </div>
                 <Toggle 
                   checked={security.twoFactor} 
                   onChange={() => setSecurity({...security, twoFactor: !security.twoFactor})} 
                 />
               </div>

               {/* Login Alerts Toggle */}
               <div className="flex items-center justify-between">
                 <div className="flex items-start gap-3">
                   <div className="mt-1 text-gray-400">
                     <Icons.Bell className="w-5 h-5" />
                   </div>
                   <div>
                     <h4 className="text-sm font-medium text-white">Alertas de Inicio de Sesión</h4>
                     <p className="text-xs text-gray-400 mt-1 max-w-md">Recibe un correo cuando se inicie sesión desde un nuevo dispositivo.</p>
                   </div>
                 </div>
                 <Toggle 
                   checked={security.loginAlerts} 
                   onChange={() => setSecurity({...security, loginAlerts: !security.loginAlerts})} 
                 />
               </div>
            </div>
          </section>

          {/* Active Sessions */}
          <section className="glass-panel rounded-xl p-6">
             <div className="flex items-center mb-6">
              <div className="p-2 rounded-lg bg-accent/10 mr-3">
                <Icons.Globe className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white">Sesiones Activas</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-emerald-500/20">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                       <Icons.Cpu className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                       <p className="text-sm font-medium text-white">Chrome en Windows <span className="text-xs text-emerald-400 ml-2">(Sesión actual)</span></p>
                       <p className="text-xs text-gray-500">Madrid, España • IP: 192.168.1.1</p>
                    </div>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 opacity-70">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                       <Icons.Smartphone className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                       <p className="text-sm font-medium text-white">Safari en iPhone 13</p>
                       <p className="text-xs text-gray-500">Hace 2 horas • Madrid, España</p>
                    </div>
                 </div>
                 <button className="text-xs text-red-400 hover:text-red-300">Cerrar</button>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Danger Zone */}
        <div className="space-y-6">
           <div className="glass-panel rounded-xl p-6 border border-red-500/20 bg-red-500/5">
              <div className="flex items-center mb-4 text-red-400">
                <Icons.AlertTriangle className="w-5 h-5 mr-2" />
                <h3 className="text-lg font-semibold">Zona de Peligro</h3>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Las siguientes acciones son irreversibles. Por favor, procede con precaución.
              </p>
              
              <div className="space-y-4">
                <button className="w-full py-2.5 px-4 border border-red-500/30 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/10 transition-colors text-left flex items-center justify-between group">
                  <span>Cerrar Sesión en Todos los Dispositivos</span>
                  <Icons.LogOut className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </button>
                <button className="w-full py-2.5 px-4 bg-red-500/10 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/20 transition-colors text-left flex items-center justify-between group">
                  <span>Eliminar Cuenta</span>
                  <Icons.Trash className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </button>
              </div>
           </div>

           <div className="glass-panel rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Privacidad</h3>
              <div className="flex items-center justify-between mb-4">
                 <div className="text-xs text-gray-400">Perfil Público</div>
                 <Toggle 
                   checked={security.publicProfile} 
                   onChange={() => setSecurity({...security, publicProfile: !security.publicProfile})} 
                 />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Al desactivar esta opción, tu perfil no será visible para otros usuarios de la organización, excepto administradores.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsView;