import React, { FC } from "react";
import { Stack } from "@chakra-ui/react";
import EventSourceType from "../../EventSourceType";
import EventSourceTypeTag from "./EventSourceTypeTag";

type Props = {
  source: EventSourceType;
};

const EventSourceTypeTags: FC<Props> = ({ source }) => {
  let sources: EventSourceType[];
  switch (source) {
    case "bukkit": {
      sources = ["bukkit", "spigot", "paper", "purpur"];
      break;
    }
    case "spigot": {
      sources = ["spigot", "paper", "purpur"];
      break;
    }
    case "paper": {
      sources = ["paper", "purpur"];
      break;
    }
    case "purpur": {
      sources = ["purpur"];
      break;
    }
    case "bungee": {
      sources = ["bungee", "waterfall"];
      break;
    }
    case "waterfall": {
      sources = ["bungee"];
      break;
    }
  }
  return (
    <Stack direction="row">
      {sources.map((s) => (
        <EventSourceTypeTag key={s} source={s} />
      ))}
    </Stack>
  );
};

export default EventSourceTypeTags;
