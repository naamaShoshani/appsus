export default {
    template: `
    <section v-on:click="selectBook(book.id)" >
    <li >
    <h3> {{book.title}}</h3>
    <img v-bind:src="book.thumbnail" />
    <h4> price : {{book.listPrice.amount}} {{ getCurrencyIcon}}</h4>
    <router-link :to="bookUrl" class="details-btn">Details ›</router-link>
    </li>
    </section>
    `,
    props: ['book'],
    data() {
        return {


        }
    },
    computed: {

        bookUrl() {
            // console.log(this.book.id)
            return '/book/' + this.book.id
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
    created() {

        // console.log(this.book.listPrice.currencyCode);
    },
    methods: {
        selectBook(id) {
            this.$emit('selected', id);
        }
    }

}