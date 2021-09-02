//Loading Data from API
const loadData = () => {
    const search = document.getElementById('search');
    toggleSpinner('block');
    toggleResult('none');
    fetch(`https://openlibrary.org/search.json?q=${search.value}`)
        .then(res => res.json())
        .then(data => displayData(data.docs, data.num_found))

    search.value = ""
}

// Display Data to DOM loaded from API
const displayData = (books, totalFound) => {
    const container = document.getElementById('container');
    container.textContent = ""
    const number = document.getElementById('number');
    number.innerHTML = `
            <h2 class="text-center text-light py-2 my-3 bg-dark">Showing ${books.length} books from total: ${totalFound}</h2>
        `
    books.forEach(book => { // access each book from books array.
        console.log(book);
        const div = document.createElement('div');
        //Cover image url.
        const cover = `${(book.cover_i === undefined) ? 'placeholder.png' : `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}`
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${cover}" class="card-img-top">
                <div class="card-body">
                    <h3 class="card-title">${book.title}</h3>
                    <p><span class="text-info">Author:</span> ${book.author_name}</p>
                    <p><span class="text-success">First Published:</span> ${book.first_publish_year}</p>
                    <p><span class="text-primary">Publisher:</span> ${!book.publisher ? "Author Name Is Not Given" : book.publisher[0]}</p>
                </div>
            </div>
        `
        container.appendChild(div)
    });
    // Adding Display action 
    toggleSpinner('none');
    toggleResult('block');
};

// Adding a loading spinner.
const toggleSpinner = (displayStatus) => {
    const spinner = document.getElementById('spinner');
    if (displayStatus === 'block') {
        spinner.classList.add('d-block');
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.remove('d-block');
        spinner.classList.add('d-none');
    }
}
const toggleResult = (displayStatus) => {
    const container = document.getElementById('container')
    if (displayStatus === 'block') {
        container.classList.add('d-flex');
        container.classList.remove('d-none');
    } else {
        container.classList.remove('d-flex');
        container.classList.add('d-none');
    }
}

// Event handaler for enter button.
document.getElementById('search').addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        loadData()
    }
})