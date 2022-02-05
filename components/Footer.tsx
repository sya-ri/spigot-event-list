import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { FC, memo } from "react";
import { BiArrowToTop } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";

const Footer: FC = () => (
  <Box
    bgColor="white"
    bottom={0}
    boxShadow="0 -4px 6px -1px rgb(0 0 0 / 10%), 0 -2px 4px -1px rgb(0 0 0 / 6%)"
    position="sticky"
    py={1}
  >
    <Container maxW="container.md">
      <Flex align="center" justify="space-around">
        <Link onClick={() => window.scroll({ behavior: "smooth", top: 0 })}>
          <IconButton aria-label="ScrollToTop" bgColor="white" rounded="full">
            <Icon as={BiArrowToTop} h={6} w={6} />
          </IconButton>
        </Link>
        <Text fontWeight={500} textAlign="center">
          ©︎ 2021 sya_ri
        </Text>
        <Link isExternal href="https://github.com/sya-ri/spigot-event-list">
          <IconButton aria-label="ScrollToTop" bgColor="white" rounded="full">
            <Icon as={FaGithub} h={6} w={6} />
          </IconButton>
        </Link>
      </Flex>
    </Container>
  </Box>
);

export default memo(Footer);
