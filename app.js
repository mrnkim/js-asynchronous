"use strict";
const BASE_URL = "http://numbersapi.com";

/**
 * Generate facts about my favorite number 8
 */
async function generateFacts() {
  let fact1 = axios({ url: `${BASE_URL}/8?json` });
  let fact2 = axios({ url: `${BASE_URL}/8?json` });
  let fact3 = axios({ url: `${BASE_URL}/8?json` });
  let fact4 = axios({ url: `${BASE_URL}/8?json` });

  let results = await Promise.all([fact1, fact2, fact3, fact4]);

  return results;
}

/**
 * Empty ul and append the facts to the DOM
 */

async function showFacts(evt) {
  evt.preventDefault();
  $("#facts").empty();

  const results = await generateFacts();

  for (let result of results) {
    const resultText = result.data.text;

    const liElem = $("<li>").text(resultText);
    $("#facts").append(liElem);
  }
}

$("button").on("click", showFacts);
