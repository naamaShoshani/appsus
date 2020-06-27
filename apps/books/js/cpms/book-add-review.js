import { bookService } from '../../../books/js/services/books-service.js'
import eventBus, { SHOW_MSG } from '../../../books/js/services/books-event-bus-service.js'

export default {
    template: `
    <section>
           <h4>Review this Book:</h4>
           <form @submit.prevent="saveBook">
               Your Name: <input ref="txtName" v-model="bookReview.name" autofocus placeholder="name" type="text">
               <br> 
               Rate: <select class="rate-book-select" v-model="bookReview.rate">
                         <option>1</option>
                         <option>2</option>
                         <option>3</option>
                         <option>4</option>
                         <option>5</option>
                     </select>
                   
              Date: <input type="date"  v-model="bookReview.readAt"/>
              <br>
                <textarea v-model.trim="bookReview.text" placeholder="Tell us what you thought of the book..."></textarea>
                <br>
                <button>Save</button>
                <h4>Readers Reviews:</h4>
            </form>
            <div class = "reviews"  v-for="(currentReview, idx) in book.reviews" >
            <div class="review">
            <button v-on:click ="deleteReview(idx)">x</button>
           Book Name: {{currentReview.name}}
           <br>
           Reader Rate: {{currentReview.rate}}
           <br>
           Date: {{currentReview.readAt}}
           <br>
           Review: {{currentReview.text}}
            </div>
            </div>
        </section>
    `,

    data() {
        return {
            // book: null,
            bookReview: {
                name: 'Books Reader',
                rate: '',
                readAt: '',
                text: '',

            }
        }
    },
    props: ['book'],
    mounted() {
        // console.log('REFS:', this.$refs);
        this.$refs.txtName.focus();

    },
    created() {
        var x = new Date
        this.bookReview.readAt = x.getFullYear() + '-' + (x.getMonth() + 1) + '-' + x.getDate()
        console.log(this.bookReview.readAt)

    },
    methods: {

        deleteReview(idx) {
            console.log('deleted', idx)
            const bookId = this.$route.params.bookId
            const reviewId = idx
            bookService.dleateReview(bookId, reviewId)
            eventBus.$emit(SHOW_MSG,
                { txt: 'Delete review Successful!', type: 'failure' })
        },


        saveBook() {
            const review = { ...this.bookReview }
            const bookId = this.$route.params.bookId
            bookService.saveReview(bookId, review)
            eventBus.$emit(SHOW_MSG,
                { txt: 'Adding review Successful!', type: 'success' })

        },


    },
}