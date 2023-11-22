// @ts-nocheck

(function($){
"use strict";

var TAG = 'Modal';
const ELEMENT_MODAL = '#modal-fixed-bottom';
const SELECTOR = '[data-modal-id="'+ELEMENT_MODAL.replace('#','')+'"]';

const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms));

class Options{
	modalId;target;title;toggle;url;
	constructor(option){
		Object.assign(this,option);
	}
}

class Modals {
	
    constructor(selector){
		this.$selector = $(selector);
		this.options = new Options($(selector).data());
		const self = this;

		if(this.options.url && this.options.modalId){
			const self = this;
			
			$(selector).on('click',function(e){
				e.preventDefault();
				e.stopImmediatePropagation();
				let modal = $('#' + self.options.modalId );
				modal.find('.modal-body').load(self.options.url);
				self.onHidden(modal);
				self.onShow(modal)
				modal.modal('show');
			});

		}
    }

	onShow(modal){
		const self = this;
		$(modal).on('show.bs.modal',function(event){
			const $dialog = $(event.target).find('.modal-dialog')
			const $body = $(event.target).find('.modal-body')
			
			delay(700).then(() => {
				$(event.target).find('.modal-header .header-title').text(self.options.title);
				const clientHeight = $(this).find('.modal-dialog').get(0).clientHeight;
				$(event.target).find('.modal-dialog').css({ bottom: clientHeight +'px' });
				if(clientHeight < 100){
					delay(500).then(() => {
						$(event.target).find('.modal-dialog').css({ bottom: clientHeight +'px' });
					})
				}
			})
		});
	}

	onHidden(modal){
		$(modal).on('hidden.bs.modal',function(event){
			$(event.target).find('.modal-dialog').removeAttr('style')
			$(event.target).find('.modal-body').children().remove();
		});
	}

    static validate(){
    	return $(ELEMENT_MODAL).length > 0 && $(SELECTOR).length > 0;
    }

    static instance(){
    	if (Modals.validate()) {
			$(SELECTOR).each(function(i,element){
				new Modals(element);
			});
    	}
    }
}

Modals.instance();
})(jQuery); 



(function ($) {

    "use strict";

    const TAG = 'MoneyInput';
    const SELECTOR = 'input.form-control.money-input';
    const ELEMENT = $('input.form-control.money-input');

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    Number.prototype.numberFormat = function (decimals, dec_point, thousands_sep) {
        dec_point = typeof dec_point !== 'undefined' ? dec_point : '.';
        thousands_sep = typeof thousands_sep !== 'undefined' ? thousands_sep : ',';

        var parts = this.toFixed(decimals).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

        return parts.join(dec_point);
    }

    class MoneyInput{
        constructor(element) {
            this.$element = $(element);
            this.$textfield = $(element).closest('.textfield');
            this.$inputTarget = this.$textfield.find('input[id][type="hidden"]')

            const self = this;
            this.$element
            .on('change',function(event){
                delay(500).then(() => {
                    self.$element.val( self.#getValue().numberFormat(0,'.','.') )
                    self.$inputTarget.val(self.#getValue());

                })
            })
            .on('keydown',function(event){
                delay(500).then(() => {
                    self.$element.val( self.#getValue().numberFormat(0,'.','.') )
                    self.$inputTarget.val(self.#getValue());
                })

            })

            delay(500).then(() => {
                if(this.$element.val().length > 0){
                    this.$element.trigger('change')

                }
            })

            var number = new Intl.NumberFormat();
        }

        #getValue(){
            let value = this.$element.val().replace(/[^0-9]/g,'');
            return isNaN(parseInt(value)) ? 0 : parseInt(value);
        }

        static validate() {
            return $(ELEMENT).length > 0 && $(ELEMENT).closest('.textfield').length > 0;
        }

        static instance() {
            if (MoneyInput.validate()) {
                $(ELEMENT).each(function(i,element){
                    new MoneyInput(element)
                })
            }
        }
    }

    MoneyInput.instance();

    $(document).on('show.bs.modal',function(event){
        delay(500).then(() => {
            let $element = $(event.target).find('.modal-body');
            $element.find(SELECTOR).each(function(i,element){
                new MoneyInput(element);
            });
        });
    });
})(jQuery);


(function ($) {
    'use strict';

var TAG = 'PasswordVisibility';
const VISIBILITY = 'visibility';
const VISIBILITY_OFF = 'visibility_off';
const INPUT_PASSWORD = 'input.form-control[type="password"]';

const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms));

class PasswordVisibility{

    constructor(element){
        this.$element = $(element);
        const self = this;
        const icon = $(element).find('.input-group-append .material-icons').text();
        $(element).find('.input-group-append .input-group-text').addClass('ripple-effect');

        $(element).find('.input-group-append').addClass('ripple-effect').on('click',function(e){
            if($(this).find('.material-icons').text() === VISIBILITY){
                self.#runVisibility();
                return;
            }

            if($(this).find('.material-icons').text() === VISIBILITY_OFF){
                self.#runVisibilityOff();
            }
        });

    }

    #runVisibility(){
        this.$element.find('input[id]').attr({type:'text'});
        this.$element.find('.input-group-append .material-icons').text(VISIBILITY_OFF);
    }

    #runVisibilityOff(){
        this.$element.find('input[id]').attr({type:'password'});
        this.$element.find('.input-group-append .material-icons').text(VISIBILITY);
    }

	static validate(){
		return $(INPUT_PASSWORD).length > 0;
	}

	static instance(){
		if (PasswordVisibility.validate()) {
            $(INPUT_PASSWORD).each((i,element) => {
                const $append = $(element).closest('.input-group').find('.input-group-append');
                if($append.length > 0){
                    if($append.find('.material-icons').length > 0 ){
                        new PasswordVisibility( $(element).closest('.input-group').get(0) )
                    }
                }
            });
		}
	}
}
PasswordVisibility.instance();

$(document).on('show.bs.modal',function(event){
    delay(300).then(() => {
        PasswordVisibility.instance();
    });
});
})(jQuery);
(function($, window, document) {
	'use strict';

	var Selector = {
        PARENT_SELECTOR: '',
        RIPPLE_EFFECT: ".ripple-effect",
        INK: '.ink'
    };
    
	var ClassName = {
        ANIMATE: "animate"
    };
    
	var Event = {
        MOUSEDOWN: 'mousedown',
        TOUCHSTART: 'touchstart',
    };
    
	var Template = {
        SPAN: "<span class='ink'></span>"
    };

	/**
	 * ------------------------------------------------------------------------
	 * Functions
	 * ------------------------------------------------------------------------
	 */

	function onMouseDown(e) {
		var rippler = $(e.target);
		$(Selector.INK).remove();
		// create .ink element if it doesn't exist
		if (rippler.find(Selector.INK).length === 0) {
			rippler.append(Template.SPAN);
		}
		var ink = rippler.find(Selector.INK);
		// prevent quick double clicks
		ink.removeClass(ClassName.ANIMATE);
		// set .ink diametr
		if (!ink.height() && !ink.width()) {
			var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
			ink.css({ height: d, width: d });
		}

		// get click coordinates
		var x = e.pageX - rippler.offset().left - ink.width() / 2;
		var y = e.pageY - rippler.offset().top - ink.height() / 2;

		// set .ink position and add class .animate
		ink.css({
			top: y + 'px',
			left: x + 'px'
		}).addClass(ClassName.ANIMATE);

		setTimeout(function () {
			ink.remove();
		}, 1500);
	}

	$(document).on(Event.MOUSEDOWN+" "+Event.TOUCHSTART, Selector.RIPPLE_EFFECT,onMouseDown);
})(jQuery, window, document);
// @ts-nocheck

(function ($) {
    "use strict";

    var TAG = 'RouteMapOrder';
    class RouteMapOrder {
        constructor(){}

        static instance() {
            const origin = $('.origin-item-dotted-inner')
            if(origin.length > 0){
                origin.css({
                    height: (origin.closest('.origin-group').outerHeight() + 10) + 'px'
                })
            }
        }
    }

    RouteMapOrder.instance();
})(jQuery);




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
// RadioButton
(function ($) {
    "use strict";
    const TAG = 'RadioGroup';
    const ELEMENT = '.radio-group';
    const RADIO_ITEM = '.radio-item';
    const RADIO_RIPPLE = 'button-ripple';
    const CHECKED = 'checked';
    const HOVER = 'hover';
    const ACTIVE = 'active';
    const INPUT_RADIO = 'input.radio-item-form-control[type="radio"]';

    function delay(ms) {
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    /**
     * @param {number} ms
     * @param {function} cb
     */
    function timeOut(ms, cb) {
        return new Promise(resolve => setTimeout(resolve, ms)).then(cb);
    }

    class RadioGroup {

        constructor(inputRadio) {
            this.$element = $(ELEMENT);
            this.$listRadioButton = $(ELEMENT).find(RADIO_ITEM);

            const self = this;
            this.$inputRadio = $(inputRadio);
            this.$inputRadio.on('change', function (event) {

                if (event?.target?.checked) {

                    self.#clearCheked(event.target);
                    self.#addCheked($(event.target).closest(RADIO_ITEM).get(0))
                }
            });

            if (this.$inputRadio.is(':' + CHECKED)) {
                this.$inputRadio.trigger('change');
            }
        }

        /**
         * @param {ELEMENT} inputRadio
         */
        #clearCheked(inputRadio) {
            $(inputRadio).closest(ELEMENT).find(RADIO_ITEM).each(function (i, radio) {
                if ($(radio).hasClass(CHECKED)) {
                    $(radio).addClass(HOVER);
                    timeOut(300, () => {
                        $(radio).removeClass(HOVER);
                    })
                }
                $(radio).removeClass(CHECKED);
            });
            return this;
        }

        #addCheked(radioButton) {
            $(radioButton).addClass(CHECKED).addClass(RADIO_RIPPLE);
            delay(1000).then(() => $(radioButton).removeClass(RADIO_RIPPLE));
        }

        #handleRadioCheked(inputRadio) {
            this.$element.find(INPUT_RADIO).each(function (i, input) {
                input.checked = false;
            });
            inputRadio.checked = true;
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (RadioGroup.validate()) {
                $(ELEMENT).find(INPUT_RADIO).each((i, element) => {
                    new RadioGroup(element);
                });
            }
        }
    }
    RadioGroup.instance();
    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            RadioGroup.instance();
        })
    });
})(jQuery); 

// chebox-switch
(function ($) {
    "use strict";
    const ELEMENT = '.switch-checkbox'
    const INPUT_ELEMENT = 'input.switch-checkbox-form-control[type="checkbox"]';
    const SWITCH_RIPPLE = 'switch-ripple';
    const CHECKED = 'checked';

    function delay(ms) {
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class Switch {

        constructor(element) {
            this.$element = $(element);
            this.$inputCheckbox = $(element).find(INPUT_ELEMENT);

            const self = this;
            this.$inputCheckbox.on('change', function (e) {
                const context = $(e.target).closest(ELEMENT);
                self.addRipple(context);
                self.switchCollapseShow(e.target.checked);

                if (e.target.checked) {
                    context.addClass(CHECKED);
                }
                else {
                    context.removeClass(CHECKED)
                }
            });

            if (this.$inputCheckbox.is(':' + CHECKED)) {
                const context = this.$inputCheckbox.closest(ELEMENT);
                context.addClass(CHECKED);
                self.addRipple(context);
                this.switchCollapseShow(true);
            }
        }

        addRipple(context) {
            context.addClass(SWITCH_RIPPLE);
            delay(1000).then(() => context.removeClass(SWITCH_RIPPLE))
        }

        switchCollapseShow(bools) {
            if (this.#validateCollapse()) {
                delay(500).then(() => {
                    $(this.$inputCheckbox.data('target')).collapse((bools ? 'show' : 'hide'))
                })
            }
        }

        #validateCollapse() {
            let validate = Object.keys(this.$inputCheckbox.data()).filter(v => ['target', 'toggle'].includes(v)).length === 2;
            return validate && this.$inputCheckbox.data('toggle') === 'collapse' && $(this.$inputCheckbox.data('target')).length > 0;
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (Switch.validate()) {
                $(ELEMENT).each((i, element) => {
                    new Switch(element);
                });
            }
        }
    }
    Switch.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            Switch.instance();

        })
    });
})(jQuery); 


// checkbox-outline
(function ($) {
    "use strict";
    const TAG = 'CheckboxOutline'
    const ELEMENT = '.checkbox-outline';
    const INPUT_ELEMENT = 'input.checkbox-outline-form-control[type="checkbox"]';
    const CHECKED = 'checked';
    const CHECKBOX_RIPPLE = 'checkbox-outline-ripple';

    function delay(ms) {
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class CheckboxOutline {

        constructor(inputCheckbox) {
            this.$inputCheckbox = $(inputCheckbox);
            const self = this;
            this.$inputCheckbox.on('change', function (e) {
                const context = $(e.target).closest(ELEMENT);
                if (e.target.checked) {
                    context.addClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                    delay(1000).then(() => context.removeClass(CHECKBOX_RIPPLE));
                }
                else {
                    context.removeClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                    delay(1000).then(() => context.removeClass(CHECKBOX_RIPPLE));
                }
            });

            if (this.$inputCheckbox.is(':' + CHECKED)) {
                this.$inputCheckbox.closest(ELEMENT).addClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                delay(1000).then(() => this.$inputCheckbox.closest(ELEMENT).removeClass(CHECKBOX_RIPPLE));
            }

        }

        #controlLabel() {
            $(ELEMENT).on('click', 'label', function (e) {
                console.log(e);
            })
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (CheckboxOutline.validate()) {
                $(ELEMENT).find(INPUT_ELEMENT).each(function (i, inputCheckbox) {
                    new CheckboxOutline(inputCheckbox)
                });
            }
        }
    }
    CheckboxOutline.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            CheckboxOutline.instance();
        })
    });
})(jQuery); 