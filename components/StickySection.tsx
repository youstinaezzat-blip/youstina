
import React from 'react';
import { Sparkles, Compass } from 'lucide-react';

interface StickySectionProps {
  content: any;
}

const StickySection: React.FC<StickySectionProps> = ({ content }) => {
  return (
    <section id="itinerary" className="relative min-h-screen">
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${content.backgroundImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      <div className="relative z-10 -mt-[100vh] pb-64">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="pt-48 pb-32 text-center">
            <h2 className="text-5xl md:text-8xl font-serif text-[#c5a059] mb-8 tracking-tight drop-shadow-2xl">
              {content.title}
            </h2>
            <div className="w-16 h-[2px] bg-[#c5a059] mx-auto mb-8"></div>
            <p className="text-[#c5a059]/90 uppercase tracking-[0.4em] text-[10px] font-bold drop-shadow-lg">The Signature Collection</p>
          </div>

          <div className="space-y-32">
            {content.items.map((item: any, idx: number) => (
              <StickyItem 
                key={idx} 
                item={item} 
                idx={idx} 
                backgroundImage={content.backgroundImage}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StickyItem = ({ item, idx, backgroundImage }: any) => {
  return (
    <div className="group relative glass-panel p-10 md:p-20 hover:border-[#c5a059]/40 transition-all duration-700 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
      <div className="absolute -top-10 -left-10 opacity-10 group-hover:opacity-30 transition-opacity">
        <span className="text-[180px] font-serif text-[#c5a059] leading-none select-none italic">0{idx + 1}</span>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-[#c5a059]/10 rounded-full text-[#c5a059]">
              {idx === 0 ? <Sparkles size={18} /> : <Compass size={18} />}
            </div>
            <p className="text-[#c5a059] font-semibold tracking-[0.4em] uppercase text-[10px]">
              {item.location}
            </p>
          </div>

          <h3 className="text-4xl md:text-5xl font-serif text-[#c5a059]">
            {item.title}
          </h3>
          
          <p className="text-white text-lg leading-relaxed font-light">
            {item.description}
          </p>
          
          <div className="pt-8">
            <button className="text-white text-[10px] uppercase tracking-[0.4em] font-bold flex items-center gap-3 group/btn">
              Explore Journey <div className="w-8 h-[1px] bg-[#c5a059] transition-all group-hover/btn:w-16"></div>
            </button>
          </div>
        </div>

        <div className="flex-1 hidden lg:block">
          <div className="aspect-[4/5] bg-stone-900 overflow-hidden rounded-xl grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10">
             <img src={backgroundImage} className="w-full h-full object-cover scale-150 group-hover:scale-125 transition-transform duration-[5s]" alt="Experience detail" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickySection;
