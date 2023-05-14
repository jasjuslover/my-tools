import Editor, { OnChange } from "@monaco-editor/react";

interface MonacoEditorProps {
  defaultLanguage?: string;
  onChange?: OnChange;
  options?: any;
  value?: string;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  defaultLanguage,
  onChange,
  options,
  value,
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
    />
  );
};

export default MonacoEditor;
