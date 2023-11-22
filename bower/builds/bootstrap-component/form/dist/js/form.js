
(function ($) {
    "use strict";

    const SELECTTOR = 'form button[type="submit"][data-loader="true"]';
    const SELECTTOR_HREF = '[href][data-loader="true"]';

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    class Ui {
        static Loader() {
            return [
                '<div class="--loader">',
                '<div class="spinner">',
                '<div class="spinner-center"></div>',
                '</div>',
                '</div>'
            ].join('');
        }

        static LoaderBackdrop() {
            return [
                '<div class="--loader-backdrop"></div>'
            ].join('');
        }
    }

    class ButtonLoader {

        constructor(element) {
            this.$element = $(element);
            this.data = $(element).data();
            this.$form = $(element).closest('form');

            const self = this;
            this.$form.on('beforeSubmit', function (event) {
                event.preventDefault();
                $('body').append($(Ui.Loader()));
                if (!self.hasClosetModal()) {
                    $('body').append($(Ui.LoaderBackdrop()));
                }
            })
        }

        hasClosetModal() {
            return this.$form.closest('.modal.show').length > 0
        }

        static #validate() {
            return $(SELECTTOR).length > 0;
        }

        static instance() {
            if (ButtonLoader.#validate()) {
                delay(500).then(() => {
                    new ButtonLoader(SELECTTOR)
                })
            }
        }
    }
    ButtonLoader.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            ButtonLoader.instance();
        })
    });

    class LinkLoader {
        constructor(element) {
            this.$element = $(element);

            const self = this;
            this.$element.on('click', function (event) {
                self.#clear();
                $('body').append($(Ui.Loader()));
                $('body').append($(Ui.LoaderBackdrop()));
            })
        }

        #clear() {
            $('body').find('.--loader').remove()
            $('body').find('.--loader-backdrop').remove()
        }

        static #validate() {
            return $(SELECTTOR_HREF).length > 0;
        }

        static instance() {
            if (LinkLoader.#validate()) {
                delay(500).then(() => {
                    new LinkLoader(SELECTTOR_HREF)
                })
            }
        }
    }
    LinkLoader.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            LinkLoader.instance();
        })
    });

})(jQuery);




// @ts-nocheck
(function ($) {
    "use strict";
    const ELEMENT_INPUT = 'textarea.form-control'
    const TEXTFIELD_FLOATING = 'textfield-floating-label'
    const TEXTFIELD_FLOATING_ACTIVE = 'textfield-floating-label-active'
    const TEXTFIELD_FLOATING_COMPLETED = 'textfield-floating-label-completed'

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    class TextArea {

        constructor(element) {
            this.$element = $(element);

            const $input = this.$element;
            if ($input.length > 0) {
                $input
                    .on('focus', (e) => {
                        $(e.target).closest('.' + TEXTFIELD_FLOATING)
                            .addClass(TEXTFIELD_FLOATING_ACTIVE)
                            .addClass(TEXTFIELD_FLOATING_COMPLETED)
                    })
                    .on('focusout', (e) => {
                        $(e.target).closest('.' + TEXTFIELD_FLOATING).removeClass(TEXTFIELD_FLOATING_ACTIVE);
                        let value = $(e.target).val();
                        if (value.length === 0) {
                            $(e.target).closest('.' + TEXTFIELD_FLOATING).removeClass(TEXTFIELD_FLOATING_COMPLETED);
                        }
                    });

                if ($input.val().length > 0) {
                    $input.closest('.' + TEXTFIELD_FLOATING).addClass(TEXTFIELD_FLOATING_COMPLETED)
                }
            }
        }

        static validate() {
            return $(ELEMENT_INPUT).length > 0;
        }

        static instance() {
            if (TextArea.validate()) {
                $(ELEMENT_INPUT).each((i, element) => {
                    new TextArea(element);
                });
            }


        }
    }
    TextArea.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(300).then(() => {
            TextArea.instance();
        });
    });

})(jQuery); 
// @ts-nocheck
(function ($) {
"use strict";
const ELEMENT_INPUT = '.form-control'
const TEXTFIELD_FLOATING = 'textfield-floating-label'
const TEXTFIELD_FLOATING_ACTIVE = 'textfield-floating-label-active'
const TEXTFIELD_FLOATING_COMPLETED = 'textfield-floating-label-completed'

const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms));

class Textfield {

    constructor($textfield) {
        const $input = $textfield.find('input.form-control');
        if($input.length > 0){
            $input
                .on('focus', (e) => {
                    $(e.target).closest('.' + TEXTFIELD_FLOATING)
                        .addClass(TEXTFIELD_FLOATING_ACTIVE)
                        .addClass(TEXTFIELD_FLOATING_COMPLETED)
                })
                .on('focusout', (e) => {
                    $(e.target).closest('.' + TEXTFIELD_FLOATING).removeClass(TEXTFIELD_FLOATING_ACTIVE);
                    let value = $(e.target).val();
                    if (value.length === 0) {
                        $(e.target).closest('.' + TEXTFIELD_FLOATING).removeClass(TEXTFIELD_FLOATING_COMPLETED);
                    }
                });
            
            if ($input.val().length > 0) {
                $input.closest('.' + TEXTFIELD_FLOATING).addClass(TEXTFIELD_FLOATING_COMPLETED)
            }
        }
    }

    static validate() {
        return $(ELEMENT_INPUT).length > 0;
    }

    static instance() {
        if (Textfield.validate()) {
            $("." + TEXTFIELD_FLOATING).each((i, element) => {
                new Textfield($(element));
            });
        }


    }
}
Textfield.instance();

$(document).on('show.bs.modal',function(event){
    delay(700).then(() => {
        Textfield.instance();
    });
});

})(jQuery); 