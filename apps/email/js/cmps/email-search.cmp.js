'use strict'

export default {
    template: `
        <section class="app-search">
            <div class="search-container">
                <input @input="emitSearch" class="search-emails" type="text" v-model="searchTxt" placeholder="Search 🔎"/>
                <div class="search-dropdown">
                    <select v-model="searchBy">
                        <option v-for="option in arrSearchParams" :value="option" >{{option}}</option>
                    </select>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            searchParams: {Subject: '', Content: ''},
            searchBy: 'Subject',
            searchTxt: ''
        }
    },

    computed: {
        arrSearchParams() {
            return Object.keys(this.searchParams);
        }
    },

    methods: {
        emitSearch() {
            this.searchParams[this.searchBy.toLowerCase()] = this.searchTxt;
            this.$emit('searchBy',this.searchParams);
            this.searchParams = {Subject: '', Content: ''};
        }
    }
}
