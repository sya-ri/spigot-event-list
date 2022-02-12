import { Stack } from "@chakra-ui/react";
import React, { FC } from "react";
import SourceType from "../lib/SourceType";
import EventSourceTypeTag from "./EventSourceTypeTag";

type Props = {
  source: SourceType;
};

const EventSourceTypeTags: FC<Props> = ({ source }) => {
  let sources: SourceType[];
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
      sources = ["waterfall"];
      break;
    }
    case "velocity": {
      sources = ["velocity"];
      break;
    }
  }
  return (
    <Stack direction="row" spacing={[1, 2]}>
      {sources.map((s) => (
        <EventSourceTypeTag key={s} source={s} />
      ))}
    </Stack>
  );
};

export default EventSourceTypeTags;
