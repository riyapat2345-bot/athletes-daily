import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

const iconMap: Record<string, string> = {
  home: '🏠',
  profile: '⚽',
  meal: '🥗',
  calendar: '📅',
  workout: '💪',
  community: '👥',
};

export default function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white/80 backdrop-blur-2xl border-t border-pastel-purple/20 shadow-soft">
        <div className="max-w-lg mx-auto flex items-center justify-around px-1 py-1.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-2xl transition-all duration-300 min-w-0 ${
                  isActive
                    ? 'bg-gradient-to-b from-pastel-purple/40 to-pastel-blue/30 shadow-soft scale-105'
                    : 'hover:bg-pastel-purple/10'
                }`}
              >
                <span className={`text-base transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                  {iconMap[tab.icon] || '●'}
                </span>
                <span className={`text-[10px] font-semibold transition-colors duration-200 ${
                  isActive ? 'text-pastel-purpleDeep' : 'text-txt-muted'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
