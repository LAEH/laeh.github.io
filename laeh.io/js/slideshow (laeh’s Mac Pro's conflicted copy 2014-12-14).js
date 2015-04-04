slideshow = {
    initialize: function(opts) {
        this.collection = opts.images;
        this.$container = opts.$container;
        this.render();
    },

    start: function() {
        var random_indexes = this.randperm(this.collection.length);

        var $current = $('<div>', {'class': 'slide current'});
        $current.appendTo(this.$slide_wrap);

        var $next = $('<div>', {'class': 'slide next'});
        $next.appendTo(this.$slide_wrap);

        var idx = 0;
        this.loadBackground(this.collection[random_indexes[idx]], $current);
        this.loadBackground(this.collection[random_indexes[++idx]], $next);

        var _this = this;
        setInterval(function() {
            // Current -> Old
            $current.removeClass('current').addClass('old');
            var $cache_current = $current;
            setTimeout(function() {
                $cache_current.remove();
            }, 1000);

            // Next -> Current
            $next.removeClass('next').addClass('current');
            $current = $next;

            // Load next
            if (++idx > _this.collection.length) idx = 0;
            $next = $('<div>', {'class': 'slide next'});
            $next.appendTo(_this.$slide_wrap);
            _this.loadBackground(_this.collection[random_indexes[idx]], $next);
        }, 4000);
    },

    render: function() {
        this.$container.empty();
        this.$slide_wrap = $('<div>', {'class': 'slideWrap'});
        this.$container.append(this.$slide_wrap);
    },

    randperm: function(maxValue) {
        // First generate number sequence
        var permArray = new Array(maxValue);
        for (var i = 0; i < maxValue; i++) {
            permArray[i] = i;
        }

        // Draw out of the number sequence
        for (var j = (maxValue - 1); j >= 0; --j) {
            var randPos = Math.floor(i * Math.random());
            var tmpStore = permArray[j];
            permArray[j] = permArray[randPos];
            permArray[randPos] = tmpStore;
        }
        return permArray;
    },

    loadBackground: function(url, $el) {
        var image = new Image();
        image.onload = function() {
            $el.css({
                'background-image' : 'url(' + url + ')',
            });
        };
        image.onerror = function() {
            $el.remove();
        }
        image.src = url;
    },
};
