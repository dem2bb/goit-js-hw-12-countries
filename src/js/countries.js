import countriesAPI from './fetchCountries.js';
import debounce from 'lodash.debounce';

const refs = {
  container: document.querySelector('.container'),
  input: document.querySelector('.input'),
};

function findCountryByName(event) {
  const inputText = event.target.value;
  if (inputText => 2) {
    refs.container.innerHTML = '';
  }
  countriesAPI.fetchCountries(inputText);
}

refs.input.addEventListener('input', debounce(findCountryByName, 500));
