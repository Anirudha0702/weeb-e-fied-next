"use client";
export default function Error({
  error,
  reset,
}: {
  error: string;
  reset: () => void;
}) {
  return <h1>ssss{error}</h1>;
}
