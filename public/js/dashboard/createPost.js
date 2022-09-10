const sendPost = document.querySelector('#createPost');

const createPost = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#title').value.trim();
	const content = document.querySelector('#content').value.trim();

	if (title && content) {
		const post = await fetch('/api/posts/create', {
			method: 'POST',
			body: JSON.stringify({ title: title, postBody: content }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (post.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(post.statusText);
		}
	}
};

sendPost.addEventListener('submit', createPost);
