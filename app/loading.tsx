export default function Loading() {
  return (
    <div className="shell py-16">
      <div className="h-8 w-52 animate-pulse rounded bg-cloud" />
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-btn border border-cloud bg-white">
            <div className="aspect-[4/3] animate-pulse bg-cloud" />
            <div className="space-y-2 p-4">
              <div className="h-3 w-1/2 animate-pulse rounded bg-cloud" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-cloud" />
              <div className="h-8 w-full animate-pulse rounded bg-cloud" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
