const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const A_TO_B = "american-to-british";
const B_TO_A = "british-to-american";
class Translator {

    translate(text, locale) {
       const first = this.checkSpelling(text, locale);
       const second = this.checkWords(first, locale);
       const third = this.checkTitles(second, locale);
       const fourth = this.checkTime(third, locale);

        return fourth;
    }

    checkSpelling(text, locale) {
        if (locale === A_TO_B) {
            for (const word in americanToBritishSpelling) {
                text = text.replace(new RegExp(`\\b${word}\\b`, 'i'), americanToBritishSpelling[word]);
            }
        } else {
            for (const word in americanToBritishSpelling) {
                text = text.replace(new RegExp(`\\b${americanToBritishSpelling[word]}\\b`, 'i'), word);
            }
        }

        return text;
    }

    checkWords(text, locale) {
        const dictionary = locale === A_TO_B ? americanOnly : britishOnly;
        for (const word in dictionary) {
            text = text.replace(new RegExp(`\\b(?<=\\s|^)${word}(?=\\s?)\\b`, 'i'), dictionary[word])
        }

        return text;
    }

    checkTitles(text, locale) {
        if (locale === A_TO_B) {
            for (const word in americanToBritishTitles) {
                text = text.replace(new RegExp(`\\b${word}\\B`, 'i'), this.capitalize(americanToBritishTitles[word]))
            }
        } else {
            for (const word in americanToBritishTitles) {
                text = text.replace(new RegExp(`\\b${americanToBritishTitles[word]}\\b`, 'i'), this.capitalize(word))
            }
        }

        return text;
    }

    checkTime(text, locale) {
        const find = locale === A_TO_B ? /(?!\d+):(?=\d+)/ : /(?!\d+)\.(?=\d+)/;
        const replace = locale === A_TO_B ? "." : ":";
        if (find.test(text)) {
            return text.replace(find, replace)
        }

        return text;
    }

    capitalize(text) {
        return text[0].toUpperCase() + text.slice(1)
    }
}

module.exports = Translator;