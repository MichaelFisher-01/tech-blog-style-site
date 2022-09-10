sendCreate = document.querySelector('#createForm');

const createAccount = async (event) => {
	event.preventDefault();

	const name = document.querySelector('#createName').value.trim();
	const pass = document.querySelector('#createPass').value.trim();

	if (name && pass) {
		const createRoute = await fetch('/api/account/create', {
			method: 'POST',
			body: JSON.stringify({ userName: name, password: pass }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (createRoute.ok) {
			document.location.replace('/login');
		} else {
			alert(createRoute.statusText);
		}
	}
};

sendCreate.addEventListener('submit', createAccount);
