//Grabbing the submit button
const sendPost = document.querySelector('#createPost');

const createPost = async (event) => {
	event.preventDefault();
	//Grabbing the values from the form
	const title = document.querySelector('#title').value.trim();
	const content = document.querySelector('#content').value.trim();

	if (title && content) {
		//Send the collected values to the create post route.
		const post = await fetch('/api/posts/create', {
			method: 'POST',
			body: JSON.stringify({ title: title, postBody: content }),
			headers: { 'Content-Type': 'application/json' },
		});
		//If the post is created successfuly redirect to the dashboard to display the new post to the user
		if (post.ok) {
			document.location.replace('/dashboard');
		} else {
			//If is fails alert the user with a pop up.
			alert(post.statusText);
		}
	}
};

sendPost.addEventListener('submit', createPost);
