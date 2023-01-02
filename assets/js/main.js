
//Functions
const ValidarCampos = () => {
    if(document.getElementById("cidade").value == ""){
        return false
    }
    else{
        return true
    }
    
}

mainFunc = async() => {
    if(ValidarCampos()){
        const data = await fetchTempo(document.getElementById("cidade").value)
        const dataTraducao = await fetchTraducao(data["current"]["condition"]["text"])
        console.log(dataTraducao)
        if(data){
            const forecast = data["forecast"]["forecastday"]
            console.log(forecast)
            const divPrincipal = document.getElementById("infoCidade")
            divPrincipal.innerHTML = `
                <h2>${data["location"]["name"]} - ${data["current"]["temp_c"]}C°</h2>
                <ul class="condicoesAtuais" id="vasco">
                <li>
                    <img src="${data["current"]["condition"]["icon"]}" alt="">
                </li>
                <li id="condicoesAtuais">
                    ${dataTraducao["matches"][0]["translation"]}
                </li>
                </ul>
                <ul class="minMax">
                    <li id="minima">
                        <i class="fa-solid fa-arrow-down"></i>
                        ${data["forecast"]["forecastday"][0]["day"]["mintemp_c"]}C°
                    </li>
                    <li class="maxima">
                        <i class="fa-solid fa-arrow-up"></i>
                        ${data["forecast"]["forecastday"][0]["day"]["maxtemp_c"]}C°
                    </li>
                </ul>
            `
            document.getElementById("cidade").value = ""
        }
        else{
            console.log("algo deu errado")
        }
    }
}

//Comunicação com a API
const fetchTempo = async(cidade) => {
    const APIResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=663290ca46664c738af234031221806&q=${cidade}&days=1&aqi=no&alerts=no
    `)
    if(APIResponse.status === 200){
        const data = await APIResponse.json()
        return data
    }else{
        console.log("Algo deu errado")
    }
}

const fetchTraducao = async(traducao) => {
    const APIResponse = await fetch(`https://api.mymemory.translated.net/get?q=${traducao}&langpair=en-GB|pt-BR
    `)
    if(APIResponse.status === 200){
        const data = await APIResponse.json()
        return data
    }else{
        console.log("Algo deu errado")
    }
}
//Troca de informações entre a api e o site


//Eventos
document.getElementById("pesquisar")
    .addEventListener("click", mainFunc)