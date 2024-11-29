import React, { useEffect } from "react";
import Hero from "./sections/Hero";
import Features from "./sections/Features";

type Content = {
  hero: {
    backgroundImage: string;
    title: string;
    description: string;
  };
  features: string[];
};

const defaultContent: Content = {
  hero: {
    backgroundImage: "https://up.yimg.com/ib/th?id=OIP.B8u7c37kE5ZdM5ZCRm-4hwHaFF&pid=Api&rs=1&c=1&qlt=95&w=168&h=115",
    title: "Welcome to Modern Layout",
    description: "This is a sample description.",
  },
  features: ["Feature 1", "Feature 2"],
};

const Layout1: React.FC = () => {
  const [content, setContent] = React.useState<Content>(defaultContent);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("layout1");
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

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem("layout1", JSON.stringify(content));
  }, [content]);

  const handleFeatureAdd = () => {
    setContent((prev) => ({
      ...prev,
      features: [...prev.features, "New Feature"],
    }));
  };

  const handleFeatureDelete = (index: number) => {
    setContent((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = (
    section: keyof Content,
    field: string | number,
    value: string
  ) => {
    setContent((prev) => {
      const updated = { ...prev };
      if (section === "hero") {
        (updated.hero as any)[field] = value;
      } else if (section === "features" && typeof field === "number") {
        updated.features[field] = value;
      }
      return updated;
    });
  };

  return (
    <div>
      <Hero
        backgroundImage={content.hero.backgroundImage}
        title={content.hero.title}
        description={content.hero.description}
        onEdit={(field, value) => handleEdit("hero", field, value)}
        onBackgroundEdit={(value) =>
          handleEdit("hero", "backgroundImage", value)
        }
      />
      <Features
        features={content.features}
        onEdit={(index, value) => handleEdit("features", index, value)}
        onDelete={handleFeatureDelete}
        onAdd={handleFeatureAdd}
      />
    </div>
  );
};

export default Layout1;