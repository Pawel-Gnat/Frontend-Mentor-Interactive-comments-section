// const commentsContainer = document.querySelector('.comments-area')
const chatBox = document.querySelector('.chatbox')
let loggedUser = {}

export function getUserInfo(user) {
	loggedUser = {
		name: user.username,
		image: user.image.webp,
	}
}

export function renderComments(element) {
	const textbox = document.createElement('div')
	textbox.classList.add('textbox')

	const comment = document.createElement('div')
	comment.classList.add('comment')
	comment.setAttribute('role', 'comment')

	comment.innerHTML = createComment(element)
	textbox.append(comment)

	let replies = element.replies

	if (replies.length > 0) {
		const replyArea = document.createElement('div')
		replyArea.classList.add('replyarea')
		textbox.append(replyArea)

		replies.forEach(rep => {
			const reply = document.createElement('div')
			reply.classList.add('reply')
			reply.setAttribute('role', 'reply')

			reply.innerHTML = createComment(rep)
			replyArea.append(reply)
		})
	}

	chatBox.append(textbox)
}

function createComment({ content, createdAt = now, score = 0, user, replyingTo }) {
	const commentData = `
    <div class="user-area">
        <figure>
          <img src="${user.image.webp}" class="user-area__image" alt="" aria-hidden="true">
          <figcaption class="user-area__username">${user.username}</figcaption>
        </figure>
		${checkIfCommentIsFromLoggedUser(user)}
        <span class="user-area__timestamp">${createdAt}</span>
    </div>
    <div class="text-area">
		${checkIfCommentIsAReply(replyingTo)}
        <span class="text-area__content">${content}</span>
    </div>
    <form class="counter-area"> 
        <button type="button" class="counter-area__btn" aria-label="Add one point to a comment"><img src="./images/icon-plus.svg" alt="" aria-hidden="true"></button>
        <input class="counter-area__score" value="${score}" step="1" disabled></input>
        <button type="button" class="counter-area__btn" aria-label="Subtract one point to a comment"><img src="./images/icon-minus.svg" alt="" aria-hidden="true"></button>
    </form>
    <div class="action-area">
        <button type="button" class="action-area__btn btn--reply" aria-label="Reply"><img src="./images/icon-reply.svg" alt="" aria-hidden="true">Reply</button>
    </div>
    `

	return commentData
}

function checkIfCommentIsAReply(reply) {
	if (reply) {
		return `<span class="text-area__addressee">@${reply}</span>`
	} else {
		return ''
	}
}

function checkIfCommentIsFromLoggedUser(user) {
	if (user.username === loggedUser.name) {
		return `<span class="user-area__logged-user">you</span>`
	} else {
		return ''
	}
}

// export const displayComments = comment => {
// 	const replyBox = document.createElement('div')
// 	replyBox.classList.add('reply-box')

// 	const newComment = document.createElement('div')
// 	newComment.classList.add('comment')
// 	newComment.setAttribute('role', 'comment')

// 	const createdComment = `
//     <figure class="comment__user">
//     <img src="${comment.user.image.png}" alt="Avatar of ${comment.user.username}" class="comment__user--image">
//     <figcaption class="comment__user--username">${comment.user.username}</figcaption>
//     </figure>
//     <div class="comment__data">
//     <p class="comment__data--createdat">${comment.createdAt}</p>
//     </div>
//     <div class="comment__content"><span class="comment__content--text">${comment.content}</span></div>
//     <div class="comment__score">
//     <button class="comment__score--icon"><img src="./images/icon-plus.svg" alt="Add one point to comment score"></button>
//     <p class="comment__score--points">${comment.score}</p>
//     <button class="comment__score--icon"><img src="./images/icon-minus.svg" alt="Subtract one point to comment score"></button>
//     </div>
//     <div class="comment__react">
//     <button class="comment__react--reply-btn reply-btn"><img src="./images/icon-reply.svg" alt="Reply to a comment">Reply</button>
//     </div>
//     `

// 	newComment.innerHTML = createdComment
// 	commentsContainer.append(newComment)
// 	commentsContainer.append(replyBox)
// }

// export const displayReplies = reply => {
// 	const newReply = document.createElement('div')
// 	newReply.classList.add('reply')
// 	newReply.setAttribute('role', 'reply')
// 	const createdReplyBox = Array.from(document.getElementsByClassName('reply-box'))

// 	const createdReply = `
//     <figure class="reply__user">
//     <img src="${reply.user.image.png}" alt="Avatar of ${reply.user.username}" class="reply__user--image">
//     <figcaption class="reply__user--username">${reply.user.username}</figcaption>
//     </figure>
//     <div class="reply__data">
//     <p class="reply__data--createdat">${reply.createdAt}</p>
//     </div>
//     <div class="reply__content"><span class="reply__content--reply-to">@${reply.replyingTo}</span> <span class="reply__content--text">${reply.content}</span></div>
//     <div class="reply__score">
//     <button class="reply__score--icon"><img src="./images/icon-plus.svg" alt="Add one point to reply score"></button>
//     <p class="reply__score--points">${reply.score}</p>
//     <button class="reply__score--icon"><img src="./images/icon-minus.svg" alt="Subtract one point to reply score"></button>
//     </div>
//     <div class="reply__react">
//     <button class="reply__react--reply-btn reply-btn"><img src="./images/icon-reply.svg" alt="Reply to a comment">Reply</button>
//     </div>
//     `

// 	newReply.innerHTML = createdReply

// 	createdReplyBox.forEach(box => {
// 		if (box.hasChildNodes()) {
// 			box.style.display = 'flex'
// 		} else {
// 			box.style.display = 'none'
// 		}
// 		box.append(newReply)
// 	})
// }

// export const createComment = (image, username) => {
// 	const newComment = document.createElement('div')
// 	newComment.classList.add('comment')
// 	newComment.setAttribute('role', 'comment')

// 	const inputText = document.querySelector('.comments-profile__textarea--input')
// 	let commentValue = inputText.value

// 	const createdComment = `
//     <figure class="comment__user">
//     <img src="${image.png}" alt="Avatar of ${username}" class="comment__user--image">
//     <figcaption class="comment__user--username">${username}</figcaption>
//     <span class="comment__user--you">you</span>
//     </figure>
//     <div class="comment__data">
//     <p class="comment__data--createdat">now</p>
//     </div>
//     <div class="comment__content"><span class="comment__content--text">${commentValue}</span></div>
//     <div class="comment__score">
//     <button class="comment__score--icon"><img src="./images/icon-plus.svg" alt="Add one point to comment score"></button>
//     <p class="comment__score--points">0</p>
//     <button class="comment__score--icon"><img src="./images/icon-minus.svg" alt="Subtract one point to comment score"></button>
//     </div>
//     <div class="comment__react">
//     <button class="comment__react--delete-btn"><img src="./images/icon-delete.svg" alt="Delete comment">Delete</button>
//     <button class="comment__react--edit-btn"><img src="./images/icon-edit.svg" alt="Edit comment">Edit</button>
//     </div>
//     `

// 	newComment.innerHTML = createdComment
// 	commentsContainer.append(newComment)
// }

// export const createReply = image => {
// 	const newReply = document.createElement('div')
// 	newReply.classList.add('reply')
// 	newReply.setAttribute('role', 'reply')

// 	const createdReplyBox = Array.from(document.getElementsByClassName('reply-box'))

// 	const createdReply = `
//     <form class="comments-profile">
//     <div class="comments-profile__textarea">
//     <textarea type="text" id="comment" class="comments-profile__textarea--input"></textarea>
//     </div>
//     <figure class="comments-profile__user">
//     <img src="${image.png}" class="comments-profile__user--image">
//     </figure>
//     <div class="comments-profile__react">
//     <button type="button" class="comments-profile__react--btn">reply</button>
//     </div>
//     </form>
//     `

// 	newReply.innerHTML = createdReply

// 	createdReplyBox.forEach(box => {
// 	box.append(newReply)
// 	})
// }
