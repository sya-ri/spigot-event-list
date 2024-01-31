"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";
import Link from "next/link";
import EventSource from "@/types/event-source";
import SourceTag from "@/components/source-tag";
import clsx from "clsx";
import { omit } from "remeda";
import {
  addTag,
  joinTags,
  removeTag,
  splitTags,
} from "@/libs/event-source-tag";

export type SelectableSourceTagProps = {
  source: EventSource;
};

const SelectableSourceTag: FC<SelectableSourceTagProps> = ({ source }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tags = splitTags(searchParams.get("tags"));
  const selected = !tags.includes(source);
  return (
    <Link
      href={{
        pathname,
        query: {
          ...omit(Object.fromEntries(searchParams.entries()), ["tags"]),
          ...(selected && tags.length + 1 == EventSource.length
            ? {}
            : {
                tags: joinTags(
                  selected ? addTag(tags, source) : removeTag(tags, source),
                ),
              }),
        },
      }}
      className={clsx(
        "cursor-pointer hover:opacity-80",
        selected && "opacity-50 grayscale",
      )}
    >
      <SourceTag source={source} />
    </Link>
  );
};

export default SelectableSourceTag;
