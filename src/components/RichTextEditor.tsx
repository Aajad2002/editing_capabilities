import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { RawEditorOptions } from 'tinymce/tinymce';

// Define types for TinyMCE configuration
type ToolbarMode = 'floating' | 'sliding' | 'scrolling' | 'wrap';

interface TinyMCEInit extends Omit<RawEditorOptions, 'toolbar_mode'> {
  height: number;
  menubar: string | false;
  branding: boolean;
  statusbar: boolean;
  plugins: string[];
  toolbar1: string;
  toolbar2: string;
  toolbar_mode: ToolbarMode;
  link_context_toolbar: boolean;
  link_assume_external_targets: boolean;
  target_list: Array<{ title: string; value: string }>;
  advlist_bullet_styles: string;
  advlist_number_styles: string;
  lists_indent_on_tab: boolean;
  indent_use_margin: boolean;
  indent: boolean;
  indent_margin: string;
  font_formats: string;
  content_style: string;
  setup: (editor: TinyMCEEditor) => void;
  quickbars_selection_toolbar: string;
  quickbars_insert_toolbar: boolean;
}

// Props interface
interface RichTextEditorProps {
  initialValue: string;
  onEditorChange: (content: string) => void;
  setOpen: (isOpen: boolean) => void;
}

// Static configurations
const TINYMCE_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const EDITOR_INIT: TinyMCEInit = {
  height: 500,
  menubar: "format",
  branding: false,
  statusbar: false,
  plugins: [
    'lists',
    'advlist',
    'autolink',
    'link',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'table',
    'paste',
    'help',
    'wordcount',
  ],
  toolbar1: 'undo redo | formatselect | bold italic underline | link | bullist numlist | outdent indent',
  toolbar2: 'fontselect fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | removeformat',
  toolbar_mode: 'wrap' as ToolbarMode,
  
  link_context_toolbar: true,
  link_assume_external_targets: true,
  target_list: [
    { title: 'None', value: '' },
    { title: 'New window', value: '_blank' }
  ],
  
  advlist_bullet_styles: 'disc circle square',
  advlist_number_styles: 'default lower-alpha lower-roman upper-alpha upper-roman',
  lists_indent_on_tab: true,
  
  indent_use_margin: true,
  indent: true,
  indent_margin: '40px',
  
  font_formats: `
    Arial=arial,helvetica,sans-serif;
    Georgia=georgia,palatino,serif;
    Times New Roman='Times New Roman',times,serif;
    Verdana=verdana,geneva,sans-serif;
    Poppins=poppins,sans-serif;
    Manrope=manrope,sans-serif;
    Courier New='Courier New',courier,monospace;
    Comic Sans MS='Comic Sans MS',cursive,sans-serif;
  `,
  
  content_style: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&family=Poppins:wght@400;700&display=swap');
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      padding: 10px;
    }
    .mce-content-body {
      background-color: #f9f9f9;
    }
    /* List Styles */
    ul, ol {
      padding-left: 40px;
      margin: 0 0 10px 0;
    }
    ul {
      list-style-type: disc;
    }
    ul ul {
      list-style-type: circle;
    }
    ul ul ul {
      list-style-type: square;
    }
    ol {
      list-style-type: decimal;
    }
    ol ol {
      list-style-type: lower-alpha;
    }
    ol ol ol {
      list-style-type: lower-roman;
    }
    li {
      margin-bottom: 5px;
    }
    /* Link Styles */
    a {
      color: #2563eb;
      text-decoration: underline;
    }
    a:hover {
      color: #1d4ed8;
    }
  `,

  setup: (editor: TinyMCEEditor) => {
    editor.on('init', () => {
      editor.formatter.register({
        ul: {
          selector: 'ul',
          classes: ['custom-list']
        },
        ol: {
          selector: 'ol',
          classes: ['custom-list']
        }
      });
    });

    editor.addShortcut('meta+k', 'Insert link', () => {
      editor.execCommand('mceLink');
    });
  },

  quickbars_selection_toolbar: 'bold italic link | bullist numlist',
  quickbars_insert_toolbar: false,
};

export default function RichTextEditor({
  initialValue,
  onEditorChange,
  setOpen
}: RichTextEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleSave = () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      onEditorChange(editorContent);
      setOpen(false);
    }
  };

  return (
    <div className="p-6 bg-transparent shadow-md rounded-lg">
      <Editor
        apiKey={TINYMCE_API_KEY}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        initialValue={initialValue}
        init={EDITOR_INIT}
      />
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
}