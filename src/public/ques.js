var questionCounter = 1;
var maxQuestion = 5;
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

            if (questionCounter > 5) {

            }


        });

        $('#submitQuiz').click(function () {
            console.log('FINAL SUBMIT!');
            console.log(marks);
            let currentMark = 0;
            currentMark = $('#marks').val();
            marks['mark' + questionCounter] = currentMark;
            console.log('current MARK: ', currentMark);

            $.post(
                "/api/questionnaire/grade",
                marks,
                function(data) {
                    console.log('FINAL RESPONSE: ', data);
                }
               ); 
        });

    });
});

