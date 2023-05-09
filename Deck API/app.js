"use strict";

const BASE_API_URL = "https://deckofcardsapi.com/api/deck";
let deckId;

/**
 * get new deck and get a single card
 */

async function get_single_card() {
  const deckResp = await axios({
    url: `${BASE_API_URL}/new/shuffle/`,
    params: { deck_count: "1" },
  });

  const deckID = deckResp.data.deck_id;

  const getCard = await axios({
    url: `${BASE_API_URL}/${deckID}/draw`,
    params: { count: "1" },
  });

  console.log(
    `${getCard.data.cards[0].value} of ${getCard.data.cards[0].suit}`
  );
}

/**
 * get a new deck and get two cards in a row
 */

async function get_two_cards() {
  const deckResp = await axios({
    url: `${BASE_API_URL}/new/shuffle/`,
    params: { deck_count: "1" },
  });

  const deckID = deckResp.data.deck_id;

  const firstCard = await axios({
    url: `${BASE_API_URL}/${deckID}/draw`,
    params: { count: "1" },
  });

  const secondCard = await axios({
    url: `${BASE_API_URL}/${deckID}/draw`,
    params: { count: "1" },
  });

  console.log(`${firstCard.data.cards[0].value} of ${firstCard.data.cards[0].suit},
    ${secondCard.data.cards[0].value} of ${secondCard.data.cards[0].suit}`);
}

/**
 * set a new deck ID and save it as a global variable
 */

async function setDeckId() {
  const deckResp = await axios({
    url: `${BASE_API_URL}/new/shuffle/`,
    params: { deck_count: "1" },
  });

  deckId = deckResp.data.deck_id;
}

/**
 * draw a card from the global deck
 */

async function drawCard() {
  const card = await axios({
    url: `${BASE_API_URL}/${deckId}/draw`,
    params: { count: "1" },
  });
  return card.data;
}

/**
 * display the drawn card to the DOM
 */

async function displayCard(evt) {
  evt.preventDefault();
  let card;
  try {
    card = await drawCard();
  } catch (error) {
    console.error();
    return;
  }
  const imgUrl = card.cards[0].image;
  const createImg = $("<img>").attr("src", imgUrl).css("position", "absolute");
  $("#stage").append(createImg);
}

setDeckId();
$("#drawCard").on("click", displayCard);
