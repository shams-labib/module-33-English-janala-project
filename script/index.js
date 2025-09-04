const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //fetch muloto ekta promise dey
    .then(res => res.json())
    .then((json) => {
        displayLessons(json.data)
    })

}

const removeActive = () => {
    const lessonsBtn = document.querySelectorAll('.lessons-btn2')
    // console.log(lessonsBtn)
    lessonsBtn.forEach(btn => btn.classList.remove('active')) //eta muloto sob dhoroner active class ke remove kore
}

const loadLevelWord = (id) =>{
    // console.log(id)
    removeActive();
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(json => {
        const clickBtn = document.getElementById(`lessons-btn-${id}`)
        // console.log(clickBtn)
        clickBtn.classList.add('active')
        displayLevelWord(json.data)
    })
}

const displayLevelWord = (words)=> {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    if(words.length == 0){
        wordContainer.innerHTML = `
        
        <div class="text-center col-span-full py-5 space-y-2 font-bangla">
        <img class = "mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="text-2xl font-bold">নেক্সট Lesson এ যান</h1>
      </div>

        
        
        `;
        return;
    }

    words.forEach(word => {
        const newWord = document.createElement('div');
        newWord.innerHTML = `
          <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শদ্ব পাওয়া যায় নি"}</h2>
        <p class="font-semibold">Meaning / Pronounciation</p>
        <div class="text-2xl font-medium font-bangla  ">${word.meaning? word.meaning : " শব্দ পাওয়া যায় নি"} / ${word.pronunciation? word.pronunciation : "Pronouncition পাওয়া যায় নি"}"</div>
    
        <!-- btn -->
         <div class="flex justify-between items-center ">
           <button  onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
           <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
         </div>
         
      </div>
        `
        wordContainer.append(newWord)
    })
}

const displayLessons = (data) => {
    // 1. get the container
    const container = document.getElementById('level-container');
    container.innerHTML = '';

    // 2. loop calano
    data.forEach(post => {
        console.log(post)

        const creatingNew = document.createElement('div');
        creatingNew.innerHTML = `
            <button id="lessons-btn-${post.level_no}" onclick = "loadLevelWord(${post.level_no})" class="btn btn-outline btn-primary lessons-btn2"><span><i class="fa-solid fa-book-open"></i></span>Lesson - ${post.level_no}</button>
        
        `
        container.append(creatingNew)
    })


}

loadLessons();