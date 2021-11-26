import React, { FC, memo } from "react";
import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import { BiArrowToTop } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";

const Footer: FC = () => (
  <Box
    position="sticky"
    bottom={0}
    bgColor="white"
    py={1}
    boxShadow="0 -4px 6px -1px rgb(0 0 0 / 10%), 0 -2px 4px -1px rgb(0 0 0 / 6%)"
  >
    <Container maxW="container.md">
      <Flex justify="space-around" align="center">
        <Link onClick={() => window.scroll({ behavior: "smooth", top: 0 })}>
          <IconButton aria-label="ScrollToTop" rounded="full" bgColor="white">
            <Icon as={BiArrowToTop} w={6} h={6} />
          </IconButton>
        </Link>
        <Text textAlign="center" fontWeight={500}>
          ©︎ 2021 sya_ri
        </Text>
        <Link href="https://github.com/sya-ri/spigot-event-list" isExternal>
          <IconButton aria-label="ScrollToTop" rounded="full" bgColor="white">
            <Icon as={FaGithub} w={6} h={6} />
          </IconButton>
        </Link>
      </Flex>
    </Container>
  </Box>
);

export default memo(Footer);
