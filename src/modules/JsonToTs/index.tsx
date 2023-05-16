import MonacoEditor from "@/components/MonacoEditor";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import prettier from "prettier/standalone";
import copy from "clipboard-copy";

const JsonToTs = () => {
  const [rawText, setRawText] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("Root");
  const debounceRef = useRef<any>();
  const editorRef = useRef<any>();

  const transformer = useCallback(
    async (value: string | undefined) => {
      const { run } = await import("json_typegen_wasm");
      return run(
        title,
        value || "",
        JSON.stringify({
          output_mode: "typescript",
        })
      );
    },
    [title]
  );

  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const onChange = (value: string | undefined) => {
    if (!value) return;
    setRawText(value || "");
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      transform(value);
    }, 800);
  };

  const transform = async (value: string | undefined) => {
    try {
      const result = await transformer(value);
      const prettifyResult = await prettify(result);
      setText(prettifyResult);
    } catch (error) {
      console.error(error);
    }
  };

  const prettify = (value: string) => {
    return prettier.format(value, {
      parser: "typescript",
      plugins: [require("prettier/parser-typescript")],
      semi: false,
    });
  };

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCopy = () => {
    copy(editorRef.current?.getValue() || "");
  };

  useEffect(() => {
    if (title) {
      onChange(rawText);
    }
  }, [title]);

  return (
    <main>
      <div className="flex flex-row justify-between p-5">
        <input
          value={title}
          onChange={onChangeForm}
          className="border rounded-md px-3 py-1"
        />
        <button onClick={handleCopy}>Copy</button>
      </div>
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
            defaultLanguage="typescript"
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

export default JsonToTs;
