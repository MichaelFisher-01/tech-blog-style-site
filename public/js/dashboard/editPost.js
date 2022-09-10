const editPost = document.querySelector('#editPost');
const deleteBtn = document.querySelector('#deletePost');

const changePost = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#editTitle').value.trim();
	const content = document.querySelector('#editContent').value.trim();
	// Passing in the post id from the edit page.
	const btnData = document.querySelector('#update');
	const id = btnData.getAttribute('data-id');

	if (title && content) {
		const editedPost = await fetch(`/api/posts/edit/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ title: title, postBody: content }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (editedPost.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(editedPost.statusText);
		}
	}
};

const deletePost = async (event) => {
	event.preventDefault();

	const btnData = document.querySelector('#deletePost');
	const id = btnData.getAttribute('data-id');

	const deletion = await fetch(`/api/posts/delete/${id}`, {
		method: 'DELETE',
	});

	if (deletion.ok) {
		document.location.replace('/dashboard');
	} else {
		alert('Failed to delete the post');
	}
};

editPost.addEventListener('submit', changePost);
deleteBtn.addEventListener('click', deletePost);
