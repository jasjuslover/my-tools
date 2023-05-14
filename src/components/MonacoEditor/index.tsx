import Editor, { OnChange, OnMount } from "@monaco-editor/react";

interface MonacoEditorProps {
  defaultLanguage?: string;
  onChange?: OnChange;
  options?: any;
  value?: string;
  onMount?: OnMount;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  defaultLanguage,
  onChange,
  options,
  value,
  onMount,
}: MonacoEditorProps) => {
  return (
    <Editor
      height="100vh"
      width="100%"
      defaultLanguage={defaultLanguage}
      defaultValue=""
      onChange={onChange}
      value={value}
      options={options}
      onMount={onMount}
    />
  );
};

export default MonacoEditor;
