import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export default function SuccessWrapper() {
  return (
    <Suspense fallback={<p className="p-8 text-center">Loading...</p>}>
      <SuccessContent />
    </Suspense>
  );
}
