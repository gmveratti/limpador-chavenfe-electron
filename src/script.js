document.addEventListener('DOMContentLoaded', () => {
    
    const inputKey = document.getElementById('chave-suja') 
    const outputKey = document.getElementById('chave-limpa')
    const feedbackMessage = document.getElementById('feedback')

    function showFeedback() {
        if (!feedbackMessage) return;
        
        feedbackMessage.style.opacity = '1';
        setTimeout(() => {
            feedbackMessage.style.opacity = '0';
        }, 2000);
    }

    async function handleKeyInput() {
        if (!inputKey || !outputKey) return;

        const cleanedKey = inputKey.value.replace(/\D/g, '');
        
        outputKey.value = cleanedKey;

        if (cleanedKey) {
            try {
                await navigator.clipboard.writeText(cleanedKey);
                showFeedback(); 
            } catch (err) {
                console.error('Falha ao copiar a chave: ', err);
            }
        }
    }

    if (inputKey) {
        inputKey.addEventListener('input', handleKeyInput);
    }

    if (outputKey) {
        outputKey.addEventListener('click', async () => {
            if (outputKey.value) {
                try {
                    await navigator.clipboard.writeText(outputKey.value);
                    showFeedback();
                } catch (err) {
                    console.error('Falha ao copiar a chave (clique): ', err);
                }
            }
        });
    }
});