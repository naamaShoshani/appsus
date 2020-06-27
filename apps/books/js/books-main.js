import appHeader from '../../books/js/cpms/books-header.cmp.js'
// import theRoutes from './routes.js'
// import myRouter from '../../../main-app/js/routes.js'
import myRouter from '../../../main-app/js/routes.js'



const myRouter = new VueRouter({ routes: theRoutes })


new Vue({
    el: '#app',
    template:`
        <div>
            <router-view></router-view>
        </div>

    `
    ,components: {
            appHeader
    },
    router: myRouter
})
