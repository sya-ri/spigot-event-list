import EventSource from "@/types/event-source";

export const joinTags = (tags: EventSource[]) => {
  return tags.join("-");
};

export const splitTags = (text: string) => {
  if (!text) return [...EventSource];
  const split = text.split("-");
  return EventSource.filter((source) => split.includes(source));
};

export const addTag = (
  tags: EventSource[],
  tag: EventSource,
): EventSource[] => {
  return EventSource.filter((t) => tags.includes(t) || t == tag);
};

export const removeTag = (
  tags: EventSource[],
  tag: EventSource,
): EventSource[] => {
  return tags.filter((t) => t != tag);
};
