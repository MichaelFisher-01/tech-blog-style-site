submitLogin = document.querySelector('#loginForm');
sendCreate = document.querySelector('#createForm');

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
			document.location.replace('/login');
		} else {
			alert(loginCheck.statusText);
		}
	}
};

const createAccount = async (event) => {
	event.preventDefault();

	const email = document.querySelector('#createEmail').value.trim();
	const name = document.querySelector('#createName').value.trim();
	const pass = document.querySelector('#createPass').value.trim();

	if (email && name && pass) {
		const createRoute = await fetch('/api/account/create', {
			method: 'POST',
			body: JSON.stringify({ userName: name, email: email, password: pass }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (createRoute.ok) {
			document.location.replace('/login');
		} else {
			alert(createRoute.statusText);
		}
	}
};

submitLogin.addEventListener('submit', authLogin);
sendCreate.addEventListener('submit', createAccount);
