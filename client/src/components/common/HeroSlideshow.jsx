import { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    image: '/images/firts.png',
    focus: 'object-[50%_20%]',
    title: 'New Season Arrivals',
    subtitle: 'Refresh your wardrobe with the latest trends',
  },
  {
    id: 2,
    image: '/images/mens.jpg',
    focus: 'object-[50%_25%]',
    title: 'Up to 40% Off Menswear',
    subtitle: 'Sharp looks for every occasion',
  },
  {
    id: 3,
    image: '/images/oo.jpg',
    focus: 'object-top',
    title: "Women's Collection",
    subtitle: 'Effortless style, made for you',
  },
  {
    id: 4,
    image: '/images/kids.jpg',
    focus: 'object-[50%_25%]',
    title: 'Kids Fashion',
    subtitle: 'Comfortable, playful, durable',
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => setCurrent(index);
  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover ${slide.focus || 'object-center'}`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start px-8 sm:px-16 md:px-24 pb-16 sm:pb-20">
            <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold mb-3 max-w-xl leading-tight">
              {slide.title}
            </h2>
            <p className="text-white/90 text-base sm:text-xl mb-6 max-w-md">{slide.subtitle}</p>
            <button
              onClick={scrollToProducts}
              className="w-fit bg-surface text-heading font-semibold px-8 py-3 rounded-full border-2 border-white hover:bg-transparent hover:text-white transition-colors tracking-wide"
            >
              SHOP NOW
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/70 hover:bg-surface flex items-center justify-center text-heading font-bold text-lg"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/70 hover:bg-surface flex items-center justify-center text-heading font-bold text-lg"
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === current ? 'bg-surface' : 'bg-surface/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}