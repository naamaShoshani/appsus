"use strict";

import homePageCmp from '../../main-app/js/home-page-cmp.js'

import keepApp from '../../apps/keep/js/pages/keep-app-cmp.js'

import emailApp from '../../apps/email/js/pages/email-app.cmp.js'
import emailDetails from '../../apps/email/js/cmps/email-details.cmp.js'
import emailList from '../../apps/email/js/cmps/email-list.cmp.js'

import booksApp from '../../apps/books/js/pages/books-app.cmp.js'
import bookDetails from '../../apps/books/js/pages/book-details.cmp.js'

const myRoutes = [

	{ path: "/", component: homePageCmp },
	{ path: "/keep", component: keepApp },
	{ path: "/books", component: booksApp },
	{ path: "/book/:bookId", component: bookDetails },
	{
		path: "/email",
		component: emailApp, 
		children: [
			{ path: "inbox", component: emailList, props: { filter: "inbox" } },
			{ path: "starred", component: emailList, props: { filter: "starred" } },
			{ path: "drafts", component: emailList, props: { filter: "drafts" } },
			{ path: "sent", component: emailList, props: { filter: "sent" } },
			{ path: ":theEmailId", component: emailDetails },
		],
	},
];

export const myRouter = new VueRouter({ routes: myRoutes });
