mainFunc = async() => {
        const data = await fetchTempo("campinas", "sp")
        if(data){
            console.log(data)
            // document.getElementById("cidade").value = ""
            // const forecast = data["forecast"]["forecastday"]
            // console.log(forecast)
            // const divPrincipal = document.getElementById("infoCidade")
            // divPrincipal.innerHTML = `
            //     <h2>${data["location"]["name"]} - ${data["current"]["temp_c"]}C°</h2>
            //     <ul class="condicoesAtuais" id="vasco">
            //     <li>
            //         <img src="${data["current"]["condition"]["icon"]}" alt="">
            //     </li>
            //     <li id="condicoesAtuais">
            //         ${dataTraducao["matches"][0]["translation"]}
            //     </li>
            //     </ul>
            //     <ul class="minMax">
            //         <li id="minima">
            //             <i class="fa-solid fa-arrow-down"></i>
            //             ${data["forecast"]["forecastday"][0]["day"]["mintemp_c"]}C°
            //         </li>
            //         <li class="maxima">
            //             <i class="fa-solid fa-arrow-up"></i>
            //             ${data["forecast"]["forecastday"][0]["day"]["maxtemp_c"]}C°
            //         </li>
            //     </ul>
            // `
            
        }
        else{
            console.log("algo deu errado")
        }
}

//Comunicação com a API
const fetchTempo = async(cidade, estado) => {
    const APIResponse = await fetch(`https://api.hgbrasil.com/weather?key=a623e753&city_name=${cidade},${estado}
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

async function carregarEstados(){
    carregarCidades("RO")
    const APIResponse = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados
    `)
    if(APIResponse.status === 200){
        const data = await APIResponse.json()
        console.log(data[0]['sigla'])
        for (let index = 0; index <= data.length; index++) {
            const doc = document.createElement('option')
            doc.innerHTML = `
           <option value=${data[index]['sigla']}>${data[index]['sigla']}</option>
           `
           document.querySelector('#estado').append(doc)  
        }
    }else{
        console.log("Algo deu errado")
    }
}

async function carregarCidades(estado = document.getElementById("estado").value){
    const APIResponse = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${estado}?providers=dados-abertos-br,gov,wikipedia
    `)
    document.querySelector('#cidades').innerHTML = ""
    if(APIResponse.status === 200){
        const data = await APIResponse.json()
        for (let index = 0; index <= data.length; index++) {
            const doc = document.createElement('option')
            doc.innerHTML = `
           <option value=${data[index]['nome']}>${data[index]['nome']}</option>
           `
           document.querySelector('#cidades').append(doc)  
        }
    }else{
        console.log("Algo deu errado")
    }
}

//Eventos
document.getElementById("pesquisar")
    .addEventListener("click", mainFunc)