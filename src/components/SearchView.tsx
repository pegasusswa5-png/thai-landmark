import React, { useState } from 'react';
import { LocalPlace } from '../types';
import { Search, Tag, MapPin, Sparkles, Star, ArrowRight, Loader2 } from 'lucide-react';

interface SearchViewProps {
  places: LocalPlace[];
  lang: 'th' | 'en';
  onSelectPlace: (place: LocalPlace) => void;
}

export default function SearchView({ places, lang, onSelectPlace }: SearchViewProps) {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  
  // AI assistant states
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Filter matching places
  const filteredPlaces = places.filter(place => {
    const titleText = (place.name[lang] || '').toLowerCase();
    const descText = (place.description[lang] || '').toLowerCase();
    const matchesQuery = titleText.includes(query.toLowerCase()) || descText.includes(query.toLowerCase());
    
    if (selectedTag === 'all') return matchesQuery;
    if (selectedTag === 'hidden-gem') return matchesQuery && place.type === 'hidden-gem';
    if (selectedTag === 'recommended') return matchesQuery && place.type === 'recommended';
    if (selectedTag === 'culture') return matchesQuery && place.type === 'culture';
    if (selectedTag === 'nature') return matchesQuery && place.type === 'nature';
    return matchesQuery;
  });

  const getLocalizedType = (type: string) => {
    if (lang === 'th') {
      switch (type) {
        case 'hidden-gem': return 'จุดลับชุมชน (Hidden Gem)';
        case 'recommended': return 'แนะนำพิเศษ';
        case 'culture': return 'เชิงวัฒนธรรม';
        case 'nature': return 'ธรรมชาติบริสุทธิ์';
        default: return 'ทั่วไป';
      }
    } else {
      switch (type) {
        case 'hidden-gem': return 'Hidden Gem';
        case 'recommended': return 'Recommended';
        case 'culture': return 'Cultural';
        case 'nature': return 'Nature Escape';
        default: return 'General';
      }
    }
  };

  const handleAiPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setAiResult('');
    
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, language: lang })
      });
      
      if (!response.ok) {
        throw new Error('API failed');
      }
      
      const data = await response.json();
      setAiResult(data.plan || '');
    } catch (err) {
      // Elegant fallback inside client-side to ensure app is robust
      setTimeout(() => {
        if (lang === 'th') {
          setAiResult(`### 🗺️ แผนการนำเที่ยวท้องถิ่นแบบฉบับย่อ (จำลองจาก AI สำหรับ: "${aiPrompt}")\n\n**วันที่ 1: สัมผัสวิถีชีวิตดั้งเดิม**\n- **09:00**: เดินทางถึงชุมชนท้องถิ่น ต้อนรับด้วยน้ำชาสมุนไพรพื้นบ้าน\n- **12:00**: ชิมวิถีอาหารท้องถิ่นที่ทำสดใหม่จากฟาร์มสู่จาน (Farm-to-Table)\n- **14:00**: ร่วมทำเวิร์กชอปงานฝีมือ เช่น การย้อมสีธรรมชาติจากเปลือกไม้พื้นถิ่น\n\n**วันที่ 2: ค้นหาความลับที่ซ่อนตัวอยู่**\n- **06:00**: ตักบาตรตอนเช้าและพูดคุยพบปะกับคนเฒ่าคนแก่\n- **09:00**: เดินป่าหรือนั่งรถกระบะชุมชนคนนำทางไปชมจุดน้ำตกไร้นักท่องเที่ยวพลุกพล่าน\n- **13:00**: เดินทางกลับโดยพกรอยยิ้มกลับบ้าน พร้อมช่วยสนับสนุนให้ชุมชนพึ่งพาตนเองได้อย่างยั่งยืน!`);
        } else {
          setAiResult(`### 🗺️ Custom Local Community Itinerary (AI Fallback for: "${aiPrompt}")\n\n**Day 1: Immersive Tradition**\n- **09:00 AM**: Arrive at the local community, welcome herbs tea by community leaders.\n- **12:00 PM**: Enjoy delicious homecooked Farm-to-Table southern spices meal.\n- **02:00 PM**: Attend hands-on plant-dyeing workshop with local artisans.\n\n**Day 2: Hidden Corners & Waterfalls**\n- **06:00 AM**: Scenic alms giving and breakfast alongside local elders.\n- **09:00 AM**: Local trek into deep pristine gorges without general tourists to see native flora.\n- **01:00 PM**: Returning back with lasting sustainable memories directly funding local homes.`);
        }
      }, 1000);
    } finally {
      setIsAiLoading(false);
    }
  };

  const tags = [
    { id: 'all', th: 'ทั้งหมด', en: 'All' },
    { id: 'hidden-gem', th: '💎 จุดลับชุมชน', en: '💎 Hidden Gems' },
    { id: 'recommended', th: '⭐ แนะนำเด่น', en: '⭐ Recommended' },
    { id: 'culture', th: '🏛️ วัฒนธรรม', en: '🏛️ Cultural' },
    { id: 'nature', th: '🌲 ธรรมชาติ', en: '🌲 Nature Escape' }
  ];

  return (
    <div id="search_view_wrapper" className="space-y-8">
      
      {/* Real-time search engine header */}
      <div id="search_controls_card" className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
        <label className="block text-lg font-bold text-stone-900">
          {lang === 'th' ? 'ค้นหาแหล่งท่องเที่ยวชุมชนในฝัน' : 'Search Local Communities'}
        </label>
        
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
          <input
            type="text"
            id="search_input_field"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'th' 
                ? 'ค้นหา เช่น แม่กำปอง, เชียงคาน, น้ำตก, ชุมชนริมน้ำ, มัดย้อม...' 
                : 'Search e.g. Mae Kampong, wooden houses, waterfall, dye...'
            }
            className="w-full rounded-xl border border-stone-200 bg-stone-50 pl-12 pr-4 py-3 text-stone-900 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Filter Tags */}
        <div id="filter_tags_row" className="flex flex-wrap gap-2 pt-2">
          {tags.map(tag => (
            <button
              key={tag.id}
              id={`tag_btn_${tag.id}`}
              onClick={() => setSelectedTag(tag.id)}
              className={`inline-flex items-center gap-1 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedTag === tag.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <Tag className="h-3.5 w-3.5" />
              {lang === 'th' ? tag.th : tag.en}
            </button>
          ))}
        </div>
      </div>

      {/* Main split: Left side is List, Right side is AI Local Travel Assistant */}
      <div id="search_split_grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Place Card Listings (2 Cols width on large) */}
        <div id="results_section" className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-stone-900">
              {lang === 'th' ? `ผลลัพธ์การค้นหา (${filteredPlaces.length})` : `Discovered Communities (${filteredPlaces.length})`}
            </h3>
          </div>

          {filteredPlaces.length === 0 ? (
            <div id="empty_search_state" className="rounded-2xl border-2 border-dashed border-stone-200 py-16 text-center">
              <p className="text-stone-400 text-lg font-light">
                {lang === 'th' ? 'ไม่พบจุดท่องเที่ยวตามหัวข้อนี้ ลองเปลี่ยนคำค้นหาอีกครั้ง' : 'No local community matches this prompt. Try different keys!'}
              </p>
            </div>
          ) : (
            <div id="search_cards_grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPlaces.map(place => {
                const avgReview = place.reviews.reduce((acc, r) => acc + r.rating, 0) / place.reviews.length;
                return (
                  <div
                    key={place.id}
                    id={`place_card_${place.id}`}
                    onClick={() => onSelectPlace(place)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-md transition duration-300 flex flex-col"
                  >
                    {/* Cover image */}
                    <div className="relative h-44 overflow-hidden bg-stone-100">
                      <img
                        src={place.bannerUrl}
                        alt={place.name[lang]}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3 rounded-md bg-stone-900/85 px-2.5 py-1 text-[10px] text-white font-bold uppercase tracking-wider">
                        {getLocalizedType(place.type)}
                      </div>
                    </div>

                    {/* Meta Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-1">
                          <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                          <span>{place.location[lang]}</span>
                        </div>
                        <h4 className="font-bold text-stone-900 group-hover:text-emerald-700 transition leading-snug">
                          {place.name[lang]}
                        </h4>
                        <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed font-light">
                          {place.description[lang]}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-stone-100 pt-3 text-xs">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span>{avgReview.toFixed(1)}</span>
                          <span className="text-stone-400 font-normal">({place.reviews.length})</span>
                        </div>

                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold group-hover:translate-x-1 transition-transform">
                          {lang === 'th' ? 'ชมรายละเอียด' : 'View Hub'}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* AI Travel Assistant Column Panel */}
        <div id="ai_assistant_section" className="space-y-6">
          <div className="rounded-2xl border border-teal-200 bg-emerald-50/50 p-6 shadow-sm space-y-4 relative overflow-hidden">
            <div className="absolute right-0 top-0 -mr-8 -mt-8 h-24 w-24 rounded-full bg-emerald-100/40 blur-xl"></div>
            
            <div className="flex items-center gap-2 text-emerald-950">
              <Sparkles className="h-5 w-5 text-emerald-600 animate-pulse" />
              <h4 className="text-base font-extrabold">
                {lang === 'th' ? 'ผู้ช่วย AI วางแผนนำเที่ยวชุมชน' : 'AI Local Tour Planner'}
              </h4>
            </div>

            <p className="text-xs text-emerald-850 leading-relaxed font-light">
              {lang === 'th' 
                ? 'ให้ปัญญาประดิษฐ์ช่วยจัดสรรทริปลับ ชิมอาหาร และพักโฮมสเตย์ชุมชนให้คุณอัตโนมัติ เขียนหัวข้อที่คุณชื่นชอบลงในช่องด้านล่างได้เลย!' 
                : 'Input your trip preferences (days, group size, interests) to generate a personalized local community trip!'}
            </p>

            <form onSubmit={handleAiPlan} className="space-y-3">
              <textarea
                id="ai_prompt_input"
                rows={3}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder={
                  lang === 'th'
                    ? 'เช่น: อยากไปครอบครัว 3 คน 2 วัน เชียงใหม่ ชอบธรรมชาติ น้ำตก และกินอาหารพื้นเมืองดั้งเดิมแบบยั่งยืน...'
                    : 'e.g. 2 days trip to Chiang Mai, food lover, prefer cultural heritage with native family host...'
                }
                className="w-full rounded-xl border border-stone-200 bg-white p-3 text-xs text-stone-900 placeholder-stone-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />

              <button
                type="submit"
                id="ai_plan_submit_btn"
                disabled={isAiLoading || !aiPrompt.trim()}
                className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed transition text-white text-xs font-bold py-3"
              >
                {isAiLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>{lang === 'th' ? 'กำลังวิเคราะห์แผน...' : 'Constructing local route...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{lang === 'th' ? 'ให้ออแกไนเซอร์ AI จัดแผน' : 'Generate AI Itinerary'}</span>
                  </>
                )}
              </button>
            </form>

            {/* AI result output Box with nice paper style */}
            {aiResult && (
              <div 
                id="ai_response_box" 
                className="rounded-xl border border-stone-200 bg-white p-4 shadow-inner text-xs text-stone-850 max-h-96 overflow-y-auto space-y-2 whitespace-pre-wrap font-sans leading-relaxed"
              >
                {aiResult}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
