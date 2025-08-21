import { Spinner } from "@radix-ui/themes";

export default function LoadingScreen() {
  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center gap-4">
      <h1 className="text-lg font-medium">Loading...</h1>
      <Spinner size="3" />
    </div>
  )
}