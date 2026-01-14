import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Zap, 
  Briefcase, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <Database size={20} />, label: 'Asset Vault' },
    { icon: <Zap size={20} />, label: 'AI Matching' },
    { icon: <Briefcase size={20} />, label: 'Portfolios' },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 flex flex-col p-6 bg-slate-950">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">O</div>
        <h1 className="text-xl font-bold tracking-tight">OVERLORD</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              item.active 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' 
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-slate-800 pt-6 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-100">
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-rose-400 hover:text-rose-300">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;