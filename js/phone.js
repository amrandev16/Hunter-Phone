
const loadPhone =async (searchText,isShowAll) =>{
    const res = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhone(phones,isShowAll);
}

const displayPhone = (phones,isShowAll) =>{
console.log(phones);
const phoneContainer =document.getElementById('phone-container');

// clear container card before adding new card
phoneContainer.textContent='';

// display show button if there are more than 12 phones 
const showAllContainer = document.getElementById('show-all-container');
if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden');
}
else{
    showAllContainer.classList.add('hidden');
};
// console.log('is show all',isShowAll);

//display only first 12 phone
if(!isShowAll){
phones = phones.slice(0,12);
}


//*********************** */
phones.forEach(phone =>{
 console.log(phone);

 // 1creat a div 

 const phoneCard =document.createElement('div');
 phoneCard.classList =`card bg-base-100 p-4 shadow-xl`;
 phoneCard.innerHTML =` <figure>
    <img
    src="${phone.image}"
    alt="Shoes" />
    </figure>
    <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
    <button onclick="handleShowDetails('${phone.slug}'); show_details_model.showModal()" class="btn btn-primary">Show Details</button>
    </div>
    </div>
 `;
 phoneContainer.appendChild(phoneCard);

})
//hide loading spiner
toggleLoadingSpiner(false);
};

//handle show details
const handleShowDetails = async(id) =>{
console.log('click',id)
const res =await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
const data = await res.json();
console.log(data);
const phone = data.data;
showPhoneDetails(phone);
}

// showphone details 

const showPhoneDetails =(phone) =>{
    console.log(phone);
    
 const phoneName =document.getElementById('show-details-phone-name');
 phoneName.innerText = phone.name;

 const showDetailContainer = document.getElementById('show-detal-container');
 showDetailContainer.innerHTML=`
 <img src="${phone.image}" alt="" />
 <p><span class="text-bold"> Storage:</span>${phone?.mainFeatures?.storage}</p>
 <p> <span class="text-bold">chipSet:</span> ${phone.mainFeatures. chipSet}</p>
 <p> <span class="text-bold"> DisplaySize:</span> ${phone.mainFeatures. displaySize } </p>
 <p> <span class="text-bold"> Memory:</span>${phone.mainFeatures.memory}></p>


 `
    // sow the modal 
    show_details_model.showModal();
}

// handle search button 

const handleSearch = (isShowAll) =>{
 const searchField =document.getElementById('search-field');
 const searchText = searchField.value;
 console.log(searchText);
 loadPhone(searchText,isShowAll);
 toggleLoadingSpiner(true);
}


// spiner or loading

const toggleLoadingSpiner =(isLoading) =>{
 const loadingSpiner = document.getElementById('loading-spiner');
if(isLoading){
    loadingSpiner.classList.remove('hidden');
}
else{
    loadingSpiner.classList.add('hidden');
}
}


// handle show all
const handleShowAll =() =>{
    handleSearch(true);
    
    
    
}








// loadPhone(searchText);















































