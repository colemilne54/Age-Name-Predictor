import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [age, getAge] = useState([]);
  const [input, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    url = 'https://api.agify.io?name=' + inputs[0];

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
      });
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
