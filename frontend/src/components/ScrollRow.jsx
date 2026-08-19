import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ScrollRow = ({ children }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (!rowRef.current) return;
    const amount = 400;
    rowRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-row-wrapper">
      <button className="scroll-arrow left" onClick={() => scroll("left")} aria-label="Sola">
        <ChevronLeft size={18} />
      </button>

      <div className="scroll-row" ref={rowRef}>
        {children}
      </div>

      <button className="scroll-arrow right" onClick={() => scroll("right")} aria-label="Saga">
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default ScrollRow;