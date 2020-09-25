import React, { useState } from 'react';
import './App.css';

function App() {

  const [number, setNumber] = useState(0);
  const [phrases, setPhrases] = useState([]);

  const phraseList = phrases.map((phrase, index) => <p key={`${index}_${phrase}`}>{phrase}</p>);

  function numberToPhrase(n) {

    var string = n.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words, and = 'and';

    string = string.replace(/[, ]/g, "");

    if (parseInt(string) === 0) {
      return 'zero';
    }

    /* Array of units as words */
    units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

    /* Split user argument into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];

    while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
      return '';
    }

    words = [];
    for (i = 0; i < chunksLen; i++) {

      chunk = parseInt(chunks[i]);

      if (chunk) {

        /* Split chunk into array of individual integers */
        ints = chunks[i].split('').reverse().map(parseFloat);

        /* If tens integer is 1, i.e. 10, then add 10 to units integer */
        if (ints[1] === 1) {
          ints[0] += 10;
        }

        /* Add scale word if chunk is not zero and array item exists */
        if ((word = scales[i])) {
          words.push(word);
        }

        /* Add unit word if array item exists */
        if ((word = units[ints[0]])) {
          words.push(word);
        }

        /* Add tens word if array item exists */
        if ((word = tens[ints[1]])) {
          words.push(word);
        }

        /* Add 'and' string after units or tens integer if: */
        if (ints[0] || ints[1]) {

          /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
          if (ints[2] || (i + 1) < chunksLen) {
            words.push(and);
            and = '';
          }

        }

        /* Add hundreds word if array item exists */
        if ((word = units[ints[2]])) {
          words.push(word + ' hundred');
        }

      }

    }

    return words.reverse().join(' ');

  }

  function handleSubmit() {
    const phrase = `${number} === ${numberToPhrase(number)}`;
    setPhrases([...phrases, phrase]);
  }

  function handleKeySubmit(k) {
    if(k.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <div className="App">
      <div className='number-container'>
        <div className='convert-box'>
          <input
            className='convert-bar'
            type='text'
            placeholder='Number to convert'
            onChange={e => setNumber(e.target.value)}
            onKeyPress={handleKeySubmit}
          />
        </div>
        <button className='submit-button' onClick={handleSubmit}>Submit</button>
      </div>
      {phrases.length > 0 ?
          <div className={'phrase-container'}>
            {phraseList}
          </div>
         : ''}
    </div>
  );
}

export default App;
