const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => {
        displayLessons(data.data)
    })
}

//2. amra DISPLAYLESSONS er vitore je loadlevelword name e ekta function call korlam jeta muloto ekta id er maddome dynamic vabe id gulo nibe and setar info show korabe, ejonno setar kaj niche deya holo
const loadLevelWord = (id) => {
    console.log(id)
    // ekhane id gulo show koranor jonno level link neya holo, and dynamic vabe dekhanor jonnno `` backtic use kora holo
    const url = `https://openapi.programming-hero.com/api/level/5`
}

const displayLessons = (data) => {
     const container = document.getElementById('level-container');

// 1.  nicher button e jate click korle button er information show kore ejonno button  er vitore ONCLICK name e ekta fucntion e set kore setar kaj korbo

    data.forEach(post => {
        const creatNew = document.createElement('div');
        creatNew.innerHTML = `
        
        <button onclick = 'loadLevelWord(${post.level_no})' class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${post.level_no}</button>

        `
        container.append(creatNew);
    })
}

loadLessons()