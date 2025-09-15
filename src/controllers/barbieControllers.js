import dados from "./../models/dados.js";
const { barbies } = dados;

const getAllBarbies = (req, res) => {
    res.status(200).json ({
    total : barbies.length,
    barbies: barbies
    })
}

const getBarbiesById = (req, res) => {
    let id = parseInt(req.params.id);

    const barbie = barbies.find(b => b.id === id);
    res.status(200).json ({
        success: true,
        barbie: barbie
    })
}

const createBarbie = (req, res) => {
    const { nome, profissao, anoLancamento } = req.body;

    if(!nome || !profissao) {
        return res.status(404).json ({
            success: false,
            message: "Nome e profissão são obrigatórios!"
        }) ;
    }

    const novaBarbie = {
        id: barbies.length + 1,
        nome: nome,
        profissao: profissao,
        anoLancamento: anoLancamento
    }

    barbies.push(novaBarbie);

    res.status(200).json ({
        success: true, 
        message: "Barbie castrada com sucesso!",
        baribie: novaBarbie
    })
}

const deleteBarbie = (req, res) => {
    let id = parseInt(req.params.id);

    const barbieRemover = barbies.find(b => b.id === id);

    if(!barbieRemover) {
        return res.status(404).json({
            success: false,
            message: `Essa barbie não existe, ${id}!`
        })
    }

    const barbiesFiltradas = barbies.filter(barbie => barbie.id != id);

    barbies.splice(0, barbies.length, ...barbiesFiltradas);
    
    res.status(200).json({
        success: true,
        message: "A barbie foi removida com sucesso",
        barbieRemovida: barbieRemover
    })
}

const updateBarbie = (req, res) => {
    //Toda a minha logica para atualizar uma barbie especifica.
    const id = parseInt(req.params.id);
    //Body para pegar os dados novos.
    const { nome, profissao, anoLancamento} = req.body;

    const idParaEditar = id;

    //Verificar se o id é valido!
    if(isNaN(idParaEditar)){
        return res.status(400).json({
            success: false,
            message: "O id deve ser um número valido!"
        })
    }

    //Verificar se a barbie/id que eu estou buscando existe
    const barbieExiste = barbies.find(barbie => barbie.id === idParaEditar);

    if (!barbieExiste) {
        return res.status(404).json({
            success: false,
            message: `Barbie com Id: ${id} não existe.`
        })
    }

    //Após passar todos os cenários, eu atualizo a barbie.

    //Laço é o map
    const barbiesAtualizadas = barbies.map(barbie => barbie.id === idParaEditar ? {
        ...barbie,
        ...(nome && {nome}),
        ...(profissao && {profissao}),
        ...(anoLancamento && {anoLancamento: parseInt(anoLancamento)})
    } : barbie)

    //Atualizo o arry com splice 
    barbies.splice(0, barbies.length, ...
    barbiesAtualizadas);

    const barbieNova = barbies.find(barbie => barbie.id === idParaEditar);

    res.status(200).json({
        success: true,
        message: `Dados da Barbie ID ${idParaEditar} atualizados com sucesso!`,
        barbie: barbieNova
    })
}

 export { getAllBarbies, getBarbiesById, createBarbie, deleteBarbie, updateBarbie };