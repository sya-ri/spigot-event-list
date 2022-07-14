import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { FC, memo } from "react";

type Props = {
  searchText: string;
  setSearchText: (value: string) => void;
};

const HeaderSearchBox: FC<Props> = ({ searchText, setSearchText }) => (
  <InputGroup m="auto" maxW="md">
    <InputLeftElement>
      <SearchIcon />
    </InputLeftElement>
    <Input
      placeholder="イベント名で検索する"
      value={searchText}
      onChange={(event) => setSearchText(event.target.value)}
    />
  </InputGroup>
);

export default memo(HeaderSearchBox);
