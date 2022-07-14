import { Link, Stack } from "@chakra-ui/react";
import React, { FC, memo } from "react";
import { SourceName, sourceNames } from "spigot-event-list-common";
import EventSourceTypeTag from "./EventSourceTypeTag";

type Props = {
  tagsFilter: SourceName[];
  setTagsFilter: (value: SourceName[]) => void;
};

const HeaderTagsFilter: FC<Props> = ({ tagsFilter, setTagsFilter }) => {
  return (
    <Stack direction="row" flexWrap="wrap" justify="center" spacing={[1, 2]}>
      {sourceNames.map((source) => (
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
