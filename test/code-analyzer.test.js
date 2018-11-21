import assert from 'assert';
import {parseCode, parse} from '../src/js/code-analyzer';
import {statements, statement} from '../src/js/code-analyzer';

let func = 'function binarySearch(X, V, n){\n' +
    '    let low, high, mid, index;\n' +
    '    low = 0;\n' +
    '    high = n - 1;\n' +
    '    if( x > 1)\n' +
    '        low = 1;\n' +
    '    for(let i=0;i<9;i++) {\n' +
    '        if (i < 5) \n' +
    '            index = index + 1;\n' +
    '        else\n' +
    '            index = 0;\n' +
    '    }\n' +
    '    while (low <= high) {\n' +
    '        mid = (low + high)/2;\n' +
    '        if (X < V[mid])\n' +
    '            high = mid - 1;\n' +
    '        else if (X > V[mid])\n' +
    '            low = mid + 1;\n' +
    '        else if (X == V[mid])\n' +
    '            return mid;\n' +
    '        else\n' +
    '            return 0;\n' +
    '        if (X < V[mid])\n' +
    '            high = mid - 1;\n' +
    '        else if (X > V[mid])\n' +
    '            low = mid + 1;\n' +
    '    }\n' +
    '    return -1;\n' +
    '}';


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


describe('The parse function to statements', () => {
    let node = '{"type":"Program","body":[{"body":{"type":"BlockStatement", "body":[]}, "id":{"name":"func","type":"Identifier"}, "params":[{"name":"x", "type":"Identifier"}], "type":"FunctionDeclaration"}],"sourceType":"script"}';
    it('is first statement is type Function', () => {
        assert.equal(
            parse(JSON.parse(node))[0].type,
            'FunctionDeclaration'
        );
    });
    it('is second statement is type identifier', () => {
        assert.equal(
            parse(JSON.parse(node))[1].type,
            'Identifier'
        );
    });
});

describe('check variables declaration', () => {

    let node1 = '{"type":"Program","body":[{"type":"VariableDeclaration", "kind":"let", "declarations":[{"type":"VariableDeclarator", "id":{"type":"Identifier", "name":"x"}}]}],"sourceType":"script"}';
    it('is first statement type is variable', () => {
        assert.equal(parse(JSON.parse(node1))[0].type,'VariableDeclarator');
    });
    it('is first statement name is x', () => {
        assert.equal(parse(JSON.parse(node1))[0].name,'x');
    });
});

let parsed = parseCode(func);

describe('check assignment expression', () => {
    it('is expression in right place', () => {
        assert.equal(
            parse(parsed)[8].type,
            'AssignmentExpression'
        );
    });
    it('is expression is right name and value', () => {
        assert.equal(
            parse(parsed)[8].name,
            'low'
        );
        assert.equal(
            parse(parsed)[8].value,
            '0'
        );
    });
});

///// continue
describe('check complex expressions', () => {
    it('is second statement is parameter', () => {
        assert.equal(
            parse(parsed)[10].type,
            'IfStatement'
        );
    });
});

describe('check if statements', () => {
    it('is second statement is parameter', () => {
        assert.equal(
            parse(parsed)[10].type,
            'IfStatement'
        );
    });
});

describe('check else if statements', () => {
    it('is second statement is parameter', () => {
        assert.equal(
            parse(parsed)[10].type,
            'IfStatement'
        );
    });
});

describe('check for statements', () => {
    it('is second statement is parameter', () => {
        assert.equal(
            parse(parsed)[12].type,
            'ForStatement'
        );
    });
});
describe('check while statements', () => {
    it('is second statement is parameter', () => {
        assert.equal(
            parse(parsed)[12].type,
            'ForStatement'
        );
    });
});

describe('check return statements', () => {
    it('is second statement is parameter', () => {
        assert.equal(
            parse(parsed)[12].type,
            'ForStatement'
        );
    });
});


