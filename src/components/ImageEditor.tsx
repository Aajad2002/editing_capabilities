import React, { useState } from "react";
import dynamic from "next/dynamic";

// Import Lucide icons with dynamic import
const X = dynamic(() => import("lucide-react").then((mod) => mod.X), {
  ssr: false,
});

interface ImageEditorProps {
  currentImage: string;
  onUpdateImage: (newImage: string) => void;
  onClose: () => void;
}

const ImageEditorComponent: React.FC<ImageEditorProps> = ({
  currentImage,
  onUpdateImage,
  onClose,
}) => {
  const [imageUrl, setImageUrl] = useState<string>(currentImage);

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (imageUrl) {
      try {
        const img = new window.Image();
        img.onload = () => {
          onUpdateImage(imageUrl);
        };
        img.onerror = () => {
          alert("Failed to load image from URL. Please check the URL and try again.");
        };
        img.src = imageUrl;
      } catch (error) {
        alert("Invalid image URL");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[500px] overflow-hidden">
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Change Image</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              type="button"
            >
              {typeof window !== 'undefined' && <X className="w-5 h-5 text-gray-500" />}
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="image-url">
                Image URL
              </label>
              <div className="flex gap-2">
                <input
                  id="image-url"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export with dynamic import and disabled SSR
export default dynamic(() => Promise.resolve(ImageEditorComponent), {
  ssr: false
});