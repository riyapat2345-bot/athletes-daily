import React, { useState } from 'react';

interface ProfileData {
  name: string;
  age: string;
  position: string;
  team: string;
  preferredFoot: string;
  yearsPlaying: string;
  jerseyNumber: string;
}

const positions = ['Goalkeeper', 'Center Back', 'Full Back', 'Wing Back', 'Defensive Midfielder', 'Central Midfielder', 'Attacking Midfielder', 'Winger', 'Striker', 'Forward'];

export default function ProfileTab() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Alex Rivera',
    age: '22',
    position: 'Attacking Midfielder',
    team: 'FC Stormbreakers',
    preferredFoot: 'Right',
    yearsPlaying: '14',
    jerseyNumber: '10',
  });
  const [form, setForm] = useState<ProfileData>(profile);

  const handleSave = () => {
    setProfile(form);
    setEditing(false);
  };

  const seasonStats = [
    { label: 'Appearances', value: '22', icon: '👟' },
    { label: 'Goals', value: '11', icon: '⚽' },
    { label: 'Assists', value: '8', icon: '🎯' },
    { label: 'Clean Sheets', value: '—', icon: '🛡️' },
    { label: 'Pass Accuracy', value: '87%', icon: '📊' },
    { label: 'Avg. Distance', value: '10.8 km', icon: '🏃' },
  ];

  const strengths = [
    { skill: 'Ball Control', level: 92 },
    { skill: 'Vision & Passing', level: 88 },
    { skill: 'Sprint Speed', level: 85 },
    { skill: 'Shooting', level: 80 },
    { skill: 'Stamina', level: 90 },
    { skill: 'Tackling', level: 65 },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-green/30 via-surface-100 to-pastel-blue/20" />
        <div className="absolute top-0 right-0 w-60 h-60 bg-pastel-green/25 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />

        <div className="relative px-5 pt-14 pb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-txt-primary">My Sport</h1>
            <button
              onClick={() => editing ? handleSave() : (setForm(profile), setEditing(true))}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                editing
                  ? 'bg-pastel-greenDeep/80 text-white shadow-soft'
                  : 'bg-white/70 border border-pastel-purple/30 text-txt-secondary hover:bg-white'
              }`}
            >
              {editing ? '✓ Save' : '✏️ Edit'}
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-6 pb-8">
        {/* Profile Card */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pastel-green to-pastel-blue flex items-center justify-center text-3xl shadow-soft">
              ⚽
            </div>
            <div className="flex-1">
              {editing ? (
                <input
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="text-xl font-bold text-txt-primary bg-pastel-purple/10 rounded-xl px-3 py-1.5 w-full border border-pastel-purple/20 focus:outline-none focus:border-pastel-purpleDeep/40"
                />
              ) : (
                <h2 className="text-xl font-bold text-txt-primary">{profile.name}</h2>
              )}
              <p className="text-sm text-txt-muted mt-0.5">#{profile.jerseyNumber} · {profile.position}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Team', key: 'team' as keyof ProfileData, icon: '🏟️' },
              { label: 'Position', key: 'position' as keyof ProfileData, icon: '📍' },
              { label: 'Age', key: 'age' as keyof ProfileData, icon: '🎂' },
              { label: 'Preferred Foot', key: 'preferredFoot' as keyof ProfileData, icon: '🦶' },
              { label: 'Years Playing', key: 'yearsPlaying' as keyof ProfileData, icon: '⏳' },
              { label: 'Jersey #', key: 'jerseyNumber' as keyof ProfileData, icon: '👕' },
            ].map((field, i) => (
              <div key={i} className="bg-surface-200/50 rounded-xl p-3">
                <p className="text-[10px] text-txt-muted uppercase tracking-wider mb-1">{field.icon} {field.label}</p>
                {editing ? (
                  field.key === 'position' ? (
                    <select
                      value={form[field.key]}
                      onChange={(e) => setForm({...form, [field.key]: e.target.value})}
                      className="text-sm font-semibold text-txt-primary bg-white/60 rounded-lg px-2 py-1 w-full border border-pastel-purple/20 focus:outline-none"
                    >
                      {positions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  ) : (
                    <input
                      value={form[field.key]}
                      onChange={(e) => setForm({...form, [field.key]: e.target.value})}
                      className="text-sm font-semibold text-txt-primary bg-white/60 rounded-lg px-2 py-1 w-full border border-pastel-purple/20 focus:outline-none"
                    />
                  )
                ) : (
                  <p className="text-sm font-semibold text-txt-primary">{profile[field.key]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Season Stats */}
        <section>
          <h2 className="text-lg font-semibold text-txt-primary mb-3">Season Stats</h2>
          <div className="grid grid-cols-3 gap-3">
            {seasonStats.map((s, i) => (
              <div key={i} className="glass-card p-3 text-center">
                <span className="text-lg">{s.icon}</span>
                <p className="text-xl font-bold text-txt-primary mt-1">{s.value}</p>
                <p className="text-[10px] text-txt-muted mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skill Radar */}
        <section>
          <h2 className="text-lg font-semibold text-txt-primary mb-3">Skill Breakdown</h2>
          <div className="glass-card p-5 space-y-3.5">
            {strengths.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-medium text-txt-secondary">{s.skill}</span>
                  <span className="text-xs font-bold text-txt-primary">{s.level}</span>
                </div>
                <div className="h-2.5 bg-surface-300/60 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      s.level >= 90 ? 'bg-gradient-to-r from-pastel-greenDeep to-pastel-greenDeep/70'
                        : s.level >= 80 ? 'bg-gradient-to-r from-pastel-blueDeep to-pastel-blueDeep/70'
                        : s.level >= 70 ? 'bg-gradient-to-r from-pastel-purpleDeep to-pastel-purpleDeep/70'
                        : 'bg-gradient-to-r from-pastel-peachDark to-pastel-peachDark/70'
                    }`}
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
