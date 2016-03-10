$(document).ready(function() {
    var players = [],
        player = 0,
        whodixit;
    $('#play').on('click', function() {
        var import_players = $('#players_submit').val();
        import_players.split("\n").forEach(function(player) {
            players.push(player);
        });
        if (players.length < 2) {
            $('#players').html('Pas assez de joueurs').show();
            $('#noplayers').hide();
        } else {
            $('#players').show();
            $('#noplayers').hide();
            dixit(players);
        }
    });

    function dixit(players) {
        if (typeof players != 'object') {
            $('#players').html("T'as oublié les joueurs banane");
        }
        setDixit();
        $('#players').html("Lancé aléatoire : " + whodixit + ' est déclaré dixit !');
        getBtn(true);
    }

    function setDixit() {
        whodixit = players[Math.floor((Math.random() * (players.length - 1)) + 1)];
    }

    function getBtn(first) {
        if (first === false) {
            roll();
        }
        $('#players').html($('#players').html() + "\n<div class='navbar navbar-fixed-bottom'><button class='btn btn-lg btn-block btn-primary' id='getBtn'>Play!</button><hr /><button class='btn btn-lg btn-block btn-danger' id='stopBtn'>Stop</button></div>");
        $('#getBtn').on('click', function() {
            getBtn(false);
        });
        $('#stopBtn').on('click', function() {
            stopBtn();
        });
    }

    function stopBtn() {
        $('#players').html('Vous devez être trop bourré pour jouer.');
    }

    function roll() {
        player++;
        if (player >= players.length) {
            player = 0;
        }
        var d1 = Math.floor((Math.random() * 6) + 1),
            d2 = Math.floor((Math.random() * 6) + 1),
            r = '';
        if (d1 == d2) r += "<br />" + players[player] + " distribue " + d1 + " coups";
        if ((d1 == 3 || d2 == 3) && (whodixit == players[player])) {
            r += "<br />" + whodixit + " n'est plus dixit ! Il boit un coup pour fêter ça !";
            whodixit = false;
        } else {
            if ((d1 == 3 || d2 == 3) && whodixit === false) {
                whodixit = players[player];
                r += "<br />" + whodixit + " devient le nouveau dixit !";
                if (d1 == 3 && d2 == 3) r += "<br />Fais boire un coup au dixit (" + whodixit + ")";
            } else {
                if (d1 == 3) r += "<br />Fais boire un coup au dixit (" + whodixit + ")";
                if (d2 == 3) r += "<br />Fais boire un coup au dixit (" + whodixit + ")";
            }
        }
        var last = (player - 1) < 0 ? players.length - 1 : player - 1,
            next = (player + 1) > players.length - 1 ? 0 : player + 1;

        if (parseInt(d1 + d2) == 9) r += "<br />" + players[last] + " boit !";
        if (parseInt(d1 + d2) == 10) r += "<br />" + players[player] + " boit !";
        if (parseInt(d1 + d2) == 11) r += "<br />" + players[next] + " boit !";
        if ((d1 == 5 && d2 == 1) || (d1 == 1 && d2 == 5)) r += "<br />" + players[player] + " invente une règle";
        if (r === '') r += "<br />" + players[player] + " est inutile et bois !";
        $('#players').html(players[player] + " lance le dé...<br />" + d1 + " et " + d2 + "<br /><div class='pull-left' style='margin-right:15px;'>" + genVisual(d1) + "</div><div class='pull-left'>" + genVisual(d2) + "</div><div class='clearfix'></div>" + "<br />" + r);
    }

    function genVisual(dice) {
        var visual = [
            "&nbsp;&nbsp;&nbsp;<br />&nbsp;o&nbsp;<br />&nbsp;&nbsp;&nbsp;",
            "o&nbsp;&nbsp;<br />&nbsp;&nbsp;&nbsp;<br />&nbsp;&nbsp;o",
            "o&nbsp;&nbsp;<br />&nbsp;o&nbsp;<br />&nbsp;&nbsp;o",
            "o&nbsp;o<br />&nbsp;&nbsp;&nbsp;<br />o&nbsp;o",
            "o&nbsp;o<br />&nbsp;o&nbsp;<br />o&nbsp;o",
            "o&nbsp;o<br />o&nbsp;o<br />o&nbsp;o"
        ];
        return visual[dice - 1];
    }
});
