import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vbubwqcgrnneyzmrwblh.supabase.co';
const supabaseKey = 'sb_publishable_hEls896q9FJVEs6rPr03Bw_2ixZEZgf';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Registra una interacción con la IA para análisis de oportunidades de negocio.
 * Permite saber qué están planeando los usuarios.
 */
export const logAIInteraction = async (
  userId: string | undefined,
  userEmail: string | undefined,
  prompt: string, 
  response: string
) => {
  try {
    const { error } = await supabase
      .from('ai_logs')
      .insert({
        user_id: userId || null,
        user_email: userEmail || 'anonymous',
        prompt: prompt,
        response: response,
        created_at: new Date().toISOString()
      });

    if (error) console.warn('Error logging AI chat (Non-critical):', error.message);
  } catch (err) {
    // Fail silently to not disrupt UX
    console.warn('Supabase logging skipped');
  }
};

/**
 * Registra términos de búsqueda para identificar tendencias de mercado.
 */
export const logSearchEvent = async (
  userId: string | undefined,
  userEmail: string | undefined,
  searchTerm: string,
  category: string
) => {
  try {
    const { error } = await supabase
      .from('search_logs')
      .insert({
        user_id: userId || null,
        user_email: userEmail || 'anonymous',
        search_term: searchTerm,
        category_filter: category,
        created_at: new Date().toISOString()
      });

    if (error) console.warn('Error logging search (Non-critical):', error.message);
  } catch (err) {
    console.warn('Supabase logging skipped');
  }
};

/**
 * Crea una nueva reserva en la base de datos.
 */
export const createBooking = async (
  userId: string | undefined,
  bookingData: {
    spaceId: string;
    spaceName: string;
    date: string;
    startTime: string;
    duration: number;
    guests: number;
    totalPrice: number;
  }
) => {
  if (!userId) throw new Error("Usuario no autenticado");

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      user_id: userId,
      space_id: bookingData.spaceId,
      space_name: bookingData.spaceName,
      event_date: bookingData.date,
      start_time: bookingData.startTime,
      duration_hours: bookingData.duration,
      guest_count: bookingData.guests,
      total_price: bookingData.totalPrice,
      status: 'confirmed' // Simulamos pago exitoso inmediato
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};