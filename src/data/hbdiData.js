// HBDI Assessment Data Structure
// Based on Hermann Brain Dominance Index materials

export const adjectivePairs = [
  {
    id: 1,
    left: { word: "Intuitive", color: "yellow" },
    right: { word: "Objective", color: "blue" }
  },
  {
    id: 2,
    left: { word: "Quantitative", color: "blue" },
    right: { word: "Synthesizer", color: "yellow" }
  },
  {
    id: 3,
    left: { word: "Harmonizing", color: "red" },
    right: { word: "Persistent", color: "green" }
  },
  {
    id: 4,
    left: { word: "Holistic", color: "yellow" },
    right: { word: "Intellectual", color: "blue" }
  },
  {
    id: 5,
    left: { word: "Logical", color: "blue" },
    right: { word: "Planner", color: "green" }
  },
  {
    id: 6,
    left: { word: "Spiritual", color: "red" },
    right: { word: "Simultaneous", color: "yellow" }
  },
  {
    id: 7,
    left: { word: "Direct", color: "blue" },
    right: { word: "Sequential", color: "green" }
  },
  {
    id: 8,
    left: { word: "Open-minded", color: "yellow" },
    right: { word: "Trusting", color: "red" }
  },
  {
    id: 9,
    left: { word: "Responsive", color: "red" },
    right: { word: "Challenging", color: "blue" }
  },
  {
    id: 10,
    left: { word: "Analytical", color: "blue" },
    right: { word: "Procedural", color: "green" }
  },
  {
    id: 11,
    left: { word: "Technical", color: "blue" },
    right: { word: "Structured", color: "green" }
  },
  {
    id: 12,
    left: { word: "Enthusiastic", color: "red" },
    right: { word: "Curious", color: "yellow" }
  },
  {
    id: 13,
    left: { word: "Receptive", color: "red" },
    right: { word: "Controlled", color: "green" }
  },
  {
    id: 14,
    left: { word: "Problem solver", color: "blue" },
    right: { word: "Conceptual", color: "yellow" }
  },
  {
    id: 15,
    left: { word: "Passionate", color: "red" },
    right: { word: "Punctual", color: "green" }
  },
  {
    id: 16,
    left: { word: "Safe-keeping", color: "green" },
    right: { word: "Risk Taker", color: "yellow" }
  },
  {
    id: 17,
    left: { word: "Co-operative", color: "red" },
    right: { word: "Rational", color: "blue" }
  },
  {
    id: 18,
    left: { word: "Artistic", color: "yellow" },
    right: { word: "Practical", color: "green" }
  },
  {
    id: 19,
    left: { word: "Trusting", color: "red" },
    right: { word: "Organised", color: "green" }
  },
  {
    id: 20,
    left: { word: "Disciplined", color: "blue" },
    right: { word: "Flexible", color: "yellow" }
  },
  {
    id: 21,
    left: { word: "Expressive", color: "red" },
    right: { word: "Creative", color: "yellow" }
  },
  {
    id: 22,
    left: { word: "Realistic", color: "blue" },
    right: { word: "Detailed", color: "green" }
  },
  {
    id: 23,
    left: { word: "Empathic", color: "red" },
    right: { word: "Critical", color: "blue" }
  },
  {
    id: 24,
    left: { word: "Interpersonal", color: "red" },
    right: { word: "Imaginative", color: "yellow" }
  }
];

export const adjectiveDefinitions = {
  "Intuitive": "obtained by using your feelings rather than by considering the facts",
  "Objective": "not influenced by personal feelings or opinions; considering only facts",
  "Quantitative": "a focus on the amount or number of something, rather than quality",
  "Synthesizer": "combining things into a connected whole",
  "Harmonizing": "To bring or come into agreement or harmony",
  "Persistent": "determined to do something despite difficulties",
  "Holistic": "Taking the whole situation into consideration",
  "Intellectual": "Related to logical thinking and understanding",
  "Logical": "reasoning based on true ideas or facts",
  "Planner": "planning the activities required to achieve a desired goal",
  "Spiritual": "connected with the human spirit, rather than the body or physical things",
  "Simultaneous": "happening or done at the same time as something else",
  "Direct": "going in the straightest line between two places without stopping or changing direction",
  "Sequential": "following in a particular order or sequence",
  "Open-minded": "willing to listen to, think about or accept different ideas",
  "Trusting": "tending to believe that other people are good, honest, etc",
  "Responsive": "reacting quickly and in a positive way",
  "Challenging": "Presenting difficulties or obstacles that require effort and determination to overcome",
  "Analytical": "thinking about something in order to understand it by looking at all the parts separately",
  "Procedural": "involving or following a formal procedure",
  "Technical": "involving or needing special skills or knowledge",
  "Structured": "to arrange or organize something into a system or pattern",
  "Enthusiastic": "feeling or showing a lot of excitement and interest about something",
  "Curious": "having a strong desire to know about something",
  "Receptive": "willing to listen to or to accept new ideas or suggestions",
  "Controlled": "doing or arranging something in a very careful way",
  "Problem solver": "finding ways of dealing with problems",
  "Conceptual": "ability to relate to ideas/concepts",
  "Passionate": "having strong feelings of enthusiasm or belief in someone",
  "Punctual": "happening or doing something at the arranged or correct time",
  "Safe-keeping": "protecting and keeping something safe",
  "Risk Taker": "doing things that involve risks to achieve something",
  "Co-operative": "working together with others towards a shared aim",
  "Rational": "able to make decisions based on reason rather than emotions",
  "Artistic": "showing a natural skill or pleasure in art, creativity, or aesthetic expression",
  "Practical": "connected with real situations rather than with ideas or theories",
  "Organised": "arranging parts of something into a particular order or structure",
  "Disciplined": "able to make yourself do things that you believe you should do",
  "Flexible": "able to change to suit new conditions or situations",
  "Expressive": "showing or able to show your thoughts and feelings",
  "Creative": "using skill and imagination to produce something new",
  "Realistic": "accepting what is sensible, appropriate, or possible to achieve",
  "Detailed": "paying great attention to details",
  "Empathic": "able to understand another's feelings because you can imagine what it's like to be that person",
  "Critical": "making fair, careful judgements about the good and bad qualities of somebody/something",
  "Interpersonal": "connected with relationships between people",
  "Imaginative": "having or showing new and exciting ideas"
};

export const colorMapping = {
  blue: { name: "Blue", description: "Analytical, Logical, Technical" },
  yellow: { name: "Yellow", description: "Creative, Conceptual, Artistic" },
  red: { name: "Red", description: "Leadership, Results-oriented, Decisive" },
  green: { name: "Green", description: "Interpersonal, Emotional, Spiritual" }
};

export const calculateScores = (selections) => {
  const scores = { blue: 0, yellow: 0, red: 0, green: 0 };
  
  selections.forEach((selection, index) => {
    const pair = adjectivePairs[index];
    const selectedOption = selection === 'left' ? pair.left : pair.right;
    scores[selectedOption.color]++;
  });
  
  return scores;
};