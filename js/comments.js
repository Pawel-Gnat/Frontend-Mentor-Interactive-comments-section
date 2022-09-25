const commentsContainer = document.querySelector('.comments-area')

export const createComment = comment => {
	const replyBox = document.createElement('div')
	replyBox.classList.add('reply-box')

	const newComment = document.createElement('div')
	newComment.classList.add('comment')
	newComment.setAttribute('role', 'comment')

	const createdComment = `
    <div class="comment__user">
    <img src="${comment.user.image.png}" alt="Avatar of ${comment.user.username}" class="comment__user--image">
    <p class="comment__user--username">${comment.user.username}</p>
    </div>
    <div class="comment__data">
    <p class="comment__data--createdat">${comment.createdAt}</p>
    </div>
    <div class="comment__content"><span class="comment__content--text">${comment.content}</span></div>
    <div class="comment__score">
    <button class="comment__score--icon"><img src="./images/icon-plus.svg" alt="Add one point to comment score"></button>
    <p class="comment__score--points">${comment.score}</p>
    <button class="comment__score--icon"><img src="./images/icon-minus.svg" alt="Subtract one point to comment score"></button>
    </div>
    <div class="comment__react">
    <button class="comment__react--btn"><img src="./images/icon-reply.svg" alt="Reply to a comment">Reply</button>
    </div>
    `

	newComment.innerHTML = createdComment
	commentsContainer.append(newComment)
	commentsContainer.append(replyBox)
}

export const createReply = reply => {
	const newReply = document.createElement('div')
	newReply.classList.add('reply')
	newReply.setAttribute('role', 'reply')
	const createdReplyBox = Array.from(document.getElementsByClassName('reply-box'))

	const createdReply = `
    <div class="reply__user">
    <img src="${reply.user.image.png}" alt="Avatar of ${reply.user.username}" class="reply__user--image">
    <p class="reply__user--username">${reply.user.username}</p>
    </div>
    <div class="reply__data">
    <p class="reply__data--createdat">${reply.createdAt}</p>
    </div>
    <div class="reply__content"><span class="reply__content--reply-to">@${reply.replyingTo}</span> <span class="reply__content--text">${reply.content}</span></div>
    <div class="reply__score">
    <button class="reply__score--icon"><img src="./images/icon-plus.svg" alt="Add one point to reply score"></button>
    <p class="reply__score--points">${reply.score}</p>
    <button class="reply__score--icon"><img src="./images/icon-minus.svg" alt="Subtract one point to reply score"></button>
    </div>
    <div class="reply__react">
    <button class="reply__react--btn"><img src="./images/icon-reply.svg" alt="Reply to a comment">Reply</button>
    </div>
    `

	newReply.innerHTML = createdReply

	createdReplyBox.forEach(box => {
		box.append(newReply)
	})
}
