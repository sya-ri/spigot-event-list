import React, { FC } from "react";
import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import EventSourceType from "../../EventSourceType";
import HeaderSearchBox from "./HeaderSearchBox";
import HeaderTagsFilter from "./HeaderTagsFilter";
import HeaderTitle from "./HeaderTitle";

type Props = {
  searchText: string;
  setSearchText: (value: string) => void;
  tagsFilter: EventSourceType[];
  setTagsFilter: (value: EventSourceType[]) => void;
};

const Header: FC<Props> = ({
  searchText,
  setSearchText,
  tagsFilter,
  setTagsFilter,
}) => {
  return (
    <Box
      position="sticky"
      top={0}
      bgColor="white"
      py={2}
      boxShadow="0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)"
      zIndex={1}
    >
      <Container maxW="container.md" px={2}>
        <Flex justify="space-between" flexWrap="wrap" gridGap={2}>
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
              tagsFilter={tagsFilter}
              setTagsFilter={setTagsFilter}
            />
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
