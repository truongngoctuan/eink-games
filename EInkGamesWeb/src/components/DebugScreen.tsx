type DebugScreenProps = {
  data: string;
};

export default function DebugScreen({ data }: DebugScreenProps) {
  return (
    <div
      className="bg-amber-200 absolute bottom-0 right-0 px-4 py-2"
      suppressHydrationWarning
    >
      {data}
    </div>
  );
}
