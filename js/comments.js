const sendNewCommentBtn = document.querySelector('#btn-send')
const chatBox = document.querySelector('.chatbox')
let loggedUser = {}
let text
let data
let score
let commentContainer
let parentOfCommentContainer
let replying

export function getUserInfo(user) {
	loggedUser = {
		name: user.username,
		image: user.image.webp,
		displayImage: function () {
			renderLoggedUserCommentHandler(this.image)
		},
	}
}

setTimeout(() => {
	loggedUser.displayImage()
}, 500)

function renderLoggedUserCommentHandler(img) {
	const image = document.querySelector('.profile__user > img')
	image.src = img
}

export function renderComments(element) {
	const textbox = document.createElement('div')
	textbox.classList.add('textbox')

	// const comment = document.createElement('div')
	// comment.classList.add('comment')
	// comment.setAttribute('role', 'comment')

	// comment.innerHTML = createComment(element, 'comment')
	// textbox.append(comment)
	textbox.append(createComment(element, 'comment'))

	let replies = element.replies ?? false

	if (replies.length > 0) {
		const replyArea = document.createElement('div')
		replyArea.classList.add('replyarea')
		textbox.append(replyArea)

		replies.forEach(rep => {
			// const reply = document.createElement('div')
			// reply.classList.add('reply')
			// reply.setAttribute('role', 'reply')

			// reply.innerHTML = createComment(rep, 'reply')
			// replyArea.append(reply)
			replyArea.append(createComment(rep, 'reply'))
		})
	}

	chatBox.append(textbox)
}

function createComment({ content, createdAt, score, user, replyingTo }, role) {
	let image = user?.image?.webp ?? loggedUser.image
	let name = user?.username ?? loggedUser.name

	const commentBox = document.createElement('div')
	commentBox.classList.add(role)
	commentBox.setAttribute('role', role)

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

	commentBox.innerHTML = commentData
	// return commentData
	return commentBox
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
	const textarea = document.querySelector('#comment')

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

function createLoggedUserCommentContainer(text, image, action) {
	let commentContainer = document.createElement('form')
	commentContainer.classList.add('profile')

	commentContainer.innerHTML = `
			<textarea type="text" id="comment" class="profile__textarea" placeholder="Add a comment..."
				role="textbox">${text}</textarea>
			<label for="comment" class="profile__label">Textarea for your own comment</label>
			<figure class="profile__user">
				<img src="${image}" class="profile__user-image image" alt="" aria-hidden="true">
			</figure>
			<button type="button" class="profile__btn btn--user btn--${action}" aria-label="${action}">${action}</button>
	`

	return commentContainer
}

function handleComment(e, action) {
	commentContainer = e.target.parentElement.parentElement
	parentOfCommentContainer = commentContainer.parentElement

	if (action === 'remove') {
		commentContainer.remove()
	}

	if (action === 'edit') {
		let allText = commentContainer.querySelector('.text-area').innerText
		replying = allText.split(' ').shift()
		text = allText
			.split(' ')
			.filter(word => word !== replying)
			.join(' ')
		data = commentContainer.querySelector('.user-area__timestamp').textContent
		score = commentContainer.querySelector('.counter-area__score').value

		commentContainer.remove()
		parentOfCommentContainer.append(createLoggedUserCommentContainer(text, loggedUser.image, 'update'))
	}
}

sendNewCommentBtn.addEventListener('click', createNewComment)

chatBox.addEventListener('click', e => {
	if (e.target.classList.contains('btn--delete')) {
		handleComment(e, 'remove')
	}

	if (e.target.classList.contains('btn--edit')) {
		handleComment(e, 'edit')
	}

	if (e.target.classList.contains('btn--reply')) {
		handleComment(e, 'reply')
	}

	if (e.target.classList.contains('btn--update')) {
		// createComment(text, data, score, loggedUser, replyingTo)
		parentOfCommentContainer.append(createComment(text, data, score, loggedUser, replying))
	}
})
