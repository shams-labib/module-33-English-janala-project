const createElements = (arra) => {
    const htmlElements = arra.map((el) => `<span class="btn">${el}</span>`)
    return htmlElements.join(" ")
}


const manageSpinneers = (status) =>{
    if(status == true) {
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('word-container').classList.add('hidden')
    }
    else{
        document.getElementById('word-container').classList.remove('hidden')
        document.getElementById('spinner').classList.add('hidden')
    }
}


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
    manageSpinneers(true)
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

const loadwordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    console.log(url)
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetail(details.data)
}

// {
//     "word": "Ball",
//     "meaning": "বল",
//     "pronunciation": "বল",
//     "level": 1,
//     "sentence": "He is playing with a ball.",
//     "points": 1,
//     "partsOfSpeech": "noun",
//     "synonyms": [
//         "sphere",
//         "round object",
//         "toy"
//     ],
//     "id": 81
// }

const displayWordDetail = (data) => {
     console.log(data)
     const detailsBox = document.getElementById('details-container')
     detailsBox.innerHTML = `
     
     <div class=""> 
              <h1 class="text-2xl font-bold mb-4">${data.word}( <i class="fa-solid fa-microphone-lines"></i> : ${data.pronunciation})</h1>
              <h1 class=" font-bold mb-3">Meaning</h1>
              <p class="font-bangla mb-5">${data.meaning}</p>

              <h1 class="font-semibold mb-2">Example</h1>
              <p class="mb-5">${data.sentence}</p>
  
              <p class="mb-2">সমার্থক শব্দ গুলো</p>
               <div class="space-x-2">
                    
                <div class="">
                    ${createElements(data.synonyms)}

               </div>
 

               </div>

              <button class="btn btn-active btn-primary mt-10">Complete Learning</button>

          </div>
     
     
     `
     document.getElementById('word_modal').showModal();
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
        manageSpinneers(false)
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
           <button  onclick="loadwordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
           <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
         </div>
         
      </div>
        `
        wordContainer.append(newWord)
    })
    manageSpinneers(false)
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