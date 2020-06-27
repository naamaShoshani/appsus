import { myRouter } from './routes.js'

new Vue({
	el: "#app",
	router: myRouter,
	template: `
    <div>
        <header class="app-header">
        <router-link class="logo" :to="'/'" > </router-link>

            <nav class="nav-bar">


                
                <router-link to="/" class="home-btn">Home</router-link>
                <!-- <router-link to="/" class="home-btn" exact>Home</router-link> -->
                <router-link to='/email/inbox'>Email</router-link>
                <router-link to='/keep'>Keep</router-link>
                <router-link to='/books'>Books</router-link>
            </nav>
                
              
        </header>

        <main>
            <router-view/>
        </main>

        <!-- footer -->
        
    </div>
    `,
	components: {
		// navBar,
	},
});
