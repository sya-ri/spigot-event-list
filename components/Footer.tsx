import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { FC, memo } from "react";
import { BiArrowToTop, BiSun, BiMoon } from "react-icons/bi";

const Footer: FC = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Box
      bgColor={useColorModeValue("white", "gray.800")}
      bottom={0}
      boxShadow="0 -4px 6px -1px rgb(0 0 0 / 10%), 0 -2px 4px -1px rgb(0 0 0 / 6%)"
      position="sticky"
      py={1}
    >
      <Container maxW="container.md">
        <Flex align="center" justify="space-around">
          <Link onClick={() => window.scroll({ behavior: "smooth", top: 0 })}>
            <IconButton
              aria-label="ScrollToTop"
              bgColor={useColorModeValue("white", "gray.800")}
              rounded="full"
            >
              <Icon as={BiArrowToTop} h={6} w={6} />
            </IconButton>
          </Link>
          <Link isExternal href="https://github.com/sya-ri/spigot-event-list">
            <Text fontWeight={500} textAlign="center">
              ©︎ 2021 sya_ri
            </Text>
          </Link>
          <IconButton
            aria-label="ScrollToTop"
            bgColor={useColorModeValue("white", "gray.800")}
            rounded="full"
            onClick={toggleColorMode}
          >
            <Icon as={useColorModeValue(BiSun, BiMoon)} h={6} w={6} />
          </IconButton>
        </Flex>
      </Container>
    </Box>
  );
};

export default memo(Footer);
