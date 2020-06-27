
import noteActionBar  from './keep-actions.cmp.js'
import noteEdit  from './keep-edit.cmp.js'

// Imports done ^

export default {
	
	template: `
		<section 
			:style="{'background-color': keep.bgColor }">
			<img :src="keep.data.src" width="100%"/>
            <note-action-bar :keep="keep" :noteTypesInfo="noteTypesInfo"  ></note-action-bar>
            <note-edit :keep="keep" v-if="keep.settings.editMode"></note-edit>
		</section>
	`,
    props:['keep','noteTypesInfo'],
    created(){        
    },
    methods: {
       
    },
    components:{
        noteActionBar,
        noteEdit
    }
}