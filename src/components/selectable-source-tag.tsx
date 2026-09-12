"use client";

import type EventSource from "@/types/event-source";
import SourceTag from "@/components/source-tag";
import clsx from "clsx";
import { addTag, removeTag } from "@/libs/event-source-tag";

export type SelectableSourceTagProps = {
  source: EventSource;
  tags: EventSource[];
  setTags: (value: EventSource[]) => void;
};

const SelectableSourceTag = ({
  source,
  tags,
  setTags,
}: SelectableSourceTagProps) => {
  const selected = tags.includes(source);
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() =>
        setTags(selected ? removeTag(tags, source) : addTag(tags, source))
      }
      className={clsx(
        "inline-flex min-h-8 items-center rounded-lg cursor-pointer hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2",
        !selected && "opacity-50 grayscale",
      )}
    >
      <SourceTag source={source} />
    </button>
  );
};

export default SelectableSourceTag;
