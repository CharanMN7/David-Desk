import { Loader2 } from "lucide-react";

const ScreenLoader = () => {
  return (
    <span className="flex h-screen w-[100%] justify-center items-center space-x-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Loading...</span>
    </span>
  );
};
export default ScreenLoader;
