import dynamic from "next/dynamic";

const JsonToTs = dynamic(() => import("@/modules/JsonToTs"), {
  ssr: false,
});

const JsonToTsPage = () => {
  return (
    <>
      <JsonToTs />
    </>
  );
};

export default JsonToTsPage;
