"use client";

import AiButton from "@/components/animata/button/ai-button";
import ProjectScopeGenerator from "@/components/ProjectScopeGenerator";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, PenLine, Target, User, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function LandingPage() {
  const [showConversation, setShowConversation] = useState(false);
  const [sector, setSector] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [requiredScope, setRequiredScope] = useState<string>("");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container px-4 py-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="text-lg text-gray-600 font-bold">
              StrategyConnect
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 py-12">
        <>
          {/* Welcome Section */}
          <div className="mb-16 text-center">
            <div className="mb-2 flex justify-center">
              <MessageCircle className="h-12 w-12 text-blue-800 mr-3" />
              <h1 className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
                Hey, Welcome!
              </h1>
            </div>
            <p className="text-2xl font-extrabold text-gray-500 sm:text-3xl">
              Marvin AI quickly scopes out your project.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid gap-8 px-12 grid-cols-1 w-full md:grid-cols-3">
            {/* Describe Project */}
            <Card className="p-6 shadow-lg flex flex-col items-center justify-center hover:shadow-xl">
              <div className="mb-4">
                <PenLine className="h-6 w-6 text-cyan-500" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-blue-900">
                Describe Your Project
              </h2>
              <p className="mb-6 text-sm text-gray-500">
                Briefly share your strategic needs and business context.
              </p>
              <Input
                placeholder="Tell me your project needs briefly."
                className="mb-4"
              />
              <div className="space-y-3">
                <p className="text-xs text-gray-800">Example Prompts:</p>
                <div className="space-y-2 text-xs text-gray-500">
                  <p>
                    I am a local bank in Nigeria, looking to digitalise my
                    processes and operations.
                  </p>
                  <p>
                    I am a food and beverage company based in UAE and I want to
                    optimise my e-retail operations to increase my digital
                    footprint.
                  </p>
                </div>
              </div>
            </Card>

            {/* Scope Project */}
            <Card className="p-6 shadow-lg flex flex-col items-center justify-center hover:shadow-xl">
              <div className="mb-4">
                <Target className="h-6 w-6 text-cyan-500" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-blue-900">
                Scope out Project
              </h2>
              <p className="mb-6 text-sm text-gray-500">
                Review and refine your project scope, expertly crafted by
                Marvin.
              </p>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-medium text-blue-900">
                  Market Opportunity Assessment
                </h3>
                <p className="text-sm text-gray-500">
                  20 Relevant projects done by StrategyConnect
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <div className="text-6xl font-bold text-blue-200">1</div>
                </div>
              </div>
            </Card>

            {/* Team & Budget */}
            <Card className="p-6 shadow-lg flex flex-col items-center justify-center hover:shadow-xl">
              <div className="mb-4">
                <Users className="h-6 w-6 text-cyan-500" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-blue-900">
                Get Your Team & Budget
              </h2>
              <p className="mb-6 text-sm text-gray-500">
                Start with confidence as Marvin assembles your dream team and
                estimate budget
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Team Structure & Pricing
                  </span>
                  <span className="text-xs text-gray-400">+</span>
                </div>
                <div className="flex justify-between gap-4">
                  <div className="h-12 w-12 grid place-items-center rounded-full bg-gray-100" />
                  <div className="h-12 w-12 grid place-items-center rounded-full bg-gray-100">
                    <User className="h-1/2 w-1/2 text-gray-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm text-gray-500">
                    Estimated Pricing For X Months
                  </span>
                  <span className="font-medium text-blue-900">
                    $20,600 - $30,000
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </>

        {/* CTA Button */}
        <div className="mt-3 flex justify-center">
          <AiButton setShowConversation={setShowConversation} />
        </div>

        {/* Footer Text */}
        <div className="mt-2 flex-col flex items-center">
          <p className="text-center text-sm text-gray-400 max-w-xl">
            Share your project vision, and let AI transform it into a detailed
            plan, including scope, team, and budget.
          </p>
          <hr className="my-4 border-gray-200 w-1/2" />
          <p className="text-center text-sm text-gray-400 max-w-xl">
            Have a project scope? Looking to connect with our talent pool?{" "}
            <span className="text-blue-900">Book a call now!</span>
          </p>
        </div>
      </main>

      {showConversation && (
        <div className="mx-auto px-8 max-w-5xl flex min-h-screen flex-col items-center justify-center">
          <div className="mb-16 space-y-8">
            <div className="flex items-center gap-4">
              <MessageCircle className="h-12 w-12 text-blue-900" />
              <div>
                <h2 className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent">
                  {"Hey, I'm Marvin"}
                </h2>
                <p className="text-3xl font-bold text-gray-500">
                  {"Let's hear from you!"}
                </p>
              </div>
            </div>

            <div className="space-y-4 font-semibold">
              <p className="text-3xl text-gray-500 leading-relaxed">
                {"We're in"}{" "}
                <input
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="inline-block border-b border-blue-900 focus:outline-none"
                  placeholder="education"
                />{" "}
                industry based out of{" "}
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="inline-block border-b border-blue-900 focus:outline-none"
                  placeholder="noida"
                />{" "}
                and we need{" "}
                <input
                  value={requiredScope}
                  onChange={(e) => setRequiredScope(e.target.value)}
                  className="inline-block w-full border-b border-blue-900 focus:outline-none"
                  placeholder="attract more small to medium sized businesses for growth."
                />
              </p>

              <ProjectScopeGenerator
                sector={sector}
                location={location}
                requiredScope={requiredScope}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
