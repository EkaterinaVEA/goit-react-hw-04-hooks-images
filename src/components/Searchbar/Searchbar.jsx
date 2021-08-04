import { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styles';


export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleInputChange = e => {
    setValue(e.target.value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();

    onSubmit(value);
    setValue("");
  };

  return (
    <Header>
      <Form onSubmit={handleSearchSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          value={value}
          onChange={handleInputChange}
          type="text"
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };