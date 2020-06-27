import noteActionBar  from './keep-actions.cmp.js'
import noteEdit  from './keep-edit.cmp.js'

// Imports done ^^

import {bus,MARK_TODO_DONE,DELETE_TODO} from '../services/keep-event-bus-service.js'


export default {
    template: `
        <section
			:style="{'background-color': keep.bgColor}">
			<ul>
                <li  v-for="(todo, idx) in keep.data.todos"
                    class="todo clean-list flex space-between"
                    :class="isDone(todo)"
                    :key="todo.idx"
                    @click="markDone(keep._id,idx)">
                    {{todo.text}} 
                    <button class="deleteTodoBtn" @click.stop="deleteTodo(keep._id,idx)"> <i class="fas fa-times"></i></button>
				</li>
			</ul>
            <note-action-bar :keep="keep"  :noteTypesInfo="noteTypesInfo" ></note-action-bar>
            <note-edit :keep="keep" v-if="keep.settings.editMode"></note-edit>
		</section>
    `,
    props: ['keep','noteTypesInfo'],
    methods: {
        markDone(keepId, todoIdx) {  
            bus.$emit(MARK_TODO_DONE, keepId, todoIdx);
        },
        isDone(todo) {
            return todo.completed ? 'completed' : '';
        },
        deleteTodo(keepId,todoIdx){
          bus.$emit(DELETE_TODO, keepId, todoIdx);
          
        }
    },
    created() {
        return {

        }
    },
    computed: {

    },
    components:{
        noteActionBar,
        noteEdit
    }

}