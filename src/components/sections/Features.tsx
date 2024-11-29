import React, { useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface FeaturesProps {
  features: string[];
  onEdit: (index: number, value: string) => void;
  onDelete: (index: number) => void;
  onAdd: () => void;
}

const Features: React.FC<FeaturesProps> = ({
  features,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <div className="py-20 px-8 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-3xl font-bold text-center mb-4">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-white border border-gray-100 rounded-xl p-8 hover:shadow-lg transition-all duration-300"
          >
            {editingIndex === index ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <RichTextEditor
                  initialValue={feature}
                  setOpen={(isOpen) => !isOpen && setEditingIndex(null)}
                  onEditorChange={(content) => {
                    onEdit(index, content);
                    setEditingIndex(null);
                  }}
                />
              </div>
            ) : (
              <div className="relative min-h-[150px]">
                <div
                  className="prose prose-lg max-w-none"
                  onClick={() => setEditingIndex(index)}
                  dangerouslySetInnerHTML={{ __html: feature }}
                />
                <div className="absolute -right-4 top-0 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => setEditingIndex(index)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-full mb-2 hover:bg-blue-100 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {features?.length > 1 && <button
                    onClick={() => onDelete(index)}
                    className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>}
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={onAdd}
          className="flex items-center justify-center h-[200px] border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
        >
          <div className="text-center">
            <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
            <span className="text-gray-500 group-hover:text-blue-600 font-medium">
              Add Feature
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Features;
