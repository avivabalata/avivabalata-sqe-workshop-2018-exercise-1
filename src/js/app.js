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

        window.alert(parsedCode)
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));

        $('#showTable').show()
        for(let i=0;i<parsedCode.length;i++) {
            $('#showTable').append('<tr><td>'+parsedCode[i].line +'</td><td>'+ parsedCode[i].type+'</td><td>'
              +parsedCode[i].name+'</td><td>'+parsedCode[i].condition+''+'</td><td>'+parsedCode[i].value+'</td></tr>');
        }

    });
});


