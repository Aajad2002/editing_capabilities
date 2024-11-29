"use client";
import React, { useState } from "react";
import Layout1 from "../components/Layout1";
import Layout2 from "../components/Layout2";
import { Plus, Layout, Image, LayoutTemplate } from "lucide-react";
import SectionPicker from "@/components/SectionPicker";

const Home: React.FC = () => {
  const [layout, setLayout] = useState<"layout1" | "layout2">("layout1");
  const [showSectionPicker, setShowSectionPicker] = useState(false);

  const handleAddSection = (sectionType: string) => {
    // Add logic to handle new section addition
    console.log(`Adding new section: ${sectionType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <LayoutTemplate className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Landing Page Builder
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSectionPicker(true)}
                className="flex items-center px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </button>
              <select
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
                value={layout}
                onChange={(e) =>
                  setLayout(e.target.value as "layout1" | "layout2")
                }
              >
                <option value="layout1">Modern Layout</option>
                <option value="layout2">Classic Layout</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {showSectionPicker && (
        <SectionPicker
          onAdd={handleAddSection}
          onClose={() => setShowSectionPicker(false)}
        />
      )}

      <main className="pt-16">
        {layout === "layout1" ? <Layout1 /> : <Layout2 />}
      </main>
    </div>
  );
};

export default Home;
