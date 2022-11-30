import * as commentsModule from './comments.js'

async function getData() {
	let response = await fetch('./data.json')
	let data = await response.json()
	let allComments = data.comments
	let currentUser = data.currentUser

	commentsModule.getUserInfo(currentUser)

	allComments.forEach(element => {
		commentsModule.renderComments(element)
	})
}
getData()
