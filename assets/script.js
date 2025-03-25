//toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('nav');
let links = document.querySelectorAll('nav a');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('ativar');
}

//removendo o menu na hora de clicar
links.forEach(link =>{
    link.addEventListener('click', () =>{
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('ativar');
    })
})


//scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            //ativar navbar Links
            navLinks.forEach(links => {
                links.classList.remove('ativar');
                document.querySelector('header nav a[href*='+ id +']').classList.add('ativar');
            });
            //ativar sections for animation on scroll
            sec.classList.add('mostrar-animacao');         
        }
        else{
            sec.classList.remove('mostrar-animacao');
        }

    });

    //sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);


    //animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('mostrar-animacao', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop:true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination", //ponto
        clickable: true,
    },
    breakpoints: { //coluna
        576:{
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 4,
        }
    }
})



//getAllCards
const getAllCards = async() =>{
    try{
        const res = await fetch('projetos.json');
        const data = await res.json();

        const cards = document.querySelector(".cards");

        cards.innerHTML = data.map(card => `

            <div class="cards">
                <span class="animacao scroll" style="--i:2;"></span>

                <div class="card">
                    <div class="imagem">
                        <img src="${card.imagem} " alt="${card.alt}">
                    </div>

                    <div class="informacao">

                        <div class="img-info">
                            <img src="${card.imagemInfo}" alt="${card.alt}">
                        </div>
                        <div class="bg"></div>
                        
                        <h3 class="projeto-nome">${card.nome} </h3>
                        <p class="projeto-descricao">${card.descricao}</p>

                        <div class="btn-cod">
                            <a href="${card.link}" target="_blank" class="btn-detalhes">Código<i class='bx bxl-github'></i></a> 
                        </div>
                        
                    </div>
                </div>

             </div>

        `).join("");

    }catch(err){
        throw new Error('Erro ao carregar os cards' + err)
    }
}

getAllCards()