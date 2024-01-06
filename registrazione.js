function vaiHome() {
	window.location.href = "homePage.html";
}

function registrati() {
	let nomeCompleto = document.getElementById("inputNomeCompleto").value;
	let username = document.getElementById("inputUsername").value;
	let email = document.getElementById("inputEmail").value;
	let password = document.getElementById("inputPassword").value;

	fetch("https://dummyjson.com/users/add", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			firstName: nomeCompleto,
			email: email,
			password: password,
			username: username,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

			localStorage.setItem("user", JSON.stringify(data));

			window.location.href = "homePage.html";

		});
}
