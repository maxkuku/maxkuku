function remCookie(c_name, value) {
    var exdays = -1;
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}


function obnul(){
    remCookie('name0');
    remCookie('name1');
    remCookie('name2');
    remCookie('name3');
    remCookie('name4');
    remCookie('used');
    //location.reload();
}

$(document).ready(function main(ev1){


    $('#count0').text(getCookie('name0'));
    $('#count1').text(getCookie('name1'));
    $('#count2').text(getCookie('name2'));
    $('#count3').text(getCookie('name3'));
    $('#count4').text(getCookie('name4'));





    $('#reset').click(function() {
            obnul();
            location.reload();
        }
    );



    $('[id^="quest_"]').click(function clickNum(ev2){

        var th = $(this);




        var T = setTimeout(function(){

            var str = th.attr('id');
            var thisId = str.replace(/\D/g, "");
            var i = thisId;
            var numb = parseInt(th.text());
            var numb1 = numb;
            var gCook = "";

            // пробуем поместиить в куки закрытые вопросы
            var used = getCookie('used');

            if(typeof used !== "undefined") {
                gCook = used + "," + thisId;
            }
            else{
                gCook = thisId;
            }

            setCookie('used', gCook, 1);


            document.addEventListener('keydown', function(event) {
                if (event.code == "KeyQ") {
                    $('#modal-quest').removeClass('in');
                    $('body').removeClass('modal-open');
                    cl_and_add();
                }
            });



            if(window.questions[thisId][2] === 1) {

                if ($('#modal-quest').length < 1) {
                    var html = '<div id="modal-quest" class="modal fade">';
                    html += '  <div class="modal-dialog">';
                    html += '    <div class="modal-content">';
                    html += '      <div class="modal-body alert-success"> ' + window.questions[thisId][1] + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                        '<!--div class="gamers"><span id="g1">1</span><span id="g2">2</span><span id="g3">3</span></div-->' +
                        '</div>';
                    html += '    </div>';
                    html += '  </div>';
                    html += '</div>';
                }
                else {
                    $('.modal-body').html('' + window.questions[thisId][1] + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><!--div class="gamers"><span id="g1">1</span><span id="g2">2</span><span id="g3">3</span></div-->');
                }

                $('body').append(html);
                th.addClass('active');
                $('#modal-quest').addClass('in');
                $('body').addClass('modal-open');


                // add chime and metronom
                play();





                document.addEventListener('keydown', function(event) {

                    if(event.code == "KeyO"){
                        if(window.questions[thisId][3] !== "") {
                            $('.modal-body').html('' + window.questions[thisId][3] + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><!--div class="gamers"><span id="g1">1</span><span id="g2">2</span><span id="g3">3</span></div-->');
                            $('.close').click(function () {
                                $('#modal-quest').removeClass('in');
                                $('body').removeClass('modal-open');
                                cl_and_add();
                            });
                            if(isPlaying(audio)) {
                                audio.pause();
                                audio.currentTime = 0
                            }
                        }
                        else{
                            $('#modal-quest').removeClass('in');
                            $('body').removeClass('modal-open');
                            cl_and_add();
                        }
                    }
                });


                $('.close').click(function () {
                    $('#modal-quest').removeClass('in');
                    $('body').removeClass('modal-open');
                    cl_and_add();
                });



                function play() {
                    var audio = document.getElementById("audio");
                    audio.play();


                }


                function isPlaying(audio) { return !audio.paused; }



                $('.gamers span').click(function () {
                    var gamerId = $(this).text();
                    var was = parseInt($('#count' + gamerId).text());
                    $('#count' + gamerId).text(was + numb);
                    $('#modal-quest').removeClass('in');
                    $('body').removeClass('modal-open');
                    window.questions[thisId][2] = 0;
                    $('#quest_' + thisId).css({'color':'transparent'});
                    var c_name = 'name' + gamerId;
                    setCookie(c_name, $('#count' + gamerId).text(), 1);
                    play();
                });



                function cl_and_add(){
                    war = parseInt($('#count0').text());
                    war4 = parseInt($('#count4').text());
                    war0 = parseInt($('#count0').text());
                    war = war + parseInt(numb);
                    war4 = war4 + parseInt(numb1);
                    war0 = war0 + 1;
                    $('#count0').text(war0);
                    $('#count4').text(war4);
                    $('#modal-quest').removeClass('in');
                    $('body').removeClass('modal-open');
                    window.questions[thisId][2] = 0;
                    $('#quest_' + thisId).css({'color':'transparent'});
                    var c_name = 'name4';
                    setCookie(c_name, war, 1);
                    setCookie('name4', war4, 1);
                    setCookie('name0', war0, 1);
                    if(isPlaying(audio)) {
                        audio.pause();
                        audio.currentTime = 0
                    }
                }

            }

        }, 1000, function(){
            th.removeClass('active');
        });
    });




    $('body').one("keydown", function(ev4) {
        if(ev4.which === 27){ // Escape
            $('#modal-quest').toggleClass('in');
            $('body').toggleClass('modal-open');
            $('.close').click(function () {
                $('#modal-quest').removeClass('in');
                $('body').removeClass('modal-open');
            });
        }
    })




});






function readSingleFile(evt) {
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function(e) {
            var contents = e.target.result;

            //alert( "Got the file.\n"
            //    +"name: " + f.name + "\n"
            //    +"type: " + f.type + "\n"
            //    +"size: " + f.size + " bytes\n"
            //    + "starts with: " + contents.substr(1, contents.indexOf("\n"))
            //);


            //console.log(contents)

            window.questions = new Array();
            var lines = contents.split('\n');
            for (var line = 0; line < lines.length; line++) {
                var whole = lines[line].split('*');

                if(whole.length > 1)
                    window.questions.push([0, whole[0].replace(/\ \ /g, ''), 1, whole[1]]);
                else
                    window.questions.push([0, whole[0].replace(/\ \ /g, ''), 1]);
            }


        }
        r.readAsText(f);
        if(document.URL.indexOf('two.html') > -1){
            dodo();
        }
    } else {
        alert("Failed to load file");
    }
}



function adding() {
    if ($('#modal-quest').length < 1) {
        var html = '<div id="modal-quest" class="modal fade">';
        html += '  <div class="modal-dialog">';
        html += '    <div class="modal-content">';
        html += '      <div class="modal-body alert-success">  <input type="file" id="fileinput" />  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '</div>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
    }
    else {
        $('.modal-body').html(' <input type="file" id="fileinput" /> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
    }

    $('body').append(html);
    $('#modal-quest').addClass('in');
    $('body').addClass('modal-open');

    $('.close').click(function () {
        $('#modal-quest').removeClass('in');
        $('body').removeClass('modal-open');
    });

}



function cl(){

    $('.close').click(function () {
        $('#modal-quest').removeClass('in');
        $('body').removeClass('modal-open');
    });
}


// читать файл если не онлайн
function rFile(url) {



        $.ajax({
            url: url
        }).done(function (data) {
            window.questions = new Array();
            var lines = data.split('\n');
            for (var line = 0; line < lines.length; line++) {
                var whole = lines[line].split('*');

                if(whole.length > 1)
                    window.questions.push([0, whole[0].replace(/\ \ /g, ''), 1, whole[1]]);
                else
                    window.questions.push([0, whole[0].replace(/\ \ /g, ''), 1]);

                window.online = 1;
            }
        }).fail(function (err) {


                setTimeout(function(dodo){
                    //$('body').on('click tap', function(){
                        adding();
                        document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
                    //});
                },1000);
            });


}

function dodo(){
    $('.modal-body').html('<p>Нужно нажать кнопку от 1 до 6 чтобы выбрать, какую тему убрать</p><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
    $('#modal-quest').addClass('in');
    $('body').addClass('modal-open');

    $('.close').click(function (e) {
        $('#modal-quest').removeClass('in');
        $('body').removeClass('modal-open');
    });
}


function change_by_cookie_after_reload(element){
    console.log(element);
    window.questions[element][2] = 0;
    $('#quest_' + element).css({'color': 'transparent'});
}





document.addEventListener("DOMContentLoaded", () => {
    setTimeout(function() {
        var used = getCookie('used');
        if (used.length) {
            var cooks = getCookie('used').split(",");
            if (Array.isArray(cooks))
                cooks.forEach(element => change_by_cookie_after_reload(element));

        }
    }, 500);
})



// закрыть вопросы, записанные в куках
function setCook(elt){
    var el = document.getElementById('quest_' + elt);
    console.log(el);
    window.questions[elt][2] = 0;
    el.style.color = 'transparent';
}



$(document).ready(function(){



    $('#logo').css({'opacity': 1});
    $('body').one('click tap', function () {
        setTimeout(function () {
            $('#logo').css({
                'height': '40px',
                'transform': 'translateX(0%)',
                'width': '4%',
                'left': '86%'
            });
            $('#logo').attr('class', 'cornered');
        }, 1000);
        setTimeout(function () {
            $('.first #top, .first #mid, .first #bottom').css({
                'opacity': 1
            });
        }, 2000);


        /*setTimeout(function () {
        var used = getCookie('used');
        if (typeof used !== "undefined") {
            var cooks = getCookie('used').split(",");
            if (Array.isArray(cooks))
                cooks.forEach(element => setCook(element))
        }
        }, 3000);*/
    });


})