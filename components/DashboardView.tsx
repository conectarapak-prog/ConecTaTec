import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { StatCard } from './StatCard';
import { Icons } from './Icons';
import { ChartDataPoint, Task } from '../types';

// Updated: SaaS/Financial Growth Data
const growthData: ChartDataPoint[] = [
  { name: 'Mon', value: 4000, revenue: 2400 },
  { name: 'Tue', value: 3000, revenue: 1398 },
  { name: 'Wed', value: 2000, revenue: 9800 },
  { name: 'Thu', value: 2780, revenue: 3908 },
  { name: 'Fri', value: 1890, revenue: 4800 },
  { name: 'Sat', value: 2390, revenue: 3800 },
  { name: 'Sun', value: 3490, revenue: 4300 },
];

// Updated: User Demographics/Categories
const analyticsData = [
  { name: 'Organic', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Direct', value: 300 },
  { name: 'Referral', value: 200 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#38bdf8', '#0ea5e9'];

const DashboardView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('nova_tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error parsing tasks:', error);
      }
    } else {
      setTasks([
        { id: '1', text: 'Revisar informe mensual de Q3', completed: false },
        { id: '2', text: 'Actualizar proyecciones financieras', completed: true },
        { id: '3', text: 'Reunión con inversores principales', completed: false },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nova_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid - High Tech / Fintech Look */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Ingresos Totales" 
          value="$124,592" 
          change={12.5} 
          icon={<Icons.Dollar className="w-5 h-5" />} 
        />
        <StatCard 
          title="Usuarios Activos" 
          value="8,540" 
          change={2.4} 
          icon={<Icons.Users className="w-5 h-5" />} 
        />
        <StatCard 
          title="Nuevos Leads" 
          value="1,245" 
          change={-5.2} 
          icon={<Icons.TrendingUp className="w-5 h-5" />} 
        />
        <StatCard 
          title="Tasa de Conversión" 
          value="3.2%" 
          change={1.8} 
          icon={<Icons.Activity className="w-5 h-5" />} 
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass-panel rounded-xl p-6 relative overflow-hidden">
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>

          <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="text-lg font-semibold text-white">Rendimiento Financiero</h3>
               <p className="text-xs text-gray-400">Análisis de ingresos vs. tráfico semanal</p>
            </div>
            <div className="flex gap-2">
               <button className="px-3 py-1 text-xs rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white">Semana</button>
               <button className="px-3 py-1 text-xs rounded-lg text-gray-400 hover:text-white transition-colors">Mes</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                <Area type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources Widget */}
        <div className="glass-panel rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-1">Fuentes de Tráfico</h3>
          <p className="text-xs text-gray-400 mb-6">Distribución de visitas por canal</p>
          <div className="h-[200px] w-full mb-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData}>
                 <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                 <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', borderRadius: '8px' }} 
                 />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {analyticsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 space-y-3">
             <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-300">
                   <div className="w-2 h-2 rounded-full bg-primary"></div>
                   <span>Orgánico</span>
                </div>
                <span className="font-semibold text-white">40%</span>
             </div>
             <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-300">
                   <div className="w-2 h-2 rounded-full bg-secondary"></div>
                   <span>Redes Sociales</span>
                </div>
                <span className="font-semibold text-white">30%</span>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Transactions & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 glass-panel rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h3 className="text-lg font-semibold text-white">Actividad Reciente</h3>
            <button className="text-xs text-primary hover:text-primary-300 transition-colors">Ver todo</button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-black/20">
                <tr>
                  <th className="px-6 py-4 font-medium">Usuario</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                  <th className="px-6 py-4 font-medium">Fecha</th>
                  <th className="px-6 py-4 font-medium text-right">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                   { name: 'Spotify Sub', status: 'Completado', date: 'Hoy, 12:42', amount: '$14.99', img: 'S' },
                   { name: 'Adobe Creative', status: 'Procesando', date: 'Ayer, 09:11', amount: '$54.00', img: 'A' },
                   { name: 'AWS Cloud', status: 'Completado', date: '23 Oct', amount: '$120.50', img: 'C' }
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white group-hover:bg-primary group-hover:text-white transition-colors">
                          {item.img}
                       </div>
                       {item.name}
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                          item.status === 'Completado' 
                             ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                             : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                       }`}>
                          {item.status}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{item.date}</td>
                    <td className="px-6 py-4 text-white font-medium text-right">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Tasks */}
        <div className="glass-panel rounded-xl p-6 flex flex-col h-[400px] lg:h-auto">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-lg font-semibold text-white">Agenda</h3>
             <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Icons.CheckCircle className="w-4 h-4" />
             </div>
          </div>
          
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Añadir tarea..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors placeholder-gray-500"
            />
            <button
              onClick={addTask}
              className="bg-primary hover:bg-primary/90 text-white p-2.5 rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <Icons.Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            {tasks.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-2 opacity-50">
                <Icons.CheckCircle className="w-10 h-10" />
                <p className="text-sm">¡Todo listo por hoy!</p>
              </div>
            )}
            {tasks.map(task => (
              <div 
                key={task.id} 
                className={`group flex items-center justify-between p-3.5 rounded-xl transition-all border ${
                   task.completed ? 'bg-white/5 border-transparent opacity-60' : 'bg-surface border-white/10 hover:border-primary/30'
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      task.completed 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : 'border-gray-500 text-transparent hover:border-primary'
                    }`}
                  >
                    <Icons.Check className="w-3 h-3" strokeWidth={3} />
                  </button>
                  <span className={`text-sm truncate transition-all ${
                    task.completed ? 'text-gray-500 line-through' : 'text-gray-200'
                  }`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                >
                  <Icons.Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;