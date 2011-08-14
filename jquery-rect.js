/*!
  * jquery rect (c) Martin Tillmann
  * https://github.com/mtillmann/jquery-rect
  * MIT License
*/
;(function($) {

	$.rect = function(elem,options) {

		var plugin = this;
		var defaults = {
			position : 'position',
			dimension : 'outer',
			withMargin : true
		};

		plugin.settings = {};

		var init = function() {
			plugin.settings = $.extend({}, defaults, options);
			plugin.el = elem;	
		}

		plugin.getRect = function( elem ){
			return toNum( $.extend( elem[plugin.settings.position](), getDimensions( elem ) ) );
		}
		
		plugin.getBox = function( elem ){
			return toBox( plugin.getRect( elem ) );
		}

		var toRect = function( box ){
			return {
				left : box.left,
				top : box.left,
				width : box.right - box.left,
				height: box.bottom - box.top
			};
		}

		var toBox = function( rect ){
			return {
				left : rect.left,
				top : rect.top,
				right : rect.left + rect.width,
				bottom: rect.top + rect.height
			};
		}
		
		var toNum = function( obj ){
			var key, nObj = {};
			for( key in obj ){
				nObj[key] = parseFloat( obj[key] );
			}
			return nObj;
		}
		
		var toStr = function( obj ){
			var key, nObj = {};
			for( key in obj ){
				nObj[key] = parseFloat( obj[key] ) + 'px';
				//convert to int again to prevent double units
			}
			return nObj;
		}
		
		var getDimensions = function( el ){
			return plugin.settings.dimension != 'css'?
				{
					width : $( el ).outerWidth( plugin.settings.withMargin ),
					height : $( el ).outerHeight( plugin.settings.withMargin )
				}:{
					width : $( el ).css('width'),
					height : $( el ).css('height')
				};
		}
		
		var getArea = function( obj ){
			if( !obj.width && !obj.height ){
				return (obj.right - obj.left) * (obj.bottom - obj.top);
			}
			return obj.width * obj.height;
		}
		
		plugin.intersects = function( el, returnBoxes ){
			if( !el )return false;
			
			var a = plugin.getBox( plugin.el ),
			b =  plugin.getBox( el );
			
			if (a.left <= b.right &&
				b.left <= a.right &&
				a.top <= b.bottom &&
				b.top <= a.bottom){
			
				if( returnBoxes )return [a,b];
							
				return true;
			}
			
			return false;
		}
		
		plugin.intersection = function( el, type ){
			var boxes = plugin.intersects( el, true );
			
			if(!boxes)return false;
			
			var a = boxes[0], b = boxes[1], 
			x0 = Math.max(a.left, b.left),
			x1 = Math.min(a.right, b.right),
			y0, y1, iRect;

			if (x0 <= x1) {
				y0 = Math.max(a.top, b.top);
				y1 = Math.min(a.bottom, b.bottom);

				if (y0 <= y1) {
					iBox = {
						left : x0,
						top : y0,
						right : x1,
						bottom : y1
					};					
					
					if( type == 'box' ){
						return iBox;
					}
					
					if( type == 'portion' ){
						var areaA = getArea( a ),
						areaB = getArea(toRect( iBox ));
						return areaB / areaA;
						//return Math.min( areaA, areaB ) / Math.max( areaA, areaB);
					}
					
					return toRect( iBox );
				}
			}
			return null;
		}

		init();

	}

}(jQuery));
