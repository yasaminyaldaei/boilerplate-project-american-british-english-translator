'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const text = req.body.text;
      const locale = req.body.locale;

      const translation = translator.translate(text, locale);

      

      return res.json({
        text,
        translation
      })
    });
};
