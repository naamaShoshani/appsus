import { myRouter } from './routes.js'

new Vue({
	el: "#app",
	router: myRouter,
	template: `
    <div>

        <header class="app-header">

<nav class="nav-bar">
      
        <router-link to="/" class="unlogo">Uri && Na<span class="logo-slash">\\'</span>ama</router-link>
        
<ul class="nav-links">

        <li>        <router-link to='/email/inbox'>Email</router-link>
        </li>
        <li>        <router-link to='/keep'>Keep</router-link>
        </li>
        <li>        <router-link to='/books'>Books</router-link>
        </li>
        </ul?

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