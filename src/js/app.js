import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {parse, start} from './code-analyzer';

$('#showTable').hide();

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        $('#showTable').hide();
        let codeToParse = $('#codePlaceholder').val();
        start();
        let jsonFile = parseCode(codeToParse);
        let parsedCode = parse(jsonFile);
        $('#showTable').empty();
        $('#showTable').append('<tr style="font-weight: bold"><td>Line</td><td>Type</td><td>Name</td><td>Condition</td><td>Value</td></tr>');
        for(let i=0;i<parsedCode.length;i++) {
            let condition = parsedCode[i].condition.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            $('#showTable').append('<tr><td>'+parsedCode[i].line.toString() +'</td><td>'+ parsedCode[i].type.toString()+'</td><td>'
              +parsedCode[i].name.toString()+'</td><td>'+condition+'</td><td>'+parsedCode[i].value.toString()+'</td></tr>');
        }
        $('#showTable').show();

    });
});


