import Form from "@/components/Form";
import Loading from "../profile/loading";
import { Suspense } from "react";

const UpdatePrompt = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Form type="Edit" />
    </Suspense>
  );
};

export default UpdatePrompt;
