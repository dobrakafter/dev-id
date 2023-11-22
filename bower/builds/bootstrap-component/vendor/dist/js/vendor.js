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


