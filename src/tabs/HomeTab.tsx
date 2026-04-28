import React from 'react';

interface HomeTabProps {
  onNavigate: (tab: string) => void;
}

export default function HomeTab({ onNavigate }: HomeTabProps) {
  const stats = [
    { label: 'Weekly Sessions', value: '5', sub: 'of 6 planned', bg: 'bg-pastel-purple/40', text: 'text-pastel-purpleDeep' },
    { label: 'Calories Burned', value: '3,240', sub: 'this week', bg: 'bg-pastel-green/40', text: 'text-pastel-greenDeep' },
    { label: 'Next Match', value: '3d', sub: 'vs. FC Rivals', bg: 'bg-pastel-blue/40', text: 'text-pastel-blueDeep' },
    { label: 'Fitness Score', value: '87', sub: '/100', bg: 'bg-pastel-pink/40', text: 'text-pink-500' },
  ];

  const quickActions = [
    { label: 'Generate Meal Plan', icon: '🥗', tab: 'meal', desc: 'Fuel your next match' },
    { label: 'AI Workout', icon: '⚡', tab: 'workout', desc: 'Soccer-specific training' },
    { label: 'Log Practice', icon: '📅', tab: 'calendar', desc: 'Track your sessions' },
    { label: 'Team Hub', icon: '👥', tab: 'community', desc: 'Connect with teammates' },
  ];

  const todayPlan = [
    { time: '7:00 AM', activity: 'Morning Agility Drills', type: 'training', done: true },
    { time: '9:30 AM', activity: 'Protein-Packed Breakfast', type: 'meal', done: true },
    { time: '2:00 PM', activity: 'Team Tactical Practice', type: 'training', done: false },
    { time: '5:00 PM', activity: 'Recovery & Stretching', type: 'recovery', done: false },
    { time: '7:00 PM', activity: 'Post-Training Dinner', type: 'meal', done: false },
  ];

  const matchHighlights = [
    {
      date: 'Apr 20',
      opponent: 'FC Thunderbolts',
      result: 'W 3–1',
      won: true,
      playerStats: { goals: 1, assists: 1, passes: 42, sprints: 28, rating: 8.2 },
      highlights: ['Scored opening goal at 23\'', 'Key assist on counter-attack', 'Won 4/5 aerial duels'],
    },
    {
      date: 'Apr 13',
      opponent: 'Velocity SC',
      result: 'D 2–2',
      won: false,
      playerStats: { goals: 0, assists: 1, passes: 38, sprints: 31, rating: 7.1 },
      highlights: ['Through-ball assist at 67\'', 'Covered 11.2 km total distance', '88% pass accuracy'],
    },
    {
      date: 'Apr 6',
      opponent: 'Apex United',
      result: 'W 2–0',
      won: true,
      playerStats: { goals: 2, assists: 0, passes: 35, sprints: 24, rating: 9.0 },
      highlights: ['Brace — goals at 34\' and 78\'', 'Player of the Match ⭐', 'Clean sheet contribution'],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-lavender via-surface-100 to-pastel-sky" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-pastel-purple/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-pastel-green/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative px-5 pt-14 pb-8">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-txt-muted text-sm font-medium">Good morning ☀️</p>
              <h1 className="text-3xl font-bold text-txt-primary mt-1">
                Athletes <span className="gradient-text-pastel">Daily</span>
              </h1>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pastel-green to-pastel-blue flex items-center justify-center text-xl shadow-soft">
              ⚽
            </div>
          </div>
          <p className="text-txt-secondary text-sm mt-2">
            Soccer Season — <span className="text-pastel-greenDeep font-semibold">Week 14</span>
          </p>

          {/* Motivational Banner */}
          <div className="mt-6 glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pastel-yellow to-pastel-peach flex items-center justify-center text-lg flex-shrink-0">
                🏆
              </div>
              <div>
                <p className="text-sm font-semibold text-txt-primary">Match Day in 3 Days</p>
                <p className="text-xs text-txt-muted mt-0.5">Stay focused — recovery and nutrition are key this week.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-7 pb-8">
        {/* Stats Grid */}
        <section>
          <h2 className="text-lg font-semibold text-txt-primary mb-3">This Week</h2>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <div key={i} className="glass-card p-4 hover:shadow-glow transition-all duration-300">
                <div className={`text-2xl font-bold ${s.text}`}>{s.value}</div>
                <p className="text-xs text-txt-secondary font-medium mt-1">{s.label}</p>
                <p className="text-[10px] text-txt-muted mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ⚽ Match Day Highlights */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-txt-primary">Match Day Highlights</h2>
            <span className="text-[11px] font-medium text-pastel-purpleDeep bg-pastel-purple/30 px-2.5 py-1 rounded-full">
              Last 3 Matches
            </span>
          </div>
          <div className="space-y-3">
            {matchHighlights.map((match, i) => (
              <div key={i} className="glass-card overflow-hidden">
                {/* Match Header */}
                <div className={`px-4 py-3 flex items-center justify-between ${
                  match.won
                    ? 'bg-gradient-to-r from-pastel-green/40 to-transparent'
                    : 'bg-gradient-to-r from-pastel-yellow/40 to-transparent'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                      match.won
                        ? 'bg-pastel-greenDeep/20 text-pastel-greenDeep'
                        : 'bg-pastel-yellowDark/30 text-yellow-600'
                    }`}>
                      {match.won ? 'W' : 'D'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-txt-primary">vs. {match.opponent}</p>
                      <p className="text-[11px] text-txt-muted">{match.date}</p>
                    </div>
                  </div>
                  <span className={`text-lg font-bold ${
                    match.won ? 'text-pastel-greenDeep' : 'text-yellow-600'
                  }`}>
                    {match.result}
                  </span>
                </div>

                {/* Player Stats Row */}
                <div className="px-4 py-3 flex items-center justify-around border-b border-pastel-purple/10">
                  {[
                    { label: 'Goals', val: match.playerStats.goals, icon: '⚽' },
                    { label: 'Assists', val: match.playerStats.assists, icon: '🎯' },
                    { label: 'Passes', val: match.playerStats.passes, icon: '👟' },
                    { label: 'Sprints', val: match.playerStats.sprints, icon: '🏃' },
                    { label: 'Rating', val: match.playerStats.rating, icon: '⭐' },
                  ].map((stat, j) => (
                    <div key={j} className="text-center">
                      <span className="text-xs">{stat.icon}</span>
                      <p className="text-sm font-bold text-txt-primary">{stat.val}</p>
                      <p className="text-[9px] text-txt-muted uppercase tracking-wide">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Key Moments */}
                <div className="px-4 py-3 space-y-1.5">
                  {match.highlights.map((h, k) => (
                    <div key={k} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pastel-purpleDeep/60 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-txt-secondary">{h}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold text-txt-primary mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a, i) => (
              <button
                key={i}
                onClick={() => onNavigate(a.tab)}
                className="glass-card p-4 text-left hover:shadow-glow transition-all duration-300 group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{a.icon}</div>
                <p className="text-sm font-semibold text-txt-primary">{a.label}</p>
                <p className="text-[11px] text-txt-muted mt-0.5">{a.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Today's Plan */}
        <section>
          <h2 className="text-lg font-semibold text-txt-primary mb-3">Today's Plan</h2>
          <div className="glass-card divide-y divide-pastel-purple/10 overflow-hidden">
            {todayPlan.map((item, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${item.done ? 'opacity-50' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs flex-shrink-0 ${
                  item.done
                    ? 'bg-pastel-green/50 text-pastel-greenDeep'
                    : item.type === 'training'
                    ? 'bg-pastel-blue/50 text-pastel-blueDeep'
                    : item.type === 'meal'
                    ? 'bg-pastel-peach/50 text-orange-500'
                    : 'bg-pastel-purple/50 text-pastel-purpleDeep'
                }`}>
                  {item.done ? '✓' : item.type === 'training' ? '⚽' : item.type === 'meal' ? '🍽' : '🧘'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${item.done ? 'line-through text-txt-muted' : 'text-txt-primary'}`}>
                    {item.activity}
                  </p>
                  <p className="text-[11px] text-txt-muted">{item.time}</p>
                </div>
                {item.done && (
                  <span className="text-[10px] font-medium text-pastel-greenDeep bg-pastel-green/40 px-2 py-0.5 rounded-full">
                    Done
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Sprint Performance */}
        <section>
          <h2 className="text-lg font-semibold text-txt-primary mb-3">Sprint Performance</h2>
          <div className="glass-card p-5">
            <div className="flex items-end gap-1.5 h-32">
              {[65, 72, 68, 78, 82, 75, 88, 85, 90, 87, 92, 89].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-pastel-purpleDeep/70 to-pastel-blueDeep/60 transition-all duration-500 min-h-[4px]"
                    style={{ height: `${v}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-[10px] text-txt-muted">12 weeks ago</span>
              <span className="text-[10px] text-pastel-greenDeep font-semibold">↑ 12% improvement</span>
              <span className="text-[10px] text-txt-muted">This week</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
