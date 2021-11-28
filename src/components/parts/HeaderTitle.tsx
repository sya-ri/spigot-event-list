import React, { Dispatch, FC, memo, SetStateAction } from "react";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { FaFaucet } from "react-icons/fa";
import EventSourceType, { allEventSourceTypes } from "../../EventSourceType";

type Props = {
  setSearchText: Dispatch<SetStateAction<string>>;
  setTagsFilter: Dispatch<SetStateAction<EventSourceType[]>>;
};

const HeaderTitle: FC<Props> = ({ setSearchText, setTagsFilter }) => {
  return (
    <Flex
      m="auto"
      px={4}
      cursor="pointer"
      onClick={() => {
        setSearchText("");
        setTagsFilter(allEventSourceTypes);
      }}
    >
      <Icon as={FaFaucet} mr={2} my="auto" w={8} h={8} />
      <Heading as="h1" fontSize="2xl">
        Spigot Event List
      </Heading>
    </Flex>
  );
};

export default memo(HeaderTitle);
