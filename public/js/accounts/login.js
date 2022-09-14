submitLogin = document.querySelector('#loginForm');

const authLogin = async (event) => {
	event.preventDefault();
	//Grabbing the values from the inputs tied to username and password
	const userName = document.querySelector('#loginName').value.trim();
	const password = document.querySelector('#loginPass').value.trim();
	//Checking if the values were not left empty
	if (userName && password) {
		//Send a request to our routes with the data collected
		const loginCheck = await fetch('/api/account/login', {
			method: 'POST',
			body: JSON.stringify({ userName, password }),
			headers: { 'Content-Type': 'application/json' },
		});
		// If the processe run by the route are successful the login information will get saved then re-route to this users dashbaord.
		if (loginCheck.ok) {
			document.location.replace('/dashboard');
		} else {
			//If the route fails then send a pop up letting the user know it failed.
			alert(loginCheck.statusText);
		}
	}
};

submitLogin.addEventListener('submit', authLogin);
