
var exec = window.localStorage.getItem('exec')
// recebe id da página para exibir comentários de acordo com página 
var pagina =  $('.numPagina').val();


// Verifica se o código já foi executado 
if(exec==null){
    window.localStorage.setItem('exec','1');
    registro_comentario = [
        {'id':0,'nome':'Fulano de Tal', 'comentario':'Artigo muito bom','pagina':'1'},
        {'id':1,'nome':'Teste', 'comentario':'Muito bom!','pagina':'2'},
        {'id':2,'nome':'Teste', 'comentario':'Gostei muito do matéria','pagina':'3'}];
    window.localStorage.setItem('comentarios', JSON.stringify(registro_comentario)); 
}
// Carrega comentários
lista_comentarios(pagina);

$(document).ready(function () {

    // Salva comentários 
    $(".salvar").click(function(){      
        var nome        = $(".nome").val();
        var comentario  = $(".i_comentario").val();                   
        var pagina      = $(".numPagina").val();   
        var valida_nome = false;
        var valida_comentario = false;   
        
        $(".error").remove();

        if(nome=="" || nome==null){                        
            $(".label_nome").append("<div class='error'>Informe seu nome</div>");            
            valida_nome = false;
        }else{
            valida_nome = true;
        }

        // Verifica a quantidade de caracteres do nome 
        if(nome.length < 5 & valida_nome==true){
            $(".label_nome").append("<div class='error'>O nome deve conter no mínimo 5 caracteres</div>");            
            valida_nome = false;
        }else{
            valida_nome = true;
        }

        if(!comentario){
            $(".label_comentario").append("<div class='error'>Por favor, informe um comentário</div>");            
            valida_comentario = false;                            
        }else{
            valida_comentario = true;                            
        }


        if(valida_comentario==true && valida_nome==true){              
            // insere dados no sistema
            add_comentario(nome,comentario,pagina);
            $(".nome").va("");
            $(".i_comentario").va("");
        }
        
        return false;
    });    
    
});
// realiza listagem de comentários quando a página é carregada 

// Adiciona conteudo da mensagem
function add_comentario(nome,comentario,pagina){
    var registro_comentario = retornaJson();
    let quant           = Object.keys(registro_comentario).length;        
    let prox = 0 ;
    prox = quant ;
    // Comentário adicionado 
    objeto  = {'id':prox,'nome': nome,'comentario': comentario, 'pagina':pagina};
    // adiconar no array
    registro_comentario[prox] = objeto;
    
    // Grava comentáro na sessão  
    window.localStorage.setItem('comentarios', JSON.stringify(registro_comentario));     
    
    lista_comentarios(pagina);
    return false;
}
// lista comentários do site 
function lista_comentarios(pagina){
    
    var numPagina = pagina;    
    $(".item-comentario").remove(); //atualiza div de comentários 
    registro_comentario = retornaJson();    
    let quant           = Object.keys(registro_comentario).length // Quantidade de registros 
   
    for(var i = 0 ; i < quant; i++ ){
        // Verifica se o comentário é da página selecionada         
        if(registro_comentario[i].pagina==numPagina){
            var coment  = "";
            coment +='<div class="item-comentario">';
            coment +='<p><strong>Nome:</strong> '+registro_comentario[i].nome+'</p>';
            coment +='<p>'+registro_comentario[i].comentario+'</p>';        
            coment +='<a href="#" class="btn btn-danger btn-sm" onclick="remove_item('+registro_comentario[i].id+');return false">remover</a>';
            coment +='</div>';           
            $(".exibe_comentario").append(coment);
        }        
      }      
}

// Remove registro 
function remove_item(item){       
    let registros = retornaJson();     
    // Remove registro selecionado 
    comentarios = registros.filter(function(jsonObject) {
        return jsonObject['id'] != item;
    });    
    // Grava comentáro na sessão  
    window.localStorage.setItem('comentarios', JSON.stringify(comentarios));  
    lista_comentarios(pagina); //atualiza lista de comentários 
}

// Retorna comentários registrados anteriormente 
function retornaJson(){
    var comentarios = localStorage.getItem('comentarios');      
    return JSON.parse(comentarios);
}

