var connection = require("../../config/pool_conexoes");

const adicionarLocais = async  (req, res) => {
    
    const { nome, categoria, descricao, latitude, longitude } = req.body;
    console.log(req.body);
    try {

        const [endExist] = await connection.query("SELECT INTO locais (latitude, longitude) VALUES (?, ?)", [latitude, longitude]);
        
        if (endExist.length > 0) {
            req.flash('error_msg', 'Esse endereço já foi adicionado ao Sports Map.');
            return res.redirect('/locais-esportivos'); // Redireciona para o formulário de registro
        }
        
        const [addL] = await connection.query(
            `INSERT INTO locais (nome, categoria, descricao, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
            [nome, categoria, descricao, latitude, longitude]
        );
        req.flash('success_msg', 'Local adicionado com sucesso!');
        const locaisId = addL.insertId;

        //Pegar informações do BD e armazenar na sessão do usuário

        req.session.nome = nome;

        // Você pode redirecionar para outra página aqui ou enviar uma resposta.
        res.redirect('/locais-esportivos'); // Redirecionar após sucesso

    } catch (error) {
        req.flash('error_msg', 'Erro ao adicionar Local: ' + error.message);
        console.log(error);
        res.redirect('/locais-esportivos');
    }
};

module.exports ={ 
    adicionarLocais
}
