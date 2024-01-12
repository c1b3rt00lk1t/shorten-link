export default function Page({ params }: { params: { shortId: string } }) {
  return <div>My shortId: {params.shortId}</div>;
}
