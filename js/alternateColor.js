const colors = ["green", "red", "rgba(133, 122, 200)", "#F15025"];

const btn = document.getElementById('btn');

const color = document.querySelector(".cor")

btn.addEventListener('click', function() {
        
    //obter numero aleatorio entre 0 e 3
    const aleatorio = obterAleatorio();
    console.log(aleatorio)
    document.body.style.backgroundColor = colors[aleatorio]
    color.textContent = colors[aleatorio]
})
//console.log(document.body)
//console.log(aleatorio)
function obterAleatorio() {
    return Math.floor(Math.random() * colors.length);

}