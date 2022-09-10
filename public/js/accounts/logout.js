logout = document.querySelector('#logout');

const deleteSession = async () => {
	const sendLogout = await fetch('/api/account/logout', {
		method: 'POST',
		headers: { 'Const-Type': 'application/json' },
	});

	if (sendLogout.ok) {
		document.location.replace('/');
	} else {
		alert(sendLogout.statusText);
	}
};

logout.addEventListener('click', deleteSession);
