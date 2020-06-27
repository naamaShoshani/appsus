'use strict'

import myRouter from '../../../main-app/js/routes.js'
const appRouter = new VueRouter({ routes: myRouter })


var app = new Vue({
    el: '#app',
    created() {
        console.log('App has been Created!');
    },
    template: `
        <div>  
            <router-view></router-view>

        </div>
    `,

    methods: {
    },
    router: appRouter
})