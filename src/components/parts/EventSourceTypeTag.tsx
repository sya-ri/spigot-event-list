import React, { FC } from "react";
import { Tag, Text } from "@chakra-ui/react";
import EventSourceType from "../../EventSourceType";

type Props = {
  source: EventSourceType;
  isDisable?: boolean;
};

const colors = {
  bukkit: "blue",
  paper: "gray",
  purpur: "purple",
  spigot: "orange",
};

const EventSourceTypeTag: FC<Props> = ({ source, isDisable }) => {
  return (
    <Tag size="sm" colorScheme={colors[source]}>
      <Text decoration={isDisable ? "line-through" : ""}>{source}</Text>
    </Tag>
  );
};

export default EventSourceTypeTag;
