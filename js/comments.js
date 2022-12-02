const sendNewCommentBtn = document.querySelector('#btn-send')
const chatBox = document.querySelector('.chatbox')
const commentModalWindow = document.querySelector('#comment-delete')
const body = document.querySelector('body')
let loggedUser = {}
let createdAt
let score
let commentContainer
let parentOfCommentContainer
let replyingTo
let role
let replyArea

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

	textbox.append(createComment(element, 'comment'))

	let replies = element.replies

	if (replies) {
		const replyArea = document.createElement('div')
		replyArea.classList.add('replyarea')
		textbox.append(replyArea)

		replies.forEach(rep => {
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
    <div class="text-area text">
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
	role = commentContainer.getAttribute('role')

	if (action === 'remove') {
		commentModalWindow.showModal()
		body.classList.add('scroll-block')
	}

	if (action === 'edit') {
		let author = commentContainer.querySelector('figcaption').textContent
		let allText = commentContainer.querySelector('.text-area').innerText
		let replying = allText.split(' ').shift()
		replyingTo = allText.split(' ').shift().slice(1)
		let oldContent = allText
			.split(' ')
			.filter(word => word !== replying)
			.join(' ')

		if (commentContainer.getAttribute('role') === 'comment') {
			oldContent = allText
			replyingTo = null
		}

		createdAt = commentContainer.querySelector('.user-area__timestamp').textContent
		score = commentContainer.querySelector('.counter-area__score').value

		commentContainer.remove()
		parentOfCommentContainer.append(createLoggedUserCommentContainer(oldContent, loggedUser.image, 'update'))
	}

	if (action === 'reply') {
		replyingTo = commentContainer.querySelector('figcaption').textContent
		replyArea = parentOfCommentContainer
		role = 'reply'

		if (commentContainer.getAttribute('role') === 'comment') {
			replyArea = commentContainer.nextElementSibling
		}

		replyArea.append(createLoggedUserCommentContainer('', loggedUser.image, 'reply'))
	}
}

sendNewCommentBtn.addEventListener('click', createNewComment)

chatBox.addEventListener('click', e => {
	if (e.target.type !== 'button') {
		return
	}

	let parent = e.target.parentElement
	let content = parent.firstElementChild.value

	if (e.target.classList.contains('btn--delete')) {
		handleComment(e, 'remove')
	}

	if (e.target.classList.contains('btn--edit')) {
		handleComment(e, 'edit')
	}

	if (e.target.classList.contains('btn--reply') && !e.target.classList.contains('btn--user')) {
		handleComment(e, 'reply')
	}

	if (e.target.classList.contains('btn--update')) {
		parentOfCommentContainer.append(createComment({ content, createdAt, score, loggedUser, replyingTo }, role))
		parent.remove()
	}

	if (e.target.classList.contains('btn--reply') && e.target.classList.contains('btn--user')) {
		replyArea.append(createComment({ content, createdAt: 'now', score: 0, loggedUser, replyingTo }, role))
		parent.remove()
	}
})

commentModalWindow.addEventListener('click', e => {
	if (e.target.type === 'button') {
		commentModalWindow.close()
		body.classList.remove('scroll-block')
	}

	if (e.target.classList.contains('btn--modal-delete')) {
		commentContainer.remove()
	}
})
