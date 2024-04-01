import { Transaction } from "@tiptap/pm/state";
import { EditorProvider, FloatingMenu } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

const extensions = [StarterKit, Underline, Link];

const Tiptap: React.FC<{
  value: string;
  handleOnUpdate?: (props: {
    editor: Editor;
    transaction: Transaction;
  }) => void;
  handleOnBlur?: () => void;
}> = ({ value, handleOnUpdate, handleOnBlur }) => {
  return (
    <EditorProvider
      extensions={extensions}
      content={value}
      onUpdate={handleOnUpdate}
      onBlur={handleOnBlur}
    >
      <FloatingMenu>
        <></>
      </FloatingMenu>
    </EditorProvider>
  );
};

export default Tiptap;
