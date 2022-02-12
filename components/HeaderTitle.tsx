import { Flex, Heading, Icon } from "@chakra-ui/react";
import React, { FC, memo } from "react";
import { FaFaucet } from "react-icons/fa";
import SourceType, { SourceTypes } from "../lib/SourceType";

type Props = {
  setSearchText: (value: string) => void;
  setTagsFilter: (value: SourceType[]) => void;
};

const HeaderTitle: FC<Props> = ({ setSearchText, setTagsFilter }) => {
  return (
    <Flex
      cursor="pointer"
      m="auto"
      px={4}
      onClick={() => {
        history.replaceState(null, "", ".");
        setSearchText("");
        setTagsFilter(SourceTypes);
      }}
    >
      <Icon as={FaFaucet} h={8} mr={2} my="auto" w={8} />
      <Heading as="h1" fontSize="2xl">
        Spigot Event List
      </Heading>
    </Flex>
  );
};

export default memo(HeaderTitle);
