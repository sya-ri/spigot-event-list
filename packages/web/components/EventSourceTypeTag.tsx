import { Tag, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { SourceName } from "spigot-event-list-common";

type Props = {
  source: SourceName;
  isDisable?: boolean;
};

const colors = {
  bukkit: "blue",
  bungee: "yellow",
  paper: "gray",
  purpur: "purple",
  spigot: "orange",
  velocity: "teal",
  waterfall: "cyan",
};

const EventSourceTypeTag: FC<Props> = ({ source, isDisable }) => {
  return (
    <Tag colorScheme={colors[source]} size="sm">
      <Text decoration={isDisable ? "line-through" : ""}>{source}</Text>
    </Tag>
  );
};

export default EventSourceTypeTag;
