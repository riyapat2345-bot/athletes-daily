import React, { useState } from 'react';

interface Practice {
  id: string;
  date: string;
  title: string;
  type: 'team-practice' | 'individual' | 'match' | 'recovery';
  time: string;
  duration: string;
  notes: string;
}

const typeConfig = {
  'team-practice': { label: 'Team Practice', icon: '⚽', bg: 'bg-pastel-blue/40', text: 'text-pastel-blueDeep', border: 'border-pastel-blueDeep/30' },
  'individual': { label: 'Individual', icon: '🏃', bg: 'bg-pastel-purple/40', text: 'text-pastel-purpleDeep', border: 'border-pastel-purpleDeep/30' },
  'match': { label: 'Match Day', icon: '🏟️', bg: 'bg-pastel-peach/40', text: 'text-orange-600', border: 'border-orange-300/40' },
  'recovery': { label: 'Recovery', icon: '🧘', bg: 'bg-pastel-green/40', text: 'text-pastel-greenDeep', border: 'border-pastel-greenDeep/30' },
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarTab() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  const [practices, setPractices] = useState<Practice[]>([
    { id: '1', date: formatDate(today, 0), title: 'Team Tactical Session', type: 'team-practice', time: '10:00 AM', duration: '90 min', notes: 'Focus on set pieces and defensive shape' },
    { id: '2', date: formatDate(today, 1), title: 'Sprint & Agility Drills', type: 'individual', time: '7:00 AM', duration: '60 min', notes: 'Ladder drills, cone work, 40m sprints' },
    { id: '3', date: formatDate(today, 3), title: 'vs. FC Rivals', type: 'match', time: '3:00 PM', duration: '90 min', notes: 'League match — arrive 90 min early for warm-up' },
    { id: '4', date: formatDate(today, 4), title: 'Active Recovery & Stretching', type: 'recovery', time: '9:00 AM', duration: '45 min', notes: 'Light jog, foam rolling, yoga flow' },
    { id: '5', date: formatDate(today, -1), title: 'Passing & Possession', type: 'team-practice', time: '4:00 PM', duration: '90 min', notes: 'Rondos and small-sided games' },
    { id: '6', date: formatDate(today, 6), title: 'Gym — Lower Body', type: 'individual', time: '8:00 AM', duration: '60 min', notes: 'Squats, lunges, plyometrics for explosive power' },
  ]);

  const [formData, setFormData] = useState({ title: '', type: 'team-practice' as Practice['type'], time: '', duration: '', notes: '' });

  function formatDate(base: Date, offset: number): string {
    const d = new Date(base);
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
  }

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const getDateStr = (day: number) => `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const practicesForDate = (dateStr: string) => practices.filter(p => p.date === dateStr);
  const todayStr = today.toISOString().split('T')[0];

  const handleAdd = () => {
    if (!formData.title.trim()) return;
    setPractices([...practices, {
      id: Date.now().toString(),
      date: selectedDate,
      ...formData,
    }]);
    setFormData({ title: '', type: 'team-practice', time: '', duration: '', notes: '' });
    setShowForm(false);
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const selectedPractices = practicesForDate(selectedDate);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/30 via-surface-100 to-pastel-purple/20" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-pastel-blue/25 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="relative px-5 pt-14 pb-4">
          <h1 className="text-2xl font-bold text-txt-primary">Practice Calendar</h1>
          <p className="text-sm text-txt-muted mt-1">Plan your training sessions & match days 📅</p>
        </div>
      </div>

      <div className="px-5 space-y-5 pb-8">
        {/* Calendar */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="w-8 h-8 rounded-lg bg-surface-200/60 flex items-center justify-center text-txt-secondary hover:bg-surface-300/60 transition-colors">‹</button>
            <h3 className="text-sm font-semibold text-txt-primary">{monthName}</h3>
            <button onClick={nextMonth} className="w-8 h-8 rounded-lg bg-surface-200/60 flex items-center justify-center text-txt-secondary hover:bg-surface-300/60 transition-colors">›</button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(d => (
              <div key={d} className="text-center text-[10px] font-semibold text-txt-muted uppercase">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={i} />;
              const dateStr = getDateStr(day);
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDate;
              const hasPractice = practicesForDate(dateStr).length > 0;
              const hasMatch = practicesForDate(dateStr).some(p => p.type === 'match');

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 relative ${
                    isSelected
                      ? 'bg-gradient-to-br from-pastel-purpleDeep to-pastel-blueDeep text-white shadow-soft scale-105'
                      : isToday
                      ? 'bg-pastel-purple/30 text-pastel-purpleDeep ring-1 ring-pastel-purpleDeep/30'
                      : 'text-txt-secondary hover:bg-surface-200/60'
                  }`}
                >
                  {day}
                  {hasPractice && (
                    <div className={`absolute bottom-1 w-1 h-1 rounded-full ${
                      isSelected ? 'bg-white' : hasMatch ? 'bg-orange-400' : 'bg-pastel-blueDeep'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Practices */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-txt-primary">
              {selectedDate === todayStr ? "Today's Schedule" : new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pastel-purpleDeep to-pastel-blueDeep text-white text-xs font-semibold shadow-soft hover:shadow-glow transition-all"
            >
              + Add
            </button>
          </div>

          {/* Add Form */}
          {showForm && (
            <div className="glass-card p-4 mb-3 space-y-3">
              <input
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Session title..."
                className="w-full px-3 py-2.5 rounded-xl bg-surface-200/60 border border-pastel-purple/20 text-sm text-txt-primary placeholder:text-txt-light focus:outline-none focus:border-pastel-purpleDeep/40"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value as Practice['type']})}
                  className="px-3 py-2.5 rounded-xl bg-surface-200/60 border border-pastel-purple/20 text-sm text-txt-primary focus:outline-none"
                >
                  {Object.entries(typeConfig).map(([k, v]) => (
                    <option key={k} value={k}>{v.icon} {v.label}</option>
                  ))}
                </select>
                <input
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  placeholder="Time (e.g. 10:00 AM)"
                  className="px-3 py-2.5 rounded-xl bg-surface-200/60 border border-pastel-purple/20 text-sm text-txt-primary placeholder:text-txt-light focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={formData.duration}
                  onChange={e => setFormData({...formData, duration: e.target.value})}
                  placeholder="Duration (e.g. 90 min)"
                  className="px-3 py-2.5 rounded-xl bg-surface-200/60 border border-pastel-purple/20 text-sm text-txt-primary placeholder:text-txt-light focus:outline-none"
                />
                <input
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  placeholder="Notes..."
                  className="px-3 py-2.5 rounded-xl bg-surface-200/60 border border-pastel-purple/20 text-sm text-txt-primary placeholder:text-txt-light focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pastel-purpleDeep to-pastel-blueDeep text-white text-sm font-semibold shadow-soft">Add Session</button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl bg-surface-200/60 text-txt-secondary text-sm font-medium">Cancel</button>
              </div>
            </div>
          )}

          {selectedPractices.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <span className="text-3xl">📋</span>
              <p className="text-sm text-txt-muted mt-2">No sessions scheduled</p>
              <p className="text-xs text-txt-light mt-1">Tap "+ Add" to schedule practice</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedPractices.map(p => {
                const cfg = typeConfig[p.type];
                return (
                  <div key={p.id} className={`glass-card overflow-hidden border-l-4 ${cfg.border}`}>
                    <div className="px-4 py-3.5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                          {cfg.icon} {cfg.label}
                        </span>
                        {p.time && <span className="text-[11px] text-txt-muted">⏰ {p.time}</span>}
                      </div>
                      <p className="text-sm font-semibold text-txt-primary">{p.title}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        {p.duration && <span className="text-[11px] text-txt-muted">⏱ {p.duration}</span>}
                        {p.notes && <span className="text-[11px] text-txt-muted">📝 {p.notes}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Week Overview */}
        <section>
          <h2 className="text-sm font-semibold text-txt-primary mb-3">This Week at a Glance</h2>
          <div className="glass-card p-4">
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }, (_, i) => {
                const d = new Date(today);
                d.setDate(d.getDate() - d.getDay() + i);
                const ds = d.toISOString().split('T')[0];
                const prs = practicesForDate(ds);
                const isT = ds === todayStr;
                return (
                  <div key={i} className={`text-center p-2 rounded-xl ${isT ? 'bg-pastel-purple/20' : ''}`}>
                    <p className="text-[10px] text-txt-muted font-medium">{daysOfWeek[i]}</p>
                    <p className={`text-xs font-semibold mt-1 ${isT ? 'text-pastel-purpleDeep' : 'text-txt-secondary'}`}>{d.getDate()}</p>
                    <div className="mt-1.5 space-y-0.5">
                      {prs.map((pr, j) => (
                        <div key={j} className={`w-full h-1 rounded-full ${typeConfig[pr.type].bg}`} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
