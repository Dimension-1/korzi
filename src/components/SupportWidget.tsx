import { useState, useRef, useEffect } from 'react';

const FAQ = {
  phone: '+917625069477',
  greeting: "Hi, I'm Sunil. Here to answer your most common questions before you order — tap a topic below to get started.",
  categories: [
    {
      id: 'specs',
      label: 'What you get',
      icon: '<path d="M12 3.5L19.5 7.75V16.25L12 20.5L4.5 16.25V7.75L12 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M4.5 7.75L12 12L19.5 7.75" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 12V20.5" stroke="currentColor" stroke-width="1.5"/>',
      questions: [
        { q: "What's included in the box?", a: "Your Apex Drive K-01 comes with: the RC machine (1:16 scale, 4WD), a 2.4GHz anti-interference controller, a rechargeable Li-ion battery, a USB charging cable, a screwdriver, and a user manual." },
        { q: "What's the top speed?", a: "Up to 25 km/h — enough for real off-road fun without being unsafe for a first-time driver." },
        { q: "How big is it?", a: "29.8 × 17.7 × 12.5 cm, weighing 852.6g with the battery in — a solid, substantial 1:16 scale build, not a toy-sized micro RC." },
        { q: "How long does the battery last?", a: "About 25 minutes of run time per charge (varies with terrain and driving style), with a charge time of around 180 minutes." },
        { q: "What's the control range?", a: "50+ metres via 2.4GHz controller — enough to run it across a park, driveway, or terrace without losing signal." },
        { q: "Is it 4WD?", a: "Yes — full 4-wheel drive, so it handles mud, gravel, grass, and rough terrain, not just flat ground." },
        { q: "What age is it suitable for?", a: "Ages 6+, with adult supervision recommended." },
        { q: "Is it certified safe?", a: "Yes — BIS certified." },
      ],
    },
    {
      id: 'warranty',
      label: 'Warranty & support',
      icon: '<path d="M12 3.5L19 6.5V11.2C19 15.4 16.1 18.9 12 20.5C7.9 18.9 5 15.4 5 11.2V6.5L12 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.2 11.8L11.2 13.8L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
      questions: [
        { q: "Is my Apex Drive backed by service support?", a: "Yes — every Apex Drive K-01 is backed by Korzi Care, covering manufacturing defects and normal wear for 6 months from purchase. Reach us: support@korzi.toys · call <strong>+91 76250 69477</strong> · Workshop: JP Nagar, Bangalore · 10am–6pm, Mon–Fri." },
        { q: "Are spare parts available separately?", a: "Yes — spare parts are available for all components. Reach out via call (+91 76250 69477) or support@korzi.toys." },
      ],
    },
    {
      id: 'delivery',
      label: 'Order & delivery',
      icon: '<path d="M3.5 7.5H13.5V16H3.5V7.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M13.5 10.5H17.5L20.5 13.5V16H13.5V10.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="7.2" cy="17.8" r="1.7" stroke="currentColor" stroke-width="1.5"/><circle cx="17.2" cy="17.8" r="1.7" stroke="currentColor" stroke-width="1.5"/>',
      questions: [
        { q: "When will my order arrive?", a: "Dispatched via Shiprocket and typically delivered within 2–7 days depending on your location. You'll get tracking details by SMS/email as soon as it ships." },
        { q: "Can I change my delivery address?", a: "Yes — email team@korzi.toys within 6 hours of placing your order and we'll update it for free. After 6 hours, address changes cost an additional ₹599." },
        { q: "Can I order Cash on Delivery (COD)?", a: "Yes — COD is available. Pay ₹999 upfront online, and the remaining amount on delivery." },
      ],
    },
    {
      id: 'returns',
      label: 'Returns & exchange',
      icon: '<path d="M4.5 12C4.5 8.1 7.6 5 11.5 5C14.3 5 16.7 6.6 17.9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M19.5 12C19.5 15.9 16.4 19 12.5 19C9.7 19 7.3 17.4 6.1 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M18.2 5.2V9.2H14.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.8 18.8V14.8H9.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
      questions: [
        { q: "What's your return/exchange window?", a: "You can return or exchange your Apex Drive K-01 within 7 days of delivery, as long as it's unused, undamaged, and in its original packaging." },
        { q: "What if my Apex Drive arrives damaged?", a: "Email us at team@korzi.toys within 3 days of delivery with your Order ID, along with photos and a video of the damage. We'll arrange a replacement." },
        { q: "Can I exchange for a different color/variant?", a: "The Apex Drive K-01 currently comes in one colorway only, so there isn't a variant to exchange into." },
      ],
    },
  ],
};

type Screen = 'home' | 'category' | 'answer';

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(true);
  const [screen, setScreen] = useState<Screen>('home');
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [activeQIdx, setActiveQIdx] = useState<number | null>(null);
  const [animDir, setAnimDir] = useState<'fwd' | 'back'>('fwd');
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [screen, activeCatId, activeQIdx]);

  const cat = FAQ.categories.find(c => c.id === activeCatId) ?? null;
  const question = cat && activeQIdx !== null ? cat.questions[activeQIdx] : null;

  const goHome = () => { setAnimDir('back'); setScreen('home'); setActiveCatId(null); setActiveQIdx(null); };
  const goCat = (id: string, dir: 'fwd' | 'back' = 'fwd') => { setAnimDir(dir); setActiveCatId(id); setActiveQIdx(null); setScreen('category'); };
  const goAnswer = (idx: number) => { setAnimDir('fwd'); setActiveQIdx(idx); setScreen('answer'); };

  const headerTitle = screen === 'home' ? 'Korzi Support' : screen === 'category' ? (cat?.label ?? '') : (cat?.label ?? '');
  const headerSub = screen === 'category' ? 'Tap a question' : screen === 'answer' ? 'Answer' : '';

  const openWidget = () => { setOpen(true); setTeaserVisible(false); };
  const closeWidget = () => { setOpen(false); setTeaserVisible(true); };

  return (
    <div
      style={{
        position: 'fixed', right: 16, zIndex: 999999,
        bottom: 'var(--widget-bottom, 104px)',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <style>{`
        @media (min-width: 1024px) { :root { --widget-bottom: 80px; } }
        @media (max-width: 1023px) { :root { --widget-bottom: 104px; } }
        @keyframes k-rise { from { opacity:0; transform:translateY(10px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes k-enter { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:translateX(0); } }
        @keyframes k-enter-back { from { opacity:0; transform:translateX(-12px); } to { opacity:1; transform:translateX(0); } }
      `}</style>
      {/* Teaser bubble */}
      {teaserVisible && !open && (
        <div
          onClick={openWidget}
          role="button"
          tabIndex={0}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && openWidget()}
          style={{
            position: 'absolute', bottom: 74, right: 0,
            background: '#141414', borderRadius: '12px 12px 3px 12px',
            padding: '12px 16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.08)',
            animation: 'k-rise 0.28s cubic-bezier(0.2,0.7,0.3,1)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}
        >
          <div>
            <p style={{ color: '#fff', fontSize: 13.5, fontWeight: 600, lineHeight: 1.3, whiteSpace: 'nowrap' }}>Hi, I'm Sunil 👋</p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, lineHeight: 1.3, whiteSpace: 'nowrap' }}>Got questions? I can help.</p>
          </div>
        </div>
      )}

      {/* Panel */}
      {open && (
        <div style={{
          position: 'absolute', bottom: 74, right: 0,
          width: 430, maxWidth: 'calc(100vw - 28px)',
          maxHeight: '78vh', background: '#0d0d0d',
          borderRadius: 14, display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
        }}>
          {/* Header */}
          <div style={{
            padding: '20px 22px 16px', display: 'flex', alignItems: 'center',
            gap: 12, borderBottom: '1px solid #232323', flexShrink: 0,
          }}>
            {screen !== 'home' && (
              <button
                onClick={() => screen === 'answer' ? goCat(activeCatId!, 'back') : goHome()}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4, display: 'flex' }}
                aria-label="Back"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{
                color: '#02ff00', fontFamily: 'Oswald, sans-serif', fontWeight: 700,
                textTransform: 'uppercase', fontSize: 20, letterSpacing: 1.4,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{headerTitle}</h2>
              {headerSub && <p style={{ color: '#fff', fontSize: 13, opacity: 0.6, marginTop: 4 }}>{headerSub}</p>}
            </div>
            <button
              onClick={closeWidget}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4, display: 'flex' }}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
            </button>
          </div>

          {/* Body */}
          <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', padding: '24px 22px 22px' }}>
            <div key={`${screen}-${activeCatId}-${activeQIdx}`} style={{ animation: `${animDir === 'fwd' ? 'k-enter' : 'k-enter-back'} 0.24s cubic-bezier(0.2,0.7,0.3,1)` }}>
              {screen === 'home' && (
                <>
                  <p style={{ color: '#fff', fontSize: 16, lineHeight: 1.7, marginBottom: 28, opacity: 0.85 }}>{FAQ.greeting}</p>
                  <p style={{ color: '#fff', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 14, opacity: 0.6 }}>Browse a topic</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {FAQ.categories.map(c => (
                      <button key={c.id} onClick={() => goCat(c.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        background: '#141414', border: 'none', borderRadius: 12,
                        padding: '16px 18px', cursor: 'pointer', textAlign: 'left', color: '#fff',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#1b1b1b')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#141414')}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" dangerouslySetInnerHTML={{ __html: c.icon }} />
                        <span style={{ flex: 1, fontSize: 16, fontWeight: 500 }}>{c.label}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {screen === 'category' && cat && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {cat.questions.map((item, idx) => (
                    <button key={idx} onClick={() => goAnswer(idx)} style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      background: '#141414', border: 'none', borderRadius: 12,
                      padding: '16px 18px', cursor: 'pointer', textAlign: 'left', color: '#fff',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#1b1b1b')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#141414')}
                    >
                      <span style={{ flex: 1, fontSize: 15, fontWeight: 500, lineHeight: 1.5 }}>{item.q}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  ))}
                </div>
              )}

              {screen === 'answer' && question && (
                <>
                  <p style={{ color: '#fff', fontFamily: 'Oswald, sans-serif', fontWeight: 500, fontSize: 24, textTransform: 'uppercase', letterSpacing: 0.8, lineHeight: 1.4, marginBottom: 16 }}>{question.q}</p>
                  <div style={{ width: 40, height: 2, background: '#02ff00', marginBottom: 28 }} />
                  <div style={{ color: '#fff', fontSize: 16, lineHeight: 1.9, opacity: 0.85 }} dangerouslySetInnerHTML={{ __html: question.a }} />
                </>
              )}
            </div>
          </div>

          {/* Footer CTA */}
          <div style={{ borderTop: '1px solid #232323', padding: '14px 22px 16px', flexShrink: 0 }}>
            <button
              onClick={() => window.open(`https://wa.me/${FAQ.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi Korzi, I have a question about the Apex Drive K-01.')}`, '_blank')}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                background: '#02ff00', border: 'none', borderRadius: 8,
                color: '#0d0d0d', padding: '13px 16px',
                fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M12 3C7 3 3 7 3 12C3 13.7 3.4 15.3 4.2 16.7L3 21L7.5 19.8C8.8 20.6 10.4 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z" stroke="currentColor" strokeWidth="1.4"/><path d="M8.3 8.4C8.5 8 8.9 7.9 9.2 7.9C9.6 7.9 9.7 7.9 9.7 7.9C9.9 8 10 8.1 10.1 8.4C10.3 8.8 10.7 9.8 10.7 9.9C10.8 10 10.8 10.1 10.7 10.3C10.6 10.5 10.5 10.6 10.1 11C10 11.1 9.9 11.2 10 11.4C10.1 11.6 10.6 12.4 11.3 13C12.2 13.8 12.9 14 13.1 14.1C13.3 14.2 13.4 14.2 13.5 14.1C13.6 14 14 13.5 14.1 13.3C14.3 13.1 14.4 13.1 14.6 13.2C14.8 13.3 15.8 13.8 16 13.9C16.2 14 16.4 14.1 16.4 14.2C16.5 14.4 16.5 14.9 16.3 15.4C16.1 15.9 15.2 16.4 14.8 16.4C14.4 16.5 14 16.5 13.1 16.2C11.5 15.7 10.4 14.6 10.3 14.5C10.2 14.4 9 12.8 9 11.2C9 9.6 9.8 8.8 8.3 8.4Z" fill="currentColor"/></svg>
              <span style={{ flex: 1 }}>Drop a WhatsApp message</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Launcher */}
      <button
        onClick={() => open ? closeWidget() : openWidget()}
        aria-label="Open support"
        style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'transparent', border: '3px solid #02ff00', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
          transition: 'transform 0.18s cubic-bezier(0.2,0.7,0.3,1)',
          overflow: 'hidden', padding: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        {open
          ? <div style={{ width: '100%', height: '100%', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 5L19 19M19 5L5 19" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
          : <div style={{ width: '100%', height: '100%', background: '#ffffff', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
              <img
                src="/assets/sunil.png"
                alt="Sunil - Korzi Support"
                style={{ width: '110%', height: '110%', objectFit: 'cover', objectPosition: 'center 10%' }}
              />
            </div>
        }
      </button>


    </div>
  );
}
