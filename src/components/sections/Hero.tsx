// components/sections/Hero.tsx
import React, { useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ImagePlus, Edit2 } from "lucide-react";
import ImageEditor from "../ImageEditor";

interface HeroProps {
  backgroundImage: string;
  title: string;
  description: string;
  onEdit: (field: "title" | "description", value: string) => void;
  onBackgroundEdit: (value: string) => void;
}

const Hero: React.FC<HeroProps> = ({
  backgroundImage,
  title,
  description,
  onEdit,
  onBackgroundEdit,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);

  return (
    <section
      className="relative w-full min-h-[85vh] bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Single Image Editor Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={() => setShowImageEditor(true)}
          className="p-3 bg-white/90 rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 cursor-pointer"
        >
          <ImagePlus className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Image Editor Modal */}
      {showImageEditor && (
        <div className="z-50">
          <ImageEditor
            currentImage={backgroundImage}
            onUpdateImage={(newImage) => {
              onBackgroundEdit(newImage);
              setShowImageEditor(false);
            }}
            onClose={() => setShowImageEditor(false)}
          />
        </div>
      )}

      {/* Content Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 space-y-8">
        {/* Title */}
        <div className="relative w-full max-w-4xl group">
          {!isEditingTitle ? (
            <div className="relative">
              <div
                className="text-5xl font-bold text-center leading-tight cursor-pointer"
                onClick={() => setIsEditingTitle(true)}
                dangerouslySetInnerHTML={{ __html: title || "Add a Title" }}
              />
              <button
                className="absolute -right-16 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                onClick={() => setIsEditingTitle(true)}
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="bg-white/95 rounded-xl p-4 shadow-2xl backdrop-blur-sm">
              <RichTextEditor
                initialValue={title}
                setOpen={setIsEditingTitle}
                onEditorChange={(content) => {
                  onEdit("title", content);
                  setIsEditingTitle(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="relative w-full max-w-3xl group">
          {!isEditingDescription ? (
            <div className="relative">
              <div
                className="text-xl text-center leading-relaxed cursor-pointer"
                onClick={() => setIsEditingDescription(true)}
                dangerouslySetInnerHTML={{
                  __html: description || "Add a Description",
                }}
              />
              <button
                className="absolute -right-16 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                onClick={() => setIsEditingDescription(true)}
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="bg-white/95 rounded-xl p-4 shadow-2xl backdrop-blur-sm">
              <RichTextEditor
                initialValue={description}
                setOpen={setIsEditingDescription}
                onEditorChange={(content) => {
                  onEdit("description", content);
                  setIsEditingDescription(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
