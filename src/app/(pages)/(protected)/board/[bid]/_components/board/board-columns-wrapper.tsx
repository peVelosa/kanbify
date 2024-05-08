const BoardColumnsMap = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="mt-8 grid grid-cols-[repeat(auto-fit,_250px)] gap-4 overflow-auto">
    <div className="container relative mt-8 flex h-full max-h-full flex-1">
      <div className="absolute h-full max-h-full w-full pb-4">
        <div className="flex max-h-full gap-8 overflow-x-auto pb-4">{children}</div>
      </div>
    </div>
  );
};

export default BoardColumnsMap;
