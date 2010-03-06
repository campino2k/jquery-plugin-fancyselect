/*!
 * jQuery.FancySelect()
 * 
 * @author Christian Jung <campino2k@gmail.com>
 * @license CC-BY-SA
 *
 * Date: Fr 26 Feb 2010 20:24:52 CET 
 *
 * Tutorial for developing jQuery plugins
 * http://www.learningjquery.com/2007/10/a-plugin-development-pattern
 *
 */

(function($) {
	$.fn.FancySelect = function(options) {
		opts = $.extend({}, $.fn.FancySelect.defaults, options);
		return this.each(function(){
			var $this = $(this);
			$this.wrap('<div class="select_replace" id="'+$this.attr('name')+'_dropdown"></div>').hide();
			var $replace = $this.parents('.select_replace');
			$replace.append('<div class="display">'+$this.find('option:selected').text()+'</div>')
			$replace.click(function(){
				$.fn.FancySelect.openList($replace);
			});
//			$( 'div.options' ).delegate('li', 'hover', function(){
//				$(this).toggleClass('entry_hover');
//			});
			$('div.options ul li').live('mouseover mouseout', function( event ){
				if( event.type == "mouseover" ) {
					$(this).addClass('entry_hover');
				} else {
					$(this).removeClass('entry_hover');
				}
			});
			$( 'div.options' ).delegate('li', 'click', function(){
				$.fn.FancySelect.clickEntry( $(this) );
			});
		});
		//$(document).click(close);
	},
	$.fn.FancySelect.openList = function(_el){

		var $this=$(_el); // save element
		var optgroups 	= $this.find('select optgroup');
		var options 	= $this.find('select option');
		var n_optgroups	= optgroups.length; //save number of optgroups
		var n_options 	= options.length; //save number of options
		var has_options = $this.find('.options').length; 

		if( n_options > 0 && has_options == 0 ) {
			//if optgroups only, loop is not needed, cause there is nothing clickable
			$this.append('<div class="options"></div>');
			var $list = $this.find('.options').empty();
			var i_optgroups;
			for( i_optgroups = 0; i_optgroups < n_optgroups; i_optgroups++ ) {
				$list.append('<div class="group"></div>');
				var $new_group = $list.find('div.group');
				if( $( optgroups[ i_optgroups ] ).attr('label') != "" ) {
					$new_group.append('<strong>' + $( optgroups[ i_optgroups ] ).attr('label') + '</strong>');
				}
				var o_options = $( optgroups[ i_optgroups ] ).find('option');
				var o_n_options = o_options.length;
				$.fn.FancySelect.renderOptions( o_options, o_n_options, $new_group );
			}
			if( n_optgroups == 0 ) {
				$.fn.FancySelect.renderOptions( options, n_options, $list );
			}
		} else if( $this.find('div.options:hidden').length ) {
			$this.find('div.options').show();
		} else {
			$.fn.FancySelect.closeList();		
		}
	},
	$.fn.FancySelect.renderOptions = function( _options, _n_options, _target ) {
		var i_options;
		$target = $(_target).append('<ul></ul>');
		$target = $target.find('ul');
		for( i_options = 0; i_options < _n_options; i_options++ ) {
			$target.append('<li value="' + $( _options[ i_options ]).attr('value') + '">'+ $( _options[ i_options ]).text() + '</li>');
		}
	},
	$.fn.FancySelect.clickEntry = function( el ){
		try{
			console.log( el );
		} catch( e ){}
	},
	$.fn.FancySelect.closeList = function( e ){
		$('div.options:visible').hide();
	},
	// plugin defaults - added as a property on our plugin function
	$.fn.FancySelect.defaults = {
		borderColor: '#ccc',
		color: '#0000fd'
	};
})(jQuery);
