'use strict'

export default {
    template: `
        <section class="app-sort">
            <div class="sorters">
                <select v-model="sortBy.by">
                    <option>Sort by Date / Subject</option>
                    <option>Date</option>
                    <option>Subject</option>
                </select>
                <select v-model="sortBy.op">
                    <option>+</option>
                    <option>-</option>
                </select>
            </div>
        </section>
    `,

    data() {
        return {
            sortBy: {by: 'Sort by Date / Subject', op: '-'}
        }
    },

    computed: {
        byToEmit() {
            let str = this.sortBy.by;
            str = str.slice(0,1).toLowerCase() + str.slice(1,str.length);
            let spaceIdx = str.indexOf(' ');
            return (spaceIdx !== -1)? str.slice(0,spaceIdx) + str.slice(spaceIdx+1,str.length) : str;
        }
    },

    watch: { 
        'sortBy': {
            handler: function(sorter) {
                this.$emit('sorted', {by: this.byToEmit, op: sorter.op});
           },
           immediate: true,
           deep: true
         },
   },


}