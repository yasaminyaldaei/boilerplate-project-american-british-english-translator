const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    constructor() {
        this.translated = "";
    }

    translate(text, locale) {
        this.translated = text;
        return this.checkSpelling(text)
            .checkAmericanOnlyWords(text)
            .translated;

    }

    checkSpelling(text) {
        for (const word in americanToBritishSpelling) {
            if (text.includes(word)) {
                 this.translated = text.replace(word, americanToBritishSpelling[word]);
                 break;
            }
        }

        return this;
    }

    checkAmericanOnlyWords(text) {
        for (const word in americanOnly) {
            if (text.includes(word)) {
                this.translated = text.replace(word, americanOnly[word]);
                break;
            }
        }

        return this;
    }
}

module.exports = Translator;