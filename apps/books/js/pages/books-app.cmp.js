import { bookService } from '../../../books/js/services/books-service.js'
import bookFilter from '../../../books/js/cpms/book-filter.cmp.js'
import bookList from '../../../books/js/cpms/books-list.cmp.js'
import bookDetails from '../../../books/js/pages/book-details.cmp.js'

export default {
    template: `
    <section class="book-app">
    <h1>Books Shop</h1>
    <!-- <button ><router-link exact to="/note">google book</router-link> </button>  -->
    <book-filter @filtered="setFilter"></book-filter>
    <book-list  :books="booksToShow" @selected="selectBook"></book-list>
    <book-details  @hide="hideDetails" :book="selectedBook"></book-details> 
    
        </section>
    `,

    data() {
        return {
            books: [],
            filter: null,
            selectedBook: ''

        }
    },
    created() {
        bookService.query()
        .then(books=> {
            this.books=books
            console.log(this.books)
         })

    },
    computed: {
        booksToShow() {
            console.log('in app', this.filter)
            if (!this.filter) return this.books;
            else if(this.filter.title){
                return this.books.filter(book => book.title.includes(this.filter.title)
                )}
            return this.books.filter(book => book.title.includes(this.filter.title)
            &&  book.listPrice.amount >= this.filter.fromPrice 
            &&  book.listPrice.amount <= this.filter.toPrice )
     }
    },
    methods: {
        setFilter(filter) {
            console.log('Book App got the filter', filter.title , filter.fromPrice , filter.toPrice);
            this.filter = filter
        },
        selectBook(bookId) {
            this.selectedBook = this.books.find(book => book.id === bookId)
            console.log(this.selectedBook,'selected book is');
            
        },
        
        hideDetails() {
                this.selectedBook = null
        }

    },
    components: {
        bookFilter,
        bookList,
        bookDetails
    }
}