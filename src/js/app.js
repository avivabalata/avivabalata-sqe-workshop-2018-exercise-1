import $ from 'jquery';
import {parseCode} from './code-analyzer';

$(document).ready(function () {
    let statements = new Array();
    let row = 1;
    let statement = function () {
        this.line = 0;
        this.type = null;
        this.name = null;
        this.condition = [];
        this.value = null;
    }

    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let jsonFile = parseCode(codeToParse);
        let parsedCode = parse(jsonFile);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });

    function parse(jsonFile) {
        let currentBody = jsonFile.body[0];
        if(currentBody.type == "FunctionDeclaration"){
            let state = new statement();
            state.line = row;
            state.name = currentBody.id.name;
            state.type = currentBody.type;
            statements.push(state);
            if(currentBody.params.length > 0){
                for(let j=0;j<currentBody.params.length;j++){
                    let state = new statement();
                    state.line = row;
                    state.name = currentBody.params[j].name;
                    state.type = currentBody.params[j].type;
                    statements.push(state);
                }
            }
        }
        row++;
        currentBody = currentBody.body;
        if(currentBody.type === "BlockStatement"){
            let arry = currentBody.body
            parseBlockStatement(arry);
        }
        return statements;
    }

    function parseBlockStatement(arry)
    {
        for(let k=0;k<arry.length;k++){
            parseByAtomicType(arry[k])
            row++;
        }
    }
    function parseByAtomicType(item)
    {
        if(item.type == "BlockStatement"){
            let arry = item.body
            parseBlockStatement(arry)
        } else if(item.type == "VariableDeclaration"){
            for(let h=0;h<item.declarations.length; h++){
                let state = new statement();
                state.line = row;
                state.type = item.declarations[h].type;
                state.name = item.declarations[h].id.name;
                statements.push(state);
            }
        } else if (item.type == "ExpressionStatement"){

        } else if (item.type == "WhileStatement") {

        } else if (item.type == "ReturnStatement") {

        } else if (item.type == "IfStatement") {

        }

    }

    function getExpresion(item)
    {
        // "UnaryExpression"
        // "BinaryExpression"
        // "MemberExpression"
        // "Literal"

        let str = "";
        return str;
    }
});

