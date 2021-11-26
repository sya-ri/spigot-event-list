import React, { Dispatch, FC, SetStateAction, memo } from "react";
import { Link, Stack } from "@chakra-ui/react";
import EventSourceType, { allEventSourceTypes } from "../../EventSourceType";
import EventSourceTypeTag from "./EventSourceTypeTag";

type Props = {
  tagsFilter: EventSourceType[];
  setTagsFilter: Dispatch<SetStateAction<EventSourceType[]>>;
};

const HeaderTagsFilter: FC<Props> = ({ tagsFilter, setTagsFilter }) => {
  return (
    <Stack direction="row" justify="center">
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
            source={source}
            isDisable={!tagsFilter.includes(source)}
          />
        </Link>
      ))}
    </Stack>
  );
};

export default memo(HeaderTagsFilter);
