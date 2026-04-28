const HomeTranscationSkeleton = () => {
  return (
    <div className="mx-auto space-y-6 md:w-11/12">
      {[1, 2].map((i) => (
        <div key={i} className="space-y-3">
          <div className="bg-muted mx-auto h-4 w-20 animate-pulse rounded" />
          <div className="bg-card flex animate-pulse items-center justify-between rounded-2xl p-3">
            <div className="flex items-center gap-3">
              <div className="bg-muted h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <div className="bg-muted h-4 w-32 rounded" />
                <div className="bg-muted h-3 w-24 rounded" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-muted h-4 w-20 rounded" />
              <div className="bg-muted h-5 w-14 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeTranscationSkeleton;
