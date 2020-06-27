'use strict'

export default {
	template: `
        <p class="email-nav">
            <button class="fas fa-pen round-btn" @click="emitOpenCompose"></button>
            <ul class="email-nav-list">
                <li><router-link exact to="/email/inbox"><span :class="{'theresUnread': (counters.unread) > 0}">Inbox<span v-if="counters"> ({{counters.unread}}/{{counters.total}})</span></span></router-link></li>
                <li><router-link exact to="/email/starred">Starred<span v-if="counters"> ({{counters.starred}})</span></router-link></li>
                <li><router-link exact to="/email/sent">Sent<span v-if="counters"> ({{counters.sent}})</span></router-link></li>
                <li><router-link exact to="/email/drafts">Drafts<span v-if="counters"> ({{counters.draft}})</span></router-link></li>
            </ul>
        </p>
    `,

	props: ["counters"],

	methods: {
		emitOpenCompose() {
			this.$emit("openCompose");
		},
	},
};
