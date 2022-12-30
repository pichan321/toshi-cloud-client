import React from "react";
import { Input, InputGroup, Grid, Row, Col } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

export default function SearchBar() {
  return (
    <div>
      <InputGroup inside>
        <Input placeholder={""} />
        <InputGroup.Button>
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
}
