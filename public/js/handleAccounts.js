const authLogin = async (event) => {
	event.preventDefault();

	const userName = document.querySelector('#loginName').value.trim();
	const password = document.querySelector('#loginPass').value.trim();

	if (userName && password) {
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({ userName, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			console.log('Login Succesful');
			document.location.reload();
		} else {
			alert(response.statusText);
		}
	}
};
