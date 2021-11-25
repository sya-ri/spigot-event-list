import React, { Dispatch, FC, SetStateAction } from "react";
import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import EventSourceType from "../../EventSourceType";
import EventListHeaderSeachBox from "./HeaderSeachBox";
import HeaderTagsFilter from "./HeaderTagsFilter";
import EventListHeaderTitle from "./HeaderTitle";

type Props = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  tagsFilter: EventSourceType[];
  setTagsFilter: Dispatch<SetStateAction<EventSourceType[]>>;
};

const Header: FC<Props> = ({
  searchText,
  setSearchText,
  tagsFilter,
  setTagsFilter,
}) => (
  <Box position="sticky" top={0} bgColor="white" py={2} boxShadow="md">
    <Container maxW="container.md">
      <Flex justify="space-between" flexWrap="wrap" gridGap={2}>
        <EventListHeaderTitle />
        <Stack direction="column" flexGrow={5}>
          <EventListHeaderSeachBox
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

export default Header;
