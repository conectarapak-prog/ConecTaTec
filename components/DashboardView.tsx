import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { StatCard } from './StatCard';
import { Icons } from './Icons';
import { ChartDataPoint, Task } from '../types';

// Data simulating Capital Raised vs Manufacturing Costs over time
const capitalData: ChartDataPoint[] = [
  { name: 'Ene', value: 120000, revenue: 45000 },
  { name: 'Feb', value: 155000, revenue: 52000 },
  { name: 'Mar', value: 280000, revenue: 140000 },
  { name: 'Abr', value: 340000, revenue: 160000 },
  { name: 'May', value: 490000, revenue: 210000 },
  { name: 'Jun', value: 650000, revenue: 250000 },
  { name: 'Jul', value: 890000, revenue: 380000 },
];

// Data showing innovation by sector
const sectorData = [
  { name: 'Agroindustria', value: 45 },
  { name: 'Textil', value: 32 },
  { name: 'Tecnología', value: 28 },
  { name: 'Artesanal', value: 15 },
  { name: 'Automotriz', value: 10 },
];

const DashboardView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from local storage
  useEffect(() => {
    const savedTasks = localStorage.getItem('nova_tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error parsing tasks:', error);
      }
    } else {
      // Initial sample tasks focusing on manufacturing and funding
      setTasks([
        { id: '1', text: 'Validar prototipo v2 con planta', completed: false },
        { id: '2', text: 'Contactar proveedores de acero', completed: true },
        { id: '3', text: 'Preparar pitch para ronda semilla', completed: false },
      ]);
    }
  }, []);

  // Save tasks to local storage
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
      {/* Stats Grid - Focused on Capital & Manufacturing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Capital Levantado" 
          value="$890,000" 
          change={125.4} 
          icon={<Icons.Dollar className="w-5 h-5" />} 
        />
        <StatCard 
          title="Inversores Activos" 
          value="456" 
          change={12.8} 
          icon={<Icons.Users className="w-5 h-5" />} 
        />
        <StatCard 
          title="Lotes en Producción" 
          value="24" 
          change={8.5} 
          icon={<Icons.Factory className="w-5 h-5" />} 
        />
        <StatCard 
          title="Proyectos Regionales" 
          value="18" 
          change={3.2} 
          icon={<Icons.Globe className="w-5 h-5" />} 
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="text-lg font-semibold text-white">Crecimiento de Fondos vs. Producción</h3>
               <p className="text-xs text-gray-400">Comparativa de capital entrante y costo de manufactura</p>
            </div>
            <select className="bg-surface border border-white/10 text-xs text-gray-300 rounded-lg px-2 py-1 outline-none">
              <option>Año Actual</option>
              <option>Histórico</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={capitalData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  formatter={(value) => [`$${value}`, '']}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Area name="Capital Levantado" type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                <Area name="Costo Producción" type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart/Widget */}
        <div className="glass-panel rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Marca Regional</h3>
          <p className="text-xs text-gray-400 mb-6">Inversión por Sector Productivo</p>
          <div className="h-[200px] w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} layout="vertical">
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={90} tick={{fill: '#94a3b8', fontSize: 11}} axisLine={false} tickLine={false}/>
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
             <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-emerald-400 font-medium">Líder: Agroindustria</span>
                <span className="text-white">45%</span>
             </div>
             <p className="text-xs text-gray-500">El sector de empaquetado sostenible está impulsando la región.</p>
          </div>
        </div>
      </div>

      {/* Bottom Row: Investments & Manufacturing Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Investments Table */}
        <div className="lg:col-span-2 glass-panel rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Últimos Patrocinios</h3>
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Tiempo Real</span>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-white/5">
                <tr>
                  <th className="px-6 py-3">Inversor</th>
                  <th className="px-6 py-3">Proyecto</th>
                  <th className="px-6 py-3">Fecha</th>
                  <th className="px-6 py-3">Monto</th>
                  <th className="px-6 py-3">Recompensa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">AG</div>
                     Ana García
                  </td>
                  <td className="px-6 py-4 text-gray-300">EcoTextiles Mx</td>
                  <td className="px-6 py-4 text-gray-400">Hoy, 14:30</td>
                  <td className="px-6 py-4 text-emerald-400 font-medium">$5,000</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300">Lote Temprano</span></td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">CR</div>
                     Carlos Ruiz
                  </td>
                  <td className="px-6 py-4 text-gray-300">Robótica Agrícola</td>
                  <td className="px-6 py-4 text-gray-400">Ayer, 09:15</td>
                  <td className="px-6 py-4 text-emerald-400 font-medium">$25,000</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">Acciones</span></td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs">ML</div>
                     Maria Lopez
                  </td>
                  <td className="px-6 py-4 text-gray-300">Cerámica Moderna</td>
                  <td className="px-6 py-4 text-gray-400">23 Oct</td>
                  <td className="px-6 py-4 text-emerald-400 font-medium">$1,200</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300">Producto</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Industrial To-Do List */}
        <div className="glass-panel rounded-xl p-6 flex flex-col h-[400px] lg:h-auto">
          <div className="flex items-center gap-2 mb-4">
             <div className="p-1.5 bg-accent/10 rounded-lg">
                <Icons.Hammer className="w-4 h-4 text-accent" />
             </div>
             <h3 className="text-lg font-semibold text-white">Gestión de Producción</h3>
          </div>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tarea de manufactura..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors placeholder-gray-500"
            />
            <button
              onClick={addTask}
              className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
            >
              <Icons.Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {tasks.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-2 opacity-50">
                <Icons.CheckCircle className="w-8 h-8" />
                <p className="text-sm">Producción al día</p>
              </div>
            )}
            {tasks.map(task => (
              <div 
                key={task.id} 
                className="group flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      task.completed 
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' 
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