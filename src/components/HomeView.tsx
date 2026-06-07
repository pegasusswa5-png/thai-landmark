import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, ShieldCheck, Heart, MapPin, Globe, CreditCard, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  lang: 'th' | 'en';
  setLang: (lang: 'th' | 'en') => void;
  onExplore: () => void;
}

export default function HomeView({ profile, setProfile, lang, setLang, onExplore }: HomeViewProps) {
  const [nameInput, setNameInput] = useState(profile.name);
  const [emailInput, setEmailInput] = useState(profile.email);
  const [isEditing, setIsEditing] = useState(false);
  
  // Local sign-in/up modal/form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      name: nameInput,
      email: emailInput
    }));
    setIsEditing(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      name: nameInput || (isSignUp ? 'New Explorer' : 'Aleksey Kovalev'),
      email: loginEmail || 'explorer@world.com',
      isLoggedIn: true
    }));
  };

  const handleLogout = () => {
    setProfile(prev => ({
      ...prev,
      isLoggedIn: false
    }));
    setLoginEmail('');
    setLoginPassword('');
  };

  const t = {
    title: lang === 'th' ? 'สบายใจเที่ยวถิ่นไทย' : 'Thai Local Tourism Planner',
    subtitle: lang === 'th' ? 'ช่วยชุมชน กระจายรายได้ สรรหาจุดลับทั่วไทยที่คุณอาจไม่เคยรู้' : 'Empowering micro-communities. Find authentic Hidden Gems & support local commerce.',
    startJourney: lang === 'th' ? 'เริ่มค้นหาจุดลับชุมชน' : 'Start Finding Hidden Gems',
    impactTitle: lang === 'th' ? 'ผลกระทบเชิงบวกของคุณ' : 'Your Sustainable Impact',
    localsHelped: lang === 'th' ? 'คนท้องถิ่นที่ได้รับความช่วยเหลือ' : 'Local Familes Supported',
    carbonSaved: lang === 'th' ? 'ลดคาร์บอนจากการเที่ยวสีเขียว' : 'Green Travel Score (Co2 Saved)',
    revenueContributed: lang === 'th' ? 'กระจายรายได้สู่ผู้สร้างสรรค์' : 'Revenue Distributed',
    profilePanel: lang === 'th' ? 'บัญชีผู้ใช้และค่าบริการภาษา' : 'Profile & Language Control',
    loginToSave: lang === 'th' ? 'เข้าสู่ระบบเพื่อเซฟแพลนนำเที่ยว' : 'Sign in to Save Plan Itinerary',
    welcomeBack: lang === 'th' ? 'ยินดีต้อนรับกลับมา!' : 'Welcome Back Wanderer!',
    editProfile: lang === 'th' ? 'แก้ไขบัญชีส่วนตัว' : 'Edit Personal Account',
    saveProfile: lang === 'th' ? 'บันทึกข้อมูล' : 'Save Details',
    logout: lang === 'th' ? 'ออกจากระบบ' : 'Logout',
    chooseLang: lang === 'th' ? 'เลือกภาษาที่แสดง' : 'Active Language',
    signInBtn: lang === 'th' ? 'เข้าสู่ระบบ' : 'Sign In',
    signUpBtn: lang === 'th' ? 'ลงทะเบียนใหม่' : 'Sign Up',
    dontHaveAcc: lang === 'th' ? 'ยังไม่มีบัญชีใช่ไหม?' : "Don't have an account?",
    alreadyHaveAcc: lang === 'th' ? 'มีบัญชีอยู่แล้ว?' : 'Already have an account?',
    fullName: lang === 'th' ? 'ชื่อเต็ม' : 'Full Name',
    emailField: lang === 'th' ? 'อีเมลที่ติดต่อได้' : 'Email Address',
    passwordField: lang === 'th' ? 'รหัสผ่าน' : 'Password'
  };

  return (
    <div id="home_view_wrapper" className="space-y-8">
      {/* Hero Header Section */}
      <div 
        id="hero_banner" 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-950 to-stone-900 p-8 md:p-12 text-white shadow-xl"
      >
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="absolute left-1/3 bottom-0 -mb-20 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300 font-medium">
            <Sparkles className="h-3 w-3" />
            {lang === 'th' ? 'สนับสนุนการท่องเที่ยวคาร์บต่ำร่วมกับวิสาหกิจชุมชน' : 'Supports Sustainable Eco-Tourism & Micro-Businesses'}
          </div>
          
          <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight">
            {t.title}
          </h1>
          <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light">
            {t.subtitle}
          </p>

          <div className="pt-4">
            <button
              id="hero_explore_btn"
              onClick={onExplore}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 transition-colors px-6 py-3.5 text-stone-950 font-semibold shadow-lg hover:shadow-emerald-500/20"
            >
              <MapPin className="h-5 w-5" />
              {t.startJourney}
            </button>
          </div>
        </div>
      </div>

      {/* Sustainable Score Info Cards for Social Good */}
      {profile.isLoggedIn && (
        <div id="impact_metrics_container" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-teal-50 p-3 text-teal-600">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <dt className="text-sm font-medium text-stone-500">{t.localsHelped}</dt>
                <dd id="metric_families" className="text-2xl font-bold text-stone-950">14 ครัวเรือน / 14 Locals</dd>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-emerald-50 p-3 text-emerald-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <dt className="text-sm font-medium text-stone-500">{t.carbonSaved}</dt>
                <dd id="metric_carbon" className="text-2xl font-bold text-stone-950">+89 kg CO₂</dd>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-amber-50 p-3 text-amber-600">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <dt className="text-sm font-medium text-stone-500">{t.revenueContributed}</dt>
                <dd id="metric_revenue" className="text-2xl font-bold text-stone-950">฿4,250 THB</dd>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile & Settings & Language Switcher Layout Split */}
      <div id="settings_split_grid" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Language and Preferences Setting Card */}
        <div id="language_switcher_card" className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-600" />
              {t.profilePanel}
            </h2>
            <p className="text-sm text-stone-500">
              {lang === 'th' ? 'เลือกการแสดงผลภาษาสำหรับคนต่างชาติและชาวไทย' : 'Choose local interface language translations for Thai & expats'}
            </p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-stone-700">{t.chooseLang}</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                id="lang_switch_th"
                onClick={() => { setLang('th'); }}
                className={`flex items-center justify-center gap-3 rounded-xl border p-4 font-semibold transition ${
                  lang === 'th' 
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm' 
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <span className="text-xl">🇹🇭</span>
                <span>ภาษาไทย (TH)</span>
              </button>
              <button
                id="lang_switch_en"
                onClick={() => { setLang('en'); }}
                className={`flex items-center justify-center gap-3 rounded-xl border p-4 font-semibold transition ${
                  lang === 'en' 
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm' 
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <span className="text-xl">🇬🇧</span>
                <span>English (EN)</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-orange-50 border border-orange-100 p-4">
            <p className="text-xs text-orange-850 leading-relaxed font-light">
              <strong>💡 Hint:</strong> {lang === 'th' 
                ? 'ระบบท่องเที่ยวเพื่อชุมชนจะช่วยแปลเนื้อหารีวิว ร้านอาหาร และจุดลับต่าง ๆ เป็นภาษาไทย/อังกฤษอย่างอัตโนมัติ เพื่อดึงดูดใจฝรั่งนักเดินทางแบบไร้รอยต่อ!' 
                : 'Our community system automatically converts reviews, secret food stalls, and homestays into English/Thai seamlessly, enabling expats to directly experience raw community values.'}
            </p>
          </div>
        </div>

        {/* User Login/Register or Profile settings */}
        <div id="auth_profile_card" className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          {!profile.isLoggedIn ? (
            <div id="login_form_section" className="space-y-5">
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-emerald-600" />
                  {isSignUp ? t.signUpBtn : t.signInBtn}
                </h2>
                <p className="text-sm text-stone-500">{t.loginToSave}</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">{t.fullName}</label>
                    <input
                      type="text"
                      id="signup_name"
                      required
                      value={nameInput}
                      onChange={(e) => {
                        setNameInput(e.target.value);
                      }}
                      className="w-full rounded-xl border border-stone-200 px-4 py-2 text-stone-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      placeholder="e.g. Somying Jaidee"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1">{t.emailField}</label>
                  <input
                    type="email"
                    id="login_email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2 text-stone-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1">{t.passwordField}</label>
                  <input
                    type="password"
                    id="login_password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2 text-stone-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  id="auth_submit_btn"
                  className="w-full cursor-pointer rounded-xl bg-stone-900 hover:bg-stone-800 transition text-white font-medium py-2.5 shadow-sm"
                >
                  {isSignUp ? t.signUpBtn : t.signInBtn}
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  id="toggle_auth_type"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 underline"
                >
                  {isSignUp ? t.alreadyHaveAcc : t.dontHaveAcc}
                </button>
              </div>
            </div>
          ) : (
            <div id="profile_details_section" className="space-y-6">
              <div className="border-b border-stone-100 pb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-stone-900">{t.welcomeBack}</h2>
                  <p className="text-sm text-stone-500">{t.profilePanel}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-extrabold uppercase">
                  {profile.name.charAt(0)}
                </div>
              </div>

              {!isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs text-stone-400 tracking-wider font-semibold uppercase">{t.fullName}</p>
                    <p id="profile_display_name" className="text-stone-900 font-bold text-lg">{profile.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-stone-400 tracking-wider font-semibold uppercase">{t.emailField}</p>
                    <p id="profile_display_email" className="text-stone-850">{profile.email}</p>
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button
                      id="edit_profile_btn"
                      onClick={() => {
                        setNameInput(profile.name);
                        setEmailInput(profile.email);
                        setIsEditing(true);
                      }}
                      className="rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-sm px-4 py-2"
                    >
                      {t.editProfile}
                    </button>
                    <button
                      id="logout_btn"
                      onClick={handleLogout}
                      className="rounded-xl bg-red-50 hover:bg-red-150 text-red-650 font-semibold text-sm px-4 py-2 transition"
                    >
                      {t.logout}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">{t.fullName}</label>
                    <input
                      type="text"
                      id="edit_profile_name"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 px-4 py-2 text-stone-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">{t.emailField}</label>
                    <input
                      type="email"
                      id="edit_profile_email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 px-4 py-2 text-stone-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="pt-2 flex gap-3">
                    <button
                      type="submit"
                      id="save_profile_btn"
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2"
                    >
                      {t.saveProfile}
                    </button>
                    <button
                      type="button"
                      id="cancel_edit_btn"
                      onClick={() => setIsEditing(false)}
                      className="rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-sm px-4 py-2"
                    >
                      {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
