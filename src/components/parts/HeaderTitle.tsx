import React, { FC, memo } from "react";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { FaFaucet } from "react-icons/fa";

const HeaderTitle: FC = () => (
  <Flex m="auto">
    <Icon as={FaFaucet} mr={2} my="auto" w={8} h={8} />
    <Heading as="h1" fontSize="2xl">
      Spigot Event List
    </Heading>
  </Flex>
);

export default memo(HeaderTitle);
