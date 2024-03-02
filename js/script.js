const dataLoad = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    const data = await res.json()
    const result = data.posts
    // console.log(result);
    displayCardUser(result)
}

const displayCardUser = (result) => {
    // console.log(result)
    result.forEach(item => {
        const discussCardContainer = document.getElementById('discuss-card-container');
        const newCard = document.createElement('div');
        newCard.innerHTML = `
        <div class="flex justify-event mr-10 gap-5 border rounded-2xl p-5 mb-5 w-4/5">
            <div> 
                <img class="w-32 rounded-2xl" src="${item.image}" alt="">
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
}



const detailsViews = (item,views) =>{
    // console.log(item,views)
}


dataLoad()