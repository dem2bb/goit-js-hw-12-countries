import countriesTempl from '../templates/countriesTempl.hbs';
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
import 'material-design-icons/iconfont/material-icons.css';
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';

const container = document.querySelector('.container');

export default {
  fetchCountries(searchQuery) {
    const baseUrl = 'https://restcountries.eu/rest/v2/name/';
    if (searchQuery.length >= 1) {
      fetch(baseUrl + `${searchQuery}`)
        .then(response => {
          return response.json();
        })
        .then(data => insertListInDocument(data))
        .catch(error => {
          PNotify.error({
            text: 'No matches found, try one more time!',
            delay: 3000,
          });
        });
    }
  },
};

function insertListInDocument(item) {
  const markup = item.map(country => countriesTempl(country)).join('');
  container.insertAdjacentHTML('afterbegin', markup);
  const containerItemsList = document.querySelectorAll('.countries-list');
  if (containerItemsList.length > 10) {
    container.innerHTML = '';
    PNotify.error({
      title: 'Woooooooow!',
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 3000,
    });
  }
}
