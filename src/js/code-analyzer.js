import * as esprima from 'esprima';
import $ from 'jquery';
export {parse};
export {start};
export {parseCode};

let statementFunc = new Map();
let statements = new Array();
let row = 1;
let statement = function () {
    this.line = 0;
    this.type = null;
    this.name = null;
    this.condition = null;
    this.value = null;
};


const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse);
};



function start() {
    row = 1 ;
    statementFunc['BlockStatement'] = parseBlockStatement;
    statementFunc['FunctionDeclaration'] = parseFunction;
    statementFunc['ExpressionStatement'] = getExpresion;
    statementFunc['ReturnStatement']= parseReturn;
    statementFunc['WhileStatement'] = parseWhile;
    statementFunc['VariableDeclaration'] = parseVariable;
    statementFunc['Identifier'] = parseIdentifier;
    statementFunc['Literal'] = parseLiteral;
    statementFunc['AssignmentExpression'] = parseAssignmentExpression;
    statementFunc['BinaryExpression'] = parseBinaryExpresion;
    statementFunc['UnaryExpression'] = parseUnaryExpression;
    statementFunc['IfStatement'] = parseIfStatement;
    statementFunc['MemberExpression'] = parseMemberExpression;
    statementFunc['ForStatement'] = parseforStatement;
    statementFunc['UpdateExpression'] = parseUpdateExpression;
}

const parse = (jsonFile)=>{

    let currentBody = jsonFile.body[0];
    // function statement
    statementFunc[currentBody.type].call(undefined, currentBody);

    // Block statement
    statementFunc[currentBody.body.type].call(undefined, currentBody.body);

    return statements;
}

function parseFunction(currentBody) {

    let state = new statement();
    state.line = row;
    state.name = currentBody.id.name;
    state.type = currentBody.type;
    state.condition = '';
    state.value = '';
    statements.push(state);
    if(currentBody.params.length > 0){
        for(let j=0;j<currentBody.params.length;j++){
            let state = new statement();
            state.line = row;
            state.name = currentBody.params[j].name;
            state.type = currentBody.params[j].type;
            state.condition = '';
            state.value = '';
            statements.push(state);
        }
    }
    row++;
}

function parseVariable(item) {
    for(let h=0;h<item.declarations.length; h++){
        let state = new statement();
        state.line = row;
        state.type = item.declarations[h].type;
        state.name = item.declarations[h].id.name;
        state.condition = '';
        state.value = '';
        statements.push(state);
    }
}
function parseForVariable(item) {

    let str = item.kind+' ';
    for(let i=0; i<item.declarations.length;i++){
        let id = statementFunc[item.declarations[i].id.type].call(undefined, item.declarations[i].id);
        let init = statementFunc[item.declarations[i].init.type].call(undefined, item.declarations[i].init);
        str+=id+'='+init;
    }
    return str;
}

function parseBlockStatement(arry)
{
    let current = arry.body;
    for(let k=0;k<current.length;k++){
        statementFunc[current[k].type].call(undefined, current[k]);
        row++;
    }
}
function getExpresion(item)
{
    statementFunc[item.expression.type].call(undefined, item.expression);
}
function parseReturn(body) {
    let state = new statement();
    state.line = row;
    state.type = body.type;
    state.value = statementFunc[body.argument.type].call(undefined, body.argument);
    state.condition = '';
    state.name = '';
    statements.push(state);
}

function parseforStatement(item) {

    let init = parseForVariable(item.init);
    let test = statementFunc[item.test.type].call(undefined, item.test);
    let update = statementFunc[item.update.type].call(undefined, item.update);

    let state = new statement();
    state.line = row;
    state.type = item.type;
    state.condition = init+';'+test+';'+update;
    state.name = '';
    state.value = '';
    statements.push(state);

    row++;

    statementFunc[item.body.type].call(undefined, item.body);
}

function parseIfStatement(item) {

    let ifstate = new statement();
    if(item.test !== undefined){
        ifstate.line = row;
        ifstate.type = item.type;
        ifstate.condition = statementFunc[item.test.type].call(undefined, item.test);
        ifstate.value = '';
        ifstate.name = '';
        statements.push(ifstate);
        row++;
        statementFunc[item.consequent.type].call(undefined, item.consequent);
        row++;
    }
    if(item.alternate.type == 'IfStatement'){
        elseIf(item.alternate);
    } else {
        statementFunc[item.alternate.type].call(undefined, item.alternate);
    }
}
function elseIf(item) {
    let ifstate = new statement();
    ifstate.line = row;
    ifstate.type = 'else'+item.type;
    ifstate.condition = statementFunc[item.test.type].call(undefined, item.test);
    ifstate.name = '';
    ifstate.value = '';
    statements.push(ifstate);
    row++;
    statementFunc[item.consequent.type].call(undefined, item.consequent);
    row++;

    if(item.alternate.type == 'IfStatement'){
        elseIf(item.alternate);
    } else {
        statementFunc[item.alternate.type].call(undefined, item.alternate);
    }
}
function parseWhile(item) {
    let state = new statement();
    state.line = row;
    state.type = item.type;
    state.condition = statementFunc[item.test.type].call(undefined,item.test);
    state.value = '';
    state.name = '';
    statements.push(state);
    row ++;

    statementFunc[item.body.type].call(undefined, item.body);
}
function parseIdentifier(item) {
    return item.name;
}
function parseLiteral(item) {
    return item.value;
}
function parseAssignmentExpression(item) {
    let state = new statement();
    state.line = row;
    state.type = item.type;
    state.name = statementFunc[item.left.type].call(undefined, item.left);
    state.value = statementFunc[item.right.type].call(undefined, item.right);
    state.condition = '';
    statements.push(state);
}
function parseMemberExpression(item) {
    let obj = statementFunc[item.object.type].call(undefined, item.object);
    let pro = statementFunc[item.property.type].call(undefined, item.property);
    return obj+'['+pro+']';
}
function parseBinaryExpresion(item) {
    let left = statementFunc[item.left.type].call(undefined, item.left);
    let right = statementFunc[item.right.type].call(undefined, item.right);
    return left+''+item.operator+right;
}
function parseUnaryExpression(item) {
    let arg = statementFunc[item.argument.type].call(undefined, item.argument);
    let op = item.operator;
    return op+''+arg;
}
function parseUpdateExpression(item){
    let arg = statementFunc[item.argument.type].call(undefined, item.argument);
    let op = item.operator;
    return arg+op;
}
