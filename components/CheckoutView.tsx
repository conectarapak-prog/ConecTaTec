import React, { useState } from 'react';
import { Space, User } from '../types';
import { Icons } from './Icons';
import { createBooking } from '../services/supabaseClient';

interface CheckoutViewProps {
  space: Space;
  user: User | null;
  onSuccess: () => void;
  onCancel: () => void;
  initialHours?: number;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ space, user, onSuccess, onCancel, initialHours = 5 }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Details, 2: Payment, 3: Success
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [duration, setDuration] = useState(initialHours);
  const [guests, setGuests] = useState(50);
  const [notes, setNotes] = useState('');
  
  // Payment State (Mock)
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const basePricePerHour = space.pricePerHour || Math.round(space.price / 10);
  const subtotal = basePricePerHour * duration;
  const serviceFee = Math.round(subtotal * 0.10); // 10% fee
  const total = subtotal + serviceFee;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; // Should be handled by guard in App

    setIsLoading(true);
    setError('');

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // --- SIMULATION LOGIC FOR TESTING ---
      // If card number ends in '0000', simulate a bank decline/error
      const cleanCard = cardNumber.replace(/\s/g, '');
      if (cleanCard.endsWith('0000')) {
        throw new Error('Pago rechazado por el banco emisor (Simulación de prueba).');
      }
      // ------------------------------------

      // Create booking in Supabase
      await createBooking(user.id, { // Assuming user.id exists, handled in App mapping
        spaceId: space.id,
        spaceName: space.name,
        date,
        startTime: time,
        duration,
        guests,
        totalPrice: total
      });

      setStep(3); // Success state
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Hubo un error al procesar el pago. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 animate-fade-in text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
           <Icons.CheckCircle className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Reserva Confirmada!</h2>
        <p className="text-gray-500 mb-8">
          Hemos enviado la confirmación y el recibo a <strong>{user?.email}</strong>. 
          El dueño del espacio se pondrá en contacto contigo pronto.
        </p>
        <div className="bg-gray-50 rounded-2xl p-6 max-w-md mx-auto mb-8 border border-gray-100 text-left">
           <div className="flex justify-between mb-2">
              <span className="text-gray-500">Evento:</span>
              <span className="font-bold text-gray-900">{space.name}</span>
           </div>
           <div className="flex justify-between mb-2">
              <span className="text-gray-500">Fecha:</span>
              <span className="font-medium text-gray-900">{date} • {time}</span>
           </div>
           <div className="flex justify-between">
              <span className="text-gray-500">Total Pagado:</span>
              <span className="font-bold text-primary">${total.toLocaleString()}</span>
           </div>
        </div>
        <button 
          onClick={onSuccess}
          className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-fade-in">
      <button onClick={onCancel} className="flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <Icons.ChevronLeft className="w-4 h-4 mr-1" /> Volver
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: FORMS */}
        <div className="flex-1">
          <div className="mb-8">
             <h2 className="text-3xl font-bold text-gray-900">
               {step === 1 ? 'Detalles del Evento' : 'Pago Seguro'}
             </h2>
             <div className="flex items-center gap-2 mt-2">
                <div className={`h-1.5 w-12 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`h-1.5 w-12 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`h-1.5 w-12 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
             </div>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700">Fecha del Evento</label>
                     <div className="relative">
                        <Icons.Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                           type="date" 
                           required
                           className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                           value={date}
                           onChange={(e) => setDate(e.target.value)}
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700">Hora de Inicio</label>
                     <div className="relative">
                        <Icons.Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                           type="time" 
                           required
                           className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                           value={time}
                           onChange={(e) => setTime(e.target.value)}
                        />
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700">Duración (Horas)</label>
                     <div className="relative">
                        <Icons.Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select 
                           className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                           value={duration}
                           onChange={(e) => setDuration(Number(e.target.value))}
                        >
                           {[2,3,4,5,6,7,8,10,12].map(h => (
                              <option key={h} value={h}>{h} Horas</option>
                           ))}
                        </select>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700">Invitados Estimados</label>
                     <div className="relative">
                        <Icons.Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                           type="number" 
                           min="1"
                           max={space.capacity}
                           className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                           value={guests}
                           onChange={(e) => setGuests(Number(e.target.value))}
                        />
                     </div>
                     <p className="text-xs text-gray-500">Máximo {space.capacity} personas</p>
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Notas Adicionales (Opcional)</label>
                  <textarea 
                     className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-32 resize-none"
                     placeholder="Requerimientos especiales de catering, música, accesibilidad..."
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
               </div>

               <button 
                  onClick={() => {
                     if (date && time && guests > 0) setStep(2);
                     else alert("Por favor completa los campos requeridos.");
                  }}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all text-lg"
               >
                  Continuar al Pago
               </button>
            </div>
          ) : (
            <form onSubmit={handlePayment} className="space-y-6">
               <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                  <Icons.Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                     <h4 className="font-bold text-blue-800 text-sm">Pago Encriptado</h4>
                     <p className="text-xs text-blue-600">Tus datos están protegidos con encriptación SSL de 256-bits.</p>
                  </div>
               </div>

               {error && (
                  <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-red-600 text-sm flex items-center gap-2 animate-fade-in">
                     <Icons.AlertTriangle className="w-4 h-4 flex-shrink-0" />
                     {error}
                  </div>
               )}

               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700">Nombre en la Tarjeta</label>
                     <input 
                        type="text" 
                        required
                        placeholder="Juan Pérez"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700">Número de Tarjeta</label>
                     <div className="relative">
                        <Icons.CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                           type="text" 
                           required
                           placeholder="0000 0000 0000 0000"
                           maxLength={19}
                           className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono"
                           value={cardNumber}
                           onChange={(e) => setCardNumber(e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim())}
                        />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Expiración</label>
                        <input 
                           type="text" 
                           required
                           placeholder="MM/AA"
                           maxLength={5}
                           className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-center"
                           value={expiry}
                           onChange={(e) => setExpiry(e.target.value)}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">CVC</label>
                        <div className="relative">
                           <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                           <input 
                              type="password" 
                              required
                              placeholder="123"
                              maxLength={3}
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-center"
                              value={cvc}
                              onChange={(e) => setCvc(e.target.value)}
                           />
                        </div>
                     </div>
                  </div>
               </div>

               <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all text-lg flex items-center justify-center gap-2"
               >
                  {isLoading ? (
                     <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Procesando...
                     </>
                  ) : (
                     <>Pagar ${total.toLocaleString()}</>
                  )}
               </button>
               <button 
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                  className="w-full text-gray-500 font-medium text-sm hover:text-gray-900"
               >
                  Volver a Detalles
               </button>
               
               <p className="text-[10px] text-gray-400 mt-4 text-center border-t border-gray-100 pt-2">
                 <strong>Modo de Prueba:</strong> Usa una tarjeta terminada en <strong>0000</strong> para simular un fallo en el pago.
               </p>
            </form>
          )}
        </div>

        {/* RIGHT COLUMN: SUMMARY */}
        <div className="w-full lg:w-1/3">
           <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl shadow-gray-200/50 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Resumen de la Orden</h3>
              
              <div className="flex gap-4 mb-6">
                 <img src={space.imageUrl} alt={space.name} className="w-20 h-20 rounded-lg object-cover" />
                 <div>
                    <h4 className="font-bold text-sm text-gray-900 leading-tight mb-1">{space.name}</h4>
                    <p className="text-xs text-gray-500">{space.type}</p>
                    <div className="flex items-center gap-1 mt-1">
                       <Icons.Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                       <span className="text-xs font-bold">{space.rating}</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-3 mb-6 border-t border-gray-100 pt-4">
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-600">${basePricePerHour.toLocaleString()} x {duration} horas</span>
                    <span className="font-medium text-gray-900">${subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tarifa de servicio (10%)</span>
                    <span className="font-medium text-gray-900">${serviceFee.toLocaleString()}</span>
                 </div>
                 {guests > 50 && (
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tarifa limpieza extra</span>
                        <span className="font-medium text-emerald-600">Gratis</span>
                     </div>
                 )}
              </div>

              <div className="flex justify-between items-center border-t border-gray-100 pt-4 mb-6">
                 <span className="font-bold text-gray-900">Total (CLP)</span>
                 <span className="font-extrabold text-2xl text-primary">${total.toLocaleString()}</span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 leading-relaxed flex gap-2">
                 <Icons.Shield className="w-4 h-4 text-gray-400 flex-shrink-0" />
                 <div>
                    <strong>Garantía RinconIQQ:</strong> Si el espacio no coincide con la descripción, te devolvemos el 100% de tu dinero.
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutView;