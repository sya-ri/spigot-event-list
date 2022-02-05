import { Link, Stack } from "@chakra-ui/react";
import React, { FC, memo } from "react";
import EventSourceType, { allEventSourceTypes } from "../lib/EventSourceType";
import EventSourceTypeTag from "./EventSourceTypeTag";

type Props = {
  tagsFilter: EventSourceType[];
  setTagsFilter: (value: EventSourceType[]) => void;
};

const HeaderTagsFilter: FC<Props> = ({ tagsFilter, setTagsFilter }) => {
  return (
    <Stack direction="row" flexWrap="wrap" justify="center" spacing={[1, 2]}>
      {allEventSourceTypes.map((source) => (
        <Link
          key={source}
          onClick={() => {
            if (tagsFilter.includes(source)) {
              setTagsFilter(tagsFilter.filter((s) => s !== source));
            } else {
              setTagsFilter([...tagsFilter, source]);
            }
          }}
        >
          <EventSourceTypeTag
            isDisable={!tagsFilter.includes(source)}
            source={source}
          />
        </Link>
      ))}
    </Stack>
  );
};

export default memo(HeaderTagsFilter);
