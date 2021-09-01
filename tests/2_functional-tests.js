const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const translator = new Translator();

const textToTranslate = "Mangoes are my favorite fruit."
const translation = 'Mangoes are my <span class="highlight">favourite</span> fruit.'
const A_TO_B = "american-to-british";
const B_TO_A = "british-to-american";

suite('Functional Tests', () => {
    test("Translation with text and locale fields: POST request to /api/translate", function (done) {
        chai
          .request(server)
          .post("/api/translate")
          .send({
            text: textToTranslate,
            locale: A_TO_B,
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, "text");
            assert.property(res.body, "translation");
            assert.equal(
              res.body.text,
              textToTranslate
            );
            assert.equal(
                res.body.translation,
                translation
              );
            done();
          });
      });
      test("Translation with text and invalid locale field: POST request to /api/translate", function (done) {
        chai
          .request(server)
          .post("/api/translate")
          .send({
            text: textToTranslate,
            locale: "frenchToAmerican",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, "error");
            assert.equal(
              res.body.error,
              "Invalid value for locale field"
            );
            done();
          });
      });
      test("Translation with missing text field: POST request to /api/translate", function (done) {
        chai
          .request(server)
          .post("/api/translate")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, "error");
            assert.equal(
              res.body.error,
              "Required field(s) missing"
            );
            done();
          });
      });
      test("Translation with missing locale field: POST request to /api/translate", function (done) {
        chai
          .request(server)
          .post("/api/translate")
          .send({
            text: textToTranslate,
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, "error");
            assert.equal(
              res.body.error,
              "Required field(s) missing"
            );
            done();
          });
      });
      test("Translation with empty text: POST request to /api/translate", function (done) {
        chai
          .request(server)
          .post("/api/translate")
          .send({
            text: "",
            locale: A_TO_B,
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, "error");
            assert.equal(
              res.body.error,
              "No text to translate"
            );
            done();
          });
      });
      test("Translation with text that needs no translation: POST request to /api/translate", function (done) {
        chai
          .request(server)
          .post("/api/translate")
          .send({
            text:
              "Mangoes are my favourite fruit.",
            locale:A_TO_B,
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, "text");
            assert.property(res.body, "translation");
            assert.equal(
              res.body.text,
              "Mangoes are my favourite fruit."
            );
            assert.equal(
                res.body.translation,
                "Everything looks good to me!"
              );
            done();
          });
      });
});
