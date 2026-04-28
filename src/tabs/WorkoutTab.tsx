import React, { useState } from 'react';

type WorkoutFocus = 'speed' | 'strength' | 'endurance' | 'technical' | '';

interface Exercise {
  name: string;
  sets: string;
  rest: string;
  tip: string;
}

interface WorkoutPlan {
  focus: WorkoutFocus;
  title: string;
  summary: string;
  duration: string;
  intensity: string;
  warmUp: string[];
  exercises: Exercise[];
  coolDown: string[];
  soccerTip: string;
}

const mockWorkouts: Record<string, WorkoutPlan> = {
  speed: {
    focus: 'speed',
    title: '⚡ Speed & Agility Blitz',
    summary: 'Explosive speed training designed to boost your sprint speed, first-step quickness, and change-of-direction ability on the pitch.',
    duration: '55 min',
    intensity: 'High',
    warmUp: ['5 min light jog around the pitch', 'Dynamic stretches: leg swings, hip circles, high knees', 'A-skips & B-skips (2x20m each)', '3 progressive sprints at 50%, 70%, 90%'],
    exercises: [
      { name: '40m Sprint Intervals', sets: '6 reps × 40m | Full recovery between', rest: '90 sec', tip: 'Focus on driving knees high and pumping arms — match-day acceleration starts here.' },
      { name: 'Ladder Agility Drills', sets: '4 sets × 3 patterns (in-out, lateral, icky shuffle)', rest: '45 sec', tip: 'Quick feet = quicker on the ball. Keep your eyes up, not on your feet.' },
      { name: 'Cone Zigzag Sprints', sets: '5 reps × 8 cones (5m apart)', rest: '60 sec', tip: 'Mimics dribbling past defenders — plant hard on your outside foot.' },
      { name: 'Reactive Shuttle Runs', sets: '4 reps × 20m (partner calls direction)', rest: '75 sec', tip: 'Soccer is about reacting, not just running — train your brain-body connection.' },
      { name: 'Resisted Sprints (band or hill)', sets: '4 reps × 30m', rest: '90 sec', tip: 'Builds explosive power for beating fullbacks to through-balls.' },
    ],
    coolDown: ['400m slow jog', 'Static stretches: hamstrings, quads, hip flexors (30s each)', 'Foam rolling on calves and IT band', 'Deep breathing for 2 minutes'],
    soccerTip: '🏟️ Soccer players sprint an average of 1,500m per match in 10–30m bursts. This session trains exactly those distances and recovery patterns.',
  },
  strength: {
    focus: 'strength',
    title: '💪 Soccer Strength Builder',
    summary: 'Lower-body dominant strength program targeting the muscles used in shooting, tackling, aerial duels, and sustained 90-minute performance.',
    duration: '60 min',
    intensity: 'Moderate-High',
    warmUp: ['5 min stationary bike or jump rope', 'Bodyweight squats × 15', 'Walking lunges × 10 each leg', 'Glute bridges × 15'],
    exercises: [
      { name: 'Barbell Back Squat', sets: '4 sets × 6 reps @ 75-80% 1RM', rest: '2 min', tip: 'The king of soccer strength — builds power for sprinting, jumping, and shielding.' },
      { name: 'Romanian Deadlift', sets: '3 sets × 8 reps', rest: '90 sec', tip: 'Protects your hamstrings — the #1 injury site for soccer players.' },
      { name: 'Bulgarian Split Squat', sets: '3 sets × 8 each leg', rest: '60 sec per leg', tip: 'Single-leg work mimics the running and kicking motion in soccer.' },
      { name: 'Box Jumps', sets: '4 sets × 6 reps', rest: '90 sec', tip: 'Explosive power for winning headers and beating opponents to 50-50 balls.' },
      { name: 'Copenhagen Plank', sets: '3 sets × 20 sec each side', rest: '45 sec', tip: 'Groin injury prevention — critical for soccer players who change direction constantly.' },
      { name: 'Pallof Press (Anti-rotation)', sets: '3 sets × 10 each side', rest: '45 sec', tip: 'Core stability for holding off defenders while maintaining balance on the ball.' },
    ],
    coolDown: ['5 min walking', 'Pigeon stretch, couch stretch, standing quad stretch', 'Hip 90/90 stretch × 30s each', 'Foam roll quads, glutes, and adductors'],
    soccerTip: '🔬 Studies show soccer players who strength train 2×/week reduce injury risk by 50% and improve sprint speed by 5-8% over a season.',
  },
  endurance: {
    focus: 'endurance',
    title: '🫁 90-Minute Engine Builder',
    summary: 'High-intensity interval and aerobic conditioning designed to keep you running strong from the first whistle to the 90th minute.',
    duration: '50 min',
    intensity: 'Moderate-High',
    warmUp: ['5 min easy jog', 'Dynamic mobility: hip openers, ankle circles, arm swings', 'High knees and butt kicks (2 × 20m)', '2 build-up runs at 60% and 80%'],
    exercises: [
      { name: 'Yo-Yo Intermittent Recovery Test Pattern', sets: '8 intervals × 40m (2×20m shuttle)', rest: '10 sec active rest', tip: 'The gold standard fitness test for soccer — train at match-like intensity patterns.' },
      { name: 'Half-Pitch Repeated Sprints', sets: '6 reps × 50m @ 90%', rest: '30 sec jog back', tip: 'Simulates repeated attacking runs — build the capacity to make runs all match long.' },
      { name: '4-Minute Tempo Runs', sets: '3 sets × 4 min at 85% max HR', rest: '2 min walk', tip: 'Builds aerobic base — the foundation that lets you sustain high-intensity efforts.' },
      { name: 'Small-Sided Game Simulation (Solo)', sets: '4 rounds × 3 min of mixed activity', rest: '1 min', tip: 'Alternate between jogging, shuffling, sprinting, and backpedaling — mimics a real match.' },
    ],
    coolDown: ['5 min slow jog transitioning to walk', 'Full-body static stretching circuit (8 stretches × 30s)', 'Diaphragmatic breathing: 5-5-5 pattern × 10 breaths'],
    soccerTip: '📊 Elite soccer players cover 10-13 km per match. Of that, 800-1200m are high-intensity sprints. This session builds both your aerobic base and repeated sprint ability.',
  },
  technical: {
    focus: 'technical',
    title: '🎯 Technical Skills Circuit',
    summary: 'Ball mastery and soccer-specific technical workout combining fitness with on-ball skill development for sharper touches under fatigue.',
    duration: '50 min',
    intensity: 'Moderate',
    warmUp: ['Ball juggling: 3 min freestyle', 'Dribble through cones at walking pace × 5', 'Short passing against a wall × 30 touches each foot', 'Inside-outside dribble rhythm drill × 2 min'],
    exercises: [
      { name: 'Cone Dribbling Circuit', sets: '4 sets × 10 cones (inside, outside, sole rolls)', rest: '30 sec', tip: 'Keep the ball within 1 foot — close control wins in tight spaces midfield.' },
      { name: 'Wall Pass Combos', sets: '4 sets × 2 min (alternate feet)', rest: '30 sec', tip: 'First touch is everything. Cushion the ball, then play it crisp.' },
      { name: 'Shooting Under Fatigue', sets: '3 rounds: 20m sprint → receive → shoot', rest: '45 sec', tip: 'Decisions degrade when tired — practice finishing after effort.' },
      { name: 'Rondo Solo (Ball Mastery)', sets: '3 sets × 3 min (La Croqueta, Cruyff turns, step-overs)', rest: '30 sec', tip: 'Every elite midfielder has 3-4 go-to moves. Master yours until they\'re reflexive.' },
      { name: 'Long Ball Accuracy', sets: '10 attempts each foot at target 30m away', rest: 'Walk to retrieve', tip: 'Switch play and diagonal balls open up the field — a game-changing skill.' },
    ],
    coolDown: ['Cool-down juggling: keep-ups at slow pace × 2 min', 'Calf and ankle flexibility work', 'Wrist-to-toe stretching sequence'],
    soccerTip: '⚽ Xavi completed 90%+ passing accuracy because he practiced simple passes 1,000+ times. Consistency beats complexity — master the basics under pressure.',
  },
};

export default function WorkoutTab() {
  const [focus, setFocus] = useState<WorkoutFocus>('');
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const focusOptions: { id: WorkoutFocus; icon: string; label: string; desc: string }[] = [
    { id: 'speed', icon: '⚡', label: 'Speed & Agility', desc: 'Sprint faster, cut sharper' },
    { id: 'strength', icon: '💪', label: 'Strength', desc: 'Power for tackles & shots' },
    { id: 'endurance', icon: '🫁', label: 'Endurance', desc: 'Last the full 90 minutes' },
    { id: 'technical', icon: '🎯', label: 'Technical', desc: 'Ball mastery & skills' },
  ];

  const handleGenerate = () => {
    if (!focus) return;
    setLoading(true);
    setPlan(null);
    setTimeout(() => {
      setPlan(mockWorkouts[focus]);
      setLoading(false);
      setExpandedIdx(null);
    }, 1600);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-purple/30 via-surface-100 to-pastel-pink/20" />
        <div className="absolute top-0 left-0 w-52 h-52 bg-pastel-purple/20 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/4" />
        <div className="relative px-5 pt-14 pb-6">
          <h1 className="text-2xl font-bold text-txt-primary">AI Workout Generator</h1>
          <p className="text-sm text-txt-muted mt-1">Soccer-specific training powered by AI ⚽</p>
        </div>
      </div>

      <div className="px-5 space-y-6 pb-8">
        {/* Focus Selection */}
        <section>
          <h2 className="text-sm font-semibold text-txt-secondary mb-3">Choose your focus</h2>
          <div className="grid grid-cols-2 gap-3">
            {focusOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => setFocus(opt.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 border-2 ${
                  focus === opt.id
                    ? 'border-pastel-purpleDeep/50 bg-pastel-purple/30 shadow-soft'
                    : 'border-transparent glass-card hover:shadow-glow'
                }`}
              >
                <span className="text-2xl">{opt.icon}</span>
                <p className="text-sm font-semibold text-txt-primary mt-2">{opt.label}</p>
                <p className="text-[11px] text-txt-muted mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!focus || loading}
          className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            focus && !loading
              ? 'bg-gradient-to-r from-pastel-purpleDeep to-pastel-blueDeep text-white shadow-soft hover:shadow-glow active:scale-[0.98]'
              : 'bg-surface-300/60 text-txt-light cursor-not-allowed'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Building your workout...
            </span>
          ) : (
            '✨ Generate AI Workout'
          )}
        </button>

        {/* Generated Plan */}
        {plan && (
          <div className="space-y-4">
            {/* Plan Header */}
            <div className="glass-card p-5 bg-gradient-to-br from-pastel-purple/15 to-white/70">
              <h2 className="text-xl font-bold text-txt-primary">{plan.title}</h2>
              <p className="text-xs text-txt-secondary mt-2 leading-relaxed">{plan.summary}</p>
              <div className="flex gap-3 mt-4">
                <span className="text-[11px] font-semibold bg-pastel-blue/40 text-pastel-blueDeep px-3 py-1 rounded-full">⏱ {plan.duration}</span>
                <span className="text-[11px] font-semibold bg-pastel-peach/40 text-orange-600 px-3 py-1 rounded-full">🔥 {plan.intensity}</span>
              </div>
            </div>

            {/* Warm Up */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold text-txt-primary flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-lg bg-pastel-yellow/50 flex items-center justify-center text-xs">🔥</span>
                Warm-Up
              </h3>
              <div className="space-y-2">
                {plan.warmUp.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-pastel-yellow/30 flex items-center justify-center text-[10px] text-txt-muted font-semibold flex-shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-xs text-txt-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Exercises */}
            {plan.exercises.map((ex, i) => (
              <button
                key={i}
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                className="glass-card w-full text-left overflow-hidden hover:shadow-glow transition-all duration-300"
              >
                <div className="px-4 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-pastel-purple/40 to-pastel-blue/30 flex items-center justify-center text-sm font-bold text-pastel-purpleDeep">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-txt-primary">{ex.name}</p>
                      <p className="text-[11px] text-txt-muted mt-0.5">{ex.sets}</p>
                    </div>
                  </div>
                  <span className={`text-txt-muted transition-transform duration-200 ${expandedIdx === i ? 'rotate-180' : ''}`}>▾</span>
                </div>
                {expandedIdx === i && (
                  <div className="px-4 pb-4 border-t border-pastel-purple/10 pt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold bg-pastel-green/40 text-pastel-greenDeep px-2 py-0.5 rounded-full">Rest: {ex.rest}</span>
                    </div>
                    <div className="bg-pastel-lavender/40 rounded-xl p-3">
                      <p className="text-[11px] text-txt-secondary leading-relaxed">💡 {ex.tip}</p>
                    </div>
                  </div>
                )}
              </button>
            ))}

            {/* Cool Down */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold text-txt-primary flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-lg bg-pastel-green/50 flex items-center justify-center text-xs">🧊</span>
                Cool-Down
              </h3>
              <div className="space-y-2">
                {plan.coolDown.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pastel-greenDeep/50 mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-txt-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Soccer Tip */}
            <div className="glass-card p-4 bg-gradient-to-r from-pastel-green/20 to-pastel-mint/30">
              <p className="text-xs text-txt-secondary leading-relaxed">{plan.soccerTip}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
