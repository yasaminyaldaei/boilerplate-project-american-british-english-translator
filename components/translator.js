const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const A_TO_B = "american-to-british";
const B_TO_A = "british-to-american";
class Translator {

    constructor() {
        this.americanToBritish = A_TO_B;
        this.britishToAmerican = B_TO_A;
    }

    translate(text, locale, highlight) {
       const first = this.checkSpelling(text, locale, highlight);
       const second = this.checkWords(first, locale, highlight);
       const third = this.checkTitles(second, locale, highlight);
       const fourth = this.checkTime(third, locale, highlight);

        return fourth;
    }

    checkSpelling(text, locale, highlight) {
        if (locale === A_TO_B) {
            for (const word in americanToBritishSpelling) {
                text = text.replace(new RegExp(`\\b${word}\\b`, 'i'), this.textToReplace(americanToBritishSpelling[word], highlight));
            }
        } else {
            for (const word in americanToBritishSpelling) {
                text = text.replace(new RegExp(`\\b${americanToBritishSpelling[word]}\\b`, 'i'), this.textToReplace(word, highlight));
            }
        }

        return text;
    }

    checkWords(text, locale, highlight) {
        const dictionary = locale === A_TO_B ? americanOnly : britishOnly;
        for (const word in dictionary) {
            text = text.replace(new RegExp(`\\b(?<=\\s|^)${word}(?=\\s?)\\b`, 'i'), this.textToReplace(dictionary[word], highlight))
        }

        return text;
    }

    checkTitles(text, locale, highlight) {
        if (locale === A_TO_B) {
            for (const word in americanToBritishTitles) {
                text = text.replace(new RegExp(`\\b${word}\\B`, 'i'), this.textToReplace(this.capitalize(americanToBritishTitles[word]), highlight))
            }
        } else {
            for (const word in americanToBritishTitles) {
                text = text.replace(new RegExp(`\\b${americanToBritishTitles[word]}\\b`, 'i'), this.textToReplace(this.capitalize(word), highlight))
            }
        }

        return text;
    }

    checkTime(text, locale, highlight) {
        const find = locale === A_TO_B ? /(\d+)(:)(\d+)/ : /(\d+)(\.)(\d+)/;
        const replace = locale === A_TO_B ? "$1.$3" : "$1:$3";
        if (find.test(text)) {
            return text.replace(find, this.textToReplace(replace, highlight))
        }

        return text;
    }

    capitalize(text) {
        return text[0].toUpperCase() + text.slice(1)
    }

    textToReplace(text, highlight) {
        return highlight ? `<span class="highlight">${text}</span>` : text
    }
}

module.exports = Translator;