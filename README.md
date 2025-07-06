<h1 id="kayankdialogjs">KayankDialog.js</h1>
<p><code>KayankDialog.js</code> é uma biblioteca JavaScript pura e leve, projetada para criar e gerenciar diálogos modais interativos e personalizáveis em suas aplicações web. Inspirado na simplicidade de uso de bibliotecas como <a href="https://sweetalert2.github.io/">SweetAlert2</a> e no design limpo do Windows 11 Message Box, o KayankDialog permite exibir mensagens de erro, sucesso, confirmações e outros tipos de popups de forma elegante e funcional.</p>

<h2 id="funcionalidades-principais">Funcionalidades Principais</h2>
<ul>
<li><strong>JavaScript Puro:</strong> Sem dependências de frameworks externos.</li>
<li><strong>Design Moderno:</strong> Estilo limpo e intuitivo, inspirado no Windows 11.</li>
<li><strong>Diálogos Customizáveis:</strong> Controle total sobre título, texto, HTML, ícones, botões e cores.</li>
<li><strong>Ícones de Status:</strong> Suporte para ícones de <code>success</code>, <code>error</code>, <code>warning</code>, <code>info</code> e <code>question</code>.</li>
<li><strong>Interatividade com <code>Promise</code>:</strong> Utilize <code>async/await</code> para lidar com as ações do usuário (confirmação, cancelamento).</li>
<li><strong>Arrastar e Soltar:</strong> Diálogos podem ser arrastados pela tela (funcionalidade opcional).</li>
<li><strong>Fechamento Programático:</strong> Possibilidade de fechar o diálogo via código.</li>
</ul>

<h2 id="como-usar">Como Usar</h2>
<h3 id="1-inclusão-dos-arquivos">1. Inclusão dos Arquivos</h3>
<p>Baixe os arquivos <code>kayankdialog.js</code> e <code>kayankdialog.css</code> e inclua-os em seu projeto HTML:</p>
<pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;pt-BR&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;title&gt;Sua Aplicação&lt;/title&gt;
    &lt;!-- Link para o arquivo CSS da biblioteca --&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;caminho/para/kayankdialog.css&quot;&gt;
    &lt;style&gt;
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
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;!-- Seu conteúdo HTML aqui --&gt;

    &lt;!-- Inclua o arquivo JavaScript da biblioteca antes do seu script principal --&gt;
    &lt;script src=&quot;caminho/para/kayankdialog.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
        // Seu código JavaScript para usar o KayankDialog
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
<h3 id="2-chamando-um-diálogo-básico">2. Chamando um Diálogo Básico</h3>
<p>A função principal para exibir um diálogo é <code>KayankDialog.show()</code>, que aceita um objeto de configurações:</p>
<pre><code class="language-javascript">KayankDialog.show({
  title: 'Meu Primeiro Diálogo',
  text: 'Olá, mundo! Este é um diálogo básico.',
  confirmButtonText: 'Entendi'
});
</code></pre>
<h3 id="3-opções-de-configuração-parâmetros">3. Opções de Configuração (Parâmetros)</h3>
<p>A função <code>KayankDialog.show()</code> aceita um objeto com várias opções para personalizar o modal:</p>
<table>
<thead>
<tr>
<th>Parâmetro</th>
<th>Tipo</th>
<th>Padrão</th>
<th>Descrição</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>title</code></td>
<td><code>string</code></td>
<td><code>''</code></td>
<td>Título do popup (pode conter HTML).</td>
</tr>
<tr>
<td><code>titleText</code></td>
<td><code>string</code></td>
<td><code>''</code></td>
<td>Título do popup como texto puro (útil para evitar injeção de HTML). Se <code>title</code> e <code>titleText</code> forem fornecidos, <code>title</code> tem precedência.</td>
</tr>
<tr>
<td><code>text</code></td>
<td><code>string</code></td>
<td><code>''</code></td>
<td>Descrição do popup (texto puro). Se <code>text</code> e <code>html</code> forem fornecidos, <code>html</code> tem precedência.</td>
</tr>
<tr>
<td><code>html</code></td>
<td><code>string</code></td>
<td><code>''</code></td>
<td>Conteúdo HTML para a descrição do popup. <strong>Cuidado:</strong> Não sanitize, certifique-se de escapar entradas de usuário para evitar XSS.</td>
</tr>
<tr>
<td><code>icon</code></td>
<td><code>string</code></td>
<td><code>undefined</code></td>
<td>O ícone do popup: <code>success</code>, <code>error</code>, <code>warning</code>, <code>info</code>, <code>question</code>.</td>
</tr>
<tr>
<td><code>iconColor</code></td>
<td><code>string</code></td>
<td><code>undefined</code></td>
<td>Cor do ícone. Sobrescreve a cor padrão do ícone.</td>
</tr>
<tr>
<td><code>iconHtml</code></td>
<td><code>string</code></td>
<td><code>undefined</code></td>
<td>Conteúdo HTML personalizado para o ícone (sobrescreve <code>icon</code>).</td>
</tr>
<tr>
<td><code>footer</code></td>
<td><code>string</code></td>
<td><code>''</code></td>
<td>Rodapé do popup (pode conter HTML).</td>
</tr>
<tr>
<td><code>backdrop</code></td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>Se deve mostrar o fundo escuro (backdrop) e permitir clique para fechar.</td>
</tr>
<tr>
<td><code>width</code></td>
<td><code>string</code></td>
<td><code>'500px'</code></td>
<td>Largura máxima da janela do popup (CSS unit).</td>
</tr>
<tr>
<td><code>padding</code></td>
<td><code>string</code></td>
<td><code>'20px'</code></td>
<td>Preenchimento interno do popup (CSS unit).</td>
</tr>
<tr>
<td><code>color</code></td>
<td><code>string</code></td>
<td><code>undefined</code></td>
<td>Cor do texto geral (título, conteúdo, rodapé).</td>
</tr>
<tr>
<td><code>background</code></td>
<td><code>string</code></td>
<td><code>'#f0f0f0'</code></td>
<td>Cor de fundo do popup.</td>
</tr>
<tr>
<td><code>showCloseButton</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Se deve mostrar o botão &quot;X&quot; de fechar no canto superior direito.</td>
</tr>
<tr>
<td><code>allowOutsideClick</code></td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>Se o usuário pode fechar o popup clicando fora dele.</td>
</tr>
<tr>
<td><code>allowEscapeKey</code></td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>Se o usuário pode fechar o popup pressionando a tecla <code>Esc</code>.</td>
</tr>
<tr>
<td><code>showConfirmButton</code></td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>Se deve mostrar o botão de confirmação.</td>
</tr>
<tr>
<td><code>confirmButtonText</code></td>
<td><code>string</code></td>
<td><code>'OK'</code></td>
<td>Texto do botão de confirmação.</td>
</tr>
<tr>
<td><code>confirmButtonColor</code></td>
<td><code>string</code></td>
<td><code>'#0078d4'</code></td>
<td>Cor de fundo do botão de confirmação.</td>
</tr>
<tr>
<td><code>showCancelButton</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Se deve mostrar o botão de cancelamento.</td>
</tr>
<tr>
<td><code>cancelButtonText</code></td>
<td><code>string</code></td>
<td><code>'Cancelar'</code></td>
<td>Texto do botão de cancelamento.</td>
</tr>
<tr>
<td><code>cancelButtonColor</code></td>
<td><code>string</code></td>
<td><code>'#e0e0e0'</code></td>
<td>Cor de fundo do botão de cancelamento.</td>
</tr>
<tr>
<td><code>showDenyButton</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Se deve mostrar um terceiro botão (&quot;Negar&quot;).</td>
</tr>
<tr>
<td><code>denyButtonText</code></td>
<td><code>string</code></td>
<td><code>'Não'</code></td>
<td>Texto do botão de negação.</td>
</tr>
<tr>
<td><code>denyButtonColor</code></td>
<td><code>string</code></td>
<td><code>'#dd6b55'</code></td>
<td>Cor de fundo do botão de negação.</td>
</tr>
<tr>
<td><code>buttonsStyling</code></td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>Aplica estilo padrão aos botões. Se <code>false</code>, use suas próprias classes CSS.</td>
</tr>
<tr>
<td><code>customClass</code></td>
<td><code>object</code></td>
<td><code>{}</code></td>
<td>Objeto com classes CSS personalizadas para elementos específicos do popup (ex: <code>{ popup: 'meu-popup-custom', confirmButton: 'btn-primary' }</code>).</td>
</tr>
<tr>
<td><code>didOpen</code></td>
<td><code>function</code></td>
<td><code>undefined</code></td>
<td>Função de callback executada assincronamente após o popup ser mostrado na tela. Recebe o elemento DOM do popup como argumento.</td>
</tr>
<tr>
<td><code>willClose</code></td>
<td><code>function</code></td>
<td><code>undefined</code></td>
<td>Função de callback executada sincronicamente antes do popup ser fechado (por interação do usuário). Recebe o elemento DOM do popup como argumento.</td>
</tr>
<tr>
<td><code>draggable</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Se o diálogo pode ser arrastado pela tela.</td>
</tr>
</tbody>
</table>
<h3 id="4-lidar-com-as-respostas-promises">4. Lidar com as Respostas (Promises)</h3>
<p><code>KayankDialog.show()</code> retorna uma <code>Promise</code> que é resolvida quando o usuário interage com o diálogo (clica em um botão, fecha). Você pode usar <code>then()</code> ou <code>async/await</code> para processar a resposta:</p>
<pre><code class="language-javascript">// Usando .then()
KayankDialog.show({
  title: 'Confirmar Exclusão?',
  text: 'Esta ação não poderá ser desfeita!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Sim, deletar!',
  cancelButtonText: 'Manter'
}).then((result) =&gt; {
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
</code></pre>
<h3 id="5-fechamento-programático">5. Fechamento Programático</h3>
<p>Você pode fechar qualquer diálogo ativo a qualquer momento usando <code>KayankDialog.close()</code>:</p>
<pre><code class="language-javascript">// Exibe um diálogo
KayankDialog.show({
  title: 'Aguarde...',
  text: 'Isso será fechado em 3 segundos.'
});

// Fecha o diálogo após 3 segundos
setTimeout(() =&gt; {
  KayankDialog.close();
  console.log('Diálogo fechado programaticamente.');
}, 3000);

// Você também pode fechar com um resultado específico, como se o usuário tivesse confirmado:
// KayankDialog.close({ isConfirmed: true, dismiss: 'programmatic' });
</code></pre>

<h2 id="licença">Licença</h2>
<p>Este projeto está licenciado sob a Licença MIT.</p>
<pre><code class="language-text">MIT License

Copyright (c) 2025 [KayanK]

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
</code></pre>

---

**Instruções para o GitHub `README.md`:**

1.  Crie ou abra o arquivo `README.md` na raiz do seu repositório GitHub.
2.  **Copie todo o HTML** acima e cole-o diretamente no seu arquivo `README.md`.
3.  **Substitua os placeholders:**
    * `caminho/para/`: Altere para o caminho real dos seus arquivos CSS e JS (ex: `dist/kayankdialog.css` ou `kayankdialog.css`).
    * `YKayanK1` e `kayankdialog`: Na seção de "Contribuição", atualize os links para o seu usuário e nome do repositório no GitHub.
    * `[Seu Nome ou Nome da Organização]`: Na seção de Licença, coloque seu nome ou o nome da sua organização. O ano `2025` já está preenchido, que é o ano atual.
4.  Faça o commit e push das alterações para o GitHub.

Seu `README.md` será renderizado com essa formatação e conteúdo detalhado! Boa sorte com o projeto no GitHub!
