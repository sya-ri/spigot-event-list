import { Link, Stack } from "@chakra-ui/react";
import React, { FC, memo } from "react";
import SourceType, { SourceTypes } from "../lib/SourceType";
import EventSourceTypeTag from "./EventSourceTypeTag";

type Props = {
  tagsFilter: SourceType[];
  setTagsFilter: (value: SourceType[]) => void;
};

const HeaderTagsFilter: FC<Props> = ({ tagsFilter, setTagsFilter }) => {
  return (
    <Stack direction="row" flexWrap="wrap" justify="center" spacing={[1, 2]}>
      {SourceTypes.map((source) => (
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
