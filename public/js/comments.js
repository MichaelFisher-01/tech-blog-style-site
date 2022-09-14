//Grabbing the submit button
const sendComment = document.querySelector('#createComment');

const createComment = async (event) => {
	event.preventDefault();
	//Grabbing the value from the form
	const comment = document.querySelector('#newComment');
	const commentText = comment.value.trim();
	const postId = comment.getAttribute('data-id');
	const btnData = document.querySelector('#submitComment');
	const commentCreator = btnData.getAttribute('data-id');
	console.log(`========================== ${commentText}`);
	if (commentText) {
		//Send the collected values to the create comment route
		const commentCreate = await fetch('/api/posts/createComment', {
			method: 'POST',
			body: JSON.stringify({
				comment: commentText,
				post_id: postId,
				commentCreator: commentCreator,
			}),
			headers: { 'Content-Type': 'application/json' },
		});
		//If the post is created successfuly redirect to the original post to display the new post to the user
		if (commentCreate.ok) {
			document.location.replace(`/comments/${postId}`);
		} else {
			//If is fails alert the user with a pop up.
			alert(commentCreate.statusText);
		}
	}
};

sendComment.addEventListener('submit', createComment);
