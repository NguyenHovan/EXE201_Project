import { useState, useEffect } from "react";

const Header = () => {
  const messages = [
    "Millions of Boxes Delivered",
    "More than 800 5-Star Reviews",
    "Free U.S. Shipping (Discounted Internationally)",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [messages.length]);

  return (
    <div className="header-slider">
      <div
        className="slide"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: "transform 1s ease-in-out",
          display: "flex",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className="py-3"
            style={{
              backgroundColor: "#006ead",
              minWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <p className="font-bold text-white text-center">{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
