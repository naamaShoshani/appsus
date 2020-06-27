import { bookService } from '../../../books/js/services/books-service.js'
import eventBus, { SHOW_MSG } from '../../../books/js/services/books-event-bus-service.js'


export default {
    template: `
    <section>
    <h1>books from google</h1>
    <input type="text" autofocus placeholder="search by title" v-model="filterBy.title" @input="filter" />
     <div v-for="(book, idx) in books">
     <button v-on:click ="addingBook(book,idx)">+</button>
         {{book.volumeInfo.title}}
     </div>

    
</section>
    `,
    data() {
        return {
            books: null,
            filterBy: {
                itle: ''
            }
        }
    },
    created() {
        console.log('created')
    },
    methods: {
        addingBook(book, idx) {
            console.log('in comp book is adding', book, idx)
            bookService.addingBookFromGoogle(book)

            eventBus.$emit(SHOW_MSG, {
                txt: `Book ${book.volumeInfo.title} was successfully added`, type: 'success'
            })


        },
        filter() {
            console.log('filtered by', this.filterBy.title);
            googleService.getBookFromGoogle(this.filterBy.title)
                .then(books => {
                    this.books = books
                })

        },
      
    },



}