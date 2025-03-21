import React, { useState, useRef, useEffect, Children } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Carousel = ({ children, className }) => {
  const slides = Children.toArray(children);
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const diffX = useRef(0);
  const sliderRef = useRef(null);
  
  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const goTo = (index) => setCurrent(index);
  
  // Drag logic
  const onMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX;
    sliderRef.current.style.cursor = 'grabbing';
  };
  
  const onMouseMove = (e) => {
    if (!isDragging) return;
    diffX.current = e.clientX - startX.current;
    sliderRef.current.style.transform = `translateX(calc(-${current * 100}% + ${diffX.current}px))`;
  };
  
  const onMouseUp = () => {
    setIsDragging(false);
    const threshold = 50;
    if (diffX.current > threshold) {
      prev();
    } else if (diffX.current < -threshold) {
      next();
    } else {
      sliderRef.current.style.transform = `translateX(-${current * 100}%)`;
    }
    diffX.current = 0;
    sliderRef.current.style.cursor = 'grab';
  };
  
  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.style.transition = "transform 0.4s ease";
    sliderRef.current.style.transform = `translateX(-${current * 100}%)`;
    const timer = setTimeout(() => {
      if (sliderRef.current) sliderRef.current.style.transition = "";
    }, 400);
    return () => clearTimeout(timer);
  }, [current]);
  
  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-xl", className)}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={isDragging ? onMouseUp : undefined}
    >
      {/* Slides */}
      <div
        ref={sliderRef}
        className="flex w-full cursor-grab select-none"
        style={{ userSelect: "none" }}
      >
        {slides.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0 px-4">
            {child}
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10">
        <Button variant="ghost" size="icon" onClick={prev}>
          <ChevronLeft />
        </Button>
      </div>
      <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10">
        <Button variant="ghost" size="icon" onClick={next}>
          <ChevronRight />
        </Button>
      </div>
      
      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              current === index ? "bg-teal-500" : "bg-teal-50/30"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};