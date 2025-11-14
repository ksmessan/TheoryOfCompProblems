//define a funciton to validate whether a dfa is well formed
function validateDFA(dfa) {
    //destructure the dfa into its components
  const { states, alphabet, startState, acceptingStates, transitions } = dfa;

  // Rule 1: Non-empty states and alphabet
  if (!states || states.length === 0 || !alphabet || alphabet.length === 0) return 0;

  // Rule 2: Start state must be in states
  if (!states.includes(startState)) return 0;

  // Rule 3: Accepting states must be in states
  for (let acc of acceptingStates) {
    if (!states.includes(acc)) return 0;
  }

  // Rule 4: Transition function must be complete and valid
  for (let s of states) {
    for (let a of alphabet) {
      const key = `${s},${a}`;
      if (!(key in transitions)) return 0;
      if (!states.includes(transitions[key])) return 0;
    }
  }

  return 1;
}

// ✅ Valid DFA example
const validDFA = {
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

// ❌ Invalid DFA example (missing transition for 1,b)
const invalidDFA = {
  states: [0, 1],
  alphabet: ['a', 'b'],
  startState: 0,
  acceptingStates: [1],
  transitions: {
    '0,a': 1,
    '0,b': 0,
    '1,a': 1
    // Missing '1,b'
  }
};

console.log("Valid DFA result:", validateDFA(validDFA));     // ➜ 1
console.log("Invalid DFA result:", validateDFA(invalidDFA)); // ➜ 0