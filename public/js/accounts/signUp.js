sendCreate = document.querySelector('#createForm');

const createAccount = async (event) => {
	event.preventDefault();

	const name = document.querySelector('#createName').value.trim();
	const pass = document.querySelector('#createPass').value.trim();

	if (name && pass) {
		const createUser = await fetch('/api/account/create', {
			method: 'POST',
			body: JSON.stringify({ userName: name, password: pass }),
			headers: { 'Content-Type': 'application/json' },
		});
		console.log('=============================' + createUser);
		if (createUser.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(createUser.statusText);
		}
	}
};

sendCreate.addEventListener('submit', createAccount);
