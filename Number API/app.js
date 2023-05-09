"use strict";
const BASE_URL = "http://numbersapi.com";

/**
 * Generates fact about my favorite number 8
 */
async function generateFact() {
  const fact = await axios({ url: `${BASE_URL}/8?json` });

  console.log(fact)
}

/**
 * Generate facts about mulitple numbers
 */
async function generateFact() {
  const facts = await axios({ url: `${BASE_URL}/1,2,3` });

  return facts;
}

async function showBatchFacts(evt) {
  evt.preventDefault();
  $("#batch_facts").empty();

  const results = await generateFact();

  for (let result in results.data) {
    const resultText = results.data[result];

    const liElem = $("<li>").text(resultText);
    $("#batch_facts").append(liElem);
  }
}

$("#mul_button").on("click", showBatchFacts);

/**
 * Generates facts about my favorite number 8
 */
async function generateFacts() {
  const fact1 = axios({ url: `${BASE_URL}/8?json` });
  const fact2 = axios({ url: `${BASE_URL}/8?json` });
  const fact3 = axios({ url: `${BASE_URL}/8?json` });
  const fact4 = axios({ url: `${BASE_URL}/8?json` });

  let results = await Promise.allSettled([fact1, fact2, fact3, fact4]);

  return results;
}

/**
 * Empty ul and append the facts to the DOM
 */

async function showFacts(evt) {
  evt.preventDefault();
  $("#facts").empty();

  const results = await generateFacts();

  console.log(results)

  for (let result of results) {
    if (result.status === "fulfilled") {
      const resultText = result.value.data.text;

      const liElem = $("<li>").text(resultText);
      $("#facts").append(liElem);
    }
  }
}

$("#fav_button").on("click", showFacts);
