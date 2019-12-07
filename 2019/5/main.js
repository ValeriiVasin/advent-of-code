const program = require('./input');
const { run } = require('./solution');

const { output } = run(program, [1]);

console.log('#5.1', output.pop());
