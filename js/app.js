const loadPhones = async(searchText, dataLimit) => {
    url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // display only 10 phones
    const showAll = document.getElementById('showAll');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');

    }
    else{
        showAll.classList.add('d-none');
    }

    // display no phones
    const noPhone = document.getElementById('no-phone-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }

    // display all phones
    phones.forEach( phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loadPhoneDetailModal">
                Details
              </button>
            </div>
        </div>
        `;

        phoneContainer.appendChild(phoneDiv);
        // stop loader
        toggleSpinner(false);
    });
}

const processSearch = (dataLimit) => {
    // start loader
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}
document.getElementById('btn-search').addEventListener('click', () => {
    processSearch(10);
});

document.getElementById('search-field').addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        processSearch(10); 
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    console.log(isLoading);
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('btn-showAll').addEventListener('click', () => {
    processSearch();
})

const loadPhoneDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('loadPhoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetailDiv = document.getElementById('phone-details');
    phoneDetailDiv.innerHTML = `
    <p> Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date found'}</p>
    <p>Storage:
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth'} </p>
    `;
}

loadPhones('iphone');