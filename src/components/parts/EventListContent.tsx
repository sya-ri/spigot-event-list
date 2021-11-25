import React, { FC, memo } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { VscWarning } from "react-icons/vsc";
import ReactMarkdown from "react-markdown";
import EventSourceType from "../../EventSourceType";
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
}) => (
  <Stack key={name + source} py={2}>
    <Flex justify="space-between" flexWrap="wrap" gridGap={1}>
      <Stack direction="row">
        <Text fontSize="md" fontWeight={500}>
          {name}
        </Text>
        <Tooltip label="Javadoc">
          <Link href={link} isExternal>
            <ExternalLinkIcon my={1} verticalAlign="top" />
          </Link>
        </Tooltip>
      </Stack>
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

export default memo(EventListContent);
