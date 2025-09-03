const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //fetch muloto ekta promise dey
    .then(res => res.json())
    .then((json) => {
        displayLessons(json.data)
    })

}

const loadLevelWord = (id) =>{
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(json => {
        displayLevelWord(json.data)
    })
}

const displayLevelWord = (words)=> {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    words.forEach(word => {
        const newWord = document.createElement('div');
        newWord.innerHTML = `
          <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-semibold">Meaning / Pronounciation</p>
        <div class="text-2xl font-medium font-bangla  ">${word.meaning} / ${word.pronunciation}"</div>
    
        <!-- btn -->
         <div class="flex justify-between items-center ">
           <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
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
            <button onclick = "loadLevelWord(${post.level_no})" class="btn btn-outline btn-primary"><span><i class="fa-solid fa-book-open"></i></span>Lesson - ${post.level_no}</button>
        
        `
        container.append(creatingNew)
    })


}

loadLessons();