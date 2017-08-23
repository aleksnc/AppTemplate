/*---Routs----*/
var pathName;


function pageGET() {

    $('.GETcontent').empty();
    var path = window.location.pathname.split("/");
     pathName = path[path.length - 1];


    switch (pathName) {
        case 'index.html':
            appendPage('_main.html', true);
            break;

        case 'registration.html':
            appendPage('_registration.html', true);
            break;

        case 'login.html':
            appendPage('_login.html');
            break;

        case 'account.html':
            appendPage('_account.html');
            break;

        case 'maps.html':
            appendPage('_maps.html');
            break;


        case 'settings.html':
            appendPage('_settings.html');
            break;

        case 'message.html':
            appendPage('_message.html');
            break;

        case 'search.html':
            appendPage('_maps.html');
            break;

        default:
            appendPage('_main.html', true);
            break;
    }
}

function appendPage(e) {
    if (arguments.length > 1) {
        $('.mainMenu').slideUp(arguments[1]);
    } else{
        $('.mainMenu').slideDown();
    }


    $.get(
        "/exp/template/" + e,
        onAjaxSuccess
    );

    function onAjaxSuccess(data) {


        $('.history').each(function(){

          var path = $(this).attr('href').split("/");
           var linkPath = path[path.length - 1];

            if(linkPath==pathName){
                $('.history').removeClass('active');
                $(this).addClass('active');
                console.log(pathName);
            }
        });

        $('.mainBlock').empty();
        $('.mainBlock').append(data);
    }
}

/*---END Routs----*/

function historyAPI() {
    window.onpopstate = function (event) {
        pageGET()
    }

    $(document).on('click', 'a.history', function (e) {
        console.log('ok');
        var uri = $(this).attr('href');
        e.preventDefault();
        history.pushState(null, '', uri);
        pageGET()
    })
}

$(document).ready(function () {
    pageGET();
    historyAPI();
})



