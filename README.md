KayankDialog.js
KayankDialog.js é uma biblioteca JavaScript pura e leve, projetada para criar e gerenciar diálogos modais interativos e personalizáveis em suas aplicações web. Inspirado na simplicidade de uso de bibliotecas como SweetAlert2 e no design limpo do Windows 11 Message Box, o KayankDialog permite exibir mensagens de erro, sucesso, confirmações e outros tipos de popups de forma elegante e funcional.

Funcionalidades Principais
JavaScript Puro: Sem dependências de frameworks externos.

Design Moderno: Estilo limpo e intuitivo, inspirado no Windows 11.

Diálogos Customizáveis: Controle total sobre título, texto, HTML, ícones, botões e cores.

Ícones de Status: Suporte para ícones de success, error, warning, info e question.

Interatividade com Promise: Utilize async/await para lidar com as ações do usuário (confirmação, cancelamento).

Arrastar e Soltar: Diálogos podem ser arrastados pela tela (funcionalidade opcional).

Fechamento Programático: Possibilidade de fechar o diálogo via código.

Como Usar
1. Inclusão dos Arquivos
Baixe os arquivos kayankdialog.js e kayankdialog.css e inclua-os em seu projeto HTML:

HTML

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sua Aplicação</title>
    <link rel="stylesheet" href="caminho/para/kayankdialog.css">
    <style>
        /* Seus estilos CSS personalizados aqui */
        body.kayankdialog-no-select {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
        .kayankdialog-popup.kayankdialog-dragging {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
    </style>
</head>
<body>
    <script src="caminho/para/kayankdialog.js"></script>
    <script>
        // Seu código JavaScript para usar o KayankDialog
    </script>
</body>
</html>
2. Chamando um Diálogo Básico
A função principal para exibir um diálogo é KayankDialog.show(), que aceita um objeto de configurações:

JavaScript

KayankDialog.show({
  title: 'Meu Primeiro Diálogo',
  text: 'Olá, mundo! Este é um diálogo básico.',
  confirmButtonText: 'Entendi'
});
3. Opções de Configuração (Parâmetros)
A função KayankDialog.show() aceita um objeto com várias opções para personalizar o modal:

Parâmetro

Tipo

Padrão

Descrição

title

string

''

Título do popup (pode conter HTML).

titleText

string

''

Título do popup como texto puro (útil para evitar injeção de HTML). Se title e titleText forem fornecidos, title tem precedência.

text

string

''

Descrição do popup (texto puro). Se text e html forem fornecidos, html tem precedência.

html

string

''

Conteúdo HTML para a descrição do popup. Cuidado: Não sanitize, certifique-se de escapar entradas de usuário para evitar XSS.

icon

string

undefined

O ícone do popup: success, error, warning, info, question.

iconColor

string

undefined

Cor do ícone. Sobrescreve a cor padrão do ícone.

iconHtml

string

undefined

Conteúdo HTML personalizado para o ícone (sobrescreve icon).

footer

string

''

Rodapé do popup (pode conter HTML).

backdrop

boolean

true

Se deve mostrar o fundo escuro (backdrop) e permitir clique para fechar.

width

string

'500px'

Largura máxima da janela do popup (CSS unit).

padding

string

'20px'

Preenchimento interno do popup (CSS unit).

color

string

undefined

Cor do texto geral (título, conteúdo, rodapé).

background

string

'#f0f0f0'

Cor de fundo do popup.

showCloseButton

boolean

false

Se deve mostrar o botão "X" de fechar no canto superior direito.

allowOutsideClick

boolean

true

Se o usuário pode fechar o popup clicando fora dele.

allowEscapeKey

boolean

true

Se o usuário pode fechar o popup pressionando a tecla Esc.

showConfirmButton

boolean

true

Se deve mostrar o botão de confirmação.

confirmButtonText

string

'OK'

Texto do botão de confirmação.

confirmButtonColor

string

'#0078d4'

Cor de fundo do botão de confirmação.

showCancelButton

boolean

false

Se deve mostrar o botão de cancelamento.

cancelButtonText

string

'Cancelar'

Texto do botão de cancelamento.

cancelButtonColor

string

'#e0e0e0'

Cor de fundo do botão de cancelamento.

showDenyButton

boolean

false

Se deve mostrar um terceiro botão ("Negar").

denyButtonText

string

'Não'

Texto do botão de negação.

denyButtonColor

string

'#dd6b55'

Cor de fundo do botão de negação.

draggable

boolean

false

Se o diálogo pode ser arrastado pela tela.

customClass

object

{}

Objeto com classes CSS personalizadas para elementos específicos do popup (ex: { popup: 'meu-popup-custom', confirmButton: 'btn-primary' }).

didOpen

function

undefined

Função de callback executada assincronamente após o popup ser mostrado na tela. Recebe o elemento DOM do popup como argumento.

willClose

function

undefined

Função de callback executada sincronicamente antes do popup ser fechado (por interação do usuário). Recebe o elemento DOM do popup como argumento.


Exportar para as Planilhas
4. Lidar com as Respostas (Promises)
KayankDialog.show() retorna uma Promise que é resolvida quando o usuário interage com o diálogo (clica em um botão, fecha). Você pode usar then() ou async/await para processar a resposta:

JavaScript

// Usando .then()
KayankDialog.show({
  title: 'Confirmar Exclusão?',
  text: 'Esta ação não poderá ser desfeita!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Sim, deletar!',
  cancelButtonText: 'Manter'
}).then((result) => {
  if (result.isConfirmed) {
    console.log('Item deletado!');
  } else if (result.isCanceled) {
    console.log('Exclusão cancelada.');
  } else if (result.isDismissed) {
    console.log('Diálogo dispensado por: ' + result.dismiss); // 'backdrop', 'esc', 'closeButton'
  }
});

// Usando async/await (dentro de uma função async)
async function solicitarConfirmacao() {
  const result = await KayankDialog.show({
    title: 'Deseja salvar as alterações?',
    icon: 'question',
    showConfirmButton: true,
    confirmButtonText: 'Salvar',
    showDenyButton: true,
    denyButtonText: 'Descartar',
    showCancelButton: true,
    cancelButtonText: 'Voltar',
    draggable: true // Diálogo será arrastável
  });

  if (result.isConfirmed) {
    console.log('Alterações salvas!');
  } else if (result.isDenied) {
    console.log('Alterações descartadas.');
  } else if (result.isCanceled) {
    console.log('Ação de salvar cancelada. Voltando...');
  }
}

// Chame a função assíncrona
solicitarConfirmacao();
5. Fechamento Programático
Você pode fechar qualquer diálogo ativo a qualquer momento usando KayankDialog.close():

JavaScript

// Exibe um diálogo
KayankDialog.show({
  title: 'Aguarde...',
  text: 'Isso será fechado em 3 segundos.'
});

// Fecha o diálogo após 3 segundos
setTimeout(() => {
  KayankDialog.close();
  console.log('Diálogo fechado programaticamente.');
}, 3000);

// Você também pode fechar com um resultado específico, como se o usuário tivesse confirmado:
// KayankDialog.close({ isConfirmed: true, dismiss: 'programmatic' });
Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues para bugs ou sugestões, ou enviar Pull Requests com melhorias e novas funcionalidades.

Licença
Este projeto está licenciado sob a Licença MIT.

MIT License

Copyright (c) [Seu Nome/Ano Atual]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
