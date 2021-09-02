const loadData = () => {
    const search = document.getElementById('search');
    fetch(`https://openlibrary.org/search.json?q=${search.value}`)
        .then(res => res.json())
        .then(data => load(data.docs))
    
    search.value = ""
}

function load(data) {
    data.forEach(d => {
        let authorName = !d.author_name ? "Author Name Is Not Given" : d.author_name[0]
        console.log(authorName)
    })
}