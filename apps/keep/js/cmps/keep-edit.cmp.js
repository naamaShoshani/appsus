import { bus, KEEP_EDIT, KEEP_UPDATE } from '../services/keep-event-bus-service.js'

export default {
	props: ['keep'],
	template: `
		<section class="notes-edit">

			<input type="text" autocomplete="off" v-model="newData" />
			<div class="flex justify-center">
			<i class="fas fa-times" @click="cancelEdit"></i>
			<i class="fas fa-check" @click="saveEdit"></i>
			</div>
		

		</section>
	`,
	data() {
		return {
			newData: '',
		}
	},
	created() {
		this.newData = this.getNoteData();
	},
	methods: {
		getNoteData() {
			let strValue = '';
			switch (this.keep.settings.type) {
				case 'note-text':
					strValue = this.keep.data.text;
					break;
				case 'note-img':
				case 'note-video':
				case 'note-audio':
					strValue = this.keep.data.src;
					break;
				case 'note-todo':
					strValue = this.keep.data.todos.map(list => list.text).join(',');
					break;
			}
			return strValue;
		},
		cancelEdit() {
			bus.$emit(KEEP_EDIT, this.keep._id);
		},
		saveEdit() {
			bus.$emit(KEEP_EDIT, this.keep._id);
			bus.$emit(KEEP_UPDATE, this.keep, this.newData);
		}
	}
}