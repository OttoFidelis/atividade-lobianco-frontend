async function getSenhaAtual(){
    try{
        const response = await fetch("https://atividade-lobianco.onrender.com/painel/findAll",{
            'method':"GET"
        })
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        const atendimentos = await response.json();
        exibirSenhas(atendimentos)
        document.getElementById('senhaAtual').innerText ='--'
        atendimentos.forEach(a => {
            if (a.statusAtendimento ==1){
                exibirSenhaAtual(a);
                console.log(a)
            }
        });
    }
    catch (error) {
        console.error('Erro ao buscar itens:', error);
    }
}

async function loadSenhas(){
    try{
        const response = await fetch("https://atividade-lobianco.onrender.com/painel/findAll",{
            'method':"GET"
        })
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        const atendimentos = await response.json();
        exibirSenhasCad(atendimentos)
        return atendimentos
    }
    catch (error) {
        console.error('Erro ao buscar itens:', error);
    }
}

async function cadProximaSenhaAdulto(){
    try{
        const response = await fetch("https://atividade-lobianco.onrender.com/painel/createAdulto",{
            'method':"POST",
            'headers':{
                'Content-Type':'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        const atendimentos = await response.json();
        window.alert("Senha cadastrada com sucesso!\nSua senha é: "+atendimentos.numeroAtendimento)
    }
    catch (error) {
        console.error('Erro ao buscar itens:', error);
    }
}

async function cadProximaSenhaInfantil(){
    try{
        const response = await fetch("https://atividade-lobianco.onrender.com/painel/createInfantil",{
            'method':"POST",
            'headers':{
                'Content-Type':'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        const atendimentos = await response.json();
        window.alert("Senha cadastrada com sucesso!\nSua senha é: "+atendimentos.numeroAtendimento)
    }
    catch (error) {
        console.error('Erro ao buscar itens:', error);
    }
}

async function cadProximaSenhaPreferencial(){
    try{
        const response = await fetch("https://atividade-lobianco.onrender.com/painel/createPreferencial",{
            'method':"POST",
            'headers':{
                'Content-Type':'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        const atendimentos = await response.json();
        window.alert("Senha cadastrada com sucesso!\nSua senha é: "+atendimentos.numeroAtendimento)
    }
    catch (error) {
        console.error('Erro ao buscar itens:', error);
    }
}

async function chamar(id){
    let atendimentoEmAndamento=[]
    let atendimentos = await loadSenhas()
    atendimentos.forEach(atendimento=>{
        if (atendimento.statusAtendimento==1){
            atendimentoEmAndamento.push(atendimento)
        }
    })
    if(atendimentoEmAndamento.length<=0){
    try{
        const response = await fetch(`https://atividade-lobianco.onrender.com/painel/setEmAtendimento/${id}`,{
            'method':"PATCH",
            'headers':{
                'Content-Type':'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        const atendimentos = await response.json();
        loadSenhas()
        }
        catch (error) {
        console.error('Erro ao buscar itens:', error);
        }
}
        else window.alert('já existe um atendimento em andamento')
}

async function concluir(id){
    try{
        const response = await fetch(`https://atividade-lobianco.onrender.com/painel/setCompleto/${id}`,{
            'method':"PATCH",
            'headers':{
                'Content-Type':'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        const atendimentos = await response.json();
        loadSenhas()
        }
        catch (error) {
        console.error('Erro ao buscar itens:', error);
        }
}
function exibirSenhaAtual(atendimento){
    document.getElementById('senhaAtual').innerText = atendimento.numeroAtendimento
}

function exibirSenhas(atendimentos){
    let count = 5
    const senhas = document.getElementById('ultimas')
    senhas.innerHTML=''
        atendimentos.reverse().forEach(atendimento =>{
        if(atendimento.statusAtendimento==2 && count>0){
        senhas.innerHTML+=`<li>${atendimento.numeroAtendimento}</li>`
        count--
        }
        })
    }

function exibirSenhasCad(atendimentos) {
    const senhas = document.getElementById('fila');
    senhas.innerHTML = '';
    let count = 0;

    atendimentos.reverse().forEach(atendimento => {
        if(atendimento.statusAtendimento === 1){
            const li = document.createElement('li');
            li.innerText = atendimento.numeroAtendimento; 
            const btn = document.createElement('button');
            btn.innerText = 'Marcar como concluído';
            btn.style.backgroundColor='green';
            btn.addEventListener('click', () => concluir(atendimento.id));
            li.appendChild(btn)
            senhas.appendChild(li)
            count++
            return;
        }
        if (atendimento.statusAtendimento === 0 && count < 5) {
            const li = document.createElement('li');
            li.innerText = atendimento.numeroAtendimento;

            const btn = document.createElement('button');
            btn.innerText = 'Chamar';
            btn.style.backgroundColor = 'red';

            // Aqui é seguro e claro
            btn.addEventListener('click', () => chamar(atendimento.id));

            li.appendChild(btn);
            senhas.appendChild(li);

            count++;
        }
    });
}
