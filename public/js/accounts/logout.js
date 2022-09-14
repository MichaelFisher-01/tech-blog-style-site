logout = document.querySelector('#logout');

//Triggers the logout route which will delete the current session.
const deleteSession = async () => {
	const sendLogout = await fetch('/api/account/logout', {
		method: 'POST',
		headers: { 'Const-Type': 'application/json' },
	});
	//If it was successful then send the user back to the homepage.
	if (sendLogout.ok) {
		document.location.replace('/');
	} else {
		alert(sendLogout.statusText);
	}
};

logout.addEventListener('click', deleteSession);
