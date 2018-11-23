import assert from 'assert';
import {parseCode, parse} from '../src/js/code-analyzer';


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


describe('The function parser', () => {
    let node = '{"type":"Program","body":[{"body":{"type":"BlockStatement", "body":[]}, "id":{"name":"func","type":"Identifier"}, "params":[{"name":"x", "type":"Identifier"}], "type":"FunctionDeclaration"}],"sourceType":"script"}';
    it('is not the correct type Function', () => {
        assert.equal(
            parse(JSON.parse(node))[0].type,
            'FunctionDeclaration'
        );
    });
    it('dont parse correct the parameters', () => {
        assert.equal(
            parse(JSON.parse(node))[1].type,
            'Identifier'
        );
    });
});

describe('The variables declaration parser ', () => {

    let node1 = '{"type":"Program","body":[{"type":"VariableDeclaration", "kind":"let", "declarations":[{"type":"VariableDeclarator", "id":{"type":"Identifier", "name":"x"}}]}],"sourceType":"script"}';
    it('dont parse correct the declaration type', () => {
        assert.equal(parse(JSON.parse(node1))[0].type,'VariableDeclarator');
    });
    it('dont parse correct the declaration name : x', () => {
        assert.equal(parse(JSON.parse(node1))[0].name,'x');
    });
});

describe('The assignment expression parser', () => {

    let text = 'high = n - 1;';
    it('dont parse correct the expression type ', () => {
        assert.equal(
            parse(parseCode(text))[0].type,
            'AssignmentExpression'
        );});
    it('dont parse correct the expression name', () => {
        assert.equal(
            parse(parseCode(text))[0].name,
            'high'
        );});
    it('dont parse correct the expression value', () => {
        assert.equal(
            parse(parseCode(text))[0].value,
            'n-1'
        );});
});

describe('The complex expressions parser', () => {
    let text =  'mid = (low + high)/2';
    it('dont parse correct the expression type', () => {
        assert.equal(
            parse(parseCode(text))[0].type,
            'AssignmentExpression'
        );
    });
    it('dont parse correct the expression name', () => {
        assert.equal(
            parse(parseCode(text))[0].name,
            'mid'
        );
    });
});

describe('The member expressions parser', () => {
    let text =  'x = V[mid]';
    it('dont parse correct the expression type', () => {
        assert.equal(
            parse(parseCode(text))[0].type,
            'AssignmentExpression'
        );
    });
    it('dont parse correct the expression name', () => {
        assert.equal(
            parse(parseCode(text))[0].name,
            'x'
        );
    });
});


describe('The simple if statements parser', () => {
    let text = 'if( x > 1)\n' +
    '        low = 1;';
    it('dont parse correct the statement type', () => {
        assert.equal(
            parse(parseCode(text))[0].type,
            'IfStatement'
        );
    });
});

describe('The if with else statements parser', () => {
    let text = 'if ((i < 5) && (index < 9)) \n' +
    '            index = index + 1;\n' +
    '        else\n' +
    '            index = 0;';
    it('dont parse correct the statement IF type', () => {
        assert.equal(
            parse(parseCode(text))[0].type,
            'IfStatement'
        );
    });
});

describe('The elseIf statements parser', () => {
    let text = 'if (X < V[mid])\n' +
        '            high = mid - 1;\n' +
        '        else if (X > V[mid])\n' +
        '            low = mid + 1;\n';
    it('dont parse correct the statement IF type', () => {
        assert.equal(
            parse(parseCode(text))[0].type,
            'IfStatement'
        );
    });
    it('dont parse correct the statement ELSE IF type', () => {
        assert.equal(
            parse(parseCode(text))[2].type,
            'elseIfStatement'
        );
    });
});

describe('The complex else if statements parser', () => {
    let text = 'if (X < V[mid])\n' +
    '            high = mid - 1;\n' +
    '        else if (X > V[mid])\n' +
    '            low = mid + 1;\n' +
    '        else if (X > V[mid])\n' +
    '            low = mid + 1;\n' +
    '        else \n' +
    '            low = -1;\n';
    it('dont parse correct the statement IF type', () => {
        assert.equal(
            parse(parseCode(text))[0].type,
            'IfStatement'
        );});
    it('dont parse correct the statement ELSE IF type', () => {
        assert.equal(
            parse(parseCode(text))[2].type,
            'elseIfStatement'
        );});
});

describe('The for statements parser', () => {
    let text = 'for(let i=0;i<9;i++) {\n' +
        '    }';
    it('dont parse correct the statement type', () => {
        assert.equal(
            parse(parseCode(text))[0].type,
            'ForStatement'
        );
    });
});

describe('The while statements parser', () => {
    let text = 'while (low <= high) { \n' +
        'let x = 0;' +
        'let y = 0;}';
    it('dont parse correct the statement type', () => {
        assert.equal(
            parse(parseCode(text))[0].type,
            'WhileStatement'
        );
    });
});

describe('The return statements parser', () => {
    let text = 'function binarySearch(){ return 0;}';
    it('dont parse correct the statement type', () => {
        assert.equal(
            parse(parseCode(text))[1].type,
            'ReturnStatement'
        );
    });
});


