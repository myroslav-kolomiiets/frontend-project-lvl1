#!/usr/bin/env node
import readlineSync from 'readline-sync';

import {
  getPlayerName,
  getRandomInt,
  greatPlayer,
  checkAnswer,
  showRules,
} from '../src/index.js';

import {
  QUESTIONS_NUMBER, TEXT_COLORS, locale, rulesEvenGame,
} from '../src/constants.js';

const isNumberOddOrEven = (number) => {
  if (number % 2 === 0) {
    return 'yes';
  }
  return 'no';
};

const getGameQuestions = (count) => {
  const questions = [];
  for (let i = 0; i < count; i += 1) {
    const question = [];
    const randomNumber = getRandomInt(1, 10);
    const correctAnswer = isNumberOddOrEven(randomNumber);

    question.push(randomNumber, correctAnswer);
    questions.push(question);
  }
  return questions;
};

const askQuestions = (questions, name) => {
  for (let i = 0; i < questions.length; i += 1) {
    const question = questions[i][0];
    const correctAnswer = questions[i][1];

    console.log(TEXT_COLORS.yellow, `${locale.questions.gameQuestion.text1}${question}`);
    const answer = readlineSync.question(locale.questions.gameQuestion.text2);

    const isAnswerCorrect = checkAnswer(answer, correctAnswer);

    if (!isAnswerCorrect) {
      console.log(TEXT_COLORS.red, `'${answer}'${locale.answer.wrong.text1}'${correctAnswer}'`);
      console.log(`${locale.answer.wrong.text2}${name}`);
      break;
    } else {
      console.log(TEXT_COLORS.magenta, locale.answer.correct);
    }
    if (i === questions.length - 1) {
      console.log(TEXT_COLORS.magenta, `${locale.answer.finish.text1}${name}${locale.answer.finish.text2}`);
    }
  }
};

const brainEvenGame = () => {
  const gameQuestions = getGameQuestions(QUESTIONS_NUMBER);
  const playerName = getPlayerName(locale);

  greatPlayer(playerName, TEXT_COLORS, locale);
  showRules(TEXT_COLORS, rulesEvenGame);
  askQuestions(gameQuestions, playerName);
};

brainEvenGame();