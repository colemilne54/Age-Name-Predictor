import React from 'react';
import './style.css';

export default function App() {
  const [name, setName] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    var count = 1;
    url = 'https://api.api-ninjas.com/v1/dogs?';

    for (let name in inputs) {
      if (inputs[name] > -1) {
        url = url + name + '=' + inputs[name];
        if (count != Object.keys(inputs).length) {
          url += '&';
        }
        console.log(url);
      }
      count += 1;
    }

    fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': 'Qrj+hE8c3dEAUqXdL3ISUQ==56KpptbJlFkbqWt3',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getBreeds(data);
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
