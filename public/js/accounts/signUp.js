sendCreate = document.querySelector('#createForm');

const createAccount = async (event) => {
	event.preventDefault();
	//Grabbing the values fro mthe form
	const name = document.querySelector('#createName').value.trim();
	const pass = document.querySelector('#createPass').value.trim();
	//As long as the values are not empty then we send to the routes and create a user
	if (name && pass) {
		const createUser = await fetch('/api/account/create', {
			method: 'POST',
			body: JSON.stringify({ userName: name, password: pass }),
			headers: { 'Content-Type': 'application/json' },
		});
		//If the creation route is successful redirect to this users dashboard
		if (createUser.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(createUser.statusText);
		}
	}
};

sendCreate.addEventListener('submit', createAccount);
