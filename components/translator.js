const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    translate(text, locale) {
       const first = this.checkSpelling(text);
       const second = this.checkAmericanOnlyWords(first);
       const third = this.checkAmericanToBritishTitles(second);
       const fourth = this.checkTime(third);
       const fifth = this.checkBritishOnlyWords(fourth);

        return fifth;
    }

    checkSpelling(text) {
        for (const word in americanToBritishSpelling) {
            text = text.replace(new RegExp(`\\b${word}\\b`, 'i'), americanToBritishSpelling[word]);
        }

        return text;
    }

    checkAmericanOnlyWords(text) {
        for (const word in americanOnly) {
            text = text.replace(new RegExp(`\\b${word}\\b`, 'i'), americanOnly[word])
        }

        return text;
    }

    checkAmericanToBritishTitles(text) {
        for (const word in americanToBritishTitles) {
            text = text.replace(new RegExp(`${word}`, 'i'), this.capitalize(americanToBritishTitles[word]))
        }

        return text;
    }

    checkTime(text) {
        if (text.includes(":")) {
            return text.replace(":", ".")
        }

        return text;
    }

    checkBritishOnlyWords(text) {
        for (const word in britishOnly) {
            text = text.replace(new RegExp(`\\b${word}\\b`, 'i'), britishOnly[word])
        }

        return text;
    }

    capitalize(text) {
        return text[0].toUpperCase() + text.slice(1)
    }
}

module.exports = Translator;