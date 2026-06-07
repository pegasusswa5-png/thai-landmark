import React, { useState } from 'react';
import { Accommodation, LocalFood } from '../types';
import { Home, Utensils, Star, MapPin, Tag, Phone, ShieldCheck } from 'lucide-react';

interface LocalServiceViewProps {
  accommodations: Accommodation[];
  foods: LocalFood[];
  lang: 'th' | 'en';
}

export default function LocalServiceView({ accommodations, foods, lang }: LocalServiceViewProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'rooms' | 'restaurants'>('all');
  const [regionFilter, setRegionFilter] = useState<'all' | 'north' | 'central' | 'south' | 'isan'>('all');

  const categories = [
    { id: 'all', th: 'แสดงทั่งหมด', en: 'All Local Services' },
    { id: 'rooms', th: '🏡 ที่พัก / โฮมสเตย์ชุมชน', en: '🏡 Homestays & Lodges' },
    { id: 'restaurants', th: '🍲 อาหารและร้านเด็ด', en: '🍲 Native Foods & Diners' }
  ];

  const regions = [
    { id: 'all', th: 'ทุกภาค', en: 'All Regions' },
    { id: 'north', th: 'ภาคเหนือ', en: 'North' },
    { id: 'central', th: 'ภาคกลาง', en: 'Central' },
    { id: 'isan', th: 'ภาคอีสาน', en: 'Isan' },
    { id: 'south', th: 'ภาคใต้', en: 'South' }
  ];

  const filteredAccommodations = accommodations.filter(item => {
    const matchReg = regionFilter === 'all' || item.region === regionFilter;
    return matchReg && (activeCategory === 'all' || activeCategory === 'rooms');
  });

  const filteredFoods = foods.filter(item => {
    const matchReg = regionFilter === 'all' || item.region === regionFilter;
    return matchReg && (activeCategory === 'all' || activeCategory === 'restaurants');
  });

  const getRegionName = (reg: string) => {
    switch (reg) {
      case 'north': return lang === 'th' ? 'ภาคเหนือ' : 'North';
      case 'central': return lang === 'th' ? 'ภาคกลาง' : 'Central';
      case 'isan': return lang === 'th' ? 'ภาคอีสาน' : 'Isan';
      case 'south': return lang === 'th' ? 'ภาคใต้' : 'South';
      default: return '';
    }
  };

  return (
    <div id="service_view_wrapper" className="space-y-8">
      
      {/* Visual filter controller */}
      <div id="service_filters_card" className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Utensils className="h-5 w-5 text-emerald-600" />
              {lang === 'th' ? 'ที่พักโฮมสเตย์ และ สุดยอดอาหารครัวชุมชน' : 'Accommodations & Local Foods'}
            </h3>
            <p className="text-xs text-stone-500 font-light mt-0.5">
              {lang === 'th' ? 'กินหรู อยู่แบบคนถิ่น ราคาเป็นธรรม และรายได้กระจายถึงแม่ค้าโดยตรง 100%' : 'Fair-trade homestays and authentic local diners where 100% of revenue empowers locals direct'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {regions.map(r => (
              <button
                key={r.id}
                id={`service_region_filter_${r.id}`}
                onClick={() => setRegionFilter(r.id as any)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                  regionFilter === r.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {lang === 'th' ? r.th : r.en}
              </button>
            ))}
          </div>
        </div>

        {/* Categories toggler */}
        <div id="category_toggle_row" className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
          {categories.map(c => (
            <button
              key={c.id}
              id={`service_category_toggle_${c.id}`}
              onClick={() => setActiveCategory(c.id as any)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeCategory === c.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-600'
              }`}
            >
              {lang === 'th' ? c.th : c.en}
            </button>
          ))}
        </div>
      </div>

      {/* Main split display: Homestays vs Food Diners */}
      <div id="service_listings_grid" className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* HOMESTAYS AND ACCOMMODATIONS SECTION (Page requirement) */}
        {(activeCategory === 'all' || activeCategory === 'rooms') && (
          <div id="homestays_column" className="space-y-6">
            <h4 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <Home className="h-5 w-5 text-emerald-600" />
              {lang === 'th' ? `โฮมสเตย์ชุมชนธรรมชาติดีเยี่ยม (${filteredAccommodations.length})` : `Community Eco-Homestays (${filteredAccommodations.length})`}
            </h4>

            {filteredAccommodations.length === 0 ? (
              <div className="rounded-xl border border-dashed border-stone-200 py-12 text-center text-stone-400 text-xs font-light">
                {lang === 'th' ? 'ไม่มีรายการที่พักในภาคนี้ขณะนี้' : 'No local homestays in this sector.'}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAccommodations.map(acc => (
                  <div
                    key={acc.id}
                    id={`acc_list_item_${acc.id}`}
                    className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm flex flex-col sm:flex-row"
                  >
                    <div className="h-44 sm:h-auto sm:w-48 bg-stone-100 flex-shrink-0">
                      <img
                        src={acc.bannerUrl}
                        alt={acc.name[lang]}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <span className="inline-block rounded bg-emerald-50 text-emerald-800 text-[9px] font-bold px-2 py-0.5 uppercase tracking-wide">
                            {getRegionName(acc.region)}
                          </span>
                          <div className="flex items-center text-amber-500 font-bold text-xs gap-1">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span>{acc.rating.toFixed(1)}</span>
                          </div>
                        </div>

                        <h5 className="font-bold text-stone-900 text-base leading-snug">
                          {acc.name[lang]}
                        </h5>
                        
                        <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 font-light">
                          {acc.description[lang]}
                        </p>
                      </div>

                      {/* Amenities (Page requirement) & Contact tags */}
                      <div className="space-y-3 pt-3 border-t border-stone-100">
                        <div className="flex flex-wrap gap-1.5">
                          {acc.amenities[lang].map((a, i) => (
                            <span key={i} className="rounded bg-stone-100 px-2 py-0.5 text-[9px] text-stone-600 font-medium font-mono">
                              ✓ {a}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <div>
                            <p className="text-[10px] text-stone-400 font-semibold uppercase">{lang === 'th' ? 'ช่วงราคา' : 'Price Range'}</p>
                            <p className="font-bold text-emerald-700 text-sm mt-0.5">{acc.priceRange}</p>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-[10px] text-stone-400 font-semibold uppercase">{lang === 'th' ? 'ติดต่อชุมชนโดยตรง' : 'Direct Booking contact'}</p>
                            <span className="inline-flex items-center gap-1 text-stone-800 font-bold mt-0.5 text-xs bg-stone-50 px-2.5 py-1 rounded border border-stone-200">
                              <Phone className="h-3.5 w-3.5 text-emerald-600" />
                              {acc.contact}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FOOD AND RESTAURANTS SECTION (Page requirement) */}
        {(activeCategory === 'all' || activeCategory === 'restaurants') && (
          <div id="local_foods_column" className="space-y-6">
            <h4 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <Utensils className="h-5 w-5 text-emerald-600" />
              {lang === 'th' ? `ร้านอาหารและเมนูลับห้ามพลาด (${filteredFoods.length})` : `Must-Eat Diners & Local Bites (${filteredFoods.length})`}
            </h4>

            {filteredFoods.length === 0 ? (
              <div className="rounded-xl border border-dashed border-stone-200 py-12 text-center text-stone-400 text-xs font-light">
                {lang === 'th' ? 'ไม่มีรายการร้านอาหารในภาคนี้ขณะนี้' : 'No regional local diners in this sector.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredFoods.map(food => (
                  <div
                    key={food.id}
                    id={`food_card_item_${food.id}`}
                    className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm flex flex-col"
                  >
                    <div className="h-40 overflow-hidden bg-stone-100 relative">
                      <img
                        src={food.bannerUrl}
                        alt={food.name[lang]}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-3 left-3 rounded bg-emerald-600 px-2 py-0.5 text-[9px] text-white font-bold uppercase tracking-wider">
                        {getRegionName(food.region)}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">{food.shopName[lang]}</p>
                        <h5 className="font-extrabold text-stone-950 text-base leading-snug">
                          {food.name[lang]}
                        </h5>
                        <p className="text-xs text-stone-600 leading-relaxed font-light mt-1">
                          {food.description[lang]}
                        </p>
                      </div>

                      <div className="border-t border-stone-100 pt-3 flex items-center justify-between text-xs">
                        <div>
                          <p className="text-[9px] text-stone-400 font-semibold uppercase">{lang === 'th' ? 'ราคาเฉลี่ย' : 'Average Price'}</p>
                          <p className="font-bold text-stone-900 mt-0.5">{food.price}</p>
                        </div>

                        <div className="rounded-lg bg-emerald-50 px-3 py-1.5 text-[10px] text-emerald-800 font-bold flex items-center gap-1 border border-emerald-100">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>{lang === 'th' ? 'วัตถุดิบท้องถิ่น 100%' : '100% Organic Local'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
