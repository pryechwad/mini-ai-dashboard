import { useState, useEffect } from "react";

export default function WelcomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Welcome to Mini AI Dashboard",
      subtitle: "Your AI productivity companion",
      description: "Your intelligent companion for AI-powered productivity. Create, manage, and optimize your AI prompts with our cutting-edge dashboard.",
      icon: "🚀",
      gradient: "from-blue-600 via-purple-600 to-indigo-600",
      features: ["Smart Prompt Management", "Real-time Analytics", "Team Collaboration"]
    },
    {
      id: 2,
      title: "Powerful AI Tools",
      subtitle: "Everything you need in one place",
      description: "Access advanced AI capabilities, track your usage, and get insights into your AI workflow performance with detailed analytics.",
      icon: "🤖",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      features: ["Advanced AI Models", "Usage Analytics", "Performance Insights"]
    },
    {
      id: 3,
      title: "Seamless Experience",
      subtitle: "Built for modern workflows",
      description: "Enjoy a beautiful, responsive interface that works perfectly across all devices. Dark mode, notifications, and real-time updates included.",
      icon: "✨",
      gradient: "from-pink-600 via-rose-600 to-red-600",
      features: ["Responsive Design", "Dark Mode Support", "Real-time Updates"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-2xl sm:rounded-3xl">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <div className={`relative overflow-hidden bg-gradient-to-r ${slide.gradient} p-6 sm:p-8 lg:p-12 text-white min-h-[300px] sm:min-h-[350px]`}>
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 -left-6 w-24 h-24 sm:w-40 sm:h-40 bg-white/5 rounded-full animate-bounce"></div>
                <div className="absolute bottom-4 right-1/3 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full animate-ping"></div>
              </div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full">
                <div className="flex-1 text-center lg:text-left mb-6 lg:mb-0">
                  <div className="text-5xl sm:text-6xl lg:text-7xl mb-4 lg:hidden">{slide.icon}</div>
                  
                  <h1 className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold mb-2 sm:mb-3">
                    {slide.title}
                  </h1>
                  
                  <p className="text-sm sm:text-base lg:text-xl text-white/90 font-medium mb-3 sm:mb-4">
                    {slide.subtitle}
                  </p>
                  
                  <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-4 sm:mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                    {slide.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="hidden lg:block text-6xl lg:text-8xl xl:text-9xl animate-bounce">
                  {slide.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs sm:text-sm font-medium">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}