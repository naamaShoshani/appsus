import longText from '../../../books/js/cpms/book-long-read.cmp.js'
import reviewAdd from '../../../books/js/cpms/book-add-review.js'
import { bookService } from '../../../books/js/services/books-service.js'

export default {
    template: `
    <section class="book-details-container" v-if="book">
                <div class="book-in-details" >
                    <h1>Book Title:<br>
                    {{book.title}}</h1>
                    <h2 class="long-read-title"> {{getPageCount}} , {{getpublishedDate}}</h2>
                    <h3 class="sale">{{bookOnSale}}</h3>
                    <long-text v-bind:txt="book.description"></long-text>
                    <img  v-bind:src="book.thumbnail"/>
                    <h2 :class="priceClass" >Price: {{book.listPrice.amount}}{{ getCurrencyIcon}}</h2>
                </div>
                <review-add :book="book"></review-add>
        </section>
    `,
    data() {
        return {
            book: null,

        }
    },
    created() {
        console.log('params:', this.$route.params.bookId);
        const bookId = this.$route.params.bookId;
        bookService.getById(bookId)
            .then(book => this.book = book) 
        },
        
        mounted(){
           
    },
    computed: {

        invalid() {
            return !this.car.desc || this.car.checkedNames.length === 0
        },

        bookOnSale() {
            var isOnSale = this.book.listPrice.isOnSale
            console.log(isOnSale)
            if (isOnSale) {
                return 'On Sale!'
            } else {
                return ''
            }
        },



        priceClass() {
            if (this.book.listPrice.amount >= 150) {
                return 'expensive'
            } else if (this.book.listPrice.amount <= 20) {
                return 'cheap'
            }
        },

        getpublishedDate() {
            var publishedDate = this.book.publishedDate
            console.log(publishedDate)
            if (publishedDate <= 2009) {
                return 'Veteran Book'
            } else if (publishedDate >= 2018) {
                return 'new'
            }
        },

        getPageCount() {
            var pageCount = this.book.pageCount
            if (pageCount >= 500) {
                return 'long reading'
            } else if (pageCount < 500 && pageCount >= 200)
                return 'Decent Reading'
            else if (pageCount < 200 && pageCount >= 100)
                return 'Light Reading'
                else return 'Short Reading'
        },

        getCurrencyIcon() {
            var currencyCode = this.book.listPrice.currencyCode
            if (currencyCode === 'EUR') {
                return '€'
            } else if (currencyCode === 'ILS') {
                return '₪'
            } else {
                return '$'
            }
        }
    },

    methods: {
        removeDisplay() {
            this.$emit('hide');
        }
    },
    components: {
        longText,
        reviewAdd
    }

}