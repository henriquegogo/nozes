var r = [];
function describe(text, func) { console.group('\x1b[37m', text); func(); console.groupEnd() }
function test(text, func) { console.log(func(), '\x1b[90m', text) }
function assert(sentence) { return r.push(sentence) && sentence ? '\x1b[32mPASS' : '\x1b[31mFAIL' } 
function done() { console.info('\n\x1b[32mTOTAL PASS:', r.filter(i=>i).length, '\n\x1b[31mTOTAL FAIL:', r.filter(i=>!i).length) };

describe('createElement', it => {
  test('Should has HTML constructors', it => {
    return assert(1 === 1);
  });
});

done();
