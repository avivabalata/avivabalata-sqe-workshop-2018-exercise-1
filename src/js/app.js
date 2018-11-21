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
        $('#parsedCode').val(JSON.stringify(jsonFile, null, 2).replace('\n',''));

        $('#showTable').show()
        for(let i=0;i<parsedCode.length;i++) {
            let condition = parsedCode[i].condition.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            $('#showTable').append('<tr><td>'+parsedCode[i].line.toString() +'</td><td>'+ parsedCode[i].type.toString()+'</td><td>'
              +parsedCode[i].name.toString()+'</td><td>'+condition+'</td><td>'+parsedCode[i].value.toString()+'</td></tr>');
        }

    });
});


