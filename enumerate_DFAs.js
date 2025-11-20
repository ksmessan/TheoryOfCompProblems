

// Generate all possible transition functions
function generateTransitionFunctions() {
  const transitions = []; //declare transitions array
  //loop through all transition functions - for each state and symbol, choose a destination state.
  //the number of possible transitions is the number of states times the number of alphabet characters.
  //each transition can go to any state, so the below function describes the total number of states
  for (let i = 0; i < Math.pow(states.length, states.length * alphabet.length); i++) {
    const t = {}; //create transition function
    let n = i;// use n to encode one unique combination of transitions
    //for each state and symbol, define a destination state
    for (let s of states) {
      for (let a of alphabet) {
        const nextState = n % states.length; //choose next state using remainder
        n = Math.floor(n / states.length); //update n to prepare for next transition
        t[`${s},${a}`] = nextState;//store the transition
      }
    }
    transitions.push(t); //add the transition function to the list
  }
  return transitions; //return all transitions
}

// Generate all subsets of accepting states
function generateAcceptingSets() {
  const subsets = []; //this will hold all possible combinations of accepting states
  //there are 2^n subsets of n states (each state can either be accepting or not)
  for (let i = 0; i < Math.pow(2, states.length); i++) {
    const set = []; //one subset of accepting states
    //use bitmask to decide which states are included
    for (let j = 0; j < states.length; j++) {
      //shift bits from i right j places then checks if the j-th bit is 1. If it is, include it in accepting states.
      if ((i >> j) & 1) set.push(j);
    }
    subsets.push(set); //add this subset to the list
  }
  return subsets; //return all subsets of accepting states
}

// Combine transitions and accepting sets to form DFAs
function enumerateDFAs(limit = 20) {
  const transitions = generateTransitionFunctions(); //get all transition functions
  const acceptingSets = generateAcceptingSets();//get all accepting state subsets
  const dfas = []; //this will hold the final dfa objects

  //combine each transition function with each accepting set
  for (let t of transitions) {
    for (let a of acceptingSets) {
      dfas.push({
        states,
        alphabet,
        startState,
        acceptingStates: a,
        transitions: t
      });
      if (dfas.length >= limit) return dfas; //stop once we have reached the desired number
    }
  }
  return dfas;
}

const alphabet = ['a', 'b']; //given alphabet
const states = [0, 1]; //given states
const startState = 0; //initialize start state

const dfas = enumerateDFAs(20);
dfas.forEach((dfa, index) => {
  console.log(`DFA #${index + 1}`);
  console.log(`  Start state: ${dfa.startState}`);
  console.log(`  Accepting states: ${dfa.acceptingStates}`);
  console.log(`  Transitions:`);
  for (let key in dfa.transitions) {
    console.log(`    δ(${key}) = ${dfa.transitions[key]}`);
  }
  console.log('');
});