import noteVideo from './keep-video.cmp.js'
import noteText from './keep-text.cmp.js'
import noteTodo from './keep-todo.cmp.js'
import noteAudio from './keep-audio.cmp.js'
import noteImg from './keep-img.cmp.js'

// Imports done ^^


export default {
    template: `
        <section class="note-list masonry container" >
                <component 
                v-for="(keep,idx) in keeps"
                :key="idx"
                :is="keep.settings.type" 
                :keep="keep" 
                :noteTypesInfo="noteTypes[keep.settings.type]"
                class="note ui-box"></component>

        </section>
        `,
    props: ['keeps','noteTypes'],
    created(){
       
        
    },
    components: {
        noteText,
        noteVideo,
        noteTodo,
        noteImg,
        noteAudio
    }
}