import MonacoEditor from "@/components/MonacoEditor";
import { useEffect, useRef, useState } from "react";

const JsonFormatter = () => {
  const [rawText, setRawText] = useState<string>("");
  const [text, setText] = useState<string>("");
  const debounceRef = useRef<any>();
  const editorRef = useRef<any>();

  const onChange = (value: string | undefined) => {
    if (!value) return;
    setRawText(value || "");
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setText(value);
    }, 800);
  };

  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (text) {
      editorRef.current.updateOptions({ readOnly: false });
      editorRef.current
        .getAction("editor.action.formatDocument")
        .run()
        .then(() => {
          editorRef.current.updateOptions({ readOnly: true });
        });
    }
  }, [text]);

  return (
    <main>
      <div className="flex flex-col md:flex-row">
        <div className="w-full">
          <MonacoEditor
            defaultLanguage="json"
            onChange={onChange}
            value={rawText}
          />
        </div>
        <div className="w-full">
          <MonacoEditor
            defaultLanguage="json"
            value={text}
            onMount={handleEditorMount}
            options={{
              readOnly: true,
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default JsonFormatter;
