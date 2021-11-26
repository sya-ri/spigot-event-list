import React, { FC, memo, RefObject, useEffect, useRef } from "react";
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
import { head } from "request-promise";
import EventSourceType from "../../EventSourceType";
import EventSourceTypeTags from "./EventSourceTypeTags";

type Props = {
  name: string;
  link: string;
  source: EventSourceType;
  description: string;
  deprecate?: boolean;
  deprecateDescription?: string;
  headerRef: RefObject<HTMLDivElement>;
};

const EventListContent: FC<Props> = ({
  name,
  link,
  source,
  description,
  deprecate,
  deprecateDescription,
  headerRef,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollTo = () => {
    if (ref.current && headerRef.current) {
      const offset = 8;
      window.scrollTo({
        behavior: "smooth",
        top: ref.current.offsetTop - headerRef.current.offsetHeight - offset,
      });
    }
  };
  useEffect(() => {
    if (window.location.hash == `#${source}-${name}`) {
      scrollTo();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Stack key={name + source} ref={ref} py={2}>
      <Flex justify="space-between" flexWrap="wrap" gridGap={1}>
        <Stack direction="row">
          <Link
            onClick={() => {
              window.location.hash = `#${source}-${name}`;
              scrollTo();
            }}
          >
            <Text fontSize="md" fontWeight={500}>
              {name}
            </Text>
          </Link>
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
};

export default memo(EventListContent);
