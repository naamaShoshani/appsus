export default {
	template: `
		<section class="flex justify-center">
		<div class="notes-filter ui-box flex">
		
		
		
		
		<select class="filter-select" v-model="filter.type" @change="updateFilter">
		<option value="">All</option>
		<option value="note-text">Text</option>
		<option value="note-img">Image</option>
		<option value="note-video">Video</option>
		<option value="note-audio">Audio</option>
		<option value="note-todo">Todo</option>
		</select>				
		<p  class="fas fa-filter"></p>
	   </div>
		</section>
	`,
	data() {
		return {
			filter: {
				txt: '',
				type: ''
			},
		}
	},
	methods: {
		updateFilter() {
			this.$emit('keep-filter', this.filter);
		},
	}
}