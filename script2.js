//Cancelando o evento padrão do botão.
document.querySelector('.busca button').addEventListener('click', (e) => {
    e.preventDefault();
});

//Atrubuindo um evento de click no botão e pegando o value do input.
let dataInput = document.querySelector('button').addEventListener('click', async () => {
    let valueInput = document.querySelector('input').value;

    //Verificnado se o value do input é vazio.
    if (valueInput != '') {

        //Início da operação assíncrona de consulta a Api.
        let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(valueInput)}&appid=ede1396cb6817cb796d0084d18d3f9b1&units=metric&lang=pt_br`;
        let responseApi = await fetch(urlApi);
        let json = await responseApi.json();

        //Verificando se a cidade pesquisada existe.
        if (json.cod === 200) {
            showMsg('Carregando..');

            //Criando um objeto com os dados retornados da peração.
            let jsonObj = {
                Name: json.name,
                Country: json.sys.country,
                windDeg: json.wind.deg,
                windSpeed: json.wind.speed,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon
            };

            showScreem(jsonObj);

        //Exibe mensagem de erro caso a api não retorne os dados esperados.
        } else if(json.message == 'Internal error'){
            showMsg('Erro interno na Api :(');
        }
        
        else {
            showMsg('Carregando..');
            document.querySelector('body').style.backgroundImage = ``;
            document.querySelector('body').style.backgroundColor = `#555`;
            document.querySelector('.resultado').style.display = 'none';
            showMsg('Cidade não encontrada!'); 
        }
    } else {
        
        showMsg('Por vafor, digite o nome de alguma cidade!');
    }
});

//Função que exibe na tela uma mensagem de erro que é passada por parâmetro.
let showMsg = (msg) => {
    document.querySelector('.aviso').innerHTML = msg;
};

//Arrow function que preenche a tela com os dados retornados, onde 'x' é jsonObj.
let showScreem = (x) => {
    showMsg('')
    document.querySelector('.resultado').style.display = 'flex';
    document.querySelector('.titulo').innerHTML = `${x.Name},${x.Country}`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${x.windDeg}deg)`;
    document.querySelector('.ventoInfo').innerHTML = `${x.windSpeed}<span>km/h</span>`;
    document.querySelector('.tempInfo').innerHTML = `${x.temp}<sup>ºC</sup>`;
    document.querySelector('body').style.backgroundImage = `url('http://openweathermap.org/img/wn/${x.tempIcon}@2x.png')`;
};

