const discussCardContainer = document.getElementById('discuss-card-container');
let selectCategories = 'Comedy'



const dataLoad = async (categoryName) => {
    loadingSpinner(true)
    selectCategories = categoryName
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`)
    const data = await res.json()
    const result = data.posts
    // console.log(result);
    displayCardUser(result)
}

const displayCardUser = (result) => {
    // console.log(result)
    loadingSpinner(true)
    discussCardContainer.innerHTML = ''
    result.forEach(item => {
        let active = ''
        if(item.isActive){
            active = `<div id="active" class="bg-green-400 w-3 h-3 rounded-2xl absolute top-0 right-0"></div>`
        }
        else{
            active = `<div id="active" class="bg-orange-700 w-3 h-3 rounded-2xl absolute top-0 right-0"></div>`
        }
        const newCard = document.createElement('div');
        newCard.innerHTML = `
        <div class="flex justify-event lg:mr-10 gap-5 border rounded-2xl p-5 mb-5 lg:w-4/5">
            <div class="relative"> 
                <img class="w-32 rounded-2xl" src="${item.image}" alt="">
                ${active}
            </div>
            <div class="space-y-3">
                <div class="flex text-[15px] text-[#3F4057] font-semibold">
                    <p class="mr-3"># <span>${item.category}</span></p>
                    <p>Author: <span>${item.author.name}</span></p>
                </div>
                <h1 class="font-bold fonts-mulish text-[25px] text-[#12132D]">${item.title}</h1>
                <p class="text-[#717181] fonts-inter border-b-2 border-dotted pb-5">${item.description}</p>
                <div class="flex justify-between">
                    <div class="flex items-center py-3">
                        <h2 class="mr-4">
                            <i class="fa-regular fa-message"></i>
                            <span>${item.comment_count}</span>
                        </h2>
                        <h2 class="mr-4 fonts-inter">
                            <i class="fa-regular fa-eye"></i>
                            <span>${item.view_count}</span>
                        </h2>
                        <h2 class="mr-4 fonts-inter">
                            <i class="fa-regular fa-clock"></i>
                            <span>${item.posted_time}</span>
                        </h2>
                    </div>
                    <button onclick="detailsViews('${item.title}', ${item.view_count})" class="btn text-white bg-[#10B981]"><i
                            class="fa-regular fa-envelope-open"></i></button>
                </div>
            </div>
        </div>
        `
        discussCardContainer.appendChild(newCard);
    });
    // hide loading spinner
    loadingSpinner(false);
}

// Views Show Box
let count = 0;
const detailsViews = (item,views) =>{
    // console.log(item,views)
    count++
    document.getElementById('post-count').innerText = count
   
    const viewsShowContainer = document.getElementById('view-show-container');
    const div = document.createElement('div');
    div.classList = `my-5 shadow-lg rounded-2xl`
    div.innerHTML = `
    <div class="flex justify-between bg-white rounded-lg p-5">
        <h2 class="fonts-mulish font-semibold">${item}</h2>
        <div class="flex items-center gap-3">
            <i class="fa-regular fa-eye"></i>
            <span class="text-[#747488]">${views}</span>
        </div>
    </div>
    `
    viewsShowContainer.appendChild(div);
}


const latestDataLoad = async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
    const data = await res.json()
    // console.log(data)
    latestPostData(data)
}

const latestPostData = (result) =>{
    result.forEach(item =>{
        // console.log(item);

        let latestData = '';
        if(item.author.posted_date){
            latestData = `${item.author.posted_date}`
        }
        else{
            latestData =`No publish date`
        }
        let description = '';
        if(item.author.designation){
            description = `${item.author.designation}`
        }
        else{
            description =`Unknown`
        }
        const latestCardContainer = document.getElementById('latest-card-container');
        const cardNew = document.createElement('div');
        cardNew.classList = `card card-compact lg:w-96 bg-base-100 shadow-xl`
        cardNew.innerHTML = `
        <figure>
        <img src="${item.profile_image}" alt="Shoes" />
        </figure>
            <div class="card-body">
                        <p>
                            <i class="fa-regular fa-calendar"></i>
                            <span class="text-[#b8b3b3]">${latestData}</span>
                        </p>
                        <h2 class="text-[20px] font-bold fonts-mulish">${item.title}</h2>
                        <p class="fonts-inter">${item.description}</p>
                <div class="flex gap-3">
                    <div>
                        <img class="w-20 rounded-2xl" src="${item.cover_image}" alt="">
                    </div>
                    <div class="space-y-1">
                        <h4 class="text-[18px] font-semibold">${item.author.name}</h4>
                        <p class="text-[15px]">${description}</p>
                    </div>
                </div>
            </div>
        `
        latestCardContainer.appendChild(cardNew)
    })
}


const searchHandler = () =>{
    const value = document.getElementById('input-field').value;
    if(value){
        loadingSpinner(true)
        dataLoad(value)
        // console.log(value);
    }
    else{
        alert('Please Enter Your Valid Name')
    }

}

const loadingSpinner = (isLoading) =>{
    const loading = document.getElementById('loading-spinner');
    if(isLoading){
        loading.classList.remove('hidden');
    }
    else{
        loading.classList.add('hidden');
    }
}

dataLoad(selectCategories)
latestDataLoad()