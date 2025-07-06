// kayankdialog.js

const KayankDialog = (() => {
    // === ATENÇÃO: Os SVGs estão agora no arquivo CSS para melhor organização. ===
    // Este objeto iconTypes é apenas para referência dos tipos de ícones válidos.
    const iconTypes = {
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info',
        question: 'question',
    };

    // === Variáveis de Estado Internas ===
    let backdropElement = null;
    let popupElement = null;
    let resolvePromise = null;
    let rejectPromise = null;

    // === Variáveis e Funções para Arrastar o Diálogo ===
    let isDragging = false;
    let dragOffsetX, dragOffsetY;

    const onMouseDown = (e) => {
        // Verifica se o arrasto está permitido (currentOptions.draggable)
        // E se o clique não foi no botão de fechar
        const currentOptions = popupElement.kayankdialogOptions;
        if (!currentOptions.draggable || e.target.closest('.kayankdialog-close-button')) {
            return;
        }

        isDragging = true;
        popupElement.style.cursor = 'grabbing';
        document.body.classList.add('kayankdialog-no-select'); // Adiciona no body para desabilitar seleção
        popupElement.classList.add('kayankdialog-dragging'); // Adiciona no popup para estilo durante arrasto

        const rect = popupElement.getBoundingClientRect();
        
        // Calcula o offset do mouse em relação ao canto superior esquerdo do dialog
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;

        // Define a posição do popup como absoluta usando suas coordenadas atuais,
        // para que o arrasto comece da posição visual atual sem "saltar".
        // Isso evita o salto quando a posição de `flexbox` do backdrop é removida.
        popupElement.style.position = 'absolute';
        popupElement.style.left = `${rect.left}px`;
        popupElement.style.top = `${rect.top}px`;
        popupElement.style.margin = '0'; // Remove margens que podem interferir
        popupElement.style.transform = 'none'; // Remove transform de escala/centralização

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;

        // Calcula a nova posição do dialog usando o offset
        popupElement.style.left = (e.clientX - dragOffsetX) + 'px';
        popupElement.style.top = (e.clientY - dragOffsetY) + 'px';
        popupElement.style.transition = 'none'; // Desabilita transições durante o arrasto
    };

    const onMouseUp = () => {
        if (isDragging) {
            isDragging = false;
            popupElement.style.cursor = 'grab'; // Volta o cursor normal
            
            document.body.classList.remove('kayankdialog-no-select');
            popupElement.classList.remove('kayankdialog-dragging');
            popupElement.style.transition = ''; // Restaura transições CSS
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    // === Funções Auxiliares ===
    const createElement = (tag, classNames = [], parent = null, innerHTML = '') => {
        const element = document.createElement(tag);
        if (classNames.length > 0) {
            element.classList.add(...classNames);
        }
        if (innerHTML) {
            element.innerHTML = innerHTML;
        }
        if (parent) {
            parent.appendChild(element);
        }
        return element;
    };

    const getScrollbarWidth = () => {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        document.body.appendChild(outer);
        const inner = document.createElement('div');
        outer.appendChild(inner);
        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return scrollbarWidth;
    };

    const removeModal = () => {
        if (backdropElement) {
            const currentOptions = popupElement?.kayankdialogOptions;
            if (typeof currentOptions?.willClose === 'function') {
                currentOptions.willClose(popupElement);
            }

            popupElement.classList.remove('kayankdialog-show');
            backdropElement.classList.remove('kayankdialog-show');

            backdropElement.addEventListener('transitionend', function handler() {
                if (backdropElement && backdropElement.parentNode) {
                    backdropElement.parentNode.removeChild(backdropElement);
                    backdropElement = null;
                    popupElement = null;
                }
                resolvePromise = null;
                rejectPromise = null;
                this.removeEventListener('transitionend', handler);
            }, { once: true });
        }
        document.body.classList.remove('kayankdialog-open');
        document.body.style.removeProperty('--kayankdialog-scrollbar-padding');
    };

    const dismiss = (reason) => {
        if (typeof resolvePromise === 'function') {
            resolvePromise({
                isConfirmed: false,
                isDenied: false,
                isCanceled: reason === 'cancel',
                isDismissed: true,
                dismiss: reason
            });
        }
        removeModal();
    };

    const handleEscapeKey = (event) => {
        if (event.key === 'Escape' && popupElement) {
            const currentOptions = popupElement.kayankdialogOptions;
            if (currentOptions && currentOptions.allowEscapeKey) {
                dismiss('esc');
            }
        }
    };

    document.addEventListener('keydown', handleEscapeKey);

    // === Objeto de Configurações Padrão ===
    const defaultOptions = {
        title: '',
        titleText: '',
        text: '',
        html: '',
        icon: undefined, // 'success', 'error', 'warning', 'info', 'question'
        iconColor: undefined, // Cor para o ícone (será o background-color da <i>)
        iconHtml: undefined, // Custom HTML para o ícone, se quiser substituir o SVG padrão
        footer: '',
        backdrop: true,
        width: '500px',
        padding: '20px',
        color: undefined,
        background: '#ffffff',
        position: 'center',
        showCloseButton: false,
        allowOutsideClick: true,
        allowEscapeKey: true,
        showConfirmButton: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#0078d4',
        showCancelButton: false,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '',
        showDenyButton: false,
        denyButtonText: 'Não',
        denyButtonColor: '#dd6b55',
        buttonsStyling: true,
        customClass: {},
        didOpen: undefined,
        willClose: undefined,
        draggable: false, // <-- NOVA OPÇÃO: Desabilita arrasto por padrão
    };

    // === Objeto Principal da Biblioteca ===
    const kayankDialog = {
        show: (options) => {
            const currentOptions = { ...defaultOptions, ...options };

            return new Promise((resolve, reject) => {
                resolvePromise = resolve;
                rejectPromise = reject;

                if (backdropElement) {
                    removeModal();
                    setTimeout(() => kayankDialog.show(options), 50);
                    return;
                }

                if (document.body.scrollHeight > window.innerHeight) {
                    const scrollbarWidth = getScrollbarWidth();
                    document.body.style.setProperty('--kayankdialog-scrollbar-padding', `${scrollbarWidth}px`);
                }

                backdropElement = createElement('div', ['kayankdialog-backdrop'], document.body);
                popupElement = createElement('div', ['kayankdialog-popup'], backdropElement);
                popupElement.kayankdialogOptions = currentOptions;

                if (currentOptions.width) { popupElement.style.maxWidth = currentOptions.width; }
                if (currentOptions.padding) { popupElement.style.padding = currentOptions.padding; }
                if (currentOptions.color) { popupElement.style.color = currentOptions.color; }
                if (currentOptions.background) { popupElement.style.backgroundColor = currentOptions.background; }
                if (currentOptions.customClass.popup) { popupElement.classList.add(currentOptions.customClass.popup); }

                const header = createElement('div', ['kayankdialog-header'], popupElement);
                if (currentOptions.customClass.header) { header.classList.add(currentOptions.customClass.header); }
                
                // Ativa o listener de arrasto APENAS se draggable for true
                if (currentOptions.draggable) {
                    header.addEventListener('mousedown', onMouseDown);
                    popupElement.style.cursor = 'grab'; // Define cursor para arrastável
                } else {
                    popupElement.style.cursor = 'default'; // Cursor padrão se não for arrastável
                }
                
                // 4. Ícone: Cria a <i> e adiciona a classe para o CSS estilizar
                const iconContainer = createElement('div', ['kayankdialog-icon'], header);
                if (currentOptions.icon && iconTypes[currentOptions.icon]) {
                    const iconTag = createElement('i', [], iconContainer);
                    iconTag.classList.add(`kayankdialog-icon-${currentOptions.icon}`);
                    
                    if (currentOptions.iconColor) {
                        iconTag.style.backgroundColor = currentOptions.iconColor;
                    }
                }
                if (currentOptions.iconHtml) {
                    iconContainer.innerHTML = currentOptions.iconHtml;
                }
                if (currentOptions.customClass.icon) { iconContainer.classList.add(currentOptions.customClass.icon); }
                
                const titleElement = createElement('h2', ['kayankdialog-title'], header);
                if (currentOptions.title) { titleElement.innerHTML = currentOptions.title; }
                else if (currentOptions.titleText) { titleElement.textContent = currentOptions.titleText; }
                if (currentOptions.customClass.title) { titleElement.classList.add(currentOptions.customClass.title); }

                if (currentOptions.showCloseButton) {
                    const closeButton = createElement('button', ['kayankdialog-close-button'], header, '&times;');
                    closeButton.setAttribute('aria-label', 'Fechar este diálogo');
                    if (currentOptions.customClass.closeButton) { closeButton.classList.add(currentOptions.customClass.closeButton); }
                    closeButton.addEventListener('click', () => dismiss('closeButton'));
                }

                const content = createElement('div', ['kayankdialog-content'], popupElement);
                const htmlContainer = createElement('div', ['kayankdialog-html-container'], content);
                if (currentOptions.html) { htmlContainer.innerHTML = currentOptions.html; }
                else if (currentOptions.text) { htmlContainer.textContent = currentOptions.text; }
                if (currentOptions.customClass.htmlContainer) { htmlContainer.classList.add(currentOptions.customClass.htmlContainer); }

                const actions = createElement('div', ['kayankdialog-actions'], popupElement);
                if (currentOptions.customClass.actions) { actions.classList.add(currentOptions.customClass.actions); }

                if (currentOptions.showCancelButton) {
                    const cancelButton = createElement('button', ['kayankdialog-button', 'kayankdialog-cancel-button'], actions, currentOptions.cancelButtonText);
                    if (currentOptions.customClass.cancelButton) { cancelButton.classList.add(currentOptions.customClass.cancelButton); }
                    if (currentOptions.cancelButtonColor) {
                        if(currentOptions.cancelButtonColor != '') {
                            cancelButton.style.backgroundColor = currentOptions.cancelButtonColor;
                        }
                    }
                    cancelButton.addEventListener('click', () => dismiss('cancel'));
                }

                if (currentOptions.showDenyButton) {
                    const denyButton = createElement('button', ['kayankdialog-button', 'kayankdialog-deny-button'], actions, currentOptions.denyButtonText);
                    if (currentOptions.customClass.denyButton) { denyButton.classList.add(currentOptions.customClass.denyButton); }
                    if (currentOptions.denyButtonColor) { denyButton.style.backgroundColor = currentOptions.denyButtonColor; }
                    denyButton.addEventListener('click', () => {
                        resolvePromise({ isConfirmed: false, isDenied: true, isCanceled: false, isDismissed: false });
                        removeModal();
                    });
                }

                if (currentOptions.showConfirmButton) {
                    const confirmButton = createElement('button', ['kayankdialog-button', 'kayankdialog-confirm-button'], actions, currentOptions.confirmButtonText);
                    if (currentOptions.customClass.confirmButton) { confirmButton.classList.add(currentOptions.customClass.confirmButton); }
                    if (currentOptions.confirmButtonColor) { confirmButton.style.backgroundColor = currentOptions.confirmButtonColor; }
                    confirmButton.addEventListener('click', () => {
                        resolvePromise({ isConfirmed: true, isDenied: false, isCanceled: false, isDismissed: false });
                        removeModal();
                    });
                }

                if (currentOptions.footer) {
                    const footer = createElement('div', ['kayankdialog-footer'], popupElement);
                    footer.innerHTML = currentOptions.footer;
                    if (currentOptions.customClass.footer) { footer.classList.add(currentOptions.customClass.footer); }
                }

                requestAnimationFrame(() => {
                    if (currentOptions.backdrop) { backdropElement.classList.add('kayankdialog-show'); }
                    else { backdropElement.style.backgroundColor = 'transparent'; }
                    popupElement.classList.add('kayankdialog-show');
                    document.body.classList.add('kayankdialog-open');
                    if (typeof currentOptions.didOpen === 'function') { currentOptions.didOpen(popupElement); }
                });

                if (currentOptions.allowOutsideClick && currentOptions.backdrop) {
                    backdropElement.addEventListener('click', (event) => {
                        if (event.target === backdropElement) { dismiss('backdrop'); }
                    });
                }
            });
        },
        close: (result = { isConfirmed: false, isDenied: false, isCanceled: false, isDismissed: true, dismiss: 'programmatic' }) => {
            if (backdropElement && typeof resolvePromise === 'function') {
                resolvePromise(result);
            }
            removeModal();
        },
    };
    return kayankDialog;
})();