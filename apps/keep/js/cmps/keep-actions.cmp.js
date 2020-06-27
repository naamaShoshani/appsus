import { bus, KEEP_DELETE,KEEP_PINNED,KEEP_MARKED, KEEP_STYLED,KEEP_EDIT } from '../services/keep-event-bus-service.js'

// imports done ^

export default {
	props: ['keep','noteTypesInfo'],
	template: `
		<section class="note-action-bar flex space-between">

			  <i :class="getIconClass"></i> 
			  <span> &nbsp; </span>
			  
			  <i class="fas fa-thumbtack" :class="{'pinned': keep.settings.isPinned}" title="Pin keep" @click="pinKeep"></i>
			  <i class="fas fa-edit"  title="Edit note" @click="editNote"></i>
			  <i class="fas fa-trash-alt danger" title="Delete keep" @click="removeNote"></i>
			<i class="info colors dropdown" title="Change keep color">
				<div v-if="colorMode" class="dropdown-colors">
					<template v-for="color in Colors">
						<span :style="{'background-color': color.value}"
							:class="getBgColorClass(color.value)"
							@click="styleKeep(color.value)"> &nbsp; </span>
					</template>
				</div>
			</i>

		</section>
	`,
	computed: {
		getIconClass() {
			return this.noteTypesInfo.icon ;
		},
		colorMode(){
			return true
		}

    },
    // created(){
           
    // },
	methods: {
		pinKeep() { 
			bus.$emit(KEEP_PINNED, this.keep._id);
		},
		markNote() {
			bus.$emit(KEEP_MARKED, this.keep._id);
		},
		styleKeep(newBgColor) {
			bus.$emit(KEEP_STYLED, this.keep._id, newBgColor);
		},
		editNote() {
			bus.$emit(KEEP_EDIT, this.keep._id);
		},
	
		removeNote() {
			bus.$emit(KEEP_DELETE, this.keep._id);
		},
	
		getBgColorClass(color) {
			return (this.keep.bgColor === color) ? 'selected' : '';
		},
	},
	data() {
		return {
			Colors: [
				{ value: '#ff8888', name: 'red' },
				{ value: '#ffcc88', name: 'orange' },
				{ value: '#ffff88', name: 'yellow' },
				{ value: '#ccff99', name: 'green' },
				{ value: '#aaffee', name: 'turquoise' },
				{ value: '#ddbbff', name: 'purple' },
			]
		}
	}
}
