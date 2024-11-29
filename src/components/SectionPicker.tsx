import React from 'react';
import { X, Layout, Image, ListChecks } from 'lucide-react';
import Footer from './sections/Footer';

interface SectionPickerProps {
  onAdd: (sectionType: string) => void;
  onClose: () => void;
}

const SectionPicker: React.FC<SectionPickerProps> = ({ onAdd, onClose }) => {
  const sections = [
    { id: 'hero', name: 'Hero Section', icon: Image },
    { id: 'features', name: 'Features Section', icon: ListChecks },
    { id: 'footer', name: 'Footer Section', icon: Footer }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 max-w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New Section</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                onAdd(section.id);
                onClose();
              }}
              className="w-full flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-all"
            >
              <span>{section.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionPicker;