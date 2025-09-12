import dados from "./../models/dados.js";
const { barbies } = dados;

const getAllBarbies = (req, res) => {
    res.status(200).json ({
    total : barbies.length,
    barbies: barbies
    })
}

 export { getAllBarbies };