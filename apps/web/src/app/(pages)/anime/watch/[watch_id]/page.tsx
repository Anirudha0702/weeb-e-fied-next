interface WatchPageProps {
  params: Promise<{
    watch_id: string;
  }>;
}
export default async function WatchPage({ params }: WatchPageProps) {
  const { watch_id } = await params;
  return <div className="">{watch_id}</div>;
}
