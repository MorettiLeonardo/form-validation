$(document).ready(function() {
    $('#cep').mask('00000-000')

    $('#btn-buscar-cep').click(function() {
        const cep = $('#cep').val()
        const endpoint = `https://viacep.com.br/ws/${cep}/json`
        const botao = $(this)
        $(botao).find('i').addClass('d-none')
        $(botao).find('span').removeClass('d-none')
        
        $.ajax(endpoint).done(function(resposta) {
            try {
                const logradouro = resposta.logradouro
                const bairro = resposta.bairro
                const cidade = resposta.localidade
                const estado = resposta.uf
                const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`
                $('#endereco').val(endereco)
            } catch(error) {
                throw new Error(error)
            } finally {
                setTimeout(function() {
                        $(botao).find('i').removeClass('d-none')
                        $(botao).find('span').addClass('d-none')
                    }, 1000)
            }
            })
        })

        $('#form-order').submit(function(ev) {
            ev.preventDefault()
            validaCampo('#name', 'Nome')
            validaCampo('#secondName', 'Sobrenome')
            validaCampo('#email', 'Email')
            validaCampo('#email', 'Email')
            validaCampo('#number', 'Número')
            validaCampo('#endereco', 'Endereço')
            validaCampo('#cep', 'CEP')
        })

        function validaCampo(campo, nomeCampo) {
            if ($(`${campo}`).val().length == 0) {
                alert(`Preencha o campo ${nomeCampo}`)
                throw new Error(`Digite o ${nomeCampo}`)
                
            }
        }
})