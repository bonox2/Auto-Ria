
getUsers('js/cars.json')

async function getUsers(url) {
    const response = await fetch(url)
    console.log(response);
    const data = await response.json()
    console.log(data)
}

let cars = CARS
const list = document.getElementById('list')
const masonryBtns = document.getElementById('masonry-btns')
const sortSelect = document.getElementById('sort-select')
const searchForm = document.getElementById('search-form')
const UAH_USD = 25.5413
const dateFormat = new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
})
const currFormat = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'UAH',
})
// {
//     "id": "89aed5b8c686ebd713a62873e4cd756abab7a106",
//     "make": "BMW",
//     "model": "M3",
//     "year": 2010,
//     "img": "http://dummyimage.com/153x232.jpg/cc0000/ffffff",
//     "color": "Goldenrod",
//     "vin": "1G6DW677550624991",
//     "country": "United States",
//     "rating": 1,
//     "price": 2269,
//     "views": 5,
//     "seller": "Ellery Girardin",
//     "vip": true,
//     "top": false,
//     "timestamp": "1607652988000",
//     "phone": "+1 (229) 999-8553",
//     "fuel": "Benzin",
//     "engine_volume": 1.4,
//     "transmission": "CVT",
//     "odo": 394036,
//     "consume": { "road": 4.8, "city": 12.3, "mixed": 8.4 }
//   }



searchForm.addEventListener('submit', function (event) {
    event.preventDefault()
    // let query = event.target.search.value.toLowerCase().trim()
    let query = event.target.search.value.toLowerCase().trim().split(' ')
    console.log(query); //['Bmw', 'M3', '2010']

    


    const fieldsForSearch = ['make', 'model', 'year']

    console.time('filter ->>>')
    cars = CARS.filter(car => {
        return query.every(word => {
            return fieldsForSearch.some(field => {
                return `${car[field]}`.toLowerCase().includes(word)
            })
        })
    })
    console.timeEnd('filter ->>>')

    console.log(cars);
    addCards(list, cars) 
    
})




addCards(list, cars) 


function addCards(elem, cars) {
    elem.innerHTML = ''
    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        renderCard(elem, car)
    }
}


function renderCard(where, data) {
    let rating = ''

    for (let i = 0; i < 5; i++) {
        if (data.rating > i) {
            rating += '&#9733;'
        } else{
            rating += '&#9734;'
        }
    }

    const html = `<article class="card">
    <div class="card-img-wrap" >
        <div class="card-status-wrap">
            ${data.top ? `<div class="card-status top">TOP</div>` : ''}
            ${data.vip ? `<div class="card-status vip">VIP</div>` : ''}
        </div>
        <img loading="lazy" src="${data.img}" alt="${data.make} ${data.model} ${data.year}" class="card-img">
    </div>
    <div class="card-content">
        <header class="card-header">
            <h4 class="card-title">${data.make} ${data.model} ${data.year}</h4>
            <div class="card-header-chars">
                <h5 class="card-price">${currFormat.format(data.price * UAH_USD)}</h5>
                <div class="card-color">${data.color}</div>
                <div class="card-location">${data.country}</div>
            </div>
        </header>
        <div class="card-rating">${rating} ${data.rating}</div>
        <dl class="card-chars">
            <div>
                <dt>&#127778; Fuel type:</dt>
                <dd>${data.fuel}</dd>
            </div>
            <div>
                <dt>Engine volume:</dt>
                <dd>${data.engine_volume} L</dd>
            </div>
            <div>
                <dt>Transmossion type:</dt>
                <dd>${data.transmission}</dd>
            </div>
            <div>
                <dt>ODO (km):</dt>
                <dd>${data.odo}</dd>
            </div>
        </dl>
        <dl class="card-consume">
            <div>
                <dt>Road:</dt>
                <dd>${data.consume.road} L/100km</dd>
            </div>
            <div>
                <dt>City:</dt>
                <dd>${data.consume.city} L/100km</dd>
            </div>
            <div>
                <dt>Mixed:</dt>
                <dd>${data.consume.mixed} L/100km</dd>
            </div>
        </dl>
        ${data.vin ? `<div class="card-vin">${data.vin}</div>` : ''}
        <p class="card-text"></p>
        <a href="tel:${data.phone}" class="card-seller">&#128222; ${data.seller}, (${data.phone})</a>
        <footer class="card-footer">
            <small class="card-time">&#9201; ${dateFormat.format(data.timestamp)}</small>
            <small class="card-views">&#128065; ${data.views}</small>
        </footer>
    </div>
</article>`

    where.insertAdjacentHTML('beforeEnd', html)

}




masonryBtns.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn')) {
        if (event.target.dataset.action == '1') {
            console.log(1);
            list.classList.remove('col-2')
            event.target.nextElementSibling.classList.remove('active')
        } else if (event.target.dataset.action == '2') {
            console.log(2);
            list.classList.add('col-2')
            event.target.previousElementSibling.classList.remove('active')
        }
        event.target.classList.add('active')
    }
})

sortSelect.addEventListener('change', event => {
    // let value = event.target.value // price-dec
    let [prop, type] = event.target.value.split('-')// ['odo', 'inc']
    cars.sort(function (a,b) {
        if (type == 'dec') {
            return b[prop] - a[prop]
        } else if (type == 'inc'){
            return a[prop] - b[prop]
        }
    })

    addCards(list, cars)
})







// function sum(x,y) {
//     return x + y 
// }






// const sum = function (x,y) {
//     return x + y
// }


// const sq = x => x * x;


// function sq(x) {
//     return x * x
// }





// const arr = [435,34,534,534,53,45,345525234,237,54324,534,53]


// const arr2 = arr.filter(elem => {

//     return elem > 100
// })

// console.log(arr2);
