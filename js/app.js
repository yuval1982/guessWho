'use strict';

var gQuestsTree;
var gPrevQuest;
var gCurrQuest;
var gQuestCounter = 0;
var gLastRes;

var gCriterias = [
                    {criteria: 'male', personas: ['Clooney', 'Moshonov']},
                    {criteria: 'israeli', personas: ['Rita', 'Moshonov']},
                    {criteria: 'singer', personas: ['Rita', 'Sia']},
                ];

var gPersonas = [
                    {persona: 'Clooney', criterias: ['male']},
                    {persona: 'Moshonov', criterias: ['male', 'israeli']},
                    {persona: 'Rita', criterias: ['israeli', 'singer']},
                    {persona: 'Sia', criterias: ['singer']},
                ];

var gPossiblePersonas = gPersonas.slice();
console.log('gPossiblePersonas: ', gPossiblePersonas);

var gListedCriterias = [];

$(document).ready(function(){
    gQuestsTree = createQuest('Male?');

    gQuestsTree.yes = createQuest('Putin!');
    gQuestsTree.no = createQuest('Um Kultum!!');

    gPrevQuest = null;
    gCurrQuest = gCriterias[gQuestCounter].criteria;
});

function startGuessing() {
    //alert('Starting')
    var $elGameStart = $('.gameStart');
    $elGameStart.hide();

    var $elGameQuest = $('.gameQuest');

    renderQuest();

    $elGameQuest.show();
}

function renderQuest() {
    var $elGameQuest = $('.gameQuest');
    var $elQuestTxt = $elGameQuest.children('h2');
    $elQuestTxt.html(gCurrQuest);
}

function userResponse(res) {

    if (gPossiblePersonas.length === 1) {
        if (res === 'yes') alert('I knew it!!!')
        else showForm();


    } else {
    // If the persona has this criteria
        if (res === 'yes') {
            gPossiblePersonas = gPossiblePersonas.filter(function (possPersona, i) {
                return (possPersona.criterias.indexOf(gCurrQuest) !== -1)
            })
            gListedCriterias.push(gCurrQuest);

        } else {
            gPossiblePersonas = gPossiblePersonas.filter(function (possPersona, i) {
                return (possPersona.criterias.indexOf(gCurrQuest) === -1)
            })

            // gPrevQuest = gCurrQuest;
            // gCurrQuest = gCurrQuest[res];
            // gLastRes   = res;
        }
        console.log('gPossiblePersonas: ', gPossiblePersonas);

        gQuestCounter++;
        
        if (gPossiblePersonas.length === 1) gCurrQuest = gPossiblePersonas[0].persona;
        else if (gPossiblePersonas.length === 0) showForm();
        else gCurrQuest = gCriterias[gQuestCounter].criteria;
        renderQuest();
    }
}

function showForm() {
    var $elGameNewQuest = $('.gameNewQuest');
    var $elGameQuest = $('.gameQuest');
    $elGameQuest.hide();
    $elGameNewQuest.show();
}

function addPerson() {
    var newPersonName   = $('#newPerson').val();
    var newQuestTxt     = $('#newQuest').val();

    var newQuest        = createQuest(newQuestTxt);
    var newGuess        = createQuest(newPersonName);

    newQuest.yes    = newGuess;
    newQuest.no     = gCurrQuest;

    gPrevQuest[gLastRes]  = newQuest;

    restartGame();

    //console.log('newPerson', newPersonName);
    //console.log('newQuest', newQuestTxt);

}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function restartGame() {
    $('.gameNewQuest').hide();
    $('.gameStart').show();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}