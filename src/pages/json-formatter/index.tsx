import dynamic from "next/dynamic";

const JsonFormatter = dynamic(() => import("@/modules/JsonFormatter"));

const JsonFormatterPage = () => {
  return (
    <>
      <JsonFormatter />
    </>
  );
};

export default JsonFormatterPage;
