import React, { Dispatch, FC, RefObject, SetStateAction } from "react";
import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import EventSourceType from "../../EventSourceType";
import HeaderSearchBox from "./HeaderSearchBox";
import HeaderTagsFilter from "./HeaderTagsFilter";
import HeaderTitle from "./HeaderTitle";

type Props = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  tagsFilter: EventSourceType[];
  setTagsFilter: Dispatch<SetStateAction<EventSourceType[]>>;
  headerRef: RefObject<HTMLDivElement>;
};

const Header: FC<Props> = ({
  searchText,
  setSearchText,
  tagsFilter,
  setTagsFilter,
  headerRef,
}) => {
  return (
    <Box
      ref={headerRef}
      position="sticky"
      top={0}
      bgColor="white"
      py={2}
      boxShadow="md"
    >
      <Container maxW="container.md">
        <Flex justify="space-between" flexWrap="wrap" gridGap={2}>
          <HeaderTitle />
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
