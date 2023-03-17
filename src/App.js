import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';
import { Typography, TextField, Button } from '@mui/material';

export default function App() {
  const [age, getAge] = useState([]);
  const [input, setInput] = useState('');

  function DisplayAge() {
    if (age > 0) {
      return <Typography>{age.age}</Typography>;
    }
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var url = 'https://api.agify.io?name=' + input;

    fetch(url, {
      method: 'GET',
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getAge(data);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(url);
      });
  };

  return (
    <div>
      <Typography variant="h4">Age-Name Predictor</Typography>
      <Typography variant="p">Enter your name:</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          style={{ width: '200px' }}
          aria-label="First name"
          // defaultValue={'First Name'}
          placeholder="First name"
          name="input"
          value={input.firstName}
          onChange={handleChange}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 15 }}
        >
          Submit
        </Button>
      </form>
      <DisplayAge />
    </div>
  );
}
