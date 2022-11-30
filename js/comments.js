const sendNewCommentBtn = document.querySelector('.btn--send')
const chatBox = document.querySelector('.chatbox')
let loggedUser = {}

export function getUserInfo(user) {
	loggedUser = {
		name: user.username,
		image: user.image.webp,
		displayImage: function () {
			displayLoggedUserImage(this.image)
		},
	}
}

setTimeout(() => {
	loggedUser.displayImage()
}, 500)

function displayLoggedUserImage(img) {
	const image = document.querySelector('.profile__user > img')
	image.src = img
}

export function renderComments(element) {
	const textbox = document.createElement('div')
	textbox.classList.add('textbox')

	const comment = document.createElement('div')
	comment.classList.add('comment')
	comment.setAttribute('role', 'comment')

	comment.innerHTML = createComment(element)
	textbox.append(comment)

	let replies = element.replies ?? false

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

function createComment({ content, createdAt, score, user, replyingTo }) {
	let image = user.image?.webp ?? loggedUser.image
	let name = user.username ?? loggedUser.name

	const commentData = `
    <div class="user-area">
        <figure>
          <img src="${image}" class="user-area__image image" alt="" aria-hidden="true">
          <figcaption class="user-area__username">${name}</figcaption>
        </figure>
		${markTheLoggedUser(name)}
        <span class="user-area__timestamp">${createdAt}</span>
    </div>
    <div class="text-area">
		${markTheAddressee(replyingTo)}
        <span class="text-area__content">${content}</span>
    </div>
    <form class="counter-area"> 
        <button type="button" class="counter-area__btn" aria-label="Add one point to a comment"><img src="./images/icon-plus.svg" alt="" aria-hidden="true"></button>
        <input class="counter-area__score" value="${score}" step="1" disabled></input>
        <button type="button" class="counter-area__btn" aria-label="Subtract one point to a comment"><img src="./images/icon-minus.svg" alt="" aria-hidden="true"></button>
    </form>
    <div class="action-area">
		${handleCommentButtons(name)}
    </div>
    `

	return commentData
}

function markTheAddressee(reply) {
	if (reply) {
		return `<span class="text-area__addressee">@${reply}</span>`
	} else {
		return ''
	}
}

function markTheLoggedUser(user) {
	if (user === loggedUser.name) {
		return `<span class="user-area__logged-user">you</span>`
	} else {
		return ''
	}
}

function handleCommentButtons(user) {
	if (user === loggedUser.name) {
		return `
		<button type="button" class="action-area__btn btn--delete" aria-label="Delete"><img src="./images/icon-delete.svg" alt="" aria-hidden="true">Delete</button> 
		
		<button type="button" class="action-area__btn btn--edit" aria-label="Edit"><img src="./images/icon-edit.svg" alt="" aria-hidden="true">Edit</button>
		`
	} else {
		return `<button type="button" class="action-area__btn btn--reply" aria-label="Reply"><img src="./images/icon-reply.svg" alt="" aria-hidden="true">Reply</button>`
	}
}

function createNewComment() {
	const textarea = document.querySelector('.profile__textarea')

	let newComment = {
		content: textarea.value,
		createdAt: 'now',
		score: 0,
		user: loggedUser.name,
		replyingTo: null,
	}

	renderComments(newComment)
	textarea.value = ''
}

sendNewCommentBtn.addEventListener('click', createNewComment)
