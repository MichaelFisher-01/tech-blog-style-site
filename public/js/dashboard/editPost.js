//Grabbing the two button options to setup different processe for each
const editPost = document.querySelector('#editPost');
const deleteBtn = document.querySelector('#deletePost');

const changePost = async (event) => {
	event.preventDefault();
	//Grabbing the new data from the inputs
	const title = document.querySelector('#editTitle').value.trim();
	const content = document.querySelector('#editContent').value.trim();
	// Passing in the post id from the edit page.
	const btnData = document.querySelector('#update');
	const id = btnData.getAttribute('data-id');
	// If nothing is left empty then send the data  to the edit post route.
	if (title && content) {
		const editedPost = await fetch(`/api/posts/edit/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ title: title, postBody: content }),
			headers: { 'Content-Type': 'application/json' },
		});
		//If the route is successful then redirect back to the main dashboard to reload users posts
		if (editedPost.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(editedPost.statusText);
		}
	}
};
// If the delete button is pressed perfom slightly different tasks
const deletePost = async (event) => {
	event.preventDefault();
	//Get the specific post number from from the stored information within this button
	const btnData = document.querySelector('#deletePost');
	const id = btnData.getAttribute('data-id');
	//Send that post id to the delete route to the correct post is deleted.
	const deletion = await fetch(`/api/posts/delete/${id}`, {
		method: 'DELETE',
	});
	//If successful redirect to the dashboard so the user can see it is gone.
	if (deletion.ok) {
		document.location.replace('/dashboard');
	} else {
		alert('Failed to delete the post');
	}
};

editPost.addEventListener('submit', changePost);
deleteBtn.addEventListener('click', deletePost);
