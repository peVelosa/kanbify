import { CardTitle, CardHeader } from "@/components/ui/card";

export default function FormHeader({ subtitle }: { subtitle?: string }) {
  return (
    <>
      <CardHeader className="items-center justify-center">
        <div className="flex flex-row items-start justify-center gap-4">
          <CardTitle className="text-3xl">Kanbify</CardTitle>
        </div>
        <p className="text-neutral-700">{subtitle}</p>
      </CardHeader>
    </>
  );
}
