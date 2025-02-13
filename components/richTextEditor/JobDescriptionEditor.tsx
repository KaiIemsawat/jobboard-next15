import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";

export function JobDescriptionEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false, // important for NextJs to set as 'false'
  });
  return (
    <div className="w-full border rounded-lg overflow-hidden bg-card">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
