import * as commentsModule from './comments.js'

const sendNewCommentBtn = document.querySelector('.comments-profile__react--btn')
const repliesBox = document.getElementsByClassName('reply-box')

const getData = async () => {
	let response = await fetch('./data.json')
	const data = await response.json()
	return data
}

const renderData = async () => {
	let dataArray = await getData()
	let allComments = dataArray.comments
	let currentUser = dataArray.currentUser
	const { image, username } = currentUser

	allComments.forEach(element => {
		let allReplies = element.replies
		commentsModule.displayComments(element)

		allReplies.forEach(element => {
			commentsModule.displayReplies(element)
		})
	})

	sendNewCommentBtn.addEventListener('click', e => {
		let inputText = document.querySelector('.comments-profile__textarea--input').value

		if (inputText == '') {
			window.alert("Text area can't be empty")
		} else {
			commentsModule.createComment(image, username)
			inputText = ''
			// console.log(inputText)
		}
	})
}
renderData()


// handle margin if reply-box is empty
