import { BrainCircuit } from "lucide-react";
import { useEffect, useState } from "react";

const ThinkingBubble = ({ delay = 0, size = 6 }) => (
  <div
    className={`absolute w-${size} h-${size} bg-blue-400 rounded-full opacity-0`}
    style={{
      animation: `think 2s infinite ${delay}ms`,
      boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
    }}
  />
);

const ThinkingAnimation = ({ loading }: { loading: boolean }) => {
  const [thinkingStep, setThinkingStep] = useState(0);
  const [fadeState, setFadeState] = useState("in");

  const thinkingSteps = [
    {
      title: "Neural Processing",
      subtitle: "Analyzing patterns and requirements...",
    },
    {
      title: "Synthesizing Ideas",
      subtitle: "Connecting relevant concepts and solutions...",
    },
    {
      title: "Refining Approach",
      subtitle: "Optimizing the proposed framework...",
    },
    {
      title: "Finalizing Solution",
      subtitle: "Crystalizing recommendations...",
    },
  ];

  useEffect(() => {
    if (!loading) return;

    const stepInterval = setInterval(() => {
      setFadeState("out");

      setTimeout(() => {
        setThinkingStep((prev) => (prev + 1) % thinkingSteps.length);
        setFadeState("in");
      }, 300);
    }, 3000);

    return () => {
      clearInterval(stepInterval);
    };
  }, [loading, thinkingSteps.length]);

  if (!loading) return null;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Neural Animation */}
      <div className="relative w-32 h-32 mb-8">
        {/* Central brain icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <BrainCircuit size={64} className="text-blue-500 animate-pulse" />
        </div>

        {/* Thinking bubbles */}
        <div className="absolute inset-0">
          {/* Inner circle of bubbles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`inner-${i}`}
              className="absolute"
              style={{
                left: `${50 + 25 * Math.cos((i * Math.PI) / 3)}%`,
                top: `${50 + 25 * Math.sin((i * Math.PI) / 3)}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <ThinkingBubble delay={i * 200} size={2} />
            </div>
          ))}

          {/* Outer circle of bubbles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`outer-${i}`}
              className="absolute"
              style={{
                left: `${50 + 45 * Math.cos((i * Math.PI) / 4)}%`,
                top: `${50 + 45 * Math.sin((i * Math.PI) / 4)}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <ThinkingBubble delay={i * 200 + 100} size={3} />
            </div>
          ))}
        </div>
      </div>

      {/* Text Content */}
      <div
        className={`flex flex-col items-center text-center space-y-2 transition-opacity duration-600 ${
          fadeState === "in" ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="text-xl font-semibold text-blue-900">
          {thinkingSteps[thinkingStep].title}
        </h3>
        <p className="text-sm text-blue-600/80 max-w-md">
          {thinkingSteps[thinkingStep].subtitle}
        </p>
      </div>

      {/* Progress Indicators */}
      <div className="flex space-x-2 mt-6">
        {thinkingSteps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === thinkingStep ? "bg-blue-500" : "bg-blue-200"
            }`}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes think {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ThinkingAnimation;
