'use strict';
import assert from 'assert';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();
  const localeTester = new RegExp(`${translator.americanToBritish}|${translator.britishToAmerican}`)

  app.route('/api/translate')
    .post((req, res) => {
      const text = req.body.text;
      const locale = req.body.locale;

      try {
        assert.notStrictEqual(text, undefined, "Required field(s) missing")
        assert.notStrictEqual(locale, undefined, "Required field(s) missing")
      } catch ({ message: error }) {
        return res.json({
          error
        })
      }

      try {
        assert.ok(text, "No text to translate")
      } catch ({ message: error }) {
        return res.json({
          error
        })
      }

      try {
        assert.match(locale, localeTester, "Invalid value for locale field")
      } catch ({ message: error }) {
        return res.json({
          error
        })
      }

      const translation = translator.translate(text, locale, true);

      try {
        assert.notStrictEqual(translation, text)
      } catch (err) {
        return res.json({
          text,
          translation: "Everything looks good to me!"
        })
      }

      return res.json({
        text,
        translation
      })
    });
};
