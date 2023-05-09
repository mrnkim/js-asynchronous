"use strict";

const BASE_API_URL = "https://deckofcardsapi.com/api/deck"

/**
 * 
 */

async function get_single_card() {
    const deckResp = await axios({ url: `${BASE_API_URL}/new/shuffle/`, 
    params: { deck_count: '1' }});

    const deckID = deckResp.data.deck_id;
    
    const getCard = await axios({ url: `${BASE_API_URL}/${deckID}/draw`, 
    params: { count: '1' }});

    console.log(`${getCard.data.cards[0].value} of ${getCard.data.cards[0].suit}`)
}