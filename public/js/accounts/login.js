submitLogin = document.querySelector('#loginForm');

const authLogin = async (event) => {
	event.preventDefault();

	const userName = document.querySelector('#loginName').value.trim();
	const password = document.querySelector('#loginPass').value.trim();

	if (userName && password) {
		const loginCheck = await fetch('/api/account/login', {
			method: 'POST',
			body: JSON.stringify({ userName, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (loginCheck.ok) {
			console.log('Login Succesful');
			document.location.replace('/dashboard');
		} else {
			alert(loginCheck.statusText);
		}
	}
};

submitLogin.addEventListener('submit', authLogin);
