const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

const A_TO_B = "american-to-british";
const B_TO_A = "british-to-american";

suite('Unit Tests', () => {
    //1
    test("Translate Mangoes are my favorite fruit. to British English",  function(done) {
        assert.equal("Mangoes are my favourite fruit", translator.translate("Mangoes are my favorite fruit", A_TO_B));
        done();
    })

    //2
    test("Translate I ate yogurt for breakfast. to British English", function(done) {
        assert.equal("I ate yoghurt for breakfast.", translator.translate("I ate yogurt for breakfast.", A_TO_B));
        done();
    })

    //3
    test("Translate We had a party at my friend's condo. to British English",  function(done) {
        assert.equal("We had a party at my friend's flat.", translator.translate("We had a party at my friend's condo.", A_TO_B));
        done();
    })

    //4
    test("Translate Can you toss this in the trashcan for me? to British English", function(done) {
        assert.equal("Can you toss this in the bin for me?", translator.translate("Can you toss this in the trashcan for me?", A_TO_B));
        done();
    })

    //5
    test("Translate The parking lot was full. to British English",  function(done) {
        assert.equal("The car park was full.", translator.translate("The parking lot was full.", A_TO_B));
        done();
    })

    //6
    test("Translate Like a high tech Rube Goldberg machine. to British English", function(done) {
        assert.equal("Like a high tech Heath Robinson device.", translator.translate("Like a high tech Rube Goldberg machine.", A_TO_B));
        done();
    })

    //7
    test("Translate To play hooky means to skip class or work. to British English",  function(done) {
        assert.equal("To bunk off means to skip class or work.", translator.translate("To play hooky means to skip class or work.", A_TO_B));
        done();
    })

    //8
    test("Translate No Mr. Bond, I expect you to die. to British English", function(done) {
        assert.equal("No Mr Bond, I expect you to die.", translator.translate("No Mr. Bond, I expect you to die.", A_TO_B));
        done();
    })

    //9
    test("Translate Dr. Grosh will see you now. to British English",  function(done) {
        assert.equal("Dr Grosh will see you now.", translator.translate("Dr. Grosh will see you now.", A_TO_B));
        done();
    })

    //10
    test("Translate Lunch is at 12:15 today. to British English", function(done) {
        assert.equal("Lunch is at 12.15 today.", translator.translate("Lunch is at 12:15 today.", A_TO_B));
        done();
    })

    //11
    test("Translate We watched the footie match for a while. to American English",  function(done) {
        assert.equal("We watched the soccer match for a while.", translator.translate("We watched the footie match for a while.", B_TO_A));
        done();
    })

    //12
    test("Translate Paracetamol takes up to an hour to work. to American English", function(done) {
        assert.equal("Tylenol takes up to an hour to work.", translator.translate("Paracetamol takes up to an hour to work.", B_TO_A));
        done();
    })

    //13
    test("Translate First, caramelise the onions. to American English",  function(done) {
        assert.equal("First, caramelize the onions.", translator.translate("First, caramelise the onions.", B_TO_A));
        done();
    })

    //14
    test("Translate I spent the bank holiday at the funfair. to American English", function(done) {
        assert.equal("I spent the public holiday at the carnival.", translator.translate("I spent the bank holiday at the funfair.", B_TO_A));
        done();
    })

    //15
    test("Translate I had a bicky then went to the chippy. to American English",  function(done) {
        assert.equal("I had a cookie then went to the fish-and-chip shop.", translator.translate("I had a bicky then went to the chippy.", B_TO_A));
        done();
    })

    //16
    test("Translate I've just got bits and bobs in my bum bag. to American English", function(done) {
        assert.equal("I've just got odds and ends in my fanny pack.", translator.translate("I've just got bits and bobs in my bum bag.", B_TO_A));
        done();
    })

    //17
    test("Translate The car boot sale at Boxted Airfield was called off. to American English",  function(done) {
        assert.equal("The swap meet at Boxted Airfield was called off.", translator.translate("The car boot sale at Boxted Airfield was called off.", B_TO_A));
        done();
    })

    //18
    test("Translate Have you met Mrs Kalyani? to American English", function(done) {
        assert.equal("Have you met Mrs. Kalyani?", translator.translate("Have you met Mrs Kalyani?", B_TO_A));
        done();
    })

    //19
    test("Translate Prof Joyner of King's College, London. to American English",  function(done) {
        assert.equal("Prof.. Joyner of King's College, London.", translator.translate("Prof. Joyner of King's College, London.", B_TO_A));
        done();
    })

    //20
    test("Translate Tea time is usually around 4 or 4.30. to American English", function(done) {
        assert.equal("Tea time is usually around 4 or 4:30.", translator.translate("Tea time is usually around 4 or 4.30.", B_TO_A));
        done();
    })

    //21
    test("Highlight translation in Mangoes are my favorite fruit.",  function(done) {
        assert.equal('Mangoes are my <span class="highlight">favourite</span> fruit.', translator.translate("Mangoes are my favorite fruit.", A_TO_B, true));
        done();
    })

    //22
    test("Highlight translation in I ate yogurt for breakfast.", function(done) {
        assert.equal('I ate <span class="highlight">yoghurt</span> for breakfast.', translator.translate("I ate yogurt for breakfast.", A_TO_B, true));
        done();
    })

    //23
    test("Highlight translation in We watched the footie match for a while.", function(done) {
        assert.equal('We watched the <span class="highlight">soccer</span> match for a while.', translator.translate("We watched the footie match for a while.", B_TO_A, true));
        done();
    })

    //24
    test("Highlight translation in Paracetamol takes up to an hour to work.", function(done) {
        assert.equal('<span class="highlight">Tylenol</span> takes up to an hour to work.', translator.translate("Paracetamol takes up to an hour to work.", B_TO_A, true));
        done();
    })
});
