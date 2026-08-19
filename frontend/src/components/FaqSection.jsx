import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What is FilmSayti?",
    answer:
      "FilmSayti is a platform where you can discover movies and series, save them to your wishlist, and explore curated collections.",
  },
  {
    question: "How do I Get Help If I Have Any Issues?",
    answer: "You can reach out to our support team through the contact page or email us directly.",
  },
  {
    question: "Is FilmSayti Good For Kids & Families?",
    answer: "Yes, we provide content ratings and filters to help families choose age-appropriate titles.",
  },
  {
    question: "How much Does FilmSayti Cost?",
    answer: "We offer flexible pricing plans starting from our Basic plan — check the Pricing section above.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">The FilmSayti Questions Everyone's Asking</h2>

      <div className="faq-list">
        {FAQ_ITEMS.map((item, index) => (
          <div key={item.question} className="faq-item">
            <button
              className={`faq-question ${openIndex === index ? "open" : ""}`}
              onClick={() => toggle(index)}
            >
              {item.question}
              <ChevronDown size={18} />
            </button>
            <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;