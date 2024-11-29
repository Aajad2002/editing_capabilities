import dynamic from 'next/dynamic';
import React, { useState, useCallback } from "react";
import { X } from "lucide-react";
import type { ImageProps } from 'next/image';

// Import Image component dynamically to avoid SSR issues
const NextImage = dynamic<ImageProps>(() => import('next/image'), {
  ssr: false
});

interface ImageEditorProps {
  currentImage: string;
  onUpdateImage: (newImage: string) => void;
  onClose: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  currentImage,
  onUpdateImage,
  onClose,
}) => {
  const [imageUrl, setImageUrl] = useState<string>(currentImage);
  const [imgError, setImgError] = useState<boolean>(false);

  const handleImageError = useCallback((): void => {
    setImgError(true);
  }, []);

  const handleImageLoad = useCallback((): void => {
    setImgError(false);
  }, []);

  const handleUrlSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (imageUrl) {
      try {
        const img = document.createElement('img');
        img.onload = (): void => {
          onUpdateImage(imageUrl);
          setImgError(false);
        };
        img.onerror = (): void => {
          setImgError(true);
          alert("Failed to load image from URL. Please check the URL and try again.");
        };
        img.src = imageUrl;
      } catch (error) {
        setImgError(true);
        alert("Invalid image URL");
      }
    }
  }, [imageUrl, onUpdateImage]);

  const imageProps: ImageProps = {
    src: currentImage,
    alt: "Preview",
    fill: true,
    className: "object-cover",
    onError: handleImageError,
    onLoad: handleImageLoad,
    unoptimized: true,
    loading: "eager",
    width: 500,
    height: 300,
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[500px] overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Change Image</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              type="button"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
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

export default dynamic(() => Promise.resolve(ImageEditor), {
  ssr: false
});