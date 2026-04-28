import React, { useState } from 'react';

interface TeamMember {
  name: string;
  position: string;
  number: string;
  status: 'online' | 'training' | 'offline';
  avatar: string;
}

interface TeamGroup {
  id: string;
  name: string;
  icon: string;
  members: number;
  lastActive: string;
  desc: string;
}

export default function CommunityTab() {
  const [activeSection, setActiveSection] = useState<'team' | 'friends'>('team');
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteSent, setInviteSent] = useState(false);

  const teammates: TeamMember[] = [
    { name: 'Marcus Johnson', position: 'Goalkeeper', number: '1', status: 'online', avatar: '🧤' },
    { name: 'David Park', position: 'Center Back', number: '4', status: 'training', avatar: '🛡️' },
    { name: 'Luca Rossi', position: 'Right Back', number: '2', status: 'online', avatar: '🏃' },
    { name: 'James Okafor', position: 'Defensive Mid', number: '6', status: 'offline', avatar: '⚙️' },
    { name: 'You (Alex)', position: 'Attacking Mid', number: '10', status: 'online', avatar: '⚽' },
    { name: 'Kai Tanaka', position: 'Left Winger', number: '11', status: 'training', avatar: '💨' },
    { name: 'Rafael Silva', position: 'Striker', number: '9', status: 'online', avatar: '🎯' },
    { name: 'Omar Hassan', position: 'Central Mid', number: '8', status: 'offline', avatar: '🔄' },
  ];

  const groups: TeamGroup[] = [
    { id: '1', name: 'FC Stormbreakers — Main', icon: '⚽', members: 22, lastActive: '2 min ago', desc: 'Full team chat & announcements' },
    { id: '2', name: 'Matchday Squad', icon: '🏟️', members: 16, lastActive: '15 min ago', desc: 'Starting XI + subs coordination' },
    { id: '3', name: 'Fitness Goals', icon: '💪', members: 12, lastActive: '1 hr ago', desc: 'Share workouts & progress' },
    { id: '4', name: 'Post-Match Recovery', icon: '🧊', members: 18, lastActive: '3 hrs ago', desc: 'Recovery tips & check-ins' },
    { id: '5', name: 'Film Room', icon: '🎬', members: 9, lastActive: '5 hrs ago', desc: 'Tactical analysis & match reviews' },
  ];

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setInviteEmail('');
      setShowInvite(false);
    }, 2000);
  };

  const statusColors = {
    online: { bg: 'bg-pastel-greenDeep', label: 'Online', labelBg: 'bg-pastel-green/40 text-pastel-greenDeep' },
    training: { bg: 'bg-pastel-blueDeep', label: 'Training', labelBg: 'bg-pastel-blue/40 text-pastel-blueDeep' },
    offline: { bg: 'bg-gray-300', label: 'Offline', labelBg: 'bg-gray-100 text-gray-400' },
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-pink/20 via-surface-100 to-pastel-blue/20" />
        <div className="absolute top-0 right-0 w-52 h-52 bg-pastel-pink/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="relative px-5 pt-14 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-txt-primary">Community</h1>
              <p className="text-sm text-txt-muted mt-1">Your team & soccer circle 👥</p>
            </div>
            <button
              onClick={() => setShowInvite(!showInvite)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pastel-purpleDeep to-pastel-blueDeep text-white text-xs font-semibold shadow-soft hover:shadow-glow transition-all"
            >
              + Invite
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-6 pb-8">
        {/* Invite Modal */}
        {showInvite && (
          <div className="glass-card p-5 bg-gradient-to-br from-pastel-pink/15 to-white/70">
            <h3 className="text-sm font-semibold text-txt-primary mb-1">Invite to Your Team</h3>
            <p className="text-[11px] text-txt-muted mb-4">Send an invite link to a friend or teammate</p>
            <div className="flex gap-2">
              <input
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                placeholder="Enter email or username..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-surface-200/60 border border-pastel-purple/20 text-sm text-txt-primary placeholder:text-txt-light focus:outline-none focus:border-pastel-purpleDeep/40"
              />
              <button
                onClick={handleInvite}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pastel-purpleDeep to-pastel-blueDeep text-white text-sm font-semibold shadow-soft"
              >
                {inviteSent ? '✓ Sent!' : 'Send'}
              </button>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 rounded-xl bg-pastel-blue/30 text-pastel-blueDeep text-xs font-semibold">📋 Copy Link</button>
              <button className="flex-1 py-2 rounded-xl bg-pastel-green/30 text-pastel-greenDeep text-xs font-semibold">💬 Share via Chat</button>
            </div>
          </div>
        )}

        {/* Section Toggle */}
        <div className="flex gap-2">
          {(['team', 'friends'] as const).map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeSection === section
                  ? 'bg-gradient-to-r from-pastel-purpleDeep to-pastel-blueDeep text-white shadow-soft'
                  : 'bg-white/50 border border-pastel-purple/20 text-txt-secondary hover:bg-white/70'
              }`}
            >
              {section === 'team' ? '⚽ My Team' : '🤝 Friends'}
            </button>
          ))}
        </div>

        {activeSection === 'team' ? (
          <>
            {/* Team Roster */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-txt-primary">FC Stormbreakers Roster</h2>
                <span className="text-[10px] font-semibold text-pastel-greenDeep bg-pastel-green/30 px-2.5 py-1 rounded-full">
                  {teammates.filter(t => t.status === 'online').length} online
                </span>
              </div>
              <div className="glass-card divide-y divide-pastel-purple/10 overflow-hidden">
                {teammates.map((tm, i) => {
                  const sc = statusColors[tm.status];
                  return (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-pastel-purple/5 transition-colors">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pastel-purple/30 to-pastel-blue/20 flex items-center justify-center text-lg">
                          {tm.avatar}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${sc.bg} border-2 border-white`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-txt-primary">{tm.name}</p>
                        <p className="text-[11px] text-txt-muted">#{tm.number} · {tm.position}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sc.labelBg}`}>
                        {sc.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Groups */}
            <section>
              <h2 className="text-sm font-semibold text-txt-primary mb-3">Team Groups</h2>
              <div className="space-y-3">
                {groups.map(g => (
                  <div key={g.id} className="glass-card p-4 hover:shadow-glow transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pastel-blue/30 to-pastel-green/20 flex items-center justify-center text-lg">
                        {g.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-txt-primary">{g.name}</p>
                        <p className="text-[11px] text-txt-muted">{g.desc}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-txt-muted">{g.members} members</p>
                        <p className="text-[10px] text-pastel-greenDeep font-medium">{g.lastActive}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Friends View */
          <section>
            <div className="glass-card p-8 text-center">
              <span className="text-4xl">🤝</span>
              <h3 className="text-lg font-semibold text-txt-primary mt-3">Connect with Friends</h3>
              <p className="text-xs text-txt-muted mt-2 max-w-xs mx-auto leading-relaxed">
                Find other soccer players, share workouts, compare match stats, and challenge each other to fitness goals.
              </p>
              <div className="mt-5 space-y-2">
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-pastel-purpleDeep to-pastel-blueDeep text-white text-sm font-semibold shadow-soft hover:shadow-glow transition-all">
                  🔍 Find Soccer Players Nearby
                </button>
                <button className="w-full py-3 rounded-xl bg-white/60 border border-pastel-purple/20 text-txt-secondary text-sm font-semibold hover:bg-white/80 transition-all">
                  📇 Import from Contacts
                </button>
                <button className="w-full py-3 rounded-xl bg-white/60 border border-pastel-purple/20 text-txt-secondary text-sm font-semibold hover:bg-white/80 transition-all">
                  🔗 Share My Profile Link
                </button>
              </div>
            </div>

            {/* Suggested */}
            <div className="mt-5">
              <h2 className="text-sm font-semibold text-txt-primary mb-3">Suggested Soccer Players</h2>
              <div className="space-y-3">
                {[
                  { name: 'Sofia Martinez', team: 'Phoenix FC', pos: 'Midfielder', mutual: 4 },
                  { name: 'Tyler Brooks', team: 'Metro Stars', pos: 'Forward', mutual: 2 },
                  { name: 'Anya Petrova', team: 'United Academy', pos: 'Defender', mutual: 6 },
                ].map((s, i) => (
                  <div key={i} className="glass-card p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/20 flex items-center justify-center text-lg">⚽</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-txt-primary">{s.name}</p>
                      <p className="text-[11px] text-txt-muted">{s.team} · {s.pos} · {s.mutual} mutual</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-pastel-purple/30 text-pastel-purpleDeep text-[11px] font-semibold hover:bg-pastel-purple/40 transition-colors">
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
