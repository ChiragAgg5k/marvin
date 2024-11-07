import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkle } from "lucide-react";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    try {
      const data = await fetchAIResponse(generatePrompt());
      setScopeData(data);
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

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {scopeData &&
          scopeData.components.map((component: any, index: number) => (
            <Card
              key={index}
              className="p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-start mb-4">
                <h2 className="text-xl font-bold text-blue-900">
                  {component.title}
                </h2>
                <p className="text-sm text-muted-foreground font-light">
                  {component.overview}
                </p>
              </div>
              <div className="space-y-3 text-gray-600">
                {component.items.map((item: any, itemIndex: number) => (
                  <div key={itemIndex} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0" />
                    <p className="text-sm">{item}</p>
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
