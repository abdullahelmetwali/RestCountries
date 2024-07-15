const changeMode = () => {
    const imgSVG = document.getElementById('modeSVG')
    if (document.body.classList.contains('lightMode')) {
        document.body.classList.add('darkMode')
        document.body.classList.remove('lightMode')
        imgSVG.src = './icons/moon-solid.svg'
    } else {
        document.body.classList.add('lightMode')
        document.body.classList.remove('darkMode')
        imgSVG.src = './icons/moon-regular.svg'
    }
}
const CountriesMain = document.getElementById('allCountries');
const SearchInput = document.getElementById('searchInput')
const SelectRegion = document.querySelector('select')
const CountrySec = document.querySelector('.country')
const CountryMainContent = document.querySelector('.countryContent')
const BackBtn = document.getElementById('backBtn')

const createParagraph = (container, content, classname) => {
    const p = document.createElement('p')
    p.textContent = content;
    p.className = classname
    container.appendChild(p)
}

const seeWhatCountry = (country) => {
    CountrySec.classList.remove('hidden')
    CountryMainContent.innerHTML = ''; // Clr prev to be UP TO DATE with any action

    CountryMainContent.innerHTML = `
    <div><img src="${country.flags.png}" alt="" id="coun-img"></div>
            <div class="w-full">
                <h1 class="text-2xl font-bold tracking-wider coun-name"></h1>
                <div class="flex items-start my-12 list">
                     <div>
                <ul>
                    <li class="native-n"><strong>Native Name: </strong> ${country.nativeName}</li>
                    <li class="pop"><strong>Population: </strong>${country.population}</li>
                    <li class="region"><strong>Region: </strong>${country.region}</li>
                    <li class="sub-region"><strong>Sub Region: </strong>${country.subregion}</li>
                    <li class="capital"><strong>Capital: </strong>${country.capital ? country.capital : 'UnKnown'}</li>

                </ul>
            </div>
            <div>
                <ul>
                    <li class="top-l-d"><strong>Top Level Domain: </strong>${country.topLevelDomain ? country.topLevelDomain[0] : 'UnKnown'}</li>
                    <li class="curr"><strong>Currencies: </strong>${country.currencies ? country.currencies[0].name : 'UnKnown'}</li>
                    <li class="lang"><strong>Languages: </strong>${country.languages ? country.languages[0].name : 'UnKnown'}</li>
                </ul>
            </div>
                </div>
                <div class="bord-coun">
                    <p><strong>Border Countries:</strong></p>
                        <div class="cont-borders ">
                        ${country?.borders?.length > 1 ? '' : 'Nothing'}
                        </div>
                </div>
            </div>
    
    `
    BackBtn.addEventListener('click', () => {
        CountrySec.classList.add('hidden')
    })

    for (let i = 0; i < country?.borders?.length; i++) {
        createParagraph(document.querySelector('.cont-borders'), country.borders[i], 'eleBox border px-4 py-2 rounded-lg font-semibold');
    }
}

BackBtn.addEventListener('mouseenter', () => {
    BackBtn.classList.remove('shadow-lg')
    BackBtn.classList.add('shadow-inner')
})
BackBtn.addEventListener('mouseleave', () => {
    BackBtn.classList.add('shadow-lg')
    BackBtn.classList.remove('shadow-inner')
})

const returnWantedData = (data) => {
    CountriesMain.innerHTML = ''; // Clr prev to be UP TO DATE with any action
    data.forEach(element => {

        const img = document.createElement('img');
        const imgDiv = document.createElement('div')
        const div1 = document.createElement('div')
        const div2 = document.createElement('div')
        const div3 = document.createElement('div')
        const mainDiv = document.createElement('div')
        const h1 = document.createElement('h1')
        const p1 = document.createElement('p')
        const p2 = document.createElement('p')
        const p3 = document.createElement('p')

        mainDiv.className = 'eleBox p-4 rounded-xl cursor-pointer'
        img.src = element.flags.png;
        img.className = 'mainImg'
        h1.textContent = element.name;
        h1.className = 'my-2 font-black text-lg'
        p1.innerHTML = `<strong>Population:</strong> ${element.population}`;
        div1.appendChild(p1)


        p2.innerHTML = `<strong>Region:</strong> ${element.region}`;
        div2.appendChild(p2)

        p3.innerHTML = `<strong>Capital:</strong> ${element.capital}`;
        div3.appendChild(p3)

        imgDiv.appendChild(img)
        mainDiv.appendChild(imgDiv)
        mainDiv.appendChild(h1)
        mainDiv.appendChild(div1)
        mainDiv.appendChild(div2)
        mainDiv.appendChild(div3)
        CountriesMain.appendChild(mainDiv);

        mainDiv.addEventListener('click', () => seeWhatCountry(element))
    });
}

fetch('./data.json')
    .then(res => res.json())
    .then(res => {
        returnWantedData(res)
        SearchInput.addEventListener('input', (e) => {
            if (SelectRegion.value === '') {
                const searchedData = res.filter((ele) => {
                    return ele.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
                })
                returnWantedData(searchedData) // return searched data only
            } else {
                const SelectedAndSearchedData = res.filter(ele => {
                    return ele.name.toLowerCase().includes(e.target.value.toLowerCase()) && ele.region === SelectRegion.value
                })
                returnWantedData(SelectedAndSearchedData) // return searched and selected option data
            }
        })
        SelectRegion.addEventListener('change', (e) => {
            if (SearchInput.value === '') {
                const SelectedOption = res.filter((ele) => {
                    return ele.region === e.target.value
                })
                returnWantedData(SelectedOption) // return selected option only
            } else {
                const SelectedAndSearchedData = res.filter(ele => {
                    return ele.name.toLowerCase().includes(SearchInput.value.trim().toLowerCase()) & ele.region === SelectRegion.value
                })
                returnWantedData(SelectedAndSearchedData) // return selected and searched data 
            }
        });
    })