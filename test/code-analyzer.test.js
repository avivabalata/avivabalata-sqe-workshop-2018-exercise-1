import assert from 'assert';
import {parseCode, parse} from '../src/js/code-analyzer';
import {statements, statement} from '../src/js/code-analyzer';

describe('The javascript parser to json', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '{"type":"Program","body":[],"sourceType":"script"}'
        );
    });

    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;')),
            '{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"a"},"init":{"type":"Literal","value":1,"raw":"1"}}],"kind":"let"}],"sourceType":"script"}'
        );
    });
});
describe('The parse function', () => {
    let node = '{"type":"Program","body":[{"body":{"type":"BlockStatement", "body":[]}, "id":{"name":"func","type":"Identifier"}, "params":[{"name":"x", "type":"Identifier"}], "type":"FunctionDeclaration"}],"sourceType":"script"}';
    it('is first statement is Function', () => {
        assert.equal(
            parse(JSON.parse(node))[0].type,
            'FunctionDeclaration'
        );
    });
    it('is first statement is Function', () => {
        assert.equal(
            parse(JSON.parse(node))[1].type,
            'Identifier'
        );
    });
});
// describe('The variables declaration', () => {
//     let node = '{"type":"VariableDeclaration", "kind":"let", "declarations":[{"type":"VariableDeclarator", "id":{"type":"Identifier", "name":"x"}}]}';
//     it('is first statement is varable', () => {
//         assert.equal(
//             parse(JSON.parse(node))[0].type,
//             'VariableDeclaration'
//         );
//     });
//     it('is first statement is Function', () => {
//         assert.equal(
//             parse(JSON.parse(node))[0].name,
//             'x'
//         );
//     });
// });
// describe('The parse function parameters', () => {
//     let node = '{"type":"Program","body":[{"body":{"type":"BlockStatement", "body":[]}, "id":{"name":"func","type":"Identifier"}, "params":[{"name":"x", "type":"Identifier"}], "type":"FunctionDeclaration"}],"sourceType":"script"}';
//     it('is second statement is parameter', () => {
//         assert.equal(
//             parse(JSON.parse(node))[1].type,
//             'Identifier'
//         );
//     });
// });