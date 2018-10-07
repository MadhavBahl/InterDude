var questionCounter = 1;
var maxQuestion = 5;
var totalMarks = 0;

$(document).ready(function () {
    $.get("/api/questionnaire", function(data, status) {
        var marks = {
            id: data.obj._id
        };
        console.log('ASLFNASFLNASF: ',data);

        socket.emit('getInit', 'random');

        socket.on('nextQues', function (counter) {
            questionCounter = 1;
            $('#questionName').html(data.obj['question'+counter]);
            $('#countQues').html(questionCounter);

            console.log('QUESTION', questionCounter);
            if (questionCounter >= 5) {
                console.log('Last question');
                $('#nextQues').attr("disabled", "disabled" );
                $('#submitQuiz').removeAttr("disabled");
            }
        });
        
        // console.log(data.obj.question1);
        $('#questionName').html(data.obj.question1);
        $('#countQues').html(questionCounter);
        // var socket = io('http://localhost');
        $('#nextQues').click(function () {
            let currentMark = 0;
            currentMark = $('#marks').val();
            marks['mark' + questionCounter] = currentMark;
            totalMarks += parseInt(currentMark);
            console.log('current MARK: ', currentMark);
            $('#marks').val('0');
            questionCounter++;
            socket.emit('update', questionCounter);
        });

        socket.on('nextQues', function(counter) {
            console.log('It caught');
            questionCounter = counter;
            $('#questionName').html(data.obj['question'+counter]);
            $('#countQues').html(questionCounter);
            console.log('QUESTION', questionCounter);
            if (questionCounter == 5) {
                console.log('Last question');
                $('#nextQues').attr("disabled", "disabled" );
                $('#submitQuiz').removeAttr("disabled");
                console.log('final MARK: ', marks);
            }

        });

        socket.on('sendFinal', function (result) {
             $('.mainScreen').css({"display": "none"});
                    $('.resultWindow').css({"display": "block"});
                        $('.totMarks').html(result.totalMarks);
                        $('.addResults').append(`<a href="#!" class="collection-item itemOdd"><span class="right-align" style="float: right;"><b>${result.obj.marks1}/10</b></span>Question 1</a>
    <a href="#!" class="collection-item itemEven"><span class="right-align" style="float: right;"><b>${result.obj.marks2}/10</b></span>Question 2</a>
    <a href="#!" class="collection-item itemOdd"><span class="right-align" style="float: right;"><b>${result.obj.marks3}/10</b></span>Question 3</a>
    <a href="#!" class="collection-item itemEven"><span class="right-align" style="float: right;"><b>${result.obj.marks4}/10</b></span>Question 4</a>
    <a href="#!" class="collection-item itemOdd"><span class="right-align" style="float: right;"><b>${result.obj.marks5}/10</b></span>Question 5</a>`);
                    });

        $('#submitQuiz').click(function () {
            console.log('FINAL SUBMIT!');
            console.log(marks);
            let currentMark = 0;
            currentMark = $('#marks').val();
            totalMarks += parseInt(currentMark);
            marks['mark' + questionCounter] = currentMark;
            console.log('current MARK: ', currentMark);

            $.post(
                "/api/questionnaire/grade",
                marks,
                function(data) {
                    console.log('FINAL RESPONSE: ', data);

                   

                    let quesNum = 1;

                    data.totalMarks = totalMarks;

                    socket.emit('finalResult', data);

                    

                }
               ); 
        });

    });
});


