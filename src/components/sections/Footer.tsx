import React, { useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { Edit2 } from 'lucide-react';

interface FooterProps {
  content: string;
  onEdit: (value: string) => void;
}

const Footer: React.FC<FooterProps> = ({ content, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-4xl mx-auto px-8">
        {isEditing ? (
          <div className="bg-gray-800 rounded-xl p-6">
            <RichTextEditor
              initialValue={content}
              setOpen={setIsEditing}
              onEditorChange={(newContent) => {
                onEdit(newContent);
                setIsEditing(false);
              }}
            />
          </div>
        ) : (
          <div className="relative group">
            <div
              className="prose prose-invert max-w-none cursor-pointer"
              onClick={() => setIsEditing(true)}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <button 
              onClick={() => setIsEditing(true)}
              className="absolute -right-12 top-4 p-2 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;