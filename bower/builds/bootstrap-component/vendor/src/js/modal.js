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


