(() => {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    // Step 1
    const cities = [],
      searchInput = document.querySelector('.search'),
      suggestions = document.querySelector('.suggestions');

    // Step 2
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => cities.push(...data))

    // Step 4
    const matchInput = (inputString, cities) => cities.filter(({city, state}) => (
        city.match(new RegExp(inputString, 'gi')) || state.match(new RegExp(inputString, 'gi'))
    ));

    // Step 6
    const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Step 5
    const displayMatches = (el) => {
      const matchArray = matchInput(el.value, cities)

      const suggestionList = matchArray.map((location => {
        const regex = new RegExp(el.value, 'gi');
        const cityName = location.city.replace(regex, `<span class ="hl">${el.value}</span>`);
        const stateName = location.state.replace(regex, `<span class="hl">${el.value}</span>`);
        return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(location.population)}</span>
        </li>`;
      })).join('');
      suggestions.innerHTML = suggestionList;
    }

    // Step 3
    searchInput.addEventListener('keyup', (e) => displayMatches(searchInput));
  })();