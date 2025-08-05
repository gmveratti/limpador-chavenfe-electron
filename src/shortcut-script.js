// Arquivo CleanKey.js (ou como você o nomeou)
const { clipboard } = require('electron');

class CleanKey {
    constructor() {}

    async inputKey() 
    {
        this.key = await clipboard.readText();
        console.log("Chave lida do clipboard:", this.key); 
    }

    async cleanKey() 
    {
        if (this.key) {
            this.cleanedKey = this.key.replace(/\D/g, '');
            console.log("Chave limpa:", this.cleanedKey); 
        } else {
            console.error("Erro: this.key não foi definida antes de cleanKey.");
        }
    }

    async outputKey() 
    {
        if (this.cleanedKey) {
            await clipboard.writeText(this.cleanedKey);
            console.log("Chave limpa copiada para o clipboard!"); 
        } else {
            console.error("Erro: this.cleanedKey não foi definida antes de outputKey.");
        }
    }

    async execCleanKey() 
    {
        await this.inputKey();
        await this.cleanKey();
        await this.outputKey();
    }
}

module.exports = { CleanKey };