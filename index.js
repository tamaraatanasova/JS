class Book {
    constructor(title, author, maxPages, onPage) {
        this.title = title;
        this.author = author;
        this.maxPages = maxPages;
        this.onPage = onPage;
    }

    getProgress() {
        return parseInt((this.onPage / this.maxPages) * 100);
    }

    getStatus() {
        if (this.onPage === this.maxPages) {
            return `<span class="read">You already read "${this.title}" by ${this.author}.</span>`;
        } else {
            return `<span class="not-read">You still need to read "${this.title}" by ${this.author}.</span>`;
        }
    }
}

const books = [
    new Book('Don Quixote', 'Miguel de Cervantes', 1087, 458),
    new Book(`Alice's Adventures in Wonderland`, 'Lewis Carroll', 352, 352),
    new Book('The Adventures of Huckleberry Finn', 'Mark Twain', 362, 342),
    new Book('The Adventures Tom Sawyer', 'Mark Twain', 362, 105),
    new Book('Treasure Island', 'Robert Louis Stevenson', 292, 100),
    new Book('Pride and Prejudice', 'Jane Austen', 259, 45),
    new Book('Wuthering Heights', 'Emily Bronte', 416, 0),
    new Book('Jane Eyre', 'Charlotte Bronte', 483, 445),
    new Book('Moby Dick', 'Herman Melville', 545, 0),
    new Book('The Scarlet Letter', 'Nathaniel Hawthorne', 272, 272)
];

const tableBody = document.querySelector('#bookTableBody');

function displayBooks() {
    tableBody.innerHTML = '';

    books.forEach((book, index) => {
        const row = document.createElement('tr');
        const progress = book.getProgress();
        
        let progressColor = progress === 100 ? 'green' : 'red'; 

        row.innerHTML = `
            <td>${book.getStatus()}</td>
            <td style="width: 25%;">
                <div class="progress" style="height: 20px; width: 100%;">
                    <div class="progress-bar" role="progressbar" 
                         style="width: ${progress}%; background-color: ${progressColor};" 
                         aria-valuenow="${book.onPage}" aria-valuemin="0" aria-valuemax="${book.maxPages}">
                        ${progress}%
                    </div>
                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


displayBooks();

document.querySelector('#bookForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const maxPages = parseInt(document.querySelector('#maxPages').value);
    const onPage = parseInt(document.querySelector('#onPage').value);

    if (onPage > maxPages) {
        alert('Pages read cannot exceed total pages.');
        return;
    }

    const newBook = new Book(title, author, maxPages, onPage);
    books.push(newBook);

    displayBooks();

    document.querySelector('#bookForm').reset();
});
