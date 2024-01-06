function vaiRegistrazione() {
	window.location.href = "registrazione.html";
}

function vaiHome() {
	window.location.href = "homePage.html";
}

function cercaNelCatalogo() {
	let categoria = document.getElementById("inputCategoria").value;
	let prezzo = document.getElementById("inputPrezzo").value;
	let nome = document.getElementById("inputNome").value;

	window.location.href = `catalogo.html?categoria=${categoria}&prezzo=${prezzo}&nome=${nome}`;
}

window.addEventListener("load", function () {
	if (window.location.href.includes("catalogo.html")) {
		let url = new URL(window.location.href);

		let prezzo = url.searchParams.get("prezzo");
		let nome = url.searchParams.get("nome");
		let categoria = url.searchParams.get("categoria");

		let limiteInferiore;
		let limiteSuperiore;

		if (prezzo == "0-100") {
			limiteInferiore = 0;
			limiteSuperiore = 100;
		} else if (prezzo == "100-200") {
			limiteInferiore = 100;
			limiteSuperiore = 200;
		} else if (prezzo == "200-500") {
			limiteInferiore = 200;
			limiteSuperiore = 500;
		} else if (prezzo == "500-1000") {
			limiteInferiore = 500;
			limiteSuperiore = 1000;
		}

		filtraProdotti(nome, categoria, limiteInferiore, limiteSuperiore);
	
	} else if (this.window.location.href.includes("prodotto.html")) {
		let url = new URL(window.location.href);
		let idProdotto = url.searchParams.get("idProdotto");

		ottieniProdotto(idProdotto);
	}
});

function filtraProdotti(nome, categoria, limiteInferiore, limiteSuperiore) {
	fetch("https://fakestoreapi.com/products")
		.then((res) => res.json())
        .then((data) => {
            document.getElementById("loading").style.opacity = "0";
            setTimeout(function () {
        
                document.getElementById("loading").style.display = "none";

                let prodotti = data;

                prodotti = data.filter((prodotto) => {
                    if (limiteSuperiore != undefined && nome != "" && categoria != "") {
                        return (
                            prodotto.price >= limiteInferiore &&
                            prodotto.price < limiteSuperiore &&
                            prodotto.title.startsWith(nome) &&
                            prodotto.category == categoria
                        );
                    } else if (
                        limiteSuperiore == undefined &&
                        nome != "" &&
                        nome != undefined &&
                        categoria != ""
                    ) {
                        return (
                            prodotto.price >= limiteInferiore &&
                            prodotto.title.startsWith(nome) &&
                            prodotto.category == categoria
                        );
                    } else if (
                        limiteSuperiore == undefined &&
                        nome == "" &&
                        categoria != ""
                    ) {
                        return (
                            prodotto.price >= limiteInferiore && prodotto.category == categoria
                        );
                    } else if (
                        limiteSuperiore == undefined &&
                        nome != "" &&
                        categoria == ""
                    ) {
                        return (
                            prodotto.price >= limiteInferiore && prodotto.title.startsWith(nome)
                        );
                    } else if (
                        limiteSuperiore != undefined &&
                        nome == "" &&
                        categoria != ""
                    ) {
                        return (
                            prodotto.price >= limiteInferiore &&
                            prodotto.price < limiteSuperiore &&
                            prodotto.category == categoria
                        );
                    } else if (categoria != "" && categoria != undefined)
                        return prodotto.category == categoria;
                });

                console.log(prodotti);

                for (let i = 0; i < prodotti.length; i++) {
                    let prodotto = prodotti[i];

                    let divProdotto = document.createElement("div");

                    divProdotto.classList.add("card");

                    let titolo = prodotto.title;
                    let descrizione = prodotto.description;
                    let prezzo = prodotto.price;
                    let immagine = prodotto.image;
                    let id = prodotto.id;

                    divProdotto.innerHTML = `<img style="cursor:pointer" onclick = vaiAlProdotto(${prodotto.id}) src="${immagine}" alt="" id="image">
                        <div class="info">
                            <h2 style="font-size: 18px;">${titolo}</h2>
                            <p id="descrizioneProdotto">${descrizione}</p>
                            <p>${prezzo}</p>
                            <button onclick="aggiungiAlCarrello(${id})" id="btnAcquista">Aggiungi al carrello</button>
                            </div>`;

                    document.getElementById("container").appendChild(divProdotto);

                    console.log(prodotto);
                }
            })
                
        },500)
            .catch((err) => console.log(err));
    }

    function vaiAlProdotto(id) {
        window.location.href = `prodotto.html?idProdotto=${id}`;
    }

    function ottieniProdotto(id) {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("loading").style.opacity = "0";
                setTimeout(function () {
                    document.getElementById("loading").style.display = "none";

                    let prodotto = data;

                    document.getElementById("immagineProdotto").src = prodotto.image;
                    document.getElementById("titoloProdotto").innerHTML = prodotto.title;
                    document.getElementById("descrizioneProdotto").innerHTML =
                        prodotto.description;
                    document.getElementById("prezzoProdotto").innerHTML = `EUR ${prodotto.price}`;
                });
            }, 500)
            .catch((err) => console.log(err));
    }


   