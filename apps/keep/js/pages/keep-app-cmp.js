import { keepService } from '../../../keep/js/services/keeps-service.js'
import noteAdd from '../../../keep/js/cmps/keep-add.cmp.js'
import noteList from '../../../keep/js/cmps/keep-list.cmp.js'
import noteFilter from '../../../keep/js/cmps/keep-filter.cmp.js'

import {
    bus, KEEP_DELETE, MARK_TODO_DONE, DELETE_TODO,
    KEEP_PINNED, KEEP_MARKED, KEEP_STYLED, KEEP_ADDED, KEEP_EDIT, KEEP_UPDATE
} from '../../../keep/js/services/keep-event-bus-service.js';

// Imports done^^

export default {
    template: `
        <section>
        
        <h1>Keep your Notes</h1>
                <note-filter  @keep-filter="setFilter"></note-filter>
                <note-add  :noteTypes="noteTypes"></note-add>
            <div v-if="pinnedNotesToShow.length>0" class="container">
                <h2 class="bold-text">Pinned Notes</h2>
                <note-list v-if="pinnedNotesToShow" :keeps="pinnedNotesToShow" :noteTypes="noteTypes"></note-list>
            </div>
            <div v-if="unpinnedNotesToShow" class="container">
                <note-list v-if="unpinnedNotesToShow" :keeps="unpinnedNotesToShow" :noteTypes="noteTypes" ></note-list>
            </div>
           
        </section>`,
    data() {
        return {
            noteTypes: {
                'note-text': { field: 'text', icon: 'fas fa-font', placeholder: 'Enter New Note...' },
                'note-img': { field: 'url', icon: 'far fa-image', placeholder: 'Enter image URL...' },
                'note-video': { field: 'url', icon: 'fab fa-youtube', placeholder: 'Enter YouTube URL...' },
                'note-audio': { field: 'url', icon: 'fas fa-volume-up', placeholder: 'Enter Audio URL...' },
                'note-todo': { field: 'text', icon: 'fas fa-list', placeholder: 'Seperate with Comma...' },
            },
            keeps: [],
            filter: '',
        }
    },
    created() {
        keepService.query().then((res) => {
            this.keeps = res;
        })
        bus.$on(KEEP_DELETE, (keepId) => {
            this.deleteKeep(keepId);
        })
     
        bus.$on(KEEP_PINNED, noteId => this.pinKeep(noteId));

        bus.$on(KEEP_MARKED, noteId => this.markKeep(noteId));

        bus.$on(KEEP_STYLED, (noteId, bgColor) => this.styleKeep(noteId, bgColor));

        bus.$on(KEEP_ADDED, (note, data) => this.addKeep(note, data));

        bus.$on(KEEP_EDIT, noteId => this.editKeep(noteId));

        bus.$on(KEEP_UPDATE, (note, data) => this.addKeep(note, data));

        bus.$on(MARK_TODO_DONE, (keep, id) => this.markDoneTodo(keep, id));

        bus.$on(DELETE_TODO, (keep, id) => this.deleteTodo(keep, id));

     

    },

    methods: {
        deleteKeep(keepId) {
            keepService.deleteKeepById(keepId)
        },
      
        addKeep(note, data) {

            keepService.saveKeep(note, data);
        },
        pinKeep(noteId) {
            keepService.pinKeep(noteId);
        },
        markKeep(noteId) {
            notesService.markNote(noteId);
        },
        styleKeep(keepId, bgColor) {
        
            keepService.styleKeep(keepId, bgColor);
        },
        addKeep(keep, data) {
            keepService.saveKeep(keep, data);
        },

        setFilter(filter) {
            this.filter = filter
        },
        editKeep(noteId) {
            keepService.editKeep(noteId);
        },

        markDoneTodo(keep,id){
            keepService.markDoneTodo(keep,id)
            
        },

        deleteTodo(keep,id){
            
            keepService.deleteTodo(keep,id)
        },
        keepsToShow() {
            let keeps = this.keeps;
			if (this.filter && this.filter.type !== '') {
				keeps = keeps.filter(keep => this.filter.type === keep.settings.type)
			}

			if (this.filter && this.filter.txt) {
                let searchTerm = this.filter.txt             
				keeps = keeps.filter(keep => {
					let strValue = '';
					switch (keep.settings.type) {
						case 'note-text':
                            strValue = keep.data.text;   
							break;
						case 'note-img':
						case 'note-video':
						case 'note-audio':
							break;
						case 'note-todo':
							strValue = keep.data.todos.map(todo => todo.text).join(',');
							break;
                    }
					return strValue.indexOf(searchTerm)!==-1;
				})
			}

			return keeps;
        },

    },

    computed: {
      

        pinnedNotesToShow() {
            let keeps = this.keepsToShow()
            let pinnedKeeps = keeps.filter(keep => (keep.settings.isPinned));
            return pinnedKeeps;
        },
        unpinnedNotesToShow() {
            let keeps = this.keepsToShow()
            let unpinnedKeeps = keeps.filter(keep => (!keep.settings.isPinned));
            return unpinnedKeeps
        }

    },
    components: {
        noteAdd,
        noteList,
        noteFilter
    }
}