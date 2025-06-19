import { formatDate } from "@/app/utils/Functions";
import { TAnimeDetailsResponse } from "@/app/utils/quries";
import Image from "next/image";
import React from "react";
interface AnimeMetadataProps {
  metadata: TAnimeDetailsResponse["Media"];
}
export default function AnimeMetadata({ metadata }: AnimeMetadataProps) {
  return (
    <div
      id="metadata"
      className="   max-w-screen-xl mx-auto grid lg:grid-cols-[200px_1fr] gap-6"
    >
      <section className="bg-secondary p-4 h-fit">
        <dl className="flex flex-wrap lg:flex-col gap-2">
          <div>
            <dt className="font-medium">Format</dt>
            <dd className="text-muted-foreground">{metadata.format}</dd>
          </div>
          <div>
            <dt className="font-medium">Episode Duration</dt>
            <dd className="text-muted-foreground">
              {metadata.duration ?? "Unknown"}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Status</dt>
            <dd className="text-muted-foreground">{metadata.status}</dd>
          </div>
          <div>
            <dt className="font-medium">Start Date</dt>
            <dd className="text-muted-foreground">
              {formatDate(metadata.startDate)}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Season</dt>
            <dd className="text-muted-foreground">{metadata.season}</dd>
          </div>
          <div>
            <dt className="font-medium">Average Score</dt>
            <dd className="text-muted-foreground">
              {metadata.averageScore ?? "Unknown"}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Mean Score</dt>
            <dd className="text-muted-foreground">
              {metadata.meanScore ?? "Unknown"}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Popularity</dt>
            <dd className="text-muted-foreground">
              {metadata.popularity ?? "Unknown"}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Episode Duration</dt>
            <dd className="text-muted-foreground">
              {metadata.duration} minutes
            </dd>
          </div>
          <div>
            <dt className="font-medium">Tags</dt>
            <dd className="text-muted-foreground">
              {metadata.tags.map((tag) => tag.name).join(", ")}
            </dd>
          </div>

          <div>
            <dt className="font-medium">Total Episodes</dt>
            <dd className="text-muted-foreground">
              {metadata.episodes ?? "Unknown"}
            </dd>
          </div>
        </dl>
      </section>
      <section>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {metadata.characters.nodes.map((node) => {
            return (
              <div
                key={node.id}
                className="bg-secondary p-4 rounded flex gap-2"
              >
                <div className="relative  aspect-[3/4] w-20 shrink-0">
                  <Image
                    fill
                    src={node.image.medium || node.image.large}
                    alt={node.name.full}
                    className="object-cover rounded"
                  />
                </div>
                <div className="">
                  <h3 className="font-semibold">{node.name.full}</h3>
                  <p className="text-sm text-muted-foreground">
                    Age: {node.age || "Unknown"}
                    <br />
                    Birthday: {formatDate(node.dateOfBirth) || "Unknown"}
                  </p>
                  <p
                    title={node.description}
                    className="text-sm text-muted-foreground line-clamp-2"
                  >
                    {node.description || ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
