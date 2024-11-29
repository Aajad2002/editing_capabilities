import React, { useState, useEffect } from "react";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Footer from "./sections/Footer";
import { ListChecks, Image, FileText } from "lucide-react";

type Section = "hero" | "features" | "footer";

type Content = {
  hero: {
    backgroundImage: string;
    title: string;
    description: string;
  };
  features: string[];
  footer: string;
  sections: Section[];
};

type HeroFields = keyof Content['hero'];

interface SectionConfig {
  id: Section;
  name: string;
  icon: React.ElementType;
}

const defaultContent: Content = {
  hero: {
    backgroundImage: "https://up.yimg.com/ib/th?id=OIP.B8u7c37kE5ZdM5ZCRm-4hwHaFF&pid=Api&rs=1&c=1&qlt=95&w=168&h=115",
    title: "<h1>Welcome to Layout 2</h1>",
    description:
      "<p>Create a stunning landing page with our easy-to-use builder.</p>",
  },
  features: [
    '<div class="feature"><h3>Feature A</h3><p>Describe your amazing feature here.</p></div>',
    '<div class="feature"><h3>Feature B</h3><p>Highlight the benefits of your product.</p></div>',
    '<div class="feature"><h3>Feature C</h3><p>Show what makes you unique.</p></div>',
  ],
  footer: "<div><h4>Your Company</h4><p>Contact: info@example.com</p></div>",
  sections: ["hero", "features", "footer"],
};

const Layout2: React.FC = () => {
  const sections: SectionConfig[] = [
    { id: "hero", name: "Hero Section", icon: Image },
    { id: "features", name: "Features Section", icon: ListChecks },
    { id: "footer", name: "Footer Section", icon: FileText }
  ];

  const [content, setContent] = useState<Content>(defaultContent);

  useEffect(() => {
    const savedContent = localStorage.getItem("layout2");
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setContent(parsedContent);
      } catch (error) {
        console.error("Error parsing localStorage content:", error);
        setContent(defaultContent);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("layout2", JSON.stringify(content));
  }, [content]);

  const handleFeatureAdd = () => {
    setContent((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        '<div class="feature"><h3>New Feature</h3><p>Describe your feature here</p></div>',
      ],
    }));
  };

  const handleFeatureDelete = (index: number) => {
    setContent((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = (
    section: keyof Omit<Content, 'sections'>,
    field: HeroFields | number | string,
    value: string
  ) => {
    setContent((prev) => {
      const updated = { ...prev };
      if (section === "hero" && typeof field === "string") {
        updated.hero = {
          ...updated.hero,
          [field]: value
        };
      } else if (section === "features" && typeof field === "number") {
        updated.features[field] = value;
      } else if (section === "footer") {
        updated.footer = value;
      }
      return updated;
    });
  };

  const handleAddSection = (sectionType: Section) => {
    if (!content.sections.includes(sectionType)) {
      setContent((prev) => ({
        ...prev,
        sections: [...prev.sections, sectionType],
      }));
    }
  };

  const handleRemoveSection = (sectionType: Section) => {
    setContent((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section !== sectionType),
    }));
  };

  const renderSection = (sectionType: Section) => {
    switch (sectionType) {
      case "hero":
        return (
          <Hero
            backgroundImage={content.hero.backgroundImage}
            title={content.hero.title}
            description={content.hero.description}
            onEdit={(field, value) => handleEdit("hero", field, value)}
            onBackgroundEdit={(value) => handleEdit("hero", "backgroundImage", value)}
          />
        );
      case "features":
        return (
          <Features
            features={content.features}
            onEdit={(index, value) => handleEdit("features", index, value)}
            onDelete={handleFeatureDelete}
            onAdd={handleFeatureAdd}
          />
        );
      case "footer":
        return (
          <Footer
            content={content.footer}
            onEdit={(value) => handleEdit("footer", "", value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col">
        {content.sections.map((section) => (
          <div key={section}>{renderSection(section)}</div>
        ))}
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h4 className="text-sm font-semibold mb-2">Manage Sections</h4>
          <div className="space-y-2">
            {sections.map(({ id, icon: Icon }) => (
              <div
                key={id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-600" />
                  <span className="capitalize">{id}</span>
                </div>
                {content.sections.includes(id) ? (
                  <button
                    onClick={() => handleRemoveSection(id)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddSection(id)}
                    className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 rounded hover:bg-blue-50"
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout2;