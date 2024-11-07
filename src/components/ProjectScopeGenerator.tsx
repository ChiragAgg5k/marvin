import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkle } from "lucide-react";
import { useEffect, useState } from "react";
import ThinkingAnimation from "./ThinkingAnimation";

async function fetchAIResponse(prompt: string): Promise<any> {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-groq-70b-8192-tool-use-preview",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that generates a list of components for a given project scope.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.3,
          top_p: 0.85,
          max_tokens: 2048,
          presence_penalty: 0.1,
          frequency_penalty: 0.3,
          response_format: { type: "json_object" },
        }),
      },
    );

    if (!response.ok) {
      console.log(response);
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error("AI API call failed:", error);
    return null;
  }
}

const AnimatedText = ({
  text,
  isVisible,
}: {
  text: string;
  delay: number;
  isVisible: boolean;
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText("");
      return;
    }

    let currentText = "";
    const textArray = text.split("");
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < textArray.length) {
        currentText += textArray[currentIndex];
        setDisplayedText(currentText);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Adjust typing speed here

    return () => clearInterval(interval);
  }, [text, isVisible]);

  return <span className="inline-block">{displayedText}</span>;
};

const ProjectScopeGenerator = ({
  sector,
  location,
  requiredScope,
}: {
  sector: string;
  location: string;
  requiredScope: string;
}) => {
  const [scopeData, setScopeData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleComponents, setVisibleComponents] = useState<number[]>([]);

  const generatePrompt = () => {
    return `Generate a comprehensive project scope for a {sector} company located in {location}. The company is a {size} organization targeting {audience} and faces challenges such as {challenges}. The project aims to {requiredScope}. 

    Please provide 4 main components of the project, each with:
    - A descriptive title
    - A brief overview (2-3 sentences) explaining its significance
    - 4 detailed bullet points of specific tasks or considerations, including examples or case studies where applicable.

    Format the response as a JSON object with this structure:
    {
    "components": [
        {
        "title": "Component Name",
        "overview": "Brief overview of the component.",
        "items": ["task 1", "task 2", "task 3", "task 4"]
        }
    ]
    }`;
  };

  const generateScope = async () => {
    setLoading(true);
    setError(null);
    setVisibleComponents([]);

    try {
      window.scrollTo({
        top: window.scrollY + window.innerHeight,
        behavior: "smooth",
      });

      const [data] = await Promise.all([
        fetchAIResponse(generatePrompt()),
        new Promise((resolve) => setTimeout(resolve, 5000)),
      ]);

      setScopeData(data);

      // Stagger the appearance of components
      if (data && data.components) {
        data.components.forEach((_: any, index: number) => {
          setTimeout(() => {
            setVisibleComponents((prev) => [...prev, index]);
          }, index * 1000); // 1 second delay between each component
        });
      }
    } catch (err) {
      setError("Failed to generate scope. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <Button
        onClick={generateScope}
        disabled={loading || !sector || !location || !requiredScope}
        className="mb-8 bg-gradient-to-r from-blue-900 to-blue-500 text-white group w-full sm:w-auto"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkle className="mr-2 h-4 w-4 group-hover:animate-bounce" />
        )}
        Generate Project Scope
      </Button>

      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

      <ThinkingAnimation loading={loading} />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {scopeData &&
          scopeData.components.map((component: any, index: number) => (
            <Card
              key={index}
              className={`p-6 shadow-lg hover:shadow-xl transition-all duration-500 ${
                visibleComponents.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex flex-col items-start mb-4">
                <h2 className="text-xl font-bold text-blue-900">
                  <AnimatedText
                    text={component.title}
                    delay={index * 1000}
                    isVisible={visibleComponents.includes(index)}
                  />
                </h2>
                <p className="text-sm text-muted-foreground font-light">
                  <AnimatedText
                    text={component.overview}
                    delay={index * 1000 + 500}
                    isVisible={visibleComponents.includes(index)}
                  />
                </p>
              </div>
              <div className="space-y-3 text-gray-600">
                {component.items.map((item: any, itemIndex: number) => (
                  <div
                    key={itemIndex}
                    className={`flex items-start transition-all duration-500 ${
                      visibleComponents.includes(index)
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                    style={{
                      transitionDelay: `${itemIndex * 200}ms`,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0" />
                    <p className="text-sm">
                      <AnimatedText
                        text={item}
                        delay={index * 1000 + itemIndex * 200}
                        isVisible={visibleComponents.includes(index)}
                      />
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ProjectScopeGenerator;
