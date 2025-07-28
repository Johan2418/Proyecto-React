import React from 'react';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap';

const SearchBar = () => (
  <Form className="d-flex" onSubmit={e => e.preventDefault()}>
    <InputGroup>
      <FormControl
        type="search"
        placeholder="Buscar..."
        aria-label="Buscar"
      />
      <Button variant="outline-secondary">Buscar</Button>
    </InputGroup>
  </Form>
);

export default SearchBar;
