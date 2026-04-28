import React, { useState } from 'react';

type MealGoal = 'pre-game' | 'post-match' | '';

interface MealPlan {
  goal: MealGoal;
  title: string;
  summary: string;
  macros: { calories: number; protein: string; carbs: string; fat: string; hydration: string };
  meals: { name: string; time: string; items: string[]; tip: string }[];
  soccerTip: string;
}

const mockMealPlans: Record<string, (h: string, w: string) => MealPlan> = {
  'pre-game': (height, weight) => {
    const w = parseInt(weight) || 154;
    const cal = Math.round(w * 18);
    return {
      goal: 'pre-game',
      title: '⚡ Pre-Game Energy Plan',
      summary: `Tailored for a ${height} cm, ${weight} lb soccer player. This plan maximizes glycogen stores and sustained energy for 90 minutes of high-intensity play.`,
      macros: { calories: cal, protein: `${Math.round(w * 0.7)}g`, carbs: `${Math.round(w * 3.5)}g`, fat: `${Math.round(w * 0.4)}g`, hydration: '3.5 L' },
      meals: [
        {
          name: '🌅 Breakfast — Glycogen Loading',
          time: 'Match Day – 4 hours before',
          items: ['Oatmeal with banana, honey & chia seeds', 'Whole wheat toast with almond butter', '2 scrambled eggs', 'Fresh orange juice (250ml)'],
          tip: 'High complex carbs to top off glycogen stores. Avoid high fiber to prevent GI discomfort.',
        },
        {
          name: '⚡ Pre-Match Snack',
          time: '90 min before kickoff',
          items: ['Energy bar (dates, oats, peanut butter)', 'Small banana', 'Electrolyte drink (500ml)'],
          tip: 'Easily digestible carbs for a quick energy boost without feeling heavy.',
        },
        {
          name: '🥤 Halftime Fuel',
          time: 'During match',
          items: ['Sports drink with electrolytes (300ml)', 'Energy gel or 2 orange slices'],
          tip: 'Quick sugar replenishment to maintain sprint speed in the second half.',
        },
        {
          name: '🍝 Pre-Match Day Dinner',
          time: 'Night before the match',
          items: ['Grilled chicken breast with pasta', 'Side of steamed broccoli & sweet potato', 'Mixed green salad with olive oil', 'Greek yogurt with berries'],
          tip: 'Classic carb-loading dinner. Pasta provides slow-release energy for tomorrow\'s match.',
        },
      ],
      soccerTip: '🏟️ Soccer Tip: Start hydrating 24 hours before the match. Aim for pale yellow urine color by kickoff — this means you\'re optimally hydrated for peak sprint performance.',
    };
  },
  'post-match': (height, weight) => {
    const w = parseInt(weight) || 154;
    const cal = Math.round(w * 14);
    return {
      goal: 'post-match',
      title: '💚 Post-Match Recovery Plan',
      summary: `Tailored for a ${height} cm, ${weight} lb soccer player. This plan accelerates muscle repair, reduces inflammation, and replenishes depleted glycogen after 90+ minutes of play.`,
      macros: { calories: cal, protein: `${Math.round(w * 1.0)}g`, carbs: `${Math.round(w * 2.5)}g`, fat: `${Math.round(w * 0.5)}g`, hydration: '4.0 L' },
      meals: [
        {
          name: '🥤 Immediate Recovery (0–30 min)',
          time: 'Right after final whistle',
          items: ['Chocolate milk (400ml) or protein shake', 'Banana', 'Handful of salted pretzels'],
          tip: 'The 30-minute window is critical — 3:1 carb-to-protein ratio speeds glycogen replenishment by 40%.',
        },
        {
          name: '🍗 Recovery Meal (1–2 hours post)',
          time: '1–2 hours after match',
          items: ['Grilled salmon fillet (omega-3 anti-inflammatory)', 'Brown rice or quinoa', 'Roasted sweet potato wedges', 'Sautéed spinach with garlic'],
          tip: 'Salmon\'s omega-3 fatty acids reduce muscle inflammation and speed recovery between matches.',
        },
        {
          name: '🫐 Anti-Inflammatory Snack',
          time: 'Evening after match',
          items: ['Tart cherry juice (250ml)', 'Mixed nuts (almonds, walnuts)', 'Blueberry & Greek yogurt bowl'],
          tip: 'Tart cherry juice is proven to reduce muscle soreness by up to 48% in soccer players.',
        },
        {
          name: '🌙 Recovery Day Breakfast',
          time: 'Morning after match',
          items: ['Veggie omelet (3 eggs, spinach, peppers, mushrooms)', 'Avocado toast on sourdough', 'Turmeric golden milk latte', 'Fresh mixed fruit bowl'],
          tip: 'Turmeric\'s curcumin is a natural anti-inflammatory — perfect for day-after recovery.',
        },
      ],
      soccerTip: '🧊 Soccer Tip: Combine this meal plan with contrast water therapy (alternating cold/warm showers) to maximize recovery. Soccer players who combine nutrition + active recovery return to peak performance 30% faster.',
    };
  },
};

export default function MealPlanTab() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState<MealGoal>('');
  const [plan, setPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);

  const canGenerate = height.trim() && weight.trim() && goal;

  const handleGenerate = () => {
    if (!canGenerate) return;
    setLoading(true);
    setPlan(null);
    setTimeout(() => {
      setPlan(mockMealPlans[goal](height, weight));
      setLoading(false);
      setExpandedMeal(0);
    }, 1800);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-peach/30 via-surface-100 to-pastel-green/20" />
        <div className="absolute top-0 left-0 w-60 h-60 bg-pastel-peach/25 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/4" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-pastel-green/20 rounded-full blur-3xl translate-y-1/3 translate-x-1/4" />

        <div className="relative px-5 pt-14 pb-6">
          <h1 className="text-2xl font-bold text-txt-primary">AI Meal Planner</h1>
          <p className="text-sm text-txt-muted mt-1">Soccer-optimized nutrition for peak performance ⚽</p>
        </div>
      </div>

      <div className="px-5 space-y-6 pb-8">
        {/* Goal Selection */}
        <section>
          <h2 className="text-sm font-semibold text-txt-secondary mb-3">What's your goal?</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setGoal('pre-game')}
              className={`p-4 rounded-2xl text-left transition-all duration-300 border-2 ${
                goal === 'pre-game'
                  ? 'border-pastel-blueDeep/50 bg-pastel-blue/30 shadow-soft'
                  : 'border-transparent glass-card hover:shadow-glow'
              }`}
            >
              <span className="text-2xl">⚡</span>
              <p className="text-sm font-semibold text-txt-primary mt-2">Pre-Game Energy</p>
              <p className="text-[11px] text-txt-muted mt-1">Maximize energy & glycogen for match day</p>
            </button>
            <button
              onClick={() => setGoal('post-match')}
              className={`p-4 rounded-2xl text-left transition-all duration-300 border-2 ${
                goal === 'post-match'
                  ? 'border-pastel-greenDeep/50 bg-pastel-green/30 shadow-soft'
                  : 'border-transparent glass-card hover:shadow-glow'
              }`}
            >
              <span className="text-2xl">💚</span>
              <p className="text-sm font-semibold text-txt-primary mt-2">Post-Match Recovery</p>
              <p className="text-[11px] text-txt-muted mt-1">Repair muscles & reduce inflammation</p>
            </button>
          </div>
        </section>

        {/* Input Fields */}
        <section className="glass-card p-5">
          <h2 className="text-sm font-semibold text-txt-secondary mb-4">Your Measurements</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] text-txt-muted uppercase tracking-wider font-medium mb-1.5 block">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="178"
                className="w-full px-4 py-3 rounded-xl bg-surface-200/60 border border-pastel-purple/20 text-txt-primary text-sm font-medium placeholder:text-txt-light focus:outline-none focus:border-pastel-purpleDeep/40 focus:bg-white/60 transition-all"
              />
            </div>
            <div>
              <label className="text-[11px] text-txt-muted uppercase tracking-wider font-medium mb-1.5 block">Weight (lbs)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="154"
                className="w-full px-4 py-3 rounded-xl bg-surface-200/60 border border-pastel-purple/20 text-txt-primary text-sm font-medium placeholder:text-txt-light focus:outline-none focus:border-pastel-purpleDeep/40 focus:bg-white/60 transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!canGenerate || loading}
            className={`w-full mt-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              canGenerate && !loading
                ? 'bg-gradient-to-r from-pastel-purpleDeep to-pastel-blueDeep text-white shadow-soft hover:shadow-glow active:scale-[0.98]'
                : 'bg-surface-300/60 text-txt-light cursor-not-allowed'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating your plan...
              </span>
            ) : (
              '✨ Generate AI Meal Plan'
            )}
          </button>
        </section>

        {/* Generated Plan */}
        {plan && (
          <div className="space-y-4 animate-fadeIn">
            {/* Plan Header */}
            <div className={`glass-card p-5 ${
              plan.goal === 'pre-game'
                ? 'bg-gradient-to-br from-pastel-blue/20 to-white/70'
                : 'bg-gradient-to-br from-pastel-green/20 to-white/70'
            }`}>
              <h2 className="text-xl font-bold text-txt-primary">{plan.title}</h2>
              <p className="text-xs text-txt-secondary mt-2 leading-relaxed">{plan.summary}</p>

              {/* Macros */}
              <div className="grid grid-cols-5 gap-2 mt-4">
                {[
                  { label: 'Calories', val: `${plan.macros.calories}`, color: 'bg-pastel-peach/50' },
                  { label: 'Protein', val: plan.macros.protein, color: 'bg-pastel-pink/50' },
                  { label: 'Carbs', val: plan.macros.carbs, color: 'bg-pastel-yellow/50' },
                  { label: 'Fat', val: plan.macros.fat, color: 'bg-pastel-purple/40' },
                  { label: 'Water', val: plan.macros.hydration, color: 'bg-pastel-blue/50' },
                ].map((m, i) => (
                  <div key={i} className={`${m.color} rounded-xl p-2 text-center`}>
                    <p className="text-sm font-bold text-txt-primary">{m.val}</p>
                    <p className="text-[9px] text-txt-muted uppercase tracking-wide">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Meals */}
            {plan.meals.map((meal, i) => (
              <button
                key={i}
                onClick={() => setExpandedMeal(expandedMeal === i ? null : i)}
                className="glass-card w-full text-left overflow-hidden transition-all duration-300 hover:shadow-glow"
              >
                <div className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-txt-primary">{meal.name}</p>
                    <p className="text-[11px] text-txt-muted mt-0.5">⏰ {meal.time}</p>
                  </div>
                  <span className={`text-txt-muted transition-transform duration-200 ${expandedMeal === i ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </div>
                {expandedMeal === i && (
                  <div className="px-5 pb-4 border-t border-pastel-purple/10 pt-3 space-y-2">
                    {meal.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pastel-greenDeep/60 mt-1.5 flex-shrink-0" />
                        <p className="text-xs text-txt-secondary">{item}</p>
                      </div>
                    ))}
                    <div className="mt-3 bg-pastel-yellow/20 rounded-xl p-3">
                      <p className="text-[11px] text-txt-secondary leading-relaxed">💡 {meal.tip}</p>
                    </div>
                  </div>
                )}
              </button>
            ))}

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
