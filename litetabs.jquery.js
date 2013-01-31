/*************************************************
*
*   project:    liteTabs - Lightweight jQuery tabs plugin
*   author:     Nicola Hibbert
*   author:     Leonardo
*   url:        http://nicolahibbert.com/lightweight-jquery-tab-plugin/
*   demo:       http://www.nicolahibbert.com/demo/liteTabs/
*
*   Version:    1.0.2
*   Copyright:  (c) 2010-2011 Nicola Hibbert
*   License:    MIT
*
*************************************************/
;(function($) {

    $.fn.liteTabs = function(options) {
        
        return this.each(function() {

            var defaults = {
                borders : false,
                boxed : false,
                fadeIn : false,
                height : 'auto',
                hideHash : true,
                rounded : false,
                selectedTab : 1,
                width : 500         
            },
        
            // merge defaults with options in new settings object
            settings = $.extend({}, defaults, options),
                
            // define key variables
            $this = $(this),
            $ul = $this.children('ul'),
            $tab = $ul.find('a'),
            $div = $this.children('div');

            // set liteTabs class for css & set optional overall width
            $this.addClass('liteTabs').width(settings.width);

            // option: set overall height
            $div.css({
                height : settings.height,
                width : settings.width - (parseInt($div.css('padding-left'), 10) + parseInt($div.css('padding-right'), 10)),
                position : 'absolute',
                left : -9999
            });

            // on tab click...
            $tab.on('click', function(e) {
                var filterHash = $div.removeClass('selected').filter('[name="' + this.hash + '"]');
            
                // defaults: add selected class to tab
                $tab.removeClass('selected');
                $(this).addClass('selected');

                // option: fade in divs
                if (settings.fadeIn) 
                    filterHash.css('opacity', 0.0)
                        .addClass('selected')
                        .animate({opacity:1.0}, 400);
                else
                    filterHash.addClass('selected');

                // option: hide hash change
                if (settings.hideHash) 
                    e.preventDefault();

            }); 

            // option: set selected tab
            if(settings.selectedTab)
                $tab.eq(settings.selectedTab - 1).trigger('click');

            // option: set rounded corners
            if(settings.rounded)
                $this.addClass('rounded');

            // option: set borders
            if(settings.borders) {
                $this.addClass('borders');
                $div.width($div.width() - (parseInt($div.css('border-left-width'), 10) + parseInt($div.css('border-right-width'), 10)));
            }

            // option: set boxed
            if(settings.boxed)
                $this.addClass('boxed');

        });
        
    };

})(window.jQuery || window.Zepto);
