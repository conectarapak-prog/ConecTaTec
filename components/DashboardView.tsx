import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { StatCard } from './StatCard';
import { Icons } from './Icons';
import { ChartDataPoint, Task } from '../types';

const data: ChartDataPoint[] = [
  { name: 'Lun', value: 4000, revenue: 2400 },
  { name: 'Mar', value: 3000, revenue: 1398 },
  { name: 'Mie', value: 2000, revenue: 9800 },
  { name: 'Jue', value: 2780, revenue: 3908 },
  { name: 'Vie', value: 1890, revenue: 4800 },
  { name: 'Sab', value: 2390, revenue: 3800 },
  { name: 'Dom', value: 3490, revenue: 4300 },
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
      // Initial sample tasks
      setTasks([
        { id: '1', text: 'Revisar reporte semanal', completed: false },
        { id: '2', text: 'Actualizar base de usuarios', completed: true },
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
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Ingresos Totales" 
          value="$45,231.89" 
          change={20.1} 
          icon={<Icons.Dollar className="w-5 h-5" />} 
        />
        <StatCard 
          title="Usuarios Activos" 
          value="2,345" 
          change={15.3} 
          icon={<Icons.Users className="w-5 h-5" />} 
        />
        <StatCard 
          title="Ventas" 
          value="12,095" 
          change={-4.5} 
          icon={<Icons.Activity className="w-5 h-5" />} 
        />
        <StatCard 
          title="Tasa de Rebote" 
          value="24.57%" 
          change={-2.1} 
          icon={<Icons.TrendingUp className="w-5 h-5" />} 
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Resumen de Rendimiento</h3>
            <select className="bg-surface border border-white/10 text-xs text-gray-300 rounded-lg px-2 py-1 outline-none">
              <option>Últimos 7 días</option>
              <option>Este mes</option>
              <option>Este año</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
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
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                <Area type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart/Widget */}
        <div className="glass-panel rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Fuentes de Tráfico</h3>
          <div className="h-[200px] w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.slice(0, 5)}>
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 flex items-center"><div className="w-2 h-2 rounded-full bg-violet-500 mr-2"></div>Directo</span>
                <span className="text-white font-medium">45%</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 flex items-center"><div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>Redes Sociales</span>
                <span className="text-white font-medium">32%</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 flex items-center"><div className="w-2 h-2 rounded-full bg-sky-500 mr-2"></div>Referidos</span>
                <span className="text-white font-medium">23%</span>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Transactions & To-Do */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 glass-panel rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">Transacciones Recientes</h3>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-white/5">
                <tr>
                  <th className="px-6 py-3">ID Transacción</th>
                  <th className="px-6 py-3">Usuario</th>
                  <th className="px-6 py-3">Fecha</th>
                  <th className="px-6 py-3">Monto</th>
                  <th className="px-6 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">#TRX-001</td>
                  <td className="px-6 py-4 text-gray-300">Ana García</td>
                  <td className="px-6 py-4 text-gray-400">Hoy, 14:30</td>
                  <td className="px-6 py-4 text-white font-medium">$120.00</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Completado</span></td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">#TRX-002</td>
                  <td className="px-6 py-4 text-gray-300">Carlos Ruiz</td>
                  <td className="px-6 py-4 text-gray-400">Ayer, 09:15</td>
                  <td className="px-6 py-4 text-white font-medium">$340.50</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">Pendiente</span></td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">#TRX-003</td>
                  <td className="px-6 py-4 text-gray-300">Maria Lopez</td>
                  <td className="px-6 py-4 text-gray-400">23 Oct, 2023</td>
                  <td className="px-6 py-4 text-white font-medium">$89.99</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Completado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* To-Do List Widget */}
        <div className="glass-panel rounded-xl p-6 flex flex-col h-[400px] lg:h-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Tareas Pendientes</h3>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nueva tarea..."
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
                <p className="text-sm">Todo al día</p>
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