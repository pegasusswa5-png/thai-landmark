import React, { useState } from 'react';
import { mockPlaces, mockAccommodations, mockFoods } from './data';
import { LocalPlace, UserProfile } from './types';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import RegionalView from './components/RegionalView';
import LocalServiceView from './components/LocalServiceView';
import { Home, Search, Compass, Store, Heart, User, Sparkles, Globe } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'th' | 'en'>('th');
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'regions' | 'services'>('home');
  const [selectedPlace, setSelectedPlace] = useState<LocalPlace | null>(mockPlaces[0]); // Default to Mae Kampong

  const [profile, setProfile] = useState<UserProfile>({
    name: 'สัญจร ชุมชนไทย',
    email: 'traveler@localwisdom.org',
    language: 'th',
    favoritePlaces: ['mae-kampong'],
    isLoggedIn: true
  });

  const handleSelectPlace = (place: LocalPlace) => {
    setSelectedPlace(place);
    setActiveTab('regions'); // Transition to regional explorer with media reviews
    
    // Smooth scroll to media view container
    setTimeout(() => {
      const container = document.getElementById('media_detail_board');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const navItems = [
    { id: 'home', th: 'หน้าแรก', en: 'Home', icon: Home },
    { id: 'search', th: 'ค้นหาจุดลับ', en: 'Find Gems', icon: Search },
    { id: 'regions', th: 'เจาะภูมิภาค', en: 'Regions', icon: Compass },
    { id: 'services', th: 'ที่พัก & ร้านอาหาร', en: 'Rooms & Food', icon: Store }
  ];

  return (
    <div id="app_frame" className="min-h-screen bg-stone-50 font-sans text-stone-900 pb-20 md:pb-6">
      
      {/* Upper Desktop Sticky Navigation Header */}
      <header id="desktop_header" className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6">
          
          {/* Logo Brand tag */}
          <div 
            id="brand_logo" 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold shadow-sm">
              🇹🇭
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-stone-900 flex items-center gap-1">
                Thai Landmark
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase font-mono">
                  Planner
                </span>
              </h1>
            </div>
          </div>

          {/* Nav Items (Visible on Desktop) */}
          <nav id="desktop_nav" className="hidden md:flex space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav_btn_desktop_${item.id}`}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-800' 
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{lang === 'th' ? item.th : item.en}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick info badges / Profile summary / lang switch */}
          <div id="header_right_controls" className="flex items-center gap-3">
            
            {/* Quick Lang badge indicator */}
            <button
              id="header_lang_switcher"
              onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
              className="rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs px-2.5 py-1.5 font-bold transition-all flex items-center gap-1"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-650" />
              <span>{lang === 'th' ? 'TH' : 'EN'}</span>
            </button>

            {profile.isLoggedIn && (
              <div 
                id="header_user_pill"
                onClick={() => setActiveTab('home')}
                className="cursor-pointer items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-bold text-stone-700 hover:bg-stone-50 transition flex"
              >
                <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-800 flex items-center justify-center text-[10px] font-extrabold uppercase shrink-0">
                  {profile.name.charAt(0)}
                </div>
                <span className="max-w-[80px] truncate">{profile.name}</span>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Main Container Core Views Splitter */}
      <main id="main_layout_body" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        
        {activeTab === 'home' && (
          <HomeView
            profile={profile}
            setProfile={setProfile}
            lang={lang}
            setLang={setLang}
            onExplore={() => setActiveTab('search')}
          />
        )}

        {activeTab === 'search' && (
          <SearchView
            places={mockPlaces}
            lang={lang}
            onSelectPlace={handleSelectPlace}
          />
        )}

        {activeTab === 'regions' && (
          <RegionalView
            places={mockPlaces}
            lang={lang}
            onSelectPlace={handleSelectPlace}
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
          />
        )}

        {activeTab === 'services' && (
          <LocalServiceView
            accommodations={mockAccommodations}
            foods={mockFoods}
            lang={lang}
          />
        )}

      </main>

      {/* Mobile Sticky Bottom Tab Bar (Page requirement: Excellent Mobile Usability!) */}
      <footer id="mobile_bottom_bar" className="fixed bottom-0 left-0 right-0 z-45 border-t border-stone-200 bg-white/95 backdrop-blur-md py-2 px-3 md:hidden block shadow-lg">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav_btn_mobile_${item.id}`}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition ${
                  isActive 
                    ? 'text-emerald-700 font-extrabold' 
                    : 'text-stone-400 font-medium'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="text-[10px] tracking-tight truncate max-w-full">
                  {lang === 'th' ? item.th : item.en}
                </span>
              </button>
            );
          })}
        </div>
      </footer>

    </div>
  );
}
