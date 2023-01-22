import React from "react";
import { Input, InputGroup, Grid, Row, Col } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

export default function SearchBar(props) {



  return (
    <div style={{width: "100%"}}>
      <InputGroup inside>
        <Input placeholder={"Search file"} onChange={(e) => props.setSearch(e)}/>
        <InputGroup.Button>
          <SearchIcon onClick={() => props.getFiles()}/>
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
}
