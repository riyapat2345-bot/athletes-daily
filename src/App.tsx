import React, { useState } from 'react';
import TabBar from './components/TabBar';
import HomeTab from './tabs/HomeTab';
import MealPlanTab from './tabs/MealPlanTab';
import ProfileTab from './tabs/ProfileTab';
import CalendarTab from './tabs/CalendarTab';
import WorkoutTab from './tabs/WorkoutTab';
import CommunityTab from './tabs/CommunityTab';

const tabs = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'profile', label: 'My Sport', icon: 'profile' },
  { id: 'meal', label: 'Meal Plan', icon: 'meal' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'workout', label: 'Workout', icon: 'workout' },
  { id: 'community', label: 'Community', icon: 'community' },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderTab = () => {
    switch (activeTab) {
      case 'home': return <HomeTab onNavigate={setActiveTab} />;
      case 'profile': return <ProfileTab />;
      case 'meal': return <MealPlanTab />;
      case 'calendar': return <CalendarTab />;
      case 'workout': return <WorkoutTab />;
      case 'community': return <CommunityTab />;
      default: return <HomeTab onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto pb-24">
        {renderTab()}
      </div>
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
