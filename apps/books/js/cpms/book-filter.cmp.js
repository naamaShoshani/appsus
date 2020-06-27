export default {
    template: `
        <section class="book-filter">
        <input type="text" autofocus placeholder="Search Book Title... 🔎" v-model="filterBy.title" @input="emitFilter" />
        <input type="number" autofocus placeholder="From price" v-model="filterBy.fromPrice" @input="emitFilter" />
        <input type="number" autofocus placeholder="To price" v-model="filterBy.toPrice" @input="emitFilter" />
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: '',
                toPrice: ''

            }
        }
    },
    methods: {
        emitFilter() {
            console.log('emit filter', this.filterBy)
            this.$emit('filtered', this.filterBy);

        }
    }
}