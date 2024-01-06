function vaiHome() {
	window.location.href = "homePage.html";
}

function vaiAlCarrello() {
	window.location.href = "carrello.html";
}

let carrello = [];

function aggiungiAlCarrello(id) {
	document.getElementById("contatoreCarrello").style.display = "flex";
	document.getElementById("contatoreCarrello").innerHTML = carrello.length;

	fetch(`https://fakestoreapi.com/products/${id}`)
		.then((response) => response.json())
		.then((data) => {
			carrello.push(data);

			console.log(carrello);

			document.getElementById("contatoreCarrello").style.display = "flex";
			document.getElementById("contatoreCarrello").innerHTML = carrello.length;
			localStorage.setItem("items", JSON.stringify(carrello));
		})
		.catch((err) => console.log(err));

	
	localStorage.setItem("items", JSON.stringify(carrello));
	
}

let carrelloAggiornato = JSON.parse(localStorage.getItem("items"));

window.addEventListener("load", function () {
	if (window.location.href.includes("carrello.html")) {
		console.log("sono nel carrello");

		for (let i = 0; i < carrelloAggiornato.length; i++) {
			let div = document.createElement("div");

			div.classList.add("infoCarrello");

			let titolo = carrelloAggiornato[i].title;
			let prezzo = carrelloAggiornato[i].price;
			let immagine = carrelloAggiornato[i].image;
	
			div.innerHTML = `<div id="imgProdCarrello">
                    <img id="imgCarrello" src="${immagine}" alt="">
                </div>
                <div id="nomeProdCarrello">
                    <h3 id="titoloProdotto">${titolo}</h3>
                </div>
                <div id="prezzoProdCarrello">
                    <h3 id="prezzoProdotto">${prezzo}</h3>
                </div>`;

			document.getElementById("containerProdottiCarrello").appendChild(div);
			
		}	

			let svuota = document.getElementById("svuotaCarrello")
			let container = document.getElementById("containerProdottiCarrello")
			svuota.addEventListener('click', function () {
				localStorage.clear()
				while (container.firstChild) {
					container.removeChild(container.firstChild)
				}
			})
		
	}
});

function checkout() {
	document.getElementById("acquistoEffettuato").style.display = "flex";
	localStorage.clear()
}

