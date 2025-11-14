//function to simulate the turing machine
function simulateTMD(dfa, input) {
    //convert the input string into an array of symbols to simulate the tape
  const tape = input.split('');
  //initialize the tape head position at the start of the tape
  let head = 0;
  //set the initial state to the start state
  let state = dfa.startState;
  //define blank symbol for end of input
  const blank = '_';

  console.log(`Initial tape: ${tape.join('')} (head at ${head}, state ${state})`);

  //simulate the TM reading the input symbols one by one
  while (head < tape.length) {
    const symbol = tape[head];//read current symbol under the tape head
    const key = `${state},${symbol}`; //construct the transition key (state, symbol)
    //if no transition is defined for this pair, reject the input
    if (!(key in dfa.transitions)) {
      console.log(`No transition for ${key}. Reject.`);
      return 'Reject';
    }
    //update the state based on the dfa's transition function
    state = dfa.transitions[key];
    //move the head one cell to the right
    head++;
    console.log(`Read '${symbol}', move →, new state: ${state}, head at ${head}`);
  }

  // End of input: check if current state is accepting
  if (dfa.acceptingStates.includes(state)) {
    console.log(`Reached blank in accepting state ${state}. Accept.`);
    return 'Accept';
  } else {
    console.log(`Reached blank in non-accepting state ${state}. Reject.`);
    return 'Reject';
  }
}


const dfa = {
  states: [0, 1],
  alphabet: ['a', 'b'],
  startState: 0,
  acceptingStates: [1],
  transitions: {
    '0,a': 1,
    '0,b': 0,
    '1,a': 1,
    '1,b': 0
  }
};


// Test with short strings
console.log("\n--- Simulating TM-D on 'aab' ---");
simulateTMD(dfa, 'aab');

console.log("\n--- Simulating TM-D on 'bbb' ---");
simulateTMD(dfa, 'bbb');

console.log("\n--- Simulating TM-D on 'aaa' ---");
simulateTMD(dfa, 'aaa');