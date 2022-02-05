import {
  Box,
  Container,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { prev } from "cheerio/lib/api/traversing";
import React, { FC, memo } from "react";
import { VscWarning } from "react-icons/vsc";
import ReactMarkdown from "react-markdown";
import EventSourceType from "../lib/EventSourceType";
import EventSourceTypeTags from "./EventSourceTypeTags";

type Props = {
  name: string;
  link: string;
  source: EventSourceType;
  description: string;
  deprecate?: boolean;
  deprecateDescription?: string;
};

const EventListContent: FC<Props> = ({
  name,
  link,
  source,
  description,
  deprecate,
  deprecateDescription,
}) => {
  return (
    <Stack key={name + source} py={2}>
      <Flex flexWrap="wrap" gridGap={1} justify="space-between">
        <Link isExternal href={link}>
          <Text fontSize="md" fontWeight={500} overflowWrap="anywhere">
            {name}
          </Text>
        </Link>
        <Box ml="auto" mr={0}>
          <EventSourceTypeTags source={source} />
        </Box>
      </Flex>
      <Container>
        <ReactMarkdown>{description}</ReactMarkdown>
      </Container>
      {deprecate && deprecateDescription ? (
        <Stack direction="row">
          <Icon as={VscWarning} my="auto" />
          <ReactMarkdown>{deprecateDescription}</ReactMarkdown>
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default memo(
  EventListContent,
  (
    { name: prevName, source: prevSource },
    { name: nextName, source: nextSource }
  ) => {
    return prevName == nextName && prevSource == nextSource;
  }
);
