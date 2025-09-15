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

 export { getAllBarbies, getBarbiesById, createBarbie, deleteBarbie };