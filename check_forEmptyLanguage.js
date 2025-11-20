//function to determine whether a dfa accepts any strings at all
function isEmptyLanguage(dfa) {
  //split the dfa into its components
  const { states, alphabet, startState, acceptingStates, transitions } = dfa;
  //set to track which states have been visited to avoid cycles
  const visited = new Set();
  //queue for breadth-first search starting from start state
  const queue = [startState];

  //perform BFS to explore all reachable states
  while (queue.length > 0) {
    const current = queue.shift();//dequeue the next state to explore
    
    //if an accepting state is reached, the language is not empty
    if (acceptingStates.includes(current)) return false; // Found accepting state

    visited.add(current);//mark this state as visited

    //explore all transitions from the current state
    for (let symbol of alphabet) {
      const key = `${current},${symbol}`; //rebuild transition key
      const next = transitions[key];    //get destination state
      
      //if the transition exists and we haven't visited the destination yet
      if (next !== undefined && !visited.has(next)) {
        queue.push(next); //add the destination state to the queue
      }
    }
  }

  //if we exhaust all reachable states without finding an accepting one, 
  //the dfa accepts no strings - its language is empty
  return true; // No accepting state reachable
}

// DFA that accepts 'ab'
const dfa1 = {
  states: [0, 1, 2],
  alphabet: ['a', 'b'],
  startState: 0,
  acceptingStates: [2],
  transitions: {
    '0,a': 1,
    '0,b': 0,
    '1,a': 1,
    '1,b': 2,
    '2,a': 2,
    '2,b': 2
  }
};

// DFA that loops forever but never reaches accepting state
const dfa2 = {
  states: [0, 1],
  alphabet: ['a', 'b'],
  startState: 0,
  acceptingStates: [1],
  transitions: {
    '0,a': 0,
    '0,b': 0,
    '1,a': 1,
    '1,b': 1
  }
};

// DFA with unreachable accepting state
const dfa3 = {
  states: [0, 1],
  alphabet: ['a', 'b'],
  startState: 0,
  acceptingStates: [1],
  transitions: {
    '0,a': 0,
    '0,b': 0
    // no way to reach state 1
  }
};

console.log("DFA1 recognizes empty language:", isEmptyLanguage(dfa1)); // ➜ false
console.log("DFA2 recognizes empty language:", isEmptyLanguage(dfa2)); // ➜ true
console.log("DFA3 recognizes empty language:", isEmptyLanguage(dfa3)); // ➜ true