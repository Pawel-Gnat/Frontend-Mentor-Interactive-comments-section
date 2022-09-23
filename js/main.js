import { createComment, createReply } from './comments.js'

const getData = async () => {
	let response = await fetch('./data.json')
	const data = await response.json()
	return data
}

const renderData = async () => {
	let dataArray = await getData()
	let allComments = dataArray.comments

	allComments.forEach(element => {
        let allReplies = element.replies
		createComment(element)

		allReplies.forEach(element => {
			// createReply(element)
			console.log(element)
		})
	})
}
renderData()

