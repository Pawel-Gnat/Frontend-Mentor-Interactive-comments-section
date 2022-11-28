import * as commentsModule from './comments.js'

// const sendNewCommentBtn = document.querySelector('.comments-profile__react--btn')
// const replyBtns = Array.from(document.getElementsByClassName('reply-btn'))

// replyBtns.forEach(btn => {
// 	btn.addEventListener('click', e => console.log('lol'))
// })

async function getData() {
	let response = await fetch('./data.json')
	let data = await response.json()
	let allComments = data.comments

	allComments.forEach(element => {
		commentsModule.renderComments(element)
	})
}
getData()

// const getData = async () => {
// 	let response = await fetch('./data.json')
// 	const data = await response.json()
// 	// console.log(data);
// 	return data
// }

// const renderData = async () => {
// let dataArray = await getData()
// let allComments = dataArray.comments
// let currentUser = dataArray.currentUser
// const { image, username } = currentUser

// allComments.forEach(element => {
// 	let allReplies = element.replies
// 	commentsModule.displayComments(element)

// 	allReplies.forEach(element => {
// 		commentsModule.displayReplies(element)
// 	})
// })

// sendNewCommentBtn.addEventListener('click', e => {
// 	let inputText = document.querySelector('.comments-profile__textarea--input').value

// 	if (inputText == '') {
// 		window.alert("Text area can't be empty")
// 	} else {
// 		commentsModule.createComment(image, username)
// 	}
// })
// }
// renderData()
