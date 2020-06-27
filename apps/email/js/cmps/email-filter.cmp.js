'use strict'

export default {
	template: `
        <section class="read-unread-filter">
            <select v-model="filterBy" placeholder= "filter mail:">
            <option>All</option>
                <option>Read</option>
                <option>Unread</option>
            </select>
        </section>
    `,

	data() {
		return {
			filterBy: "All",
		};
	},

	watch: {
		filterBy: {
			handler: function (filter) {
				this.$emit("filtered", filter.toLowerCase());
			},
			immediate: true,
		},

		isOptionFilterOn: {
			handler: function (isOn) {
				if (!isOn) this.filterBy = "All";
			},
			immediate: true,
		},
	},
};