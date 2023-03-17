import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';
import { Typography, TextField, Button } from '@mui/material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function App() {
  const [age, getAge] = useState([]);
  const [gender, getGender] = useState([]);
  const [input, setInput] = useState('');

  function DisplayAge() {
    if (age.age > 0) {
      return <Typography variant="p">{age.age}</Typography>;
    }
  }

  function DisplayGender() {
    if (gender.gender == 'male' || gender.gender == 'female') {
      return (
        <Typography variant="p">
          {gender.gender} probability: {gender.probability * 100}
        </Typography>
      );
    }
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var ageUrl = 'https://api.agify.io?name=' + input;
    var genderUrl = 'https://api.genderize.io/?name=' + input;

    fetch(ageUrl, {
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
        console.log(ageUrl);
      });

    fetch(genderUrl, {
      method: 'GET',
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getGender(data);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(genderUrl);
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
      <DisplayGender />
    </div>
  );
}
