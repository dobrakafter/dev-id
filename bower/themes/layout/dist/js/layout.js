// RadioButton
(function ($) {
    "use strict";
    const ELEMENT = 'section.section-center';

    function delay(ms) {
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class SectionCenter {

        constructor(element) {
            this.$element = $(ELEMENT);
            let winHeight = $(document).outerHeight();

            if($('#header').length > 0 ){
                winHeight = winHeight - $('#header').outerHeight();
            }

            if($('#footer').length > 0 ){
                winHeight = winHeight - $('#footer').outerHeight();
            }

            winHeight = winHeight - this.$element.outerHeight();
            this.$element.css({'margin-top': (winHeight / 2) + 'px'})
           
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (SectionCenter.validate()) {
                new SectionCenter(ELEMENT);
            }
        }
    }
    SectionCenter.instance();
})(jQuery); 