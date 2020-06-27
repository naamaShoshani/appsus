import { bus, KEEP_ADDED } from '../services/keep-event-bus-service.js'

// imports done ^

export default {
	props: ['noteTypes'],
	template: `
		<section class="flex justify-center">
			<div class="keep-add ui-box flex">
				<input type="text" autocomplete="off" v-model="userData"
					:placeholder="placeholder" @keyup.enter="addKeep" ref="newNoteEl" />
	
				<div class="flex space-between">
					<template v-for="(noteType, idx) in noteTypes">
						<button class="add-keep-btn"><i :class="setSelectedType(idx, noteType.icon)" @click="updateSelectedType(idx)"></i></button>
					</template>
				</div>
			</div>
		</section>
	`,
	data() {
		return {
			newNote: {
				settings: {
					type: 'note-text',
					isPinned: false,
					isMarked: false,
					editMode: false,
				},
				bgColor: '',
				data: {},
			},
			userData: ''
		}
	},
	computed: {
		fieldType() {
			return this.noteTypes[this.newNote.settings.type].field;
		},
		placeholder() {
			return this.noteTypes[this.newNote.settings.type].placeholder;
		}
	},
	methods: {
		setSelectedType(noteType, noteIcon) {
			return (this.newNote.settings.type === noteType)
				? noteIcon + ' active-keep-add'
				: noteIcon + ' ';
		},

		updateSelectedType(noteType) {
			this.newNote.settings.type = noteType;
			this.$refs.newNoteEl.focus();
		},
		addKeep() {
			bus.$emit(KEEP_ADDED, this.newNote, this.userData);
			this.newNote = {
				settings: {
					type: 'note-text',
					isPinned: false,
					editMode: false,
				},
				bgColor: '',
				data: {},
			}
			this.userData = '';
		},
	}
}
