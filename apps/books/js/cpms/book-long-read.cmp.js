export default {
    template: `
    <section class = "read-more">
           {{textToShow}}{{moreToRead}}
           <button @click="openDetails"> {{buttonName}} </button>
        </section>
    `,
    props: ['txt'],
    data() {
        return {
            moreToRead: '',
            
        }
    },
    computed: {
        textToShow() {
            return this.txt.substring(0, 100)
        },

        buttonName(){
            if(!this.moreToRead) return 'Read More'
            else return 'Read Less'
        }
    },
    methods: {
        openDetails() {
            console.log(this.txt)
            if(!this.moreToRead) this.moreToRead = this.txt.substring(100, 1000)
            else this.moreToRead=''
        }
    }
}