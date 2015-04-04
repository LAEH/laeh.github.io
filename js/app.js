var initialize = function() {
    $.getJSON('/assets/dirStructure.json', function(data) {
        generateRows(data.photo);
        makeBoxes();
    });
};

var generateRows = function(collections) {
    var $classification = $('.display.classification .content');
    for(var collection_id in collections) {
        var urls = collections[collection_id];
        var $row = $('<div>', {class: 'row'});
        var $header = $('<div>', {'class': 'header', 'html': 'Collection ' + collection_id});
        var $images = generateImages(urls);
        $row.append($header);
        $row.append($images);

        $classification.append($row);
    }
};

var generateImages = function(urls) {
    var $images = $('<div>', {class: 'boxes hscroll'});

    // For each url
    for(var i in urls) {
        var url = urls[i];

        // Main box
        var $box = $('<div>', {'class': 'box'});

        // Image
        var $img = $('<div>', {'class': 'img no' + i});
        $img.css('background-image', 'url(' + url + ')');

        // Infos
        var $infos = $('<div>', {'class': 'title'});
        var dumb_id = Math.round(Math.random() * 1000000000);
        var dumb_proba = Math.random().toFixed(2);
        var $infos_id = $('<div>', {'class': 'id', 'html': 'Id_' + dumb_id});
        var $infos_proba = $('<div>', {'class': 'proba', 'html': dumb_proba});

        $infos.append($infos_id);
        $infos.append($infos_proba);

        // Append components to main box
        $box.append($img);
        $box.append($infos);

        // Append main box to images container
        $images.append($box);
    }
    return $images;
};


var makeBoxes = function() {
    var $boxes = $('<div>', {class: 'boxes'});
    for (i = 1; i < 12; i++) {
        var url = '/img/art/1/i/';
        var $box = $('<div>', {'class': 'box'});
        var $img = $('<div>', {'class': 'img'});
        $img.css('background-image', 'url(/img/art/colors/' + i + '.jpg)');
        $box.append($img);
        $boxes.append($box);
    }
    $('.screen.gallery').append($boxes)
};

