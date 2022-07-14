import {
  Box,
  Container,
  Flex,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { SourceName } from "spigot-event-list-common";
import HeaderSearchBox from "./HeaderSearchBox";
import HeaderTagsFilter from "./HeaderTagsFilter";
import HeaderTitle from "./HeaderTitle";

type Props = {
  searchText: string;
  setSearchText: (value: string) => void;
  tagsFilter: SourceName[];
  setTagsFilter: (value: SourceName[]) => void;
};

const Header: FC<Props> = ({
  searchText,
  setSearchText,
  tagsFilter,
  setTagsFilter,
}) => {
  return (
    <Box
      bgColor={useColorModeValue("white", "gray.800")}
      boxShadow="0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)"
      position="sticky"
      py={2}
      top={0}
      zIndex={1}
    >
      <Container maxW="container.md" px={2}>
        <Flex flexWrap="wrap" gridGap={2} justify="space-between">
          <HeaderTitle
            setSearchText={setSearchText}
            setTagsFilter={setTagsFilter}
          />
          <Stack direction="column" flexGrow={5}>
            <HeaderSearchBox
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <HeaderTagsFilter
              setTagsFilter={setTagsFilter}
              tagsFilter={tagsFilter}
            />
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
