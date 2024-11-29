import React, { useState } from "react";
import { X, Upload, ImageOff } from "lucide-react";
import NextImage from "next/image"; // Renamed to avoid conflict

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
  const [imageUrl, setImageUrl] = useState(currentImage);
  const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url');
  const [isDragging, setIsDragging] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  const handleImageLoad = () => {
    setImgError(false);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          onUpdateImage(event.target.result as string);
          setImgError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl) {
      try {
        const img = document.createElement('img');
        img.onload = () => {
          onUpdateImage(imageUrl);
          setImgError(false);
        };
        img.onerror = () => {
          setImgError(true);
          alert("Failed to load image from URL. Please check the URL and try again.");
        };
        img.src = imageUrl;
      } catch (error: unknown) {
        setImgError(true);
        alert("Invalid image URL");
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          onUpdateImage(event.target.result as string);
          setImgError(false);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image file");
    }
  };

  // Props for Image component with proper types
  const imageProps = {
    src: currentImage,
    alt: "Preview",
    fill: true,
    className: "object-cover",
    onError: handleImageError,
    onLoad: handleImageLoad,
    unoptimized: currentImage.startsWith('data:'),
  } as const;

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
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex mt-4 space-x-1 border-b">
            <button
              onClick={() => setActiveTab('url')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative ${
                activeTab === 'url'
                  ? 'text-blue-600 bg-blue-50/50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              URL
              {activeTab === 'url' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative ${
                activeTab === 'upload'
                  ? 'text-blue-600 bg-blue-50/50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Upload
              {activeTab === 'upload' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {activeTab === 'url' ? (
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <div className="flex gap-2">
                  <input
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
          ) : (
            <div
              className={`relative group border-2 border-dashed rounded-lg transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center py-12 cursor-pointer"
              >
                <div className="p-4 bg-blue-50 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  SVG, PNG, JPG or GIF (Max. 5MB)
                </p>
              </label>
            </div>
          )}

          {/* Preview */}
          {currentImage && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Preview
                </label>
                <span className="text-xs text-gray-500">
                  Current image preview
                </span>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50 relative h-48">
                {imgError ? (
                  <div className="flex items-center justify-center h-full">
                    <ImageOff className="w-8 h-8 text-gray-400" />
                  </div>
                ) : (
                  <NextImage {...imageProps} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;