// @ts-nocheck

// RadioButton
(function ($) {
    "use strict";
    const ELEMENTS = 'section.section-center';

    function delay(ms) {
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class SectionCenter {

        constructor(element) {
            this.$element = $(ELEMENTS);
            let winHeight = $(document).outerHeight();

            if ($('#header').length > 0) {
                winHeight = winHeight - $('#header').outerHeight();
            }

            if ($('#footer').length > 0) {
                winHeight = winHeight - $('#footer').outerHeight();
            }

            winHeight = winHeight - this.$element.outerHeight();
            this.$element.css({ 'margin-top': (winHeight / 2) + 'px' })

        }

        static validate() {
            return $(ELEMENTS).length > 0;
        }

        static instance() {
            if (SectionCenter.validate()) {
                new SectionCenter(ELEMENTS);
            }
        }
    }
    SectionCenter.instance();
})(jQuery); 