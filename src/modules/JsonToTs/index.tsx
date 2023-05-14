import MonacoEditor from "@/components/MonacoEditor";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import prettier from "prettier/standalone";

const JsonToTs = () => {
  const [rawText, setRawText] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("Root");
  const debounceRef = useRef<any>();

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

  const onChange = (value: string | undefined) => {
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

  useEffect(() => {
    if (title) {
      onChange(rawText);
    }
  }, [title]);

  return (
    <div>
      <div className="w-1/2">
        <input
          value={title}
          onChange={onChangeForm}
          className="border rounded"
        />
      </div>
      <div className="flex flex-row">
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
            options={{
              readOnly: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default JsonToTs;
