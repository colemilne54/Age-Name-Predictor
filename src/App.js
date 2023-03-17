import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';
import { Typography, TextField, Button } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function App() {
  const [age, getAge] = useState([]);
  const [gender, getGender] = useState([]);
  const [nations, getNations] = useState([]);
  const [input, setInput] = useState('');

  let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  // console.log(regionNames.of('IE')); // "United States"
  function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  function DisplayAge() {
    if (age.age > 0) {
      return <Typography variant="p">Age: {age.age}</Typography>;
    }
  }

  function DisplayGender() {
    if (gender.gender == 'male') {
      return (
        <>
          <Typography>{`${gender.gender}`}</Typography>
          <CircularProgressbar
            value={gender.probability * 100}
            text={`${gender.probability * 100}%`}
            styles={buildStyles({
              // Text size
              textSize: '16px',
              strokeLinecap: 'butt',
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: '#01A6EA',
              textColor: '#01A6EA',
            })}
          />
        </>
      );
    } else if (gender.gender == 'female') {
      return (
        <>
          <Typography>{`${gender.gender}`}</Typography>
          <CircularProgressbar
            value={gender.probability * 100}
            text={`${gender.probability * 100}%`}
            styles={buildStyles({
              // Text size
              textSize: '16px',
              strokeLinecap: 'butt',
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: '#FFB1CB',
              textColor: '#FFB1CB',
            })}
          />
        </>
      );
    }
  }

  function DisplayNation() {
    try {
      if (nations.country.length > 0) {
        return (
          <>
            <Typography>Nations:</Typography>
            <div>
              {nations.country.map((nation) => {
                var prob = Math.round(nation.probability * 10000) / 100;
                return (
                  <>
                    <p>
                      {`${regionNames.of(nation.country_id)}`}{' '}
                      <span role="img">{`${getFlagEmoji(
                        nation.country_id
                      )}`}</span>{' '}
                      {`Probability: ${prob}%`}
                    </p>
                  </>
                );
              })}
            </div>
          </>
        );
      }
    } catch (error) {
      console.log(error);
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
    var nationUrl = 'https://api.nationalize.io/?name=' + input;

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

    fetch(nationUrl, {
      method: 'GET',
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getNations(data);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(nationUrl);
      });
  };

  return (
    <div>
      <Typography variant="h4">Name Predictor</Typography>
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
      <DisplayNation />
    </div>
  );
}
