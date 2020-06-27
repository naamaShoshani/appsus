'use strict'

import emailSearch from '../../../email/js/cmps/email-search.cmp.js'
import emailFilter from '../../../email/js/cmps/email-filter.cmp.js'
import emailSort from '../../../email/js/cmps/email-sort.cmp.js'

export default {
	template: `
    <section class="app-header email-header">
        <h1>Send an Email</h1>
       <div class="app-searchAndFilter flex">
            <email-search @searchBy="emitSearchBy" @clearSearch="emitClear"></email-search>
            <email-filter :isOptionFilterOn="isOptionFilterOn" @filtered="emitFilterBy"></email-filter>
            <email-sort @sorted="emitSortBy"></email-sort>
            <!-- <user-msg></user-msg> -->
        </div>

    </section>
    `,

	props: ["isOptionFilterOn"],
	data() {
		return {};
	},
	created() {
		console.log("Email Header is alive");
	},

	methods: {
		emitSearchBy(searchParams) {
			this.$emit("searchBy", searchParams);
		},

		emitFilterBy(filter) {
			this.$emit("filtered", filter);
		},

		emitSortBy(sorter) {
			this.$emit("sorted", sorter);
		},

		emitClear() {
			this.$emit("clearSearch", "");
		},
	},

	components: {
		emailSearch,
		emailFilter,
		emailSort,
	},
};