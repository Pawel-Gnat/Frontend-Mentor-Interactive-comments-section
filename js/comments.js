const commentsContainer = document.querySelector('.comments-section')

export const createComment = comment => {
	const commentBox = document.createElement('div')
	commentBox.classList.add('comment-box')

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
    <div class="comment__content">${comment.content}</div>
    <div class="comment__score">
    <img src="./images/icon-plus.svg" alt="Add one point to comment score" class="comment__score--icon">
    <p class="comment__score--points">${comment.score}</p>
    <img src="./images/icon-minus.svg" alt="Subtract one point to comment score"
        class="comment__score--icon">
    </div>
    <div class="comment__react">
    <img src="./images/icon-reply.svg" alt="Reply to a comment">
    <p class="comment__react--reply">Reply</p>
    </div>
    `

	commentsContainer.append(commentBox)
	newComment.innerHTML = createdComment
	commentBox.append(newComment)
	commentBox.append(replyBox)
}

export const createReply = reply => {
	const newReply = document.createElement('reply')
	newReply.classList.add('reply')
	newReply.setAttribute('role', 'reply')

	const replyBox = `
    <div class="reply__user">
    <img src="${reply.user.image.png}" alt="Avatar of ${reply.user.username}" class="reply__user--image">
    <p class="reply__user--username">${reply.user.username}</p>
    </div>
    <div class="reply__data">
    <p class="reply__data--createdat">${reply.createdAt}</p>
    </div>
    <div class="reply__content">${reply.content}</div>
    <div class="reply__score">
    <img src="./images/icon-plus.svg" alt="Add one point to comment score" class="reply__score--icon">
    <p class="reply__score--points">${reply.score}</p>
    <img src="./images/icon-minus.svg" alt="Subtract one point to comment score"
        class="reply__score--icon">
    </div>
    <div class="reply__react">
    <img src="./images/icon-reply.svg" alt="Reply to a comment">
    <p class="reply__react--reply">Reply</p>
    </div>
    `
}