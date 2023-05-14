import MonacoEditor from "@/components/MonacoEditor";
import { useCallback, useRef, useState } from "react";

const JsonToTs = () => {
  const transformer = useCallback(async (value: string | undefined) => {
    const { run } = await import("json_typegen_wasm");
    return run(
      "Root",
      value || "",
      JSON.stringify({
        output_mode: "typescript",
      })
    );
  }, []);

  const [text, setText] = useState("");
  const debounceRef = useRef<any>();

  const onChange = (value: string | undefined) => {
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
      setText(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="w-full">
          <MonacoEditor defaultLanguage="json" onChange={onChange} />
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