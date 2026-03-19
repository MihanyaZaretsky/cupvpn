'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Custom Cuphead-style Icons
const CupIcon = ({ active, className }: { active: boolean, className?: string }) => (
  <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`} style={{ filter: 'url(#roughen)' }}>
    {/* Handle */}
    <path d="M 70 45 C 95 40 95 75 70 75" fill="none" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
    {/* Straw */}
    <path d="M 45 30 L 55 10 L 70 15" fill="none" stroke={active ? "#e32636" : "#1a1a1a"} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 50 20 L 60 23" stroke="#1a1a1a" strokeWidth="4" />
    {/* Cup Body */}
    <path d="M 25 30 C 20 60 25 85 35 90 C 45 95 55 95 65 90 C 75 85 80 60 75 30 Z" fill={active ? "#f3e5c0" : "#fff"} stroke="#1a1a1a" strokeWidth="5" strokeLinejoin="round" />
    {/* Liquid/Top rim */}
    <ellipse cx="50" cy="30" rx="25" ry="8" fill={active ? "#fff" : "#fdfbf7"} stroke="#1a1a1a" strokeWidth="5" />
    {/* Face */}
    <ellipse cx="40" cy="55" rx="4" ry="8" fill="#1a1a1a" />
    <ellipse cx="60" cy="55" rx="4" ry="8" fill="#1a1a1a" />
    <path d="M 42 70 C 47 75 53 75 58 70" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const MoneyBagIcon = ({ active, className }: { active: boolean, className?: string }) => (
  <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`} style={{ filter: 'url(#roughen)' }}>
    {/* Bag Body */}
    <path d="M 20 80 C 5 50 25 40 35 40 C 50 42 75 40 80 80 C 85 110 10 110 20 80 Z" fill={active ? "#dcb878" : "#fff"} stroke="#1a1a1a" strokeWidth="5" strokeLinejoin="round" />
    {/* Bag Top / Tie */}
    <path d="M 35 20 C 25 5 75 5 65 20 C 60 35 40 35 35 20 Z" fill={active ? "#dcb878" : "#fff"} stroke="#1a1a1a" strokeWidth="5" strokeLinejoin="round" />
    {/* Tie string */}
    <path d="M 30 35 C 50 45 70 35 70 35" fill="none" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
    {/* Dollar Sign */}
    <text x="50" y="72" fontFamily="var(--font-rye), cursive" fontSize="35" fill="#1a1a1a" textAnchor="middle" fontWeight="bold" style={{ transform: 'rotate(-5deg)', transformOrigin: '50px 75px' }}>$</text>
  </svg>
);

const GearIcon = ({ active, className }: { active: boolean, className?: string }) => (
  <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`} style={{ filter: 'url(#roughen)' }}>
    <path d="M 45 10 C 55 8 58 18 62 20 C 72 15 78 25 72 32 C 85 35 82 48 80 52 C 88 60 80 72 72 68 C 75 80 62 85 58 78 C 48 88 38 82 38 78 C 25 85 18 72 25 62 C 12 58 15 45 22 42 C 12 32 22 20 28 25 C 32 15 40 12 45 10 Z" 
          fill={active ? "#a0c4ff" : "#fff"} stroke="#1a1a1a" strokeWidth="5" strokeLinejoin="round" />
    <path d="M 50 35 C 60 32 65 45 62 55 C 58 65 42 65 38 55 C 32 45 40 38 50 35 Z" fill={active ? "#fdfbf7" : "#fff"} stroke="#1a1a1a" strokeWidth="5" />
    <circle cx="50" cy="48" r="4" fill="#1a1a1a" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`} style={{ filter: 'url(#roughen)' }}>
    <path d="M 50 15 L 60 40 L 85 40 L 65 55 L 72 80 L 50 65 L 28 80 L 35 55 L 15 40 L 40 40 Z" fill="#f3e5c0" stroke="#1a1a1a" strokeWidth="5" strokeLinejoin="round" />
    <circle cx="40" cy="45" r="4" fill="#1a1a1a" />
    <circle cx="60" cy="45" r="4" fill="#1a1a1a" />
    <path d="M 45 55 C 50 60 55 55 55 55" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const WalletIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`} style={{ filter: 'url(#roughen)' }}>
    <path d="M 20 30 C 20 20 80 20 80 30 L 80 70 C 80 80 20 80 20 70 Z" fill="#dcb878" stroke="#1a1a1a" strokeWidth="5" strokeLinejoin="round" />
    <path d="M 20 45 C 40 45 50 50 50 50 C 50 50 40 55 20 55" fill="#f3e5c0" stroke="#1a1a1a" strokeWidth="5" strokeLinejoin="round" />
    <circle cx="70" cy="50" r="6" fill="#e32636" stroke="#1a1a1a" strokeWidth="4" />
  </svg>
);

const CryptoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`} style={{ filter: 'url(#roughen)' }}>
    <circle cx="50" cy="50" r="35" fill="#f3e5c0" stroke="#1a1a1a" strokeWidth="5" />
    <path d="M 40 30 L 60 30 C 70 30 70 45 60 45 C 75 45 75 65 60 65 L 40 65 Z" fill="none" stroke="#1a1a1a" strokeWidth="5" strokeLinejoin="round" />
    <path d="M 45 20 L 45 80 M 55 20 L 55 80" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`} style={{ filter: 'url(#roughen)' }}>
    <path d="M 25 25 C 40 40 60 60 75 75 M 75 25 C 60 40 40 60 25 75" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const flamePaths = [
  // 0: Tall, bulbous
  "M50,200 C10,200 0,120 30,70 C40,50 35,20 35,20 C35,20 55,40 60,70 C70,120 90,200 50,200 Z",
  // 1: Tall, leaning left
  "M50,200 C90,200 100,120 70,70 C60,50 65,20 65,20 C65,20 45,40 40,70 C30,120 10,200 50,200 Z",
  // 2: Wide, 3 bulbous prongs
  "M50,200 C-20,200 -10,120 15,80 C25,60 15,20 15,20 C15,20 35,40 40,70 C45,40 50,10 50,10 C50,10 55,40 60,70 C65,40 85,20 85,20 C85,20 75,60 85,80 C110,120 120,200 50,200 Z",
  // 3: Medium, 2 bulbous prongs
  "M50,200 C0,200 5,130 25,90 C35,60 25,20 25,20 C25,20 45,50 50,80 C60,50 75,30 75,30 C75,30 70,70 65,100 C95,140 100,200 50,200 Z"
];

const StaticFlame = ({ pathIdx, className, delay, flip }: { pathIdx: number, className: string, delay: number, flip?: boolean }) => (
  <motion.div
    className={`absolute origin-bottom ${className}`}
    style={{ scaleX: flip ? -1 : 1 }}
    animate={{
      scaleY: [1, 1.05, 0.95, 1],
      skewX: [-2, 2, -2],
      rotate: [-1, 1, -1]
    }}
    transition={{ duration: 1.5 + Math.random() * 0.5, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
      <path d={flamePaths[pathIdx]} fill="#ff3b1f" stroke="#1a1a1a" strokeWidth="6" strokeLinejoin="round" />
      <path d={flamePaths[pathIdx]} fill="#ff8c1a" style={{ transform: 'scale(0.7)', transformOrigin: '50px 200px' }} />
      <path d={flamePaths[pathIdx]} fill="#ffd21f" style={{ transform: 'scale(0.4)', transformOrigin: '50px 200px' }} />
    </svg>
  </motion.div>
);

const FloatingFlame = ({ delay, duration, left, size }: { delay: number, duration: number, left: number, size: number }) => (
  <motion.div
    className="absolute bottom-0 origin-bottom"
    style={{ left: `${left}%`, width: size, height: size * 2 }}
    initial={{ y: '100vh', opacity: 0 }}
    animate={{ 
      y: '-120vh', 
      opacity: [0, 1, 1, 0],
      x: [0, 30, -30, 0]
    }}
    transition={{ 
      y: { duration, repeat: Infinity, delay, ease: "linear" },
      opacity: { duration, repeat: Infinity, delay, ease: "linear" },
      x: { duration: duration * 0.5, repeat: Infinity, ease: "easeInOut" }
    }}
  >
    <svg viewBox="0 0 50 100" className="w-full h-full overflow-visible">
      <path d="M25,90 C5,90 5,50 20,20 C25,10 25,0 25,0 C25,0 30,15 35,30 C45,60 45,90 25,90 Z" fill="#ff8c1a" stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round" />
      <path d="M25,90 C5,90 5,50 20,20 C25,10 25,0 25,0 C25,0 30,15 35,30 C45,60 45,90 25,90 Z" fill="#ffd21f" style={{ transform: 'scale(0.5)', transformOrigin: '25px 90px' }} />
    </svg>
  </motion.div>
);

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            photo_url?: string;
          };
        };
        openInvoice: (url: string, callback?: (status: string) => void) => void;
        close: () => void;
      };
    };
  }
}

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface VpnInfo {
  ip: string;
  location: string;
  ping: string;
}

export default function VpnDashboard() {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [info, setInfo] = useState<VpnInfo>({ ip: '...', location: '...', ping: '-' });
  const [activeTab, setActiveTab] = useState<'home' | 'plans' | 'settings'>('home');
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const [tgUser, setTgUser] = useState<any>(null);
  const [tgUserPhoto, setTgUserPhoto] = useState<string | null>(null);
  const [kingAnim, setKingAnim] = useState(0);
  
  // Pricing state
  const [months, setMonths] = useState<number>(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const cartoonBorder = "border-4 border-ink-black uneven-border";
  const cartoonBtnBorder = "border-4 border-ink-black uneven-border-btn";
  const cartoonShadow = "shadow-[6px_6px_0px_0px_var(--color-ink-black)]";
  const cartoonShadowSm = "shadow-[4px_4px_0px_0px_var(--color-ink-black)]";
  const cartoonBtn = `${cartoonBtnBorder} ${cartoonShadow} font-vintage text-xl px-6 py-3 transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:shadow-[6px_6px_0px_0px_var(--color-ink-black)]`;
  const cartoonBtnRed = `${cartoonBtn} bg-cup-red text-paper-white`;
  const cartoonBtnBlue = `${cartoonBtn} bg-mug-blue text-paper-white`;

  const t = {
    ru: {
      appName: 'CUP & MUG VPN',
      home: 'Главная',
      plans: 'Тарифы',
      settings: 'Настройки',
      connected: 'ЗАЩИТА АКТИВНА!',
      connecting: 'ГОТОВИМСЯ...',
      disconnected: 'БЕРЕГИСЬ!',
      safe: 'Ваши данные в сейфе',
      unsafe: 'Вы как на ладони',
      btnConnect: 'ПОДКЛЮЧИТЬ',
      btnDisconnect: 'ОТКЛЮЧИТЬ',
      btnConnecting: 'КРУТИМ ВЕНТИЛЬ...',
      loc: 'Локация',
      ping: 'Пинг',
      ip: 'Ваш IP:',
      contract: 'Контракт',
      joke: 'Сделка с дьяволом... шучу!',
      months: 'Срок (мес.)',
      total: 'Итого',
      discount: 'Скидка',
      buy: 'УДАРИТЬ ПО РУКАМ!',
      profile: 'Профиль',
      guest: 'Гость',
      language: 'Язык',
      langRu: 'Русский',
      langEn: 'English',
      payTitle: 'Оплата',
      crypto: 'Криптовалюта',
      subUntil: 'до 3 марта 2026',
      subExpired: 'подписка истекла',
      offline: 'offline',
      traffic: '395.30 ГБ',
      buySub: 'Купить подписку',
      fromPrice: 'от 199 ₽',
      installSetup: 'Установка и настройка',
      applySettings: '🎰 СДЕЛАТЬ СТАВКУ',
      support: 'Поддержка',
      supportDesc: 'Связь с крупье',
      supportBtn: 'НАПИСАТЬ',
    },
    en: {
      appName: 'CUP & MUG VPN',
      home: 'Home',
      plans: 'Plans',
      settings: 'Settings',
      connected: 'PROTECTION ACTIVE!',
      connecting: 'GETTING READY...',
      disconnected: 'WATCH OUT!',
      safe: 'Your data is in a vault',
      unsafe: 'You are exposed',
      btnConnect: 'CONNECT',
      btnDisconnect: 'DISCONNECT',
      btnConnecting: 'TURNING VALVE...',
      loc: 'Location',
      ping: 'Ping',
      ip: 'Your IP:',
      contract: 'Contract',
      joke: 'Deal with the devil... just kidding!',
      months: 'Term (mo.)',
      total: 'Total',
      discount: 'Discount',
      buy: 'SHAKE ON IT!',
      profile: 'Profile',
      guest: 'Guest',
      language: 'Language',
      langRu: 'Русский',
      langEn: 'English',
      payTitle: 'Payment',
      crypto: 'Cryptocurrency',
      subUntil: 'until March 3, 2026',
      subExpired: 'subscription expired',
      offline: 'offline',
      traffic: '395.30 GB',
      buySub: 'Buy subscription',
      fromPrice: 'from $2',
      installSetup: 'Installation and setup',
      applySettings: '🎰 PLACE BET',
      support: 'Support',
      supportDesc: 'Contact dealer',
      supportBtn: 'MESSAGE',
    }
  };
  const dict = t[lang];

  // Fetch initial status & TG user
  useEffect(() => {
    let mounted = true;
    
    // Initialize Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand(); // Expand to full height
      console.log('Telegram WebApp ready');
      console.log('initDataUnsafe:', tg.initDataUnsafe);
      
      if (tg.initDataUnsafe?.user) {
        const user = tg.initDataUnsafe.user;
        console.log('User data:', user);
        if (mounted) {
          setTgUser(user);
          // photo_url is available directly in WebAppUser (Bot API 8.0+)
          if (user.photo_url) {
            setTgUserPhoto(user.photo_url);
            console.log('Photo URL from WebApp:', user.photo_url);
          }
        }
      } else {
        console.log('No user data in initDataUnsafe');
      }
    } else {
      console.log('Telegram WebApp not available');
    }

    fetch('/api/vpn')
      .then(res => res.json())
      .then(data => {
        if (mounted) {
          setStatus(data.status);
          setInfo({ ip: data.ip, location: data.location, ping: data.ping });
        }
      });
      
    return () => {
      mounted = false;
    };
  }, []);

  const toggleConnection = async () => {
    if (status === 'connecting') return;

    const newAction = status === 'connected' ? 'disconnect' : 'connect';
    setStatus('connecting');

    try {
      const res = await fetch('/api/vpn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: newAction }),
      });
      
      if (res.ok) {
        const infoRes = await fetch('/api/vpn');
        const data = await infoRes.json();
        setStatus(data.status);
        setInfo({ ip: data.ip, location: data.location, ping: data.ping });
      } else {
        setStatus('disconnected');
      }
    } catch (error) {
      console.error("Failed to toggle VPN", error);
      setStatus('disconnected');
    }
  };

  // Calculate price
  const basePrice = 150;
  const discountAmount = months >= 12 ? 0.4 : months >= 6 ? 0.2 : months >= 3 ? 0.1 : 0;
  const totalPrice = Math.round(basePrice * months * (1 - discountAmount));
  const originalPrice = basePrice * months;

  const handleBuy = () => {
    setShowPaymentModal(true);
  };

  return (
    <div className={`flex flex-col h-[100dvh] w-full relative overflow-hidden transition-colors duration-500 ${activeTab === 'plans' ? 'bg-[#c1121f]' : 'bg-[#f4ecd8]'}`}>
      {/* Spade Pattern Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 30c-2-3-5-6-8-9-3-3-6-6-9-7.5C1.5 12 0 9 0 5c0-4 3-7 7.5-7 4.5 0 7.5 3 7.5 7.5 0 4.5 3 7.5 7.5 7.5 4.5 0 7.5-3 7.5-7.5C30 1 33-2 37.5-2c4.5 0 7.5 3 7.5 7.5 0 4-1.5 7-3 8.5-3 1.5-6 4.5-9 7.5-3 3-6 6-8 9z' fill='%23000' fill-rule='evenodd'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }}></div>

      {/* Animated Sunburst Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <div className="w-[200vw] h-[200vw] absolute sunburst-bg animate-spin-slow"></div>
      </div>

      {/* Grain Overlay for Vintage Film Look */}
      <div 
        className="fixed -inset-[100%] pointer-events-none z-50 opacity-[0.15] mix-blend-multiply animate-noise" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      ></div>

      <div className="w-full max-w-md mx-auto flex flex-col h-full relative z-10">

      {/* Main Content Area */}
      <main className="flex-1 p-6 flex flex-col items-center justify-start relative z-10 overflow-y-auto">
        {/* Header */}
      {activeTab === 'home' && (
        <header className="shrink-0 p-6 pb-2 text-center relative z-10">
          <motion.h1 
            className="font-vintage text-4xl tracking-wider text-ink-black uppercase relative z-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.6 }}
          >
            Cup & Mug
            <span className="block text-2xl text-cup-red mt-1">VPN</span>
          </motion.h1>
          <div className={`h-1 w-32 bg-ink-black mx-auto mt-4 rounded-full border-2 border-ink-black`}></div>
        </header>
      )}
        <AnimatePresence mode="wait">
          {activeTab === 'home' ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full flex flex-col items-center"
            >
              {/* Character Area */}
              <div className="mb-6 w-full flex justify-center items-end h-48 relative">
                <motion.div
                  className="z-10 relative"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <img 
                    src="/cuphead_mugman.png" 
                    alt="Cuphead and Mugman" 
                    className="h-[220px] w-auto object-contain drop-shadow-[4px_4px_0px_rgba(42,26,16,1)] translate-y-4"
                  />
                </motion.div>
              </div>

              {/* Subscription Status Block */}
              <div className={`w-full bg-paper-white p-6 ${cartoonBorder} ${cartoonShadow} mb-6 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.05%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <h2 className="font-vintage text-2xl">{dict.subUntil}</h2>
                  <span className="bg-ink-black text-paper-white text-[10px] font-bold px-2 py-1 uppercase rounded-full border-2 border-ink-black transform rotate-2">
                    {dict.subExpired}
                  </span>
                </div>
                <p className="font-bold text-ink-light uppercase text-sm relative z-10">
                  <span className="text-cup-red">{dict.offline}</span> • {dict.traffic}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-4">
                <button 
                  onClick={() => setActiveTab('plans')}
                  className={`w-full flex justify-between items-center ${cartoonBtnRed} py-4 group relative overflow-hidden text-left`}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <MoneyBagIcon active={false} className="w-8 h-8 shrink-0" />
                    <span className="text-lg leading-tight">{dict.buySub}</span>
                  </span>
                  <span className="relative z-10 text-sm opacity-90 shrink-0 ml-2">{dict.fromPrice}</span>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity z-0"></div>
                </button>

                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex justify-between items-center ${cartoonBtnBlue} py-4 group relative overflow-hidden text-left`}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <GearIcon active={false} className="w-8 h-8 shrink-0" />
                    <span className="text-lg leading-tight">{dict.installSetup}</span>
                  </span>
                  <div className="relative z-10 w-6 h-6 border-2 border-paper-white rounded-sm flex items-center justify-center shrink-0 ml-2">
                    <div className="w-3 h-1 bg-paper-white"></div>
                  </div>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity z-0"></div>
                </button>
              </div>
            </motion.div>
          ) : activeTab === 'plans' ? (
            <motion.div 
              key="plans"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex flex-col items-center pb-8 relative z-0"
            >
              {/* Hell Background */}
              <div className="fixed inset-0 bg-gradient-to-b from-[#b30000] to-[#660000] z-[-4] pointer-events-none"></div>
              
              {/* Floating Flames (Background) */}
              <div className="fixed inset-0 z-[-3] pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <FloatingFlame 
                    key={`float-${i}`} 
                    delay={Math.random() * 5} 
                    duration={5 + Math.random() * 5} 
                    left={Math.random() * 100} 
                    size={20 + Math.random() * 40} 
                  />
                ))}
              </div>

              {/* Foreground Edge Flames */}
              <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
                {/* Left side cluster */}
                <StaticFlame pathIdx={0} className="left-[-15%] md:left-[-5%] bottom-[-5%] w-64 md:w-96 h-[80vh]" delay={0} />
                <StaticFlame pathIdx={2} className="left-[-5%] md:left-[0%] bottom-[-5%] w-56 md:w-80 h-[60vh]" delay={0.2} />
                <StaticFlame pathIdx={3} className="left-[5%] md:left-[10%] bottom-[-5%] w-48 md:w-64 h-[45vh]" delay={0.4} />
                
                {/* Right side cluster */}
                <StaticFlame pathIdx={1} className="right-[-15%] md:right-[-5%] bottom-[-5%] w-64 md:w-96 h-[85vh]" delay={0.1} />
                <StaticFlame pathIdx={2} className="right-[-5%] md:right-[0%] bottom-[-5%] w-56 md:w-80 h-[65vh]" delay={0.3} />
                <StaticFlame pathIdx={3} className="right-[5%] md:right-[10%] bottom-[-5%] w-48 md:w-64 h-[50vh]" delay={0.5} />

                {/* Bottom filler */}
                <StaticFlame pathIdx={2} className="left-[20%] bottom-[-10%] w-64 md:w-96 h-[40vh]" delay={0.6} />
                <StaticFlame pathIdx={0} className="left-[40%] bottom-[-10%] w-64 md:w-96 h-[35vh]" delay={0.7} />
                <StaticFlame pathIdx={1} className="right-[20%] bottom-[-10%] w-64 md:w-96 h-[45vh]" delay={0.8} />
              </div>

              {/* Top Title */}
              <h1 className="font-vintage text-4xl text-[#ffae00] drop-shadow-[0_4px_0_#000000] mb-2 mt-0 text-center tracking-wider">
                {dict.appName}
              </h1>

              {/* Devil holding the contract */}
              <motion.div
                animate={{ y: [0, -6, 0], scaleY: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="relative z-10 -mb-16 w-80 pointer-events-none"
              >
                <img 
                  src="/devil.png" 
                  alt="Devil" 
                  className="w-full h-auto object-contain drop-shadow-[0_8px_0_rgba(0,0,0,1)]" 
                />
              </motion.div>

              {/* Contract Card */}
              <div className="w-full bg-[#fff2cc] p-6 mb-6 relative z-20 overflow-hidden rounded-sm border-4 border-[#1a0000] shadow-[0_15px_0_#000000,inset_0_0_30px_rgba(26,0,0,0.5)]">
                {/* Burnt edges effect */}
                <div className="absolute inset-0 pointer-events-none border-[8px] border-[#1a0000] opacity-20 mix-blend-overlay rounded-sm blur-[2px]"></div>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_#ff3c00] opacity-30 mix-blend-multiply"></div>
                
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.05%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>
                
                <h2 className="font-vintage text-4xl mb-1 text-center relative z-10 transform -rotate-2 text-[#1a0000] drop-shadow-[2px_2px_0_#ff3c00]">
                  {dict.contract}
                </h2>
                <p className="text-center font-bold text-[#1a0000] mb-8 uppercase text-xs relative z-10 italic opacity-80">
                  {dict.joke}
                </p>
                
                <div className="flex justify-between items-end mb-6 relative z-10">
                  <div>
                    <span className="block text-sm font-bold text-[#1a0000] uppercase mb-1">{dict.months}</span>
                    <div className="font-vintage text-4xl text-[#1a0000]">{months}</div>
                  </div>
                  <div className="text-right">
                    <span className="block text-sm font-bold text-[#1a0000] uppercase mb-1">{dict.total}</span>
                    <div className="flex items-center justify-end gap-2">
                      {discountAmount > 0 && (
                        <span className="text-sm line-through text-[#1a0000] opacity-70 font-vintage">{originalPrice}₽</span>
                      )}
                      <motion.span 
                        animate={{ textShadow: ["0 0 10px #ff3c00", "0 0 20px #ffae00", "0 0 10px #ff3c00"] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="font-vintage text-4xl text-[#ff3c00]"
                      >
                        {totalPrice}₽
                      </motion.span>
                    </div>
                  </div>
                </div>

                {/* Demonic Slider */}
                <div className="relative w-full h-12 flex items-center mb-4 mt-6 relative z-10">
                  <input 
                    type="range" 
                    min="1" 
                    max="12" 
                    value={months}
                    onChange={(e) => setMonths(parseInt(e.target.value))}
                    className="w-full absolute z-20 opacity-0 cursor-pointer h-full"
                  />
                  {/* Track */}
                  <div className="w-full h-4 bg-[#1a0000] rounded-full border-2 border-[#ff3c00] shadow-[0_0_10px_#ff3c00] absolute z-0 overflow-hidden">
                    {/* Fill */}
                    <div 
                      className="h-full bg-gradient-to-r from-[#ff3c00] to-[#ffae00] rounded-full"
                      style={{ width: `${((months - 1) / 11) * 100}%` }}
                    ></div>
                  </div>
                  {/* Thumb (Bone/Lever) */}
                  <motion.div 
                    className="w-8 h-10 bg-[#fff2cc] border-2 border-[#1a0000] rounded-sm shadow-[2px_2px_0_#1a0000] absolute z-10 pointer-events-none flex flex-col items-center justify-center gap-1"
                    style={{ left: `calc(${((months - 1) / 11) * 100}% - 16px)` }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-4 h-1 bg-[#1a0000] rounded-full"></div>
                    <div className="w-4 h-1 bg-[#1a0000] rounded-full"></div>
                  </motion.div>
                </div>
                
                {discountAmount > 0 && (
                  <div className="text-center mt-2 relative z-10">
                    <span className="inline-block bg-[#1a0000] text-[#ffae00] border-2 border-[#ff3c00] px-3 py-1 rounded-full text-xs font-bold uppercase animate-pulse shadow-[0_0_10px_#ff3c00]">
                      {dict.discount} {Math.round(discountAmount * 100)}%!
                    </span>
                  </div>
                )}
              </div>

              {/* SHAKE HANDS Button */}
              <motion.button 
                onClick={handleBuy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, x: [0, -2, 2, -2, 2, 0] }}
                className="w-full py-4 bg-[#ff3c00] border-4 border-[#1a0000] rounded-xl shadow-[0_8px_0_#1a0000,0_0_20px_#ff3c00] relative overflow-hidden group transform -rotate-2 hover:rotate-1 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0000] to-transparent opacity-50"></div>
                <motion.div 
                  className="absolute inset-0 bg-[#ffae00] mix-blend-overlay opacity-0 group-hover:opacity-50"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
                <span className="font-vintage text-3xl text-[#fff2cc] relative z-10 drop-shadow-[2px_2px_0_#1a0000] tracking-widest">
                  {dict.buy}
                </span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex flex-col items-center relative pt-40 z-0"
            >
              {/* Casino Background Base */}
              <div className="fixed inset-0 z-[-4] pointer-events-none" style={{ background: 'radial-gradient(circle at center, #f5e6c8 0%, #e8d3a5 40%, #d2b98b 100%)' }}></div>
              
              {/* Casino Rays */}
              <div className="fixed inset-0 z-[-3] pointer-events-none opacity-30" style={{ background: 'repeating-conic-gradient(rgba(0,0,0,0.05) 0deg 10deg, transparent 10deg 20deg)' }}></div>
              
              {/* Casino Pattern */}
              <div className="fixed inset-0 z-[-3] pointer-events-none opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='30' font-size='20'%3E🎲%3C/text%3E%3Ctext x='40' y='50' font-size='20'%3E♠️%3C/text%3E%3C/svg%3E")` }}></div>

              {/* Top Darkening */}
              <div className="fixed top-0 left-0 right-0 h-[300px] z-[-2] pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)' }}></div>

              {/* King Dice */}
              <motion.div
                className="absolute top-[-10px] left-1/2 -translate-x-1/2 h-[220px] z-20 pointer-events-none"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: kingAnim > 0 ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  y: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 0.4 }
                }}
                onAnimationComplete={() => { if (kingAnim > 0) setKingAnim(0) }}
                style={{ willChange: "transform" }}
              >
                <img src="/king-dice.png" alt="King Dice" className="h-full w-auto object-contain" style={{ willChange: "transform" }} />
              </motion.div>

              <h2 className="font-vintage text-3xl mb-6 text-center relative z-30 bg-[#f5e6c8] px-6 py-2 border-4 border-ink-black shadow-[4px_4px_0_#6e3b8b]">
                {dict.settings}
              </h2>
              
              {/* Profile Section */}
              <div className="w-full bg-[#f5e6c8] p-6 border-[3px] border-ink-black shadow-[3px_3px_0_#6e3b8b] mb-6 flex items-center gap-4 relative z-30">
                <div className="w-16 h-16 rounded-xl border-[3px] border-ink-black overflow-hidden bg-gradient-to-br from-[#d6453d] to-[#6e3b8b] flex-shrink-0 flex items-center justify-center">
                  {tgUserPhoto ? (
                    <img src={tgUserPhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : tgUser ? (
                    <span className="text-2xl font-bold text-white">
                      {tgUser.first_name?.[0]?.toUpperCase() || '?'}{tgUser.last_name?.[0]?.toUpperCase() || ''}
                    </span>
                  ) : (
                    <span className="text-4xl">🎲</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#6e3b8b] uppercase tracking-wider">🎭 {dict.profile}</span>
                  <span className="font-vintage text-2xl leading-none mt-1 text-ink-black">
                    {tgUser ? `${tgUser.first_name} ${tgUser.last_name || ''}`.trim() : dict.guest}
                  </span>
                </div>
              </div>

              {/* Language Toggle */}
              <div className="w-full bg-[#f5e6c8] p-6 border-[3px] border-ink-black shadow-[3px_3px_0_#6e3b8b] mb-6 relative z-30">
                <h3 className="text-sm font-bold text-[#6e3b8b] uppercase tracking-wider mb-4 text-center">🎰 {dict.language}</h3>
                <div className="flex gap-4">
                  <button 
                    onClick={() => { setLang('ru'); setKingAnim(prev => prev + 1); }}
                    className={`flex-1 py-3 border-[3px] border-ink-black font-vintage text-lg transition-all ${lang === 'ru' ? 'bg-[#d6453d] text-white shadow-[4px_4px_0px_0px_var(--color-ink-black)]' : 'bg-[#e8d3a5] text-ink-black hover:bg-[#d2b98b] shadow-[2px_2px_0px_0px_var(--color-ink-black)]'}`}
                  >
                    {dict.langRu}
                  </button>
                  <button 
                    onClick={() => { setLang('en'); setKingAnim(prev => prev + 1); }}
                    className={`flex-1 py-3 border-[3px] border-ink-black font-vintage text-lg transition-all ${lang === 'en' ? 'bg-[#d6453d] text-white shadow-[4px_4px_0px_0px_var(--color-ink-black)]' : 'bg-[#e8d3a5] text-ink-black hover:bg-[#d2b98b] shadow-[2px_2px_0px_0px_var(--color-ink-black)]'}`}
                  >
                    {dict.langEn}
                  </button>
                </div>
              </div>

              {/* Support Section */}
              <div className="w-full bg-[#f5e6c8] p-6 border-[3px] border-ink-black shadow-[3px_3px_0_#6e3b8b] mb-6 relative z-30 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#6e3b8b] uppercase tracking-wider">📞 {dict.support}</span>
                  <span className="font-vintage text-xl leading-none mt-1 text-ink-black">
                    {dict.supportDesc}
                  </span>
                </div>
                <button 
                  onClick={() => window.open('https://t.me/Solanammaster', '_blank')}
                  className="px-6 py-3 border-[3px] border-ink-black font-vintage text-lg transition-all bg-[#d6453d] text-white shadow-[4px_4px_0px_0px_var(--color-ink-black)] hover:scale-105 active:scale-95"
                >
                  {dict.supportBtn}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* SVG Filters for Cuphead Style */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="roughen">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Bottom Navigation */}
      <nav className="shrink-0 bg-paper-white p-4 border-4 border-ink-black border-b-0 border-x-0 sm:border-x-4 sm:border-b-4 sm:rounded-b-2xl rounded-t-2xl flex justify-around items-center relative z-20 mt-auto">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'home' ? 'text-cup-red' : 'text-ink-light hover:text-ink-black'}`}
        >
          <motion.div
            animate={activeTab === 'home' ? { scale: [1, 1.2, 0.9, 1.1, 1], rotate: [0, -5, 5, -2, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <CupIcon active={activeTab === 'home'} className="w-8 h-8 mb-1" />
          </motion.div>
          <span className="text-[10px] font-bold uppercase tracking-wider">{dict.home}</span>
        </button>
        <button 
          onClick={() => setActiveTab('plans')}
          className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'plans' ? 'text-mug-blue' : 'text-ink-light hover:text-ink-black'}`}
        >
          <motion.div
            animate={activeTab === 'plans' ? { scale: [1, 1.2, 0.9, 1.1, 1], rotate: [0, -5, 5, -2, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <MoneyBagIcon active={activeTab === 'plans'} className="w-8 h-8 mb-1" />
          </motion.div>
          <span className="text-[10px] font-bold uppercase tracking-wider">{dict.plans}</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'settings' ? 'text-ink-black' : 'text-ink-light hover:text-ink-black'}`}
        >
          <motion.div
            animate={activeTab === 'settings' ? { scale: [1, 1.2, 0.9, 1.1, 1], rotate: [0, 15, -10, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <GearIcon active={activeTab === 'settings'} className="w-8 h-8 mb-1" />
          </motion.div>
          <span className="text-[10px] font-bold uppercase tracking-wider">{dict.settings}</span>
        </button>
      </nav>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`bg-vintage-bg p-6 w-full max-w-sm ${cartoonBorder} shadow-[8px_8px_0px_0px_var(--color-ink-black)] relative`}
            >
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-cup-red text-white rounded-full border-4 border-ink-black flex items-center justify-center hover:scale-110 transition-transform z-10"
              >
                <CloseIcon className="w-6 h-6" />
              </button>

              <h3 className="font-vintage text-2xl text-center mb-6">{dict.payTitle}</h3>
              
              <div className="space-y-4">
                <button 
                  onClick={async () => {
                    if (!window.Telegram?.WebApp) {
                      alert('Telegram WebApp не доступен');
                      return;
                    }
                    try {
                      const res = await fetch('/api/invoice', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ months, userId: tgUser?.id || 0 }),
                      });
                      const data = await res.json();
                      if (data.invoiceLink) {
                        window.Telegram.WebApp.openInvoice(data.invoiceLink, (status) => {
                          if (status === 'paid') {
                            setShowPaymentModal(false);
                            alert('✅ Оплата прошла успешно!');
                          } else if (status === 'cancelled') {
                            console.log('Payment cancelled');
                          }
                        });
                      } else {
                        alert('Ошибка создания счёта: ' + (data.error || 'Неизвестная ошибка'));
                      }
                    } catch (err) {
                      console.error('Invoice error:', err);
                      alert('Ошибка при создании счёта');
                    }
                  }}
                  className={`w-full bg-paper-white p-4 flex items-center gap-4 ${cartoonBorder} shadow-[4px_4px_0px_0px_var(--color-ink-black)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-ink-black)] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px]`}
                >
                  <div className="w-10 h-10 bg-yellow-100 rounded-full border-2 border-ink-black flex items-center justify-center">
                    <span className="text-xl">⭐</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-lg uppercase tracking-wide">Telegram Stars</span>
                    <span className="text-xs text-gray-500">{months * 50} Stars</span>
                  </div>
                </button>

                <button className={`w-full bg-paper-white p-4 flex items-center gap-4 ${cartoonBorder} shadow-[4px_4px_0px_0px_var(--color-ink-black)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-ink-black)] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px] opacity-50 cursor-not-allowed`}>
                  <div className="w-10 h-10 bg-green-100 rounded-full border-2 border-ink-black flex items-center justify-center text-green-600">
                    <WalletIcon className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-lg uppercase tracking-wide">СБП (скоро)</span>
                </button>

                <button className={`w-full bg-paper-white p-4 flex items-center gap-4 ${cartoonBorder} shadow-[4px_4px_0px_0px_var(--color-ink-black)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-ink-black)] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px] opacity-50 cursor-not-allowed`}>
                  <div className="w-10 h-10 bg-orange-100 rounded-full border-2 border-ink-black flex items-center justify-center text-orange-500">
                    <CryptoIcon className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-lg uppercase tracking-wide">{dict.crypto} (скоро)</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
