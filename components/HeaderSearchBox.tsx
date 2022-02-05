import React, { FC, memo } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

type Props = {
  searchText: string;
  setSearchText: (value: string) => void;
};

const HeaderSearchBox: FC<Props> = ({ searchText, setSearchText }) => (
  <InputGroup maxW="md" m="auto">
    <InputLeftElement>
      <SearchIcon />
    </InputLeftElement>
    <Input
      value={searchText}
      onChange={(event) => setSearchText(event.target.value)}
      placeholder="イベント名で検索する"
    />
  </InputGroup>
);

export default memo(HeaderSearchBox);
