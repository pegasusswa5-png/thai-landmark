import React, { useState } from 'react';
import { LocalPlace } from '../types';
import { MapPin, Globe, Film, Grid, Star, Play, X, Heart, MessageSquare } from 'lucide-react';

interface RegionalViewProps {
  places: LocalPlace[];
  lang: 'th' | 'en';
  onSelectPlace: (place: LocalPlace) => void;
  selectedPlace: LocalPlace | null;
  setSelectedPlace: (place: LocalPlace | null) => void;
}

export default function RegionalView({ places, lang, onSelectPlace, selectedPlace, setSelectedPlace }: RegionalViewProps) {
  const [activeRegion, setActiveRegion] = useState<'all' | 'north' | 'central' | 'south' | 'isan'>('all');
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);

  const regions = [
    { id: 'all', th: 'ทุกภาค', en: 'All Regions' },
    { id: 'north', th: 'ภาคเหนือ', en: 'Northern Thailand' },
    { id: 'central', th: 'ภาคกลาง', en: 'Central Thailand' },
    { id: 'isan', th: 'ภาคอีสาน', en: 'Isan (Northeast)' },
    { id: 'south', th: 'ภาคใต้', en: 'Southern Islands' }
  ];

  const filteredPlaces = activeRegion === 'all' 
    ? places 
    : places.filter(p => p.region === activeRegion);

  const getRegionName = (reg: string) => {
    switch (reg) {
      case 'north': return lang === 'th' ? 'ภาคเหนือ' : 'Northern';
      case 'central': return lang === 'th' ? 'ภาคกลาง' : 'Central';
      case 'isan': return lang === 'th' ? 'ภาคอีสาน' : 'Isan';
      case 'south': return lang === 'th' ? 'ภาคใต้' : 'Southern';
      default: return '';
    }
  };

  return (
    <div id="regional_explorer_wrapper" className="space-y-8">
      
      {/* Region Selector Tab Panels */}
      <div id="region_tabs_container" className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-600" />
              {lang === 'th' ? 'เจาะลึกวิถีชีวิตแต่ละภูมิภาค' : 'Explore by Thai Regions'}
            </h3>
            <p className="text-xs text-stone-500 font-light mt-0.5">
              {lang === 'th' ? 'คลิกเลือกภาคเพื่อค้นหาจุดลับและรีวิววิดีโอจากคนท้องถิ่น' : 'Select a regional sector to browse local guides and media vlogs'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {regions.map(r => (
              <button
                key={r.id}
                id={`region_selector_${r.id}`}
                onClick={() => {
                  setActiveRegion(r.id as any);
                  setSelectedPlace(null); // Clear selected place to show regional grid
                }}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeRegion === r.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {lang === 'th' ? r.th : r.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Places / Double Panel Layout */}
      <div id="regional_split_grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Destination Grid */}
        <div id="places_list_col" className={selectedPlace ? 'lg:col-span-1 space-y-4' : 'lg:col-span-3 space-y-4'}>
          <div className="flex justify-between items-center px-1">
            <h4 className="text-base font-bold text-stone-850">
              {lang === 'th' 
                ? `จุดนำเที่ยวในสายตาชุมชน (${filteredPlaces.length})` 
                : `Community Hubs Map (${filteredPlaces.length})`}
            </h4>
          </div>

          <div className={`grid gap-4 ${selectedPlace ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {filteredPlaces.map(place => {
              const isSelected = selectedPlace?.id === place.id;
              return (
                <div
                  key={place.id}
                  id={`reg_place_card_${place.id}`}
                  onClick={() => onSelectPlace(place)}
                  className={`cursor-pointer overflow-hidden rounded-xl border p-4 transition-all flex gap-4 bg-white ${
                    isSelected 
                      ? 'border-emerald-600 ring-1 ring-emerald-500 bg-emerald-50/20' 
                      : 'border-stone-200 hover:border-emerald-200 hover:shadow-sm'
                  }`}
                >
                  <img
                    src={place.bannerUrl}
                    alt={place.name[lang]}
                    referrerPolicy="no-referrer"
                    className="h-20 w-20 rounded-lg object-cover bg-stone-100 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <span className="inline-block rounded bg-stone-150 px-1.5 py-0.5 text-[9px] text-stone-600 font-bold uppercase tracking-wider mb-1">
                        {getRegionName(place.region)}
                      </span>
                      <h5 className="font-bold text-stone-900 text-sm truncate">
                        {place.name[lang]}
                      </h5>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="truncate max-w-[130px] font-light">{place.location[lang]}</span>
                      <span className="font-bold text-emerald-600 shrink-0">
                        {place.videos.length} Vlogs
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Media Reviews Detail Board */}
        {selectedPlace && (
          <div id="media_detail_board" className="lg:col-span-2 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-6">
            
            {/* Header row */}
            <div className="flex justify-between items-start border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-light">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{selectedPlace.location[lang]}</span>
                  <span className="text-stone-300">•</span>
                  <span className="font-bold text-emerald-700 uppercase">{getRegionName(selectedPlace.region)}</span>
                </div>
                <h3 id="selected_detail_title" className="text-2xl font-black text-stone-900 mt-1">
                  {selectedPlace.name[lang]}
                </h3>
              </div>
              <button
                id="close_review_detail_btn"
                onClick={() => setSelectedPlace(null)}
                className="rounded-full bg-stone-100 hover:bg-stone-200 p-2 text-stone-600 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Banner with layout visual */}
            <div className="relative h-56 rounded-xl overflow-hidden bg-stone-100">
              <img
                src={selectedPlace.bannerUrl}
                alt={selectedPlace.name[lang]}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs uppercase tracking-wide text-emerald-300 font-bold">
                  {lang === 'th' ? 'แหล่งภาพถ่ายชุมชนโดยคนในพื้นที่' : 'Local Photo Gallery'}
                </p>
                <p className="text-xs text-stone-200 mt-1 font-light max-w-md">
                  {selectedPlace.description[lang]}
                </p>
              </div>
            </div>

            {/* Images and Galleries tab */}
            <div className="space-y-3">
              <h5 className="font-bold text-stone-900 flex items-center gap-2 text-sm">
                <Grid className="h-4 w-4 text-emerald-600" />
                {lang === 'th' ? 'รูปภาพชุมชนเพิ่มเติม' : 'Local Snapshots'}
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedPlace.images.map((img, i) => (
                  <div key={i} className="h-24 overflow-hidden rounded-lg bg-stone-100">
                    <img
                      src={img}
                      alt={`Community index ${i}`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Video reviews section (Page requirement) */}
            <div className="space-y-4">
              <h5 className="font-bold text-stone-900 flex items-center gap-2 text-sm">
                <Film className="h-4 w-4 text-emerald-600" />
                {lang === 'th' ? 'วิดีโอรีวิวจากปากคนท้องถิ่นและนักเดินทาง' : 'Local Vlogs & Video Reviews'}
              </h5>

              <div id="video_items_grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedPlace.videos.map((vid, idx) => (
                  <div 
                    key={idx} 
                    id={`video_review_${idx}`}
                    className="group relative rounded-xl border border-stone-200 bg-stone-50 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Mock thumbnail overlay with play trigger */}
                    <div className="relative h-28 bg-stone-900 flex items-center justify-center text-white">
                      <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url(${selectedPlace.bannerUrl})` }}></div>
                      <button
                        id={`play_video_btn_${idx}`}
                        className="relative z-10 cursor-pointer h-10 w-10 bg-emerald-600 hover:bg-emerald-500 rounded-full flex items-center justify-center text-white transition shadow"
                        onClick={() => setCurrentVideoUrl(vid.url)}
                      >
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </button>
                      <span className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-[9px] font-mono text-stone-300">
                        {vid.duration}
                      </span>
                    </div>

                    <div className="p-3 space-y-1">
                      <p className="font-bold text-stone-900 text-xs line-clamp-1">
                        {vid.title[lang]}
                      </p>
                      <p className="text-[10px] text-stone-500 font-light">
                        {lang === 'th' ? 'ถ่ายโดย' : 'By'}: <span className="font-medium text-emerald-700">@{vid.author}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Human comment reviews */}
            <div className="space-y-4 pt-2 border-t border-stone-100">
              <h5 className="font-bold text-stone-900 flex items-center gap-2 text-sm">
                <MessageSquare className="h-4 w-4 text-emerald-600" />
                {lang === 'th' ? 'ความคิดเห็นจากคนในชุมชน/นักท่องเที่ยว' : 'Visitor guestbook comments'}
              </h5>

              <div className="space-y-4">
                {selectedPlace.reviews.map(rev => (
                  <div key={rev.id} className="flex gap-3 bg-stone-50 p-3.5 rounded-lg border border-stone-104">
                    <img
                      src={rev.avatarUrl}
                      alt={rev.author}
                      className="h-8 w-8 rounded-full bg-stone-200"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-stone-900">{rev.author}</span>
                        <div className="flex items-center text-amber-500 text-2xs gap-0.5">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-stone-800 font-light leading-relaxed">
                        {rev.comment[lang]}
                      </p>
                      <p className="text-[10px] text-stone-400 font-mono">{rev.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Embedded video player modal directly in view */}
      {currentVideoUrl && (
        <div id="video_viewer_modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="w-full max-w-3xl rounded-2xl bg-stone-900 border border-stone-800 p-4 space-y-3 relative">
            <button
              id="close_video_viewer"
              onClick={() => setCurrentVideoUrl(null)}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              {/* Fallback mock video loop with message to prevent missing YouTube embed crashes */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white text-sm bg-gradient-to-br from-stone-950 to-stone-900 space-y-2">
                <Play className="h-12 w-12 text-emerald-400 animate-pulse mb-2" />
                <p className="font-extrabold text-white text-base">
                  {lang === 'th' ? 'กำลังจำลองการสตรีมวิดีโอรีวิวเพื่อประหยัดข้อมูล' : 'Streaming Local Content Creator Vlog (Simulated Video Feed)'}
                </p>
                <p className="text-xs text-stone-300 font-light max-w-md leading-relaxed">
                  {lang === 'th' 
                    ? 'วิดีโอแนะนำมุมลับชุมชนนี้เปิดชมได้จริงผ่านโฮสต์ชุมชน เที่ยวถิ่นไทยสนับสนุนให้นักท่องเที่ยวเดินทางไปสัมผัสของจริงด้วยตัวเอง!'
                    : 'This system is configured to buffer beautiful, light localized shorts and community narratives directly from local guides.'}
                </p>
                <button
                  id="dismiss_simulated_video"
                  onClick={() => setCurrentVideoUrl(null)}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-white font-bold text-xs mt-4"
                >
                  {lang === 'th' ? 'กลับสู่หน้าภูมิภาค' : 'Return to Region'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
