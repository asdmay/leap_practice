(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

},{}],2:[function(require,module,exports){
var Pointable = require('./pointable'),
  glMatrix = require("gl-matrix")
  , vec3 = glMatrix.vec3
  , mat3 = glMatrix.mat3
  , mat4 = glMatrix.mat4
  , _ = require('underscore');


var Bone = module.exports = function(finger, data) {
  this.finger = finger;

  this._center = null, this._matrix = null;

  /**
  * An integer code for the name of this bone.
  *
  * * 0 -- metacarpal
  * * 1 -- proximal
  * * 2 -- medial
  * * 3 -- distal
  * * 4 -- arm
  *
  * @member type
  * @type {number}
  * @memberof Leap.Bone.prototype
  */
  this.type = data.type;

  /**
   * The position of the previous, or base joint of the bone closer to the wrist.
   * @type {vector3}
   */
  this.prevJoint = data.prevJoint;

  /**
   * The position of the next joint, or the end of the bone closer to the finger tip.
   * @type {vector3}
   */
  this.nextJoint = data.nextJoint;

  /**
   * The estimated width of the tool in millimeters.
   *
   * The reported width is the average width of the visible portion of the
   * tool from the hand to the tip. If the width isn't known,
   * then a value of 0 is returned.
   *
   * Pointable objects representing fingers do not have a width property.
   *
   * @member width
   * @type {number}
   * @memberof Leap.Pointable.prototype
   */
  this.width = data.width;

  var displacement = new Array(3);
  vec3.sub(displacement, data.nextJoint, data.prevJoint);

  this.length = vec3.length(displacement);


  /**
   *
   * These fully-specify the orientation of the bone.
   * See examples/threejs-bones.html for more info
   * Three vec3s:
   *  x (red): The rotation axis of the finger, pointing outwards.  (In general, away from the thumb )
   *  y (green): The "up" vector, orienting the top of the finger
   *  z (blue): The roll axis of the bone.
   *
   *  Most up vectors will be pointing the same direction, except for the thumb, which is more rightwards.
   *
   *  The thumb has one fewer bones than the fingers, but there are the same number of joints & joint-bases provided
   *  the first two appear in the same position, but only the second (proximal) rotates.
   *
   *  Normalized.
   */
  this.basis = data.basis;
};

Bone.prototype.left = function(){

  if (this._left) return this._left;

  this._left =  mat3.determinant(this.basis[0].concat(this.basis[1]).concat(this.basis[2])) < 0;

  return this._left;

};


/**
 * The Affine transformation matrix describing the orientation of the bone, in global Leap-space.
 * It contains a 3x3 rotation matrix (in the "top left"), and center coordinates in the fourth column.
 *
 * Unlike the basis, the right and left hands have the same coordinate system.
 *
 */
Bone.prototype.matrix = function(){

  if (this._matrix) return this._matrix;

  var b = this.basis,
      t = this._matrix = mat4.create();

  // open transform mat4 from rotation mat3
  t[0] = b[0][0], t[1] = b[0][1], t[2]  = b[0][2];
  t[4] = b[1][0], t[5] = b[1][1], t[6]  = b[1][2];
  t[8] = b[2][0], t[9] = b[2][1], t[10] = b[2][2];

  t[3] = this.center()[0];
  t[7] = this.center()[1];
  t[11] = this.center()[2];

  if ( this.left() ) {
    // flip the basis to be right-handed
    t[0] *= -1;
    t[1] *= -1;
    t[2] *= -1;
  }

  return this._matrix;
};

/**
 * Helper method to linearly interpolate between the two ends of the bone.
 *
 * when t = 0, the position of prevJoint will be returned
 * when t = 1, the position of nextJoint will be returned
 */
Bone.prototype.lerp = function(out, t){

  vec3.lerp(out, this.prevJoint, this.nextJoint, t);

};

/**
 *
 * The center position of the bone
 * Returns a vec3 array.
 *
 */
Bone.prototype.center = function(){

  if (this._center) return this._center;

  var center = vec3.create();
  this.lerp(center, 0.5);
  this._center = center;
  return center;

};

// The negative of the z-basis
Bone.prototype.direction = function(){

 return [
   this.basis[2][0] * -1,
   this.basis[2][1] * -1,
   this.basis[2][2] * -1
 ];

};

},{"./pointable":16,"gl-matrix":22,"underscore":23}],3:[function(require,module,exports){
var CircularBuffer = module.exports = function(size) {
  this.pos = 0;
  this._buf = [];
  this.size = size;
}

CircularBuffer.prototype.get = function(i) {
  if (i == undefined) i = 0;
  if (i >= this.size) return undefined;
  if (i >= this._buf.length) return undefined;
  return this._buf[(this.pos - i - 1) % this.size];
}

CircularBuffer.prototype.push = function(o) {
  this._buf[this.pos % this.size] = o;
  return this.pos++;
}

},{}],4:[function(require,module,exports){
var chooseProtocol = require('../protocol').chooseProtocol
  , EventEmitter = require('events').EventEmitter
  , _ = require('underscore');

var BaseConnection = module.exports = function(opts) {
  this.opts = _.defaults(opts || {}, {
    host : '127.0.0.1',
    enableGestures: false,
    scheme: this.getScheme(),
    port: this.getPort(),
    background: false,
    optimizeHMD: false,
    requestProtocolVersion: BaseConnection.defaultProtocolVersion
  });
  this.host = this.opts.host;
  this.port = this.opts.port;
  this.scheme = this.opts.scheme;
  this.protocolVersionVerified = false;
  this.background = null;
  this.optimizeHMD = null;
  this.on('ready', function() {
    this.enableGestures(this.opts.enableGestures);
    this.setBackground(this.opts.background);
    this.setOptimizeHMD(this.opts.optimizeHMD);

    if (this.opts.optimizeHMD){
      console.log("Optimized for head mounted display usage.");
    }else {
      console.log("Optimized for desktop usage.");
    }

  });
};

// The latest available:
BaseConnection.defaultProtocolVersion = 6;

BaseConnection.prototype.getUrl = function() {
  return this.scheme + "//" + this.host + ":" + this.port + "/v" + this.opts.requestProtocolVersion + ".json";
}


BaseConnection.prototype.getScheme = function(){
  return 'ws:'
}

BaseConnection.prototype.getPort = function(){
  return 6437
}


BaseConnection.prototype.setBackground = function(state) {
  this.opts.background = state;
  if (this.protocol && this.protocol.sendBackground && this.background !== this.opts.background) {
    this.background = this.opts.background;
    this.protocol.sendBackground(this, this.opts.background);
  }
}

BaseConnection.prototype.setOptimizeHMD = function(state) {
  this.opts.optimizeHMD = state;
  if (this.protocol && this.protocol.sendOptimizeHMD && this.optimizeHMD !== this.opts.optimizeHMD) {
    this.optimizeHMD = this.opts.optimizeHMD;
    this.protocol.sendOptimizeHMD(this, this.opts.optimizeHMD);
  }
}

BaseConnection.prototype.handleOpen = function() {
  if (!this.connected) {
    this.connected = true;
    this.emit('connect');
  }
}

BaseConnection.prototype.enableGestures = function(enabled) {
  this.gesturesEnabled = enabled ? true : false;
  this.send(this.protocol.encode({"enableGestures": this.gesturesEnabled}));
}

BaseConnection.prototype.handleClose = function(code, reason) {
  if (!this.connected) return;
  this.disconnect();

  // 1001 - an active connection is closed
  // 1006 - cannot connect
  if (code === 1001 && this.opts.requestProtocolVersion > 1) {
    if (this.protocolVersionVerified) {
      this.protocolVersionVerified = false;
    }else{
      this.opts.requestProtocolVersion--;
    }
  }
  this.startReconnection();
}

BaseConnection.prototype.startReconnection = function() {
  var connection = this;
  if(!this.reconnectionTimer){
    (this.reconnectionTimer = setInterval(function() { connection.reconnect() }, 500));
  }
}

BaseConnection.prototype.stopReconnection = function() {
  this.reconnectionTimer = clearInterval(this.reconnectionTimer);
}

// By default, disconnect will prevent auto-reconnection.
// Pass in true to allow the reconnection loop not be interrupted continue
BaseConnection.prototype.disconnect = function(allowReconnect) {
  if (!allowReconnect) this.stopReconnection();
  if (!this.socket) return;
  this.socket.close();
  delete this.socket;
  delete this.protocol;
  delete this.background; // This is not persisted when reconnecting to the web socket server
  delete this.optimizeHMD;
  delete this.focusedState;
  if (this.connected) {
    this.connected = false;
    this.emit('disconnect');
  }
  return true;
}

BaseConnection.prototype.reconnect = function() {
  if (this.connected) {
    this.stopReconnection();
  } else {
    this.disconnect(true);
    this.connect();
  }
}

BaseConnection.prototype.handleData = function(data) {
  var message = JSON.parse(data);

  var messageEvent;
  if (this.protocol === undefined) {
    messageEvent = this.protocol = chooseProtocol(message);
    this.protocolVersionVerified = true;
    this.emit('ready');
  } else {
    messageEvent = this.protocol(message);
  }
  this.emit(messageEvent.type, messageEvent);
}

BaseConnection.prototype.connect = function() {
  if (this.socket) return;
  this.socket = this.setupSocket();
  return true;
}

BaseConnection.prototype.send = function(data) {
  this.socket.send(data);
}

BaseConnection.prototype.reportFocus = function(state) {
  if (!this.connected || this.focusedState === state) return;
  this.focusedState = state;
  this.emit(this.focusedState ? 'focus' : 'blur');
  if (this.protocol && this.protocol.sendFocused) {
    this.protocol.sendFocused(this, this.focusedState);
  }
}

_.extend(BaseConnection.prototype, EventEmitter.prototype);
},{"../protocol":17,"events":29,"underscore":23}],5:[function(require,module,exports){
var BaseConnection = module.exports = require('./base')
  , _ = require('underscore');


var BrowserConnection = module.exports = function(opts) {
  BaseConnection.call(this, opts);
  var connection = this;
  this.on('ready', function() { connection.startFocusLoop(); })
  this.on('disconnect', function() { connection.stopFocusLoop(); })
}

_.extend(BrowserConnection.prototype, BaseConnection.prototype);

BrowserConnection.__proto__ = BaseConnection;

BrowserConnection.prototype.useSecure = function(){
  return location.protocol === 'https:'
}

BrowserConnection.prototype.getScheme = function(){
  return this.useSecure() ? 'wss:' : 'ws:'
}

BrowserConnection.prototype.getPort = function(){
  return this.useSecure() ? 6436 : 6437
}

BrowserConnection.prototype.setupSocket = function() {
  var connection = this;
  var socket = new WebSocket(this.getUrl());
  socket.onopen = function() { connection.handleOpen(); };
  socket.onclose = function(data) { connection.handleClose(data['code'], data['reason']); };
  socket.onmessage = function(message) { connection.handleData(message.data) };
  socket.onerror = function(error) {

    // attempt to degrade to ws: after one failed attempt for older Leap Service installations.
    if (connection.useSecure() && connection.scheme === 'wss:'){
      connection.scheme = 'ws:';
      connection.port = 6437;
      connection.disconnect();
      connection.connect();
    }

  };
  return socket;
}

BrowserConnection.prototype.startFocusLoop = function() {
  if (this.focusDetectorTimer) return;
  var connection = this;
  var propertyName = null;
  if (typeof document.hidden !== "undefined") {
    propertyName = "hidden";
  } else if (typeof document.mozHidden !== "undefined") {
    propertyName = "mozHidden";
  } else if (typeof document.msHidden !== "undefined") {
    propertyName = "msHidden";
  } else if (typeof document.webkitHidden !== "undefined") {
    propertyName = "webkitHidden";
  } else {
    propertyName = undefined;
  }

  if (connection.windowVisible === undefined) {
    connection.windowVisible = propertyName === undefined ? true : document[propertyName] === false;
  }

  var focusListener = window.addEventListener('focus', function(e) {
    connection.windowVisible = true;
    updateFocusState();
  });

  var blurListener = window.addEventListener('blur', function(e) {
    connection.windowVisible = false;
    updateFocusState();
  });

  this.on('disconnect', function() {
    window.removeEventListener('focus', focusListener);
    window.removeEventListener('blur', blurListener);
  });

  var updateFocusState = function() {
    var isVisible = propertyName === undefined ? true : document[propertyName] === false;
    connection.reportFocus(isVisible && connection.windowVisible);
  }

  // save 100ms when resuming focus
  updateFocusState();

  this.focusDetectorTimer = setInterval(updateFocusState, 100);
}

BrowserConnection.prototype.stopFocusLoop = function() {
  if (!this.focusDetectorTimer) return;
  clearTimeout(this.focusDetectorTimer);
  delete this.focusDetectorTimer;
}

},{"./base":4,"underscore":23}],6:[function(require,module,exports){
var WebSocket = require('ws')
  , BaseConnection = require('./base')
  , _ = require('underscore');

var NodeConnection = module.exports = function(opts) {
  BaseConnection.call(this, opts);
  var connection = this;
  this.on('ready', function() { connection.reportFocus(true); });
}

_.extend(NodeConnection.prototype, BaseConnection.prototype);

NodeConnection.__proto__ = BaseConnection;

NodeConnection.prototype.setupSocket = function() {
  var connection = this;
  var socket = new WebSocket(this.getUrl());
  socket.on('open', function() { connection.handleOpen(); });
  socket.on('message', function(m) { connection.handleData(m); });
  socket.on('close', function(code, reason) { connection.handleClose(code, reason); });
  socket.on('error', function() { connection.startReconnection(); });
  return socket;
}

},{"./base":4,"underscore":23,"ws":24}],7:[function(require,module,exports){
(function (process){
var Frame = require('./frame')
  , Hand = require('./hand')
  , Pointable = require('./pointable')
  , Finger = require('./finger')
  , CircularBuffer = require("./circular_buffer")
  , Pipeline = require("./pipeline")
  , EventEmitter = require('events').EventEmitter
  , gestureListener = require('./gesture').gestureListener
  , Dialog = require('./dialog')
  , _ = require('underscore');

/**
 * Constructs a Controller object.
 *
 * When creating a Controller object, you may optionally pass in options
 * to set the host , set the port, enable gestures, or select the frame event type.
 *
 * ```javascript
 * var controller = new Leap.Controller({
 *   host: '127.0.0.1',
 *   port: 6437,
 *   enableGestures: true,
 *   frameEventName: 'animationFrame'
 * });
 * ```
 *
 * @class Controller
 * @memberof Leap
 * @classdesc
 * The Controller class is your main interface to the Leap Motion Controller.
 *
 * Create an instance of this Controller class to access frames of tracking data
 * and configuration information. Frame data can be polled at any time using the
 * [Controller.frame]{@link Leap.Controller#frame}() function. Call frame() or frame(0) to get the most recent
 * frame. Set the history parameter to a positive integer to access previous frames.
 * A controller stores up to 60 frames in its frame history.
 *
 * Polling is an appropriate strategy for applications which already have an
 * intrinsic update loop, such as a game.
 *
 * loopWhileDisconnected defaults to true, and maintains a 60FPS frame rate even when Leap Motion is not streaming
 * data at that rate (such as no hands in frame).  This is important for VR/WebGL apps which rely on rendering for
 * regular visual updates, including from other input devices.  Flipping this to false should be considered an
 * optimization for very specific use-cases.
 *
 *
 */


var Controller = module.exports = function(opts) {
  var inNode = (typeof(process) !== 'undefined' && process.versions && process.versions.node),
    controller = this;

  opts = _.defaults(opts || {}, {
    inNode: inNode
  });

  this.inNode = opts.inNode;

  opts = _.defaults(opts || {}, {
    frameEventName: this.useAnimationLoop() ? 'animationFrame' : 'deviceFrame',
    suppressAnimationLoop: !this.useAnimationLoop(),
    loopWhileDisconnected: true,
    useAllPlugins: false,
    checkVersion: true
  });

  this.animationFrameRequested = false;
  this.onAnimationFrame = function(timestamp) {
    if (controller.lastConnectionFrame.valid){
      controller.emit('animationFrame', controller.lastConnectionFrame);
    }
    controller.emit('frameEnd', timestamp);
    if (
      controller.loopWhileDisconnected &&
      ( ( controller.connection.focusedState !== false )  // loop while undefined, pre-ready.
        || controller.connection.opts.background) ){
      window.requestAnimationFrame(controller.onAnimationFrame);
    }else{
      controller.animationFrameRequested = false;
    }
  };
  this.suppressAnimationLoop = opts.suppressAnimationLoop;
  this.loopWhileDisconnected = opts.loopWhileDisconnected;
  this.frameEventName = opts.frameEventName;
  this.useAllPlugins = opts.useAllPlugins;
  this.history = new CircularBuffer(200);
  this.lastFrame = Frame.Invalid;
  this.lastValidFrame = Frame.Invalid;
  this.lastConnectionFrame = Frame.Invalid;
  this.accumulatedGestures = [];
  this.checkVersion = opts.checkVersion;
  if (opts.connectionType === undefined) {
    this.connectionType = (this.inBrowser() ? require('./connection/browser') : require('./connection/node'));
  } else {
    this.connectionType = opts.connectionType;
  }
  this.connection = new this.connectionType(opts);
  this.streamingCount = 0;
  this.devices = {};
  this.plugins = {};
  this._pluginPipelineSteps = {};
  this._pluginExtendedMethods = {};
  if (opts.useAllPlugins) this.useRegisteredPlugins();
  this.setupFrameEvents(opts);
  this.setupConnectionEvents();
  
  this.startAnimationLoop(); // immediately when started
}

Controller.prototype.gesture = function(type, cb) {
  var creator = gestureListener(this, type);
  if (cb !== undefined) {
    creator.stop(cb);
  }
  return creator;
}

/*
 * @returns the controller
 */
Controller.prototype.setBackground = function(state) {
  this.connection.setBackground(state);
  return this;
}

Controller.prototype.setOptimizeHMD = function(state) {
  this.connection.setOptimizeHMD(state);
  return this;
}

Controller.prototype.inBrowser = function() {
  return !this.inNode;
}

Controller.prototype.useAnimationLoop = function() {
  return this.inBrowser() && !this.inBackgroundPage();
}

Controller.prototype.inBackgroundPage = function(){
  // http://developer.chrome.com/extensions/extension#method-getBackgroundPage
  return (typeof(chrome) !== "undefined") &&
    chrome.extension &&
    chrome.extension.getBackgroundPage &&
    (chrome.extension.getBackgroundPage() === window)
}

/*
 * @returns the controller
 */
Controller.prototype.connect = function() {
  this.connection.connect();
  return this;
}

Controller.prototype.streaming = function() {
  return this.streamingCount > 0;
}

Controller.prototype.connected = function() {
  return !!this.connection.connected;
}

Controller.prototype.startAnimationLoop = function(){
  if (!this.suppressAnimationLoop && !this.animationFrameRequested) {
    this.animationFrameRequested = true;
    window.requestAnimationFrame(this.onAnimationFrame);
  }
}

/*
 * @returns the controller
 */
Controller.prototype.disconnect = function() {
  this.connection.disconnect();
  return this;
}

/**
 * Returns a frame of tracking data from the Leap.
 *
 * Use the optional history parameter to specify which frame to retrieve.
 * Call frame() or frame(0) to access the most recent frame; call frame(1) to
 * access the previous frame, and so on. If you use a history value greater
 * than the number of stored frames, then the controller returns an invalid frame.
 *
 * @method frame
 * @memberof Leap.Controller.prototype
 * @param {number} history The age of the frame to return, counting backwards from
 * the most recent frame (0) into the past and up to the maximum age (59).
 * @returns {Leap.Frame} The specified frame; or, if no history
 * parameter is specified, the newest frame. If a frame is not available at
 * the specified history position, an invalid Frame is returned.
 **/
Controller.prototype.frame = function(num) {
  return this.history.get(num) || Frame.Invalid;
}

Controller.prototype.loop = function(callback) {
  if (callback) {
    if (typeof callback === 'function'){
      this.on(this.frameEventName, callback);
    }else{
      // callback is actually of the form: {eventName: callback}
      this.setupFrameEvents(callback);
    }
  }

  return this.connect();
}

Controller.prototype.addStep = function(step) {
  if (!this.pipeline) this.pipeline = new Pipeline(this);
  this.pipeline.addStep(step);
}

// this is run on every deviceFrame
Controller.prototype.processFrame = function(frame) {
  if (frame.gestures) {
    this.accumulatedGestures = this.accumulatedGestures.concat(frame.gestures);
  }
  // lastConnectionFrame is used by the animation loop
  this.lastConnectionFrame = frame;
  this.startAnimationLoop(); // Only has effect if loopWhileDisconnected: false
  this.emit('deviceFrame', frame);
}

// on a this.deviceEventName (usually 'animationFrame' in browsers), this emits a 'frame'
Controller.prototype.processFinishedFrame = function(frame) {
  this.lastFrame = frame;
  if (frame.valid) {
    this.lastValidFrame = frame;
  }
  frame.controller = this;
  frame.historyIdx = this.history.push(frame);
  if (frame.gestures) {
    frame.gestures = this.accumulatedGestures;
    this.accumulatedGestures = [];
    for (var gestureIdx = 0; gestureIdx != frame.gestures.length; gestureIdx++) {
      this.emit("gesture", frame.gestures[gestureIdx], frame);
    }
  }
  if (this.pipeline) {
    frame = this.pipeline.run(frame);
    if (!frame) frame = Frame.Invalid;
  }
  this.emit('frame', frame);
  this.emitHandEvents(frame);
}

/**
 * The controller will emit 'hand' events for every hand on each frame.  The hand in question will be passed
 * to the event callback.
 *
 * @param frame
 */
Controller.prototype.emitHandEvents = function(frame){
  for (var i = 0; i < frame.hands.length; i++){
    this.emit('hand', frame.hands[i]);
  }
}

Controller.prototype.setupFrameEvents = function(opts){
  if (opts.frame){
    this.on('frame', opts.frame);
  }
  if (opts.hand){
    this.on('hand', opts.hand);
  }
}

/**
  Controller events.  The old 'deviceConnected' and 'deviceDisconnected' have been depricated -
  use 'deviceStreaming' and 'deviceStopped' instead, except in the case of an unexpected disconnect.

  There are 4 pairs of device events recently added/changed:
  -deviceAttached/deviceRemoved - called when a device's physical connection to the computer changes
  -deviceStreaming/deviceStopped - called when a device is paused or resumed.
  -streamingStarted/streamingStopped - called when there is/is no longer at least 1 streaming device.
									  Always comes after deviceStreaming.
  
  The first of all of the above event pairs is triggered as appropriate upon connection.  All of
  these events receives an argument with the most recent info about the device that triggered it.
  These events will always be fired in the order they are listed here, with reverse ordering for the
  matching shutdown call. (ie, deviceStreaming always comes after deviceAttached, and deviceStopped 
  will come before deviceRemoved).
  
  -deviceConnected/deviceDisconnected - These are considered deprecated and will be removed in
  the next revision.  In contrast to the other events and in keeping with it's original behavior,
  it will only be fired when a device begins streaming AFTER a connection has been established.
  It is not paired, and receives no device info.  Nearly identical functionality to
  streamingStarted/Stopped if you need to port.
*/
Controller.prototype.setupConnectionEvents = function() {
  var controller = this;
  this.connection.on('frame', function(frame) {
    controller.processFrame(frame);
  });
  // either deviceFrame or animationFrame:
  this.on(this.frameEventName, function(frame) {
    controller.processFinishedFrame(frame);
  });


  // here we backfill the 0.5.0 deviceEvents as best possible
  // backfill begin streaming events
  var backfillStreamingStartedEventsHandler = function(){
    if (controller.connection.opts.requestProtocolVersion < 5 && controller.streamingCount == 0){
      controller.streamingCount = 1;
      var info = {
        attached: true,
        streaming: true,
        type: 'unknown',
        id: "Lx00000000000"
      };
      controller.devices[info.id] = info;

      controller.emit('deviceAttached', info);
      controller.emit('deviceStreaming', info);
      controller.emit('streamingStarted', info);
      controller.connection.removeListener('frame', backfillStreamingStartedEventsHandler)
    }
  }

  var backfillStreamingStoppedEvents = function(){
    if (controller.streamingCount > 0) {
      for (var deviceId in controller.devices){
        controller.emit('deviceStopped', controller.devices[deviceId]);
        controller.emit('deviceRemoved', controller.devices[deviceId]);
      }
      // only emit streamingStopped once, with the last device
      controller.emit('streamingStopped', controller.devices[deviceId]);

      controller.streamingCount = 0;

      for (var deviceId in controller.devices){
        delete controller.devices[deviceId];
      }
    }
  }
  // Delegate connection events
  this.connection.on('focus', function() {

    if ( controller.loopWhileDisconnected ){

      controller.startAnimationLoop();

    }

    controller.emit('focus');

  });
  this.connection.on('blur', function() { controller.emit('blur') });
  this.connection.on('protocol', function(protocol) {

    protocol.on('beforeFrameCreated', function(frameData){
      controller.emit('beforeFrameCreated', frameData)
    });

    protocol.on('afterFrameCreated', function(frame, frameData){
      controller.emit('afterFrameCreated', frame, frameData)
    });

    controller.emit('protocol', protocol); 
  });

  this.connection.on('ready', function() {

    if (controller.checkVersion && !controller.inNode){
      // show dialog only to web users
      controller.checkOutOfDate();
    }

    controller.emit('ready');
  });

  this.connection.on('connect', function() {
    controller.emit('connect');
    controller.connection.removeListener('frame', backfillStreamingStartedEventsHandler)
    controller.connection.on('frame', backfillStreamingStartedEventsHandler);
  });

  this.connection.on('disconnect', function() {
    controller.emit('disconnect');
    backfillStreamingStoppedEvents();
  });

  // this does not fire when the controller is manually disconnected
  // or for Leap Service v1.2.0+
  this.connection.on('deviceConnect', function(evt) {
    if (evt.state){
      controller.emit('deviceConnected');
      controller.connection.removeListener('frame', backfillStreamingStartedEventsHandler)
      controller.connection.on('frame', backfillStreamingStartedEventsHandler);
    }else{
      controller.emit('deviceDisconnected');
      backfillStreamingStoppedEvents();
    }
  });

  // Does not fire for Leap Service pre v1.2.0
  this.connection.on('deviceEvent', function(evt) {
    var info = evt.state,
        oldInfo = controller.devices[info.id];

    //Grab a list of changed properties in the device info
    var changed = {};
    for(var property in info) {
      //If a property i doesn't exist the cache, or has changed...
      if( !oldInfo || !oldInfo.hasOwnProperty(property) || oldInfo[property] != info[property] ) {
        changed[property] = true;
      }
    }

    //Update the device list
    controller.devices[info.id] = info;

    //Fire events based on change list
    if(changed.attached) {
      controller.emit(info.attached ? 'deviceAttached' : 'deviceRemoved', info);
    }

    if(!changed.streaming) return;

    if(info.streaming) {
      controller.streamingCount++;
      controller.emit('deviceStreaming', info);
      if( controller.streamingCount == 1 ) {
        controller.emit('streamingStarted', info);
      }
      //if attached & streaming both change to true at the same time, that device was streaming
      //already when we connected.
      if(!changed.attached) {
        controller.emit('deviceConnected');
      }
    }
    //Since when devices are attached all fields have changed, don't send events for streaming being false.
    else if(!(changed.attached && info.attached)) {
      controller.streamingCount--;
      controller.emit('deviceStopped', info);
      if(controller.streamingCount == 0){
        controller.emit('streamingStopped', info);
      }
      controller.emit('deviceDisconnected');
    }

  });


  this.on('newListener', function(event, listener) {
    if( event == 'deviceConnected' || event == 'deviceDisconnected' ) {
      console.warn(event + " events are depricated.  Consider using 'streamingStarted/streamingStopped' or 'deviceStreaming/deviceStopped' instead");
    }
  });

};




// Checks if the protocol version is the latest, if if not, shows the dialog.
Controller.prototype.checkOutOfDate = function(){
  console.assert(this.connection && this.connection.protocol);

  var serviceVersion = this.connection.protocol.serviceVersion;
  var protocolVersion = this.connection.protocol.version;
  var defaultProtocolVersion = this.connectionType.defaultProtocolVersion;

  if (defaultProtocolVersion > protocolVersion){

    console.warn("Your Protocol Version is v" + protocolVersion +
        ", this app was designed for v" + defaultProtocolVersion);

    Dialog.warnOutOfDate({
      sV: serviceVersion,
      pV: protocolVersion
    });
    return true
  }else{
    return false
  }

};



Controller._pluginFactories = {};

/*
 * Registers a plugin, making is accessible to controller.use later on.
 *
 * @member plugin
 * @memberof Leap.Controller.prototype
 * @param {String} name The name of the plugin (usually camelCase).
 * @param {function} factory A factory method which will return an instance of a plugin.
 * The factory receives an optional hash of options, passed in via controller.use.
 *
 * Valid keys for the object include frame, hand, finger, tool, and pointable.  The value
 * of each key can be either a function or an object.  If given a function, that function
 * will be called once for every instance of the object, with that instance injected as an
 * argument.  This allows decoration of objects with additional data:
 *
 * ```javascript
 * Leap.Controller.plugin('testPlugin', function(options){
 *   return {
 *     frame: function(frame){
 *       frame.foo = 'bar';
 *     }
 *   }
 * });
 * ```
 *
 * When hand is used, the callback is called for every hand in `frame.hands`.  Note that
 * hand objects are recreated with every new frame, so that data saved on the hand will not
 * persist.
 *
 * ```javascript
 * Leap.Controller.plugin('testPlugin', function(){
 *   return {
 *     hand: function(hand){
 *       console.log('testPlugin running on hand ' + hand.id);
 *     }
 *   }
 * });
 * ```
 *
 * A factory can return an object to add custom functionality to Frames, Hands, or Pointables.
 * The methods are added directly to the object's prototype.  Finger and Tool cannot be used here, Pointable
 * must be used instead.
 * This is encouraged for calculations which may not be necessary on every frame.
 * Memoization is also encouraged, for cases where the method may be called many times per frame by the application.
 *
 * ```javascript
 * // This plugin allows hand.usefulData() to be called later.
 * Leap.Controller.plugin('testPlugin', function(){
 *   return {
 *     hand: {
 *       usefulData: function(){
 *         console.log('usefulData on hand', this.id);
 *         // memoize the results on to the hand, preventing repeat work:
 *         this.x || this.x = someExpensiveCalculation();
 *         return this.x;
 *       }
 *     }
 *   }
 * });
 *
 * Note that the factory pattern allows encapsulation for every plugin instance.
 *
 * ```javascript
 * Leap.Controller.plugin('testPlugin', function(options){
 *   options || options = {}
 *   options.center || options.center = [0,0,0]
 *
 *   privatePrintingMethod = function(){
 *     console.log('privatePrintingMethod - options', options);
 *   }
 *
 *   return {
 *     pointable: {
 *       publicPrintingMethod: function(){
 *         privatePrintingMethod();
 *       }
 *     }
 *   }
 * });
 *
 */
Controller.plugin = function(pluginName, factory) {
  if (this._pluginFactories[pluginName]) {
    console.warn("Plugin \"" + pluginName + "\" already registered");
  }
  return this._pluginFactories[pluginName] = factory;
};

/*
 * Returns a list of registered plugins.
 * @returns {Array} Plugin Factories.
 */
Controller.plugins = function() {
  return _.keys(this._pluginFactories);
};



var setPluginCallbacks = function(pluginName, type, callback){
  
  if ( ['beforeFrameCreated', 'afterFrameCreated'].indexOf(type) != -1 ){
    
      // todo - not able to "unuse" a plugin currently
      this.on(type, callback);
      
    }else {
      
      if (!this.pipeline) this.pipeline = new Pipeline(this);
    
      if (!this._pluginPipelineSteps[pluginName]) this._pluginPipelineSteps[pluginName] = [];

      this._pluginPipelineSteps[pluginName].push(
        
        this.pipeline.addWrappedStep(type, callback)
        
      );
      
    }
  
};

var setPluginMethods = function(pluginName, type, hash){
  var klass;
  
  if (!this._pluginExtendedMethods[pluginName]) this._pluginExtendedMethods[pluginName] = [];

  switch (type) {
    case 'frame':
      klass = Frame;
      break;
    case 'hand':
      klass = Hand;
      break;
    case 'pointable':
      klass = Pointable;
      _.extend(Finger.prototype, hash);
      _.extend(Finger.Invalid,   hash);
      break;
    case 'finger':
      klass = Finger;
      break;
    default:
      throw pluginName + ' specifies invalid object type "' + type + '" for prototypical extension'
  }

  _.extend(klass.prototype, hash);
  _.extend(klass.Invalid, hash);
  this._pluginExtendedMethods[pluginName].push([klass, hash])
  
}



/*
 * Begin using a registered plugin.  The plugin's functionality will be added to all frames
 * returned by the controller (and/or added to the objects within the frame).
 *  - The order of plugin execution inside the loop will match the order in which use is called by the application.
 *  - The plugin be run for both deviceFrames and animationFrames.
 *
 *  If called a second time, the options will be merged with those of the already instantiated plugin.
 *
 * @method use
 * @memberOf Leap.Controller.prototype
 * @param pluginName
 * @param {Hash} Options to be passed to the plugin's factory.
 * @returns the controller
 */
Controller.prototype.use = function(pluginName, options) {
  var functionOrHash, pluginFactory, key, pluginInstance;

  pluginFactory = (typeof pluginName == 'function') ? pluginName : Controller._pluginFactories[pluginName];

  if (!pluginFactory) {
    throw 'Leap Plugin ' + pluginName + ' not found.';
  }

  options || (options = {});

  if (this.plugins[pluginName]){
    _.extend(this.plugins[pluginName], options);
    return this;
  }

  this.plugins[pluginName] = options;

  pluginInstance = pluginFactory.call(this, options);

  for (key in pluginInstance) {

    functionOrHash = pluginInstance[key];

    if (typeof functionOrHash === 'function') {
      
      setPluginCallbacks.call(this, pluginName, key, functionOrHash);
      
    } else {
      
      setPluginMethods.call(this, pluginName, key, functionOrHash);
      
    }

  }

  return this;
};




/*
 * Stop using a used plugin.  This will remove any of the plugin's pipeline methods (those called on every frame)
 * and remove any methods which extend frame-object prototypes.
 *
 * @method stopUsing
 * @memberOf Leap.Controller.prototype
 * @param pluginName
 * @returns the controller
 */
Controller.prototype.stopUsing = function (pluginName) {
  var steps = this._pluginPipelineSteps[pluginName],
      extMethodHashes = this._pluginExtendedMethods[pluginName],
      i = 0, klass, extMethodHash;

  if (!this.plugins[pluginName]) return;

  if (steps) {
    for (i = 0; i < steps.length; i++) {
      this.pipeline.removeStep(steps[i]);
    }
  }

  if (extMethodHashes){
    for (i = 0; i < extMethodHashes.length; i++){
      klass = extMethodHashes[i][0];
      extMethodHash = extMethodHashes[i][1];
      for (var methodName in extMethodHash) {
        delete klass.prototype[methodName];
        delete klass.Invalid[methodName];
      }
    }
  }

  delete this.plugins[pluginName];

  return this;
}

Controller.prototype.useRegisteredPlugins = function(){
  for (var plugin in Controller._pluginFactories){
    this.use(plugin);
  }
}


_.extend(Controller.prototype, EventEmitter.prototype);

}).call(this,require('_process'))
},{"./circular_buffer":3,"./connection/browser":5,"./connection/node":6,"./dialog":8,"./finger":9,"./frame":10,"./gesture":11,"./hand":12,"./pipeline":15,"./pointable":16,"_process":30,"events":29,"underscore":23}],8:[function(require,module,exports){
(function (process){
var Dialog = module.exports = function(message, options){
  this.options = (options || {});
  this.message = message;

  this.createElement();
};

Dialog.prototype.createElement = function(){
  this.element = document.createElement('div');
  this.element.className = "leapjs-dialog";
  this.element.style.position = "fixed";
  this.element.style.top = '8px';
  this.element.style.left = 0;
  this.element.style.right = 0;
  this.element.style.textAlign = 'center';
  this.element.style.zIndex = 1000;

  var dialog  = document.createElement('div');
  this.element.appendChild(dialog);
  dialog.style.className = "leapjs-dialog";
  dialog.style.display = "inline-block";
  dialog.style.margin = "auto";
  dialog.style.padding = "8px";
  dialog.style.color = "#222";
  dialog.style.background = "#eee";
  dialog.style.borderRadius = "4px";
  dialog.style.border = "1px solid #999";
  dialog.style.textAlign = "left";
  dialog.style.cursor = "pointer";
  dialog.style.whiteSpace = "nowrap";
  dialog.style.transition = "box-shadow 1s linear";
  dialog.innerHTML = this.message;


  if (this.options.onclick){
    dialog.addEventListener('click', this.options.onclick);
  }

  if (this.options.onmouseover){
    dialog.addEventListener('mouseover', this.options.onmouseover);
  }

  if (this.options.onmouseout){
    dialog.addEventListener('mouseout', this.options.onmouseout);
  }

  if (this.options.onmousemove){
    dialog.addEventListener('mousemove', this.options.onmousemove);
  }
};

Dialog.prototype.show = function(){
  document.body.appendChild(this.element);
  return this;
};

Dialog.prototype.hide = function(){
  document.body.removeChild(this.element);
  return this;
};




// Shows a DOM dialog box with links to developer.leapmotion.com to upgrade
// This will work whether or not the Leap is plugged in,
// As long as it is called after a call to .connect() and the 'ready' event has fired.
Dialog.warnOutOfDate = function(params){
  params || (params = {});

  var url = "http://developer.leapmotion.com?";

  params.returnTo = window.location.href;

  for (var key in params){
    url += key + '=' + encodeURIComponent(params[key]) + '&';
  }

  var dialog,
    onclick = function(event){

       if (event.target.id != 'leapjs-decline-upgrade'){

         var popup = window.open(url,
           '_blank',
           'height=800,width=1000,location=1,menubar=1,resizable=1,status=1,toolbar=1,scrollbars=1'
         );

         if (window.focus) {popup.focus()}

       }

       dialog.hide();

       return true;
    },


    message = "This site requires Leap Motion Tracking V2." +
      "<button id='leapjs-accept-upgrade'  style='color: #444; transition: box-shadow 100ms linear; cursor: pointer; vertical-align: baseline; margin-left: 16px;'>Upgrade</button>" +
      "<button id='leapjs-decline-upgrade' style='color: #444; transition: box-shadow 100ms linear; cursor: pointer; vertical-align: baseline; margin-left: 8px; '>Not Now</button>";

  dialog = new Dialog(message, {
      onclick: onclick,
      onmousemove: function(e){
        if (e.target == document.getElementById('leapjs-decline-upgrade')){
          document.getElementById('leapjs-decline-upgrade').style.color = '#000';
          document.getElementById('leapjs-decline-upgrade').style.boxShadow = '0px 0px 2px #5daa00';

          document.getElementById('leapjs-accept-upgrade').style.color = '#444';
          document.getElementById('leapjs-accept-upgrade').style.boxShadow = 'none';
        }else{
          document.getElementById('leapjs-accept-upgrade').style.color = '#000';
          document.getElementById('leapjs-accept-upgrade').style.boxShadow = '0px 0px 2px #5daa00';

          document.getElementById('leapjs-decline-upgrade').style.color = '#444';
          document.getElementById('leapjs-decline-upgrade').style.boxShadow = 'none';
        }
      },
      onmouseout: function(){
        document.getElementById('leapjs-decline-upgrade').style.color = '#444';
        document.getElementById('leapjs-decline-upgrade').style.boxShadow = 'none';
        document.getElementById('leapjs-accept-upgrade').style.color = '#444';
        document.getElementById('leapjs-accept-upgrade').style.boxShadow = 'none';
      }
    }
  );

  return dialog.show();
};


// Tracks whether we've warned for lack of bones API.  This will be shown only for early private-beta members.
Dialog.hasWarnedBones = false;

Dialog.warnBones = function(){
  if (this.hasWarnedBones) return;
  this.hasWarnedBones = true;

  console.warn("Your Leap Service is out of date");

  if ( !(typeof(process) !== 'undefined' && process.versions && process.versions.node) ){
    this.warnOutOfDate({reason: 'bones'});
  }

}
}).call(this,require('_process'))
},{"_process":30}],9:[function(require,module,exports){
var Pointable = require('./pointable'),
  Bone = require('./bone')
  , Dialog = require('./dialog')
  , _ = require('underscore');

/**
* Constructs a Finger object.
*
* An uninitialized finger is considered invalid.
* Get valid Finger objects from a Frame or a Hand object.
*
* @class Finger
* @memberof Leap
* @classdesc
* The Finger class reports the physical characteristics of a finger.
*
* Both fingers and tools are classified as Pointable objects. Use the
* Pointable.tool property to determine whether a Pointable object represents a
* tool or finger. The Leap classifies a detected entity as a tool when it is
* thinner, straighter, and longer than a typical finger.
*
* Note that Finger objects can be invalid, which means that they do not
* contain valid tracking data and do not correspond to a physical entity.
* Invalid Finger objects can be the result of asking for a Finger object
* using an ID from an earlier frame when no Finger objects with that ID
* exist in the current frame. A Finger object created from the Finger
* constructor is also invalid. Test for validity with the Pointable.valid
* property.
*/
var Finger = module.exports = function(data) {
  Pointable.call(this, data); // use pointable as super-constructor
  
  /**
  * The position of the distal interphalangeal joint of the finger.
  * This joint is closest to the tip.
  * 
  * The distal interphalangeal joint is located between the most extreme segment
  * of the finger (the distal phalanx) and the middle segment (the medial
  * phalanx).
  *
  * @member dipPosition
  * @type {number[]}
  * @memberof Leap.Finger.prototype
  */  
  this.dipPosition = data.dipPosition;

  /**
  * The position of the proximal interphalangeal joint of the finger. This joint is the middle
  * joint of a finger.
  *
  * The proximal interphalangeal joint is located between the two finger segments
  * closest to the hand (the proximal and the medial phalanges). On a thumb,
  * which lacks an medial phalanx, this joint index identifies the knuckle joint
  * between the proximal phalanx and the metacarpal bone.
  *
  * @member pipPosition
  * @type {number[]}
  * @memberof Leap.Finger.prototype
  */  
  this.pipPosition = data.pipPosition;

  /**
  * The position of the metacarpopophalangeal joint, or knuckle, of the finger.
  *
  * The metacarpopophalangeal joint is located at the base of a finger between
  * the metacarpal bone and the first phalanx. The common name for this joint is
  * the knuckle.
  *
  * On a thumb, which has one less phalanx than a finger, this joint index
  * identifies the thumb joint near the base of the hand, between the carpal
  * and metacarpal bones.
  *
  * @member mcpPosition
  * @type {number[]}
  * @memberof Leap.Finger.prototype
  */  
  this.mcpPosition = data.mcpPosition;

  /**
   * The position of the Carpometacarpal joint
   *
   * This is at the distal end of the wrist, and has no common name.
   *
   */
  this.carpPosition = data.carpPosition;

  /**
  * Whether or not this finger is in an extended posture.
  *
  * A finger is considered extended if it is extended straight from the hand as if
  * pointing. A finger is not extended when it is bent down and curled towards the 
  * palm.
  * @member extended
  * @type {Boolean}
  * @memberof Leap.Finger.prototype
  */
  this.extended = data.extended;

  /**
  * An integer code for the name of this finger.
  * 
  * * 0 -- thumb
  * * 1 -- index finger
  * * 2 -- middle finger
  * * 3 -- ring finger
  * * 4 -- pinky
  *
  * @member type
  * @type {number}
  * @memberof Leap.Finger.prototype
  */
  this.type = data.type;

  this.finger = true;
  
  /**
  * The joint positions of this finger as an array in the order base to tip.
  *
  * @member positions
  * @type {array[]}
  * @memberof Leap.Finger.prototype
  */
  this.positions = [this.carpPosition, this.mcpPosition, this.pipPosition, this.dipPosition, this.tipPosition];

  if (data.bases){
    this.addBones(data);
  } else {
    Dialog.warnBones();
  }

};

_.extend(Finger.prototype, Pointable.prototype);


Finger.prototype.addBones = function(data){
  /**
  * Four bones per finger, from wrist outwards:
  * metacarpal, proximal, medial, and distal.
  *
  * See http://en.wikipedia.org/wiki/Interphalangeal_articulations_of_hand
  */
  this.metacarpal   = new Bone(this, {
    type: 0,
    width: this.width,
    prevJoint: this.carpPosition,
    nextJoint: this.mcpPosition,
    basis: data.bases[0]
  });

  this.proximal     = new Bone(this, {
    type: 1,
    width: this.width,
    prevJoint: this.mcpPosition,
    nextJoint: this.pipPosition,
    basis: data.bases[1]
  });

  this.medial = new Bone(this, {
    type: 2,
    width: this.width,
    prevJoint: this.pipPosition,
    nextJoint: this.dipPosition,
    basis: data.bases[2]
  });

  /**
   * Note that the `distal.nextJoint` position is slightly different from the `finger.tipPosition`.
   * The former is at the very end of the bone, where the latter is the center of a sphere positioned at
   * the tip of the finger.  The btipPosition "bone tip position" is a few mm closer to the wrist than
   * the tipPosition.
   * @type {Bone}
   */
  this.distal       = new Bone(this, {
    type: 3,
    width: this.width,
    prevJoint: this.dipPosition,
    nextJoint: data.btipPosition,
    basis: data.bases[3]
  });

  this.bones = [this.metacarpal, this.proximal, this.medial, this.distal];
};

Finger.prototype.toString = function() {
    return "Finger [ id:" + this.id + " " + this.length + "mmx | width:" + this.width + "mm | direction:" + this.direction + ' ]';
};

Finger.Invalid = { valid: false };

},{"./bone":2,"./dialog":8,"./pointable":16,"underscore":23}],10:[function(require,module,exports){
var Hand = require("./hand")
  , Pointable = require("./pointable")
  , createGesture = require("./gesture").createGesture
  , glMatrix = require("gl-matrix")
  , mat3 = glMatrix.mat3
  , vec3 = glMatrix.vec3
  , InteractionBox = require("./interaction_box")
  , Finger = require('./finger')
  , _ = require("underscore");

/**
 * Constructs a Frame object.
 *
 * Frame instances created with this constructor are invalid.
 * Get valid Frame objects by calling the
 * [Controller.frame]{@link Leap.Controller#frame}() function.
 *<C-D-Space>
 * @class Frame
 * @memberof Leap
 * @classdesc
 * The Frame class represents a set of hand and finger tracking data detected
 * in a single frame.
 *
 * The Leap detects hands, fingers and tools within the tracking area, reporting
 * their positions, orientations and motions in frames at the Leap frame rate.
 *
 * Access Frame objects using the [Controller.frame]{@link Leap.Controller#frame}() function.
 */
var Frame = module.exports = function(data) {
  /**
   * Reports whether this Frame instance is valid.
   *
   * A valid Frame is one generated by the Controller object that contains
   * tracking data for all detected entities. An invalid Frame contains no
   * actual tracking data, but you can call its functions without risk of a
   * undefined object exception. The invalid Frame mechanism makes it more
   * convenient to track individual data across the frame history. For example,
   * you can invoke:
   *
   * ```javascript
   * var finger = controller.frame(n).finger(fingerID);
   * ```
   *
   * for an arbitrary Frame history value, "n", without first checking whether
   * frame(n) returned a null object. (You should still check that the
   * returned Finger instance is valid.)
   *
   * @member valid
   * @memberof Leap.Frame.prototype
   * @type {Boolean}
   */
  this.valid = true;
  /**
   * A unique ID for this Frame. Consecutive frames processed by the Leap
   * have consecutive increasing values.
   * @member id
   * @memberof Leap.Frame.prototype
   * @type {String}
   */
  this.id = data.id;
  /**
   * The frame capture time in microseconds elapsed since the Leap started.
   * @member timestamp
   * @memberof Leap.Frame.prototype
   * @type {number}
   */
  this.timestamp = data.timestamp;
  /**
   * The list of Hand objects detected in this frame, given in arbitrary order.
   * The list can be empty if no hands are detected.
   *
   * @member hands[]
   * @memberof Leap.Frame.prototype
   * @type {Leap.Hand}
   */
  this.hands = [];
  this.handsMap = {};
  /**
   * The list of Pointable objects (fingers and tools) detected in this frame,
   * given in arbitrary order. The list can be empty if no fingers or tools are
   * detected.
   *
   * @member pointables[]
   * @memberof Leap.Frame.prototype
   * @type {Leap.Pointable}
   */
  this.pointables = [];
  /**
   * The list of Tool objects detected in this frame, given in arbitrary order.
   * The list can be empty if no tools are detected.
   *
   * @member tools[]
   * @memberof Leap.Frame.prototype
   * @type {Leap.Pointable}
   */
  this.tools = [];
  /**
   * The list of Finger objects detected in this frame, given in arbitrary order.
   * The list can be empty if no fingers are detected.
   * @member fingers[]
   * @memberof Leap.Frame.prototype
   * @type {Leap.Pointable}
   */
  this.fingers = [];

  /**
   * The InteractionBox associated with the current frame.
   *
   * @member interactionBox
   * @memberof Leap.Frame.prototype
   * @type {Leap.InteractionBox}
   */
  if (data.interactionBox) {
    this.interactionBox = new InteractionBox(data.interactionBox);
  }
  this.gestures = [];
  this.pointablesMap = {};
  this._translation = data.t;
  this._rotation = _.flatten(data.r);
  this._scaleFactor = data.s;
  this.data = data;
  this.type = 'frame'; // used by event emitting
  this.currentFrameRate = data.currentFrameRate;

  if (data.gestures) {
   /**
    * The list of Gesture objects detected in this frame, given in arbitrary order.
    * The list can be empty if no gestures are detected.
    *
    * Circle and swipe gestures are updated every frame. Tap gestures
    * only appear in the list for a single frame.
    * @member gestures[]
    * @memberof Leap.Frame.prototype
    * @type {Leap.Gesture}
    */
    for (var gestureIdx = 0, gestureCount = data.gestures.length; gestureIdx != gestureCount; gestureIdx++) {
      this.gestures.push(createGesture(data.gestures[gestureIdx]));
    }
  }
  this.postprocessData(data);
};

Frame.prototype.postprocessData = function(data){
  if (!data) {
    data = this.data;
  }

  for (var handIdx = 0, handCount = data.hands.length; handIdx != handCount; handIdx++) {
    var hand = new Hand(data.hands[handIdx]);
    hand.frame = this;
    this.hands.push(hand);
    this.handsMap[hand.id] = hand;
  }

  data.pointables = _.sortBy(data.pointables, function(pointable) { return pointable.id });

  for (var pointableIdx = 0, pointableCount = data.pointables.length; pointableIdx != pointableCount; pointableIdx++) {
    var pointableData = data.pointables[pointableIdx];
    var pointable = pointableData.dipPosition ? new Finger(pointableData) : new Pointable(pointableData);
    pointable.frame = this;
    this.addPointable(pointable);
  }
};

/**
 * Adds data from a pointable element into the pointablesMap; 
 * also adds the pointable to the frame.handsMap hand to which it belongs,
 * and to the hand's tools or hand's fingers map.
 * 
 * @param pointable {Object} a Pointable
 */
Frame.prototype.addPointable = function (pointable) {
  this.pointables.push(pointable);
  this.pointablesMap[pointable.id] = pointable;
  (pointable.tool ? this.tools : this.fingers).push(pointable);
  if (pointable.handId !== undefined && this.handsMap.hasOwnProperty(pointable.handId)) {
    var hand = this.handsMap[pointable.handId];
    hand.pointables.push(pointable);
    (pointable.tool ? hand.tools : hand.fingers).push(pointable);
    switch (pointable.type){
      case 0:
        hand.thumb = pointable;
        break;
      case 1:
        hand.indexFinger = pointable;
        break;
      case 2:
        hand.middleFinger = pointable;
        break;
      case 3:
        hand.ringFinger = pointable;
        break;
      case 4:
        hand.pinky = pointable;
        break;
    }
  }
};

/**
 * The tool with the specified ID in this frame.
 *
 * Use the Frame tool() function to retrieve a tool from
 * this frame using an ID value obtained from a previous frame.
 * This function always returns a Pointable object, but if no tool
 * with the specified ID is present, an invalid Pointable object is returned.
 *
 * Note that ID values persist across frames, but only until tracking of a
 * particular object is lost. If tracking of a tool is lost and subsequently
 * regained, the new Pointable object representing that tool may have a
 * different ID than that representing the tool in an earlier frame.
 *
 * @method tool
 * @memberof Leap.Frame.prototype
 * @param {String} id The ID value of a Tool object from a previous frame.
 * @returns {Leap.Pointable} The tool with the
 * matching ID if one exists in this frame; otherwise, an invalid Pointable object
 * is returned.
 */
Frame.prototype.tool = function(id) {
  var pointable = this.pointable(id);
  return pointable.tool ? pointable : Pointable.Invalid;
};

/**
 * The Pointable object with the specified ID in this frame.
 *
 * Use the Frame pointable() function to retrieve the Pointable object from
 * this frame using an ID value obtained from a previous frame.
 * This function always returns a Pointable object, but if no finger or tool
 * with the specified ID is present, an invalid Pointable object is returned.
 *
 * Note that ID values persist across frames, but only until tracking of a
 * particular object is lost. If tracking of a finger or tool is lost and subsequently
 * regained, the new Pointable object representing that finger or tool may have
 * a different ID than that representing the finger or tool in an earlier frame.
 *
 * @method pointable
 * @memberof Leap.Frame.prototype
 * @param {String} id The ID value of a Pointable object from a previous frame.
 * @returns {Leap.Pointable} The Pointable object with
 * the matching ID if one exists in this frame;
 * otherwise, an invalid Pointable object is returned.
 */
Frame.prototype.pointable = function(id) {
  return this.pointablesMap[id] || Pointable.Invalid;
};

/**
 * The finger with the specified ID in this frame.
 *
 * Use the Frame finger() function to retrieve the finger from
 * this frame using an ID value obtained from a previous frame.
 * This function always returns a Finger object, but if no finger
 * with the specified ID is present, an invalid Pointable object is returned.
 *
 * Note that ID values persist across frames, but only until tracking of a
 * particular object is lost. If tracking of a finger is lost and subsequently
 * regained, the new Pointable object representing that physical finger may have
 * a different ID than that representing the finger in an earlier frame.
 *
 * @method finger
 * @memberof Leap.Frame.prototype
 * @param {String} id The ID value of a finger from a previous frame.
 * @returns {Leap.Pointable} The finger with the
 * matching ID if one exists in this frame; otherwise, an invalid Pointable
 * object is returned.
 */
Frame.prototype.finger = function(id) {
  var pointable = this.pointable(id);
  return !pointable.tool ? pointable : Pointable.Invalid;
};

/**
 * The Hand object with the specified ID in this frame.
 *
 * Use the Frame hand() function to retrieve the Hand object from
 * this frame using an ID value obtained from a previous frame.
 * This function always returns a Hand object, but if no hand
 * with the specified ID is present, an invalid Hand object is returned.
 *
 * Note that ID values persist across frames, but only until tracking of a
 * particular object is lost. If tracking of a hand is lost and subsequently
 * regained, the new Hand object representing that physical hand may have
 * a different ID than that representing the physical hand in an earlier frame.
 *
 * @method hand
 * @memberof Leap.Frame.prototype
 * @param {String} id The ID value of a Hand object from a previous frame.
 * @returns {Leap.Hand} The Hand object with the matching
 * ID if one exists in this frame; otherwise, an invalid Hand object is returned.
 */
Frame.prototype.hand = function(id) {
  return this.handsMap[id] || Hand.Invalid;
};

/**
 * The angle of rotation around the rotation axis derived from the overall
 * rotational motion between the current frame and the specified frame.
 *
 * The returned angle is expressed in radians measured clockwise around
 * the rotation axis (using the right-hand rule) between the start and end frames.
 * The value is always between 0 and pi radians (0 and 180 degrees).
 *
 * The Leap derives frame rotation from the relative change in position and
 * orientation of all objects detected in the field of view.
 *
 * If either this frame or sinceFrame is an invalid Frame object, then the
 * angle of rotation is zero.
 *
 * @method rotationAngle
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @param {number[]} [axis] The axis to measure rotation around.
 * @returns {number} A positive value containing the heuristically determined
 * rotational change between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.rotationAngle = function(sinceFrame, axis) {
  if (!this.valid || !sinceFrame.valid) return 0.0;

  var rot = this.rotationMatrix(sinceFrame);
  var cs = (rot[0] + rot[4] + rot[8] - 1.0)*0.5;
  var angle = Math.acos(cs);
  angle = isNaN(angle) ? 0.0 : angle;

  if (axis !== undefined) {
    var rotAxis = this.rotationAxis(sinceFrame);
    angle *= vec3.dot(rotAxis, vec3.normalize(vec3.create(), axis));
  }

  return angle;
};

/**
 * The axis of rotation derived from the overall rotational motion between
 * the current frame and the specified frame.
 *
 * The returned direction vector is normalized.
 *
 * The Leap derives frame rotation from the relative change in position and
 * orientation of all objects detected in the field of view.
 *
 * If either this frame or sinceFrame is an invalid Frame object, or if no
 * rotation is detected between the two frames, a zero vector is returned.
 *
 * @method rotationAxis
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {number[]} A normalized direction vector representing the axis of the heuristically determined
 * rotational change between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.rotationAxis = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return vec3.create();
  return vec3.normalize(vec3.create(), [
    this._rotation[7] - sinceFrame._rotation[5],
    this._rotation[2] - sinceFrame._rotation[6],
    this._rotation[3] - sinceFrame._rotation[1]
  ]);
}

/**
 * The transform matrix expressing the rotation derived from the overall
 * rotational motion between the current frame and the specified frame.
 *
 * The Leap derives frame rotation from the relative change in position and
 * orientation of all objects detected in the field of view.
 *
 * If either this frame or sinceFrame is an invalid Frame object, then
 * this method returns an identity matrix.
 *
 * @method rotationMatrix
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {number[]} A transformation matrix containing the heuristically determined
 * rotational change between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.rotationMatrix = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return mat3.create();
  var transpose = mat3.transpose(mat3.create(), this._rotation)
  return mat3.multiply(mat3.create(), sinceFrame._rotation, transpose);
}

/**
 * The scale factor derived from the overall motion between the current frame and the specified frame.
 *
 * The scale factor is always positive. A value of 1.0 indicates no scaling took place.
 * Values between 0.0 and 1.0 indicate contraction and values greater than 1.0 indicate expansion.
 *
 * The Leap derives scaling from the relative inward or outward motion of all
 * objects detected in the field of view (independent of translation and rotation).
 *
 * If either this frame or sinceFrame is an invalid Frame object, then this method returns 1.0.
 *
 * @method scaleFactor
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative scaling.
 * @returns {number} A positive value representing the heuristically determined
 * scaling change ratio between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.scaleFactor = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return 1.0;
  return Math.exp(this._scaleFactor - sinceFrame._scaleFactor);
}

/**
 * The change of position derived from the overall linear motion between the
 * current frame and the specified frame.
 *
 * The returned translation vector provides the magnitude and direction of the
 * movement in millimeters.
 *
 * The Leap derives frame translation from the linear motion of all objects
 * detected in the field of view.
 *
 * If either this frame or sinceFrame is an invalid Frame object, then this
 * method returns a zero vector.
 *
 * @method translation
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative translation.
 * @returns {number[]} A vector representing the heuristically determined change in
 * position of all objects between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.translation = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return vec3.create();
  return vec3.subtract(vec3.create(), this._translation, sinceFrame._translation);
}

/**
 * A string containing a brief, human readable description of the Frame object.
 *
 * @method toString
 * @memberof Leap.Frame.prototype
 * @returns {String} A brief description of this frame.
 */
Frame.prototype.toString = function() {
  var str = "Frame [ id:"+this.id+" | timestamp:"+this.timestamp+" | Hand count:("+this.hands.length+") | Pointable count:("+this.pointables.length+")";
  if (this.gestures) str += " | Gesture count:("+this.gestures.length+")";
  str += " ]";
  return str;
}

/**
 * Returns a JSON-formatted string containing the hands, pointables and gestures
 * in this frame.
 *
 * @method dump
 * @memberof Leap.Frame.prototype
 * @returns {String} A JSON-formatted string.
 */
Frame.prototype.dump = function() {
  var out = '';
  out += "Frame Info:<br/>";
  out += this.toString();
  out += "<br/><br/>Hands:<br/>"
  for (var handIdx = 0, handCount = this.hands.length; handIdx != handCount; handIdx++) {
    out += "  "+ this.hands[handIdx].toString() + "<br/>";
  }
  out += "<br/><br/>Pointables:<br/>";
  for (var pointableIdx = 0, pointableCount = this.pointables.length; pointableIdx != pointableCount; pointableIdx++) {
      out += "  "+ this.pointables[pointableIdx].toString() + "<br/>";
  }
  if (this.gestures) {
    out += "<br/><br/>Gestures:<br/>";
    for (var gestureIdx = 0, gestureCount = this.gestures.length; gestureIdx != gestureCount; gestureIdx++) {
        out += "  "+ this.gestures[gestureIdx].toString() + "<br/>";
    }
  }
  out += "<br/><br/>Raw JSON:<br/>";
  out += JSON.stringify(this.data);
  return out;
}

/**
 * An invalid Frame object.
 *
 * You can use this invalid Frame in comparisons testing
 * whether a given Frame instance is valid or invalid. (You can also check the
 * [Frame.valid]{@link Leap.Frame#valid} property.)
 *
 * @static
 * @type {Leap.Frame}
 * @name Invalid
 * @memberof Leap.Frame
 */
Frame.Invalid = {
  valid: false,
  hands: [],
  fingers: [],
  tools: [],
  gestures: [],
  pointables: [],
  pointable: function() { return Pointable.Invalid },
  finger: function() { return Pointable.Invalid },
  hand: function() { return Hand.Invalid },
  toString: function() { return "invalid frame" },
  dump: function() { return this.toString() },
  rotationAngle: function() { return 0.0; },
  rotationMatrix: function() { return mat3.create(); },
  rotationAxis: function() { return vec3.create(); },
  scaleFactor: function() { return 1.0; },
  translation: function() { return vec3.create(); }
};

},{"./finger":9,"./gesture":11,"./hand":12,"./interaction_box":14,"./pointable":16,"gl-matrix":22,"underscore":23}],11:[function(require,module,exports){
var glMatrix = require("gl-matrix")
  , vec3 = glMatrix.vec3
  , EventEmitter = require('events').EventEmitter
  , _ = require('underscore');

/**
 * Constructs a new Gesture object.
 *
 * An uninitialized Gesture object is considered invalid. Get valid instances
 * of the Gesture class, which will be one of the Gesture subclasses, from a
 * Frame object.
 *
 * @class Gesture
 * @abstract
 * @memberof Leap
 * @classdesc
 * The Gesture class represents a recognized movement by the user.
 *
 * The Leap watches the activity within its field of view for certain movement
 * patterns typical of a user gesture or command. For example, a movement from side to
 * side with the hand can indicate a swipe gesture, while a finger poking forward
 * can indicate a screen tap gesture.
 *
 * When the Leap recognizes a gesture, it assigns an ID and adds a
 * Gesture object to the frame gesture list. For continuous gestures, which
 * occur over many frames, the Leap updates the gesture by adding
 * a Gesture object having the same ID and updated properties in each
 * subsequent frame.
 *
 * **Important:** Recognition for each type of gesture must be enabled;
 * otherwise **no gestures are recognized or reported**.
 *
 * Subclasses of Gesture define the properties for the specific movement patterns
 * recognized by the Leap.
 *
 * The Gesture subclasses for include:
 *
 * * CircleGesture -- A circular movement by a finger.
 * * SwipeGesture -- A straight line movement by the hand with fingers extended.
 * * ScreenTapGesture -- A forward tapping movement by a finger.
 * * KeyTapGesture -- A downward tapping movement by a finger.
 *
 * Circle and swipe gestures are continuous and these objects can have a
 * state of start, update, and stop.
 *
 * The screen tap gesture is a discrete gesture. The Leap only creates a single
 * ScreenTapGesture object appears for each tap and it always has a stop state.
 *
 * Get valid Gesture instances from a Frame object. You can get a list of gestures
 * from the Frame gestures array. You can also use the Frame gesture() method
 * to find a gesture in the current frame using an ID value obtained in a
 * previous frame.
 *
 * Gesture objects can be invalid. For example, when you get a gesture by ID
 * using Frame.gesture(), and there is no gesture with that ID in the current
 * frame, then gesture() returns an Invalid Gesture object (rather than a null
 * value). Always check object validity in situations where a gesture might be
 * invalid.
 */
var createGesture = exports.createGesture = function(data) {
  var gesture;
  switch (data.type) {
    case 'circle':
      gesture = new CircleGesture(data);
      break;
    case 'swipe':
      gesture = new SwipeGesture(data);
      break;
    case 'screenTap':
      gesture = new ScreenTapGesture(data);
      break;
    case 'keyTap':
      gesture = new KeyTapGesture(data);
      break;
    default:
      throw "unknown gesture type";
  }

 /**
  * The gesture ID.
  *
  * All Gesture objects belonging to the same recognized movement share the
  * same ID value. Use the ID value with the Frame::gesture() method to
  * find updates related to this Gesture object in subsequent frames.
  *
  * @member id
  * @memberof Leap.Gesture.prototype
  * @type {number}
  */
  gesture.id = data.id;
 /**
  * The list of hands associated with this Gesture, if any.
  *
  * If no hands are related to this gesture, the list is empty.
  *
  * @member handIds
  * @memberof Leap.Gesture.prototype
  * @type {Array}
  */
  gesture.handIds = data.handIds.slice();
 /**
  * The list of fingers and tools associated with this Gesture, if any.
  *
  * If no Pointable objects are related to this gesture, the list is empty.
  *
  * @member pointableIds
  * @memberof Leap.Gesture.prototype
  * @type {Array}
  */
  gesture.pointableIds = data.pointableIds.slice();
 /**
  * The elapsed duration of the recognized movement up to the
  * frame containing this Gesture object, in microseconds.
  *
  * The duration reported for the first Gesture in the sequence (with the
  * start state) will typically be a small positive number since
  * the movement must progress far enough for the Leap to recognize it as
  * an intentional gesture.
  *
  * @member duration
  * @memberof Leap.Gesture.prototype
  * @type {number}
  */
  gesture.duration = data.duration;
 /**
  * The gesture ID.
  *
  * Recognized movements occur over time and have a beginning, a middle,
  * and an end. The 'state()' attribute reports where in that sequence this
  * Gesture object falls.
  *
  * Possible values for the state field are:
  *
  * * start
  * * update
  * * stop
  *
  * @member state
  * @memberof Leap.Gesture.prototype
  * @type {String}
  */
  gesture.state = data.state;
 /**
  * The gesture type.
  *
  * Possible values for the type field are:
  *
  * * circle
  * * swipe
  * * screenTap
  * * keyTap
  *
  * @member type
  * @memberof Leap.Gesture.prototype
  * @type {String}
  */
  gesture.type = data.type;
  return gesture;
}

/*
 * Returns a builder object, which uses method chaining for gesture callback binding.
 */
var gestureListener = exports.gestureListener = function(controller, type) {
  var handlers = {};
  var gestureMap = {};

  controller.on('gesture', function(gesture, frame) {
    if (gesture.type == type) {
      if (gesture.state == "start" || gesture.state == "stop") {
        if (gestureMap[gesture.id] === undefined) {
          var gestureTracker = new Gesture(gesture, frame);
          gestureMap[gesture.id] = gestureTracker;
          _.each(handlers, function(cb, name) {
            gestureTracker.on(name, cb);
          });
        }
      }
      gestureMap[gesture.id].update(gesture, frame);
      if (gesture.state == "stop") {
        delete gestureMap[gesture.id];
      }
    }
  });
  var builder = {
    start: function(cb) {
      handlers['start'] = cb;
      return builder;
    },
    stop: function(cb) {
      handlers['stop'] = cb;
      return builder;
    },
    complete: function(cb) {
      handlers['stop'] = cb;
      return builder;
    },
    update: function(cb) {
      handlers['update'] = cb;
      return builder;
    }
  }
  return builder;
}

var Gesture = exports.Gesture = function(gesture, frame) {
  this.gestures = [gesture];
  this.frames = [frame];
}

Gesture.prototype.update = function(gesture, frame) {
  this.lastGesture = gesture;
  this.lastFrame = frame;
  this.gestures.push(gesture);
  this.frames.push(frame);
  this.emit(gesture.state, this);
}

Gesture.prototype.translation = function() {
  return vec3.subtract(vec3.create(), this.lastGesture.startPosition, this.lastGesture.position);
}

_.extend(Gesture.prototype, EventEmitter.prototype);

/**
 * Constructs a new CircleGesture object.
 *
 * An uninitialized CircleGesture object is considered invalid. Get valid instances
 * of the CircleGesture class from a Frame object.
 *
 * @class CircleGesture
 * @memberof Leap
 * @augments Leap.Gesture
 * @classdesc
 * The CircleGesture classes represents a circular finger movement.
 *
 * A circle movement is recognized when the tip of a finger draws a circle
 * within the Leap field of view.
 *
 * ![CircleGesture](images/Leap_Gesture_Circle.png)
 *
 * Circle gestures are continuous. The CircleGesture objects for the gesture have
 * three possible states:
 *
 * * start -- The circle gesture has just started. The movement has
 *  progressed far enough for the recognizer to classify it as a circle.
 * * update -- The circle gesture is continuing.
 * * stop -- The circle gesture is finished.
 */
var CircleGesture = function(data) {
 /**
  * The center point of the circle within the Leap frame of reference.
  *
  * @member center
  * @memberof Leap.CircleGesture.prototype
  * @type {number[]}
  */
  this.center = data.center;
 /**
  * The normal vector for the circle being traced.
  *
  * If you draw the circle clockwise, the normal vector points in the same
  * general direction as the pointable object drawing the circle. If you draw
  * the circle counterclockwise, the normal points back toward the
  * pointable. If the angle between the normal and the pointable object
  * drawing the circle is less than 90 degrees, then the circle is clockwise.
  *
  * ```javascript
  *    var clockwiseness;
  *    if (circle.pointable.direction.angleTo(circle.normal) <= PI/4) {
  *        clockwiseness = "clockwise";
  *    }
  *    else
  *    {
  *        clockwiseness = "counterclockwise";
  *    }
  * ```
  *
  * @member normal
  * @memberof Leap.CircleGesture.prototype
  * @type {number[]}
  */
  this.normal = data.normal;
 /**
  * The number of times the finger tip has traversed the circle.
  *
  * Progress is reported as a positive number of the number. For example,
  * a progress value of .5 indicates that the finger has gone halfway
  * around, while a value of 3 indicates that the finger has gone around
  * the the circle three times.
  *
  * Progress starts where the circle gesture began. Since the circle
  * must be partially formed before the Leap can recognize it, progress
  * will be greater than zero when a circle gesture first appears in the
  * frame.
  *
  * @member progress
  * @memberof Leap.CircleGesture.prototype
  * @type {number}
  */
  this.progress = data.progress;
 /**
  * The radius of the circle in mm.
  *
  * @member radius
  * @memberof Leap.CircleGesture.prototype
  * @type {number}
  */
  this.radius = data.radius;
}

CircleGesture.prototype.toString = function() {
  return "CircleGesture ["+JSON.stringify(this)+"]";
}

/**
 * Constructs a new SwipeGesture object.
 *
 * An uninitialized SwipeGesture object is considered invalid. Get valid instances
 * of the SwipeGesture class from a Frame object.
 *
 * @class SwipeGesture
 * @memberof Leap
 * @augments Leap.Gesture
 * @classdesc
 * The SwipeGesture class represents a swiping motion of a finger or tool.
 *
 * ![SwipeGesture](images/Leap_Gesture_Swipe.png)
 *
 * Swipe gestures are continuous.
 */
var SwipeGesture = function(data) {
 /**
  * The starting position within the Leap frame of
  * reference, in mm.
  *
  * @member startPosition
  * @memberof Leap.SwipeGesture.prototype
  * @type {number[]}
  */
  this.startPosition = data.startPosition;
 /**
  * The current swipe position within the Leap frame of
  * reference, in mm.
  *
  * @member position
  * @memberof Leap.SwipeGesture.prototype
  * @type {number[]}
  */
  this.position = data.position;
 /**
  * The unit direction vector parallel to the swipe motion.
  *
  * You can compare the components of the vector to classify the swipe as
  * appropriate for your application. For example, if you are using swipes
  * for two dimensional scrolling, you can compare the x and y values to
  * determine if the swipe is primarily horizontal or vertical.
  *
  * @member direction
  * @memberof Leap.SwipeGesture.prototype
  * @type {number[]}
  */
  this.direction = data.direction;
 /**
  * The speed of the finger performing the swipe gesture in
  * millimeters per second.
  *
  * @member speed
  * @memberof Leap.SwipeGesture.prototype
  * @type {number}
  */
  this.speed = data.speed;
}

SwipeGesture.prototype.toString = function() {
  return "SwipeGesture ["+JSON.stringify(this)+"]";
}

/**
 * Constructs a new ScreenTapGesture object.
 *
 * An uninitialized ScreenTapGesture object is considered invalid. Get valid instances
 * of the ScreenTapGesture class from a Frame object.
 *
 * @class ScreenTapGesture
 * @memberof Leap
 * @augments Leap.Gesture
 * @classdesc
 * The ScreenTapGesture class represents a tapping gesture by a finger or tool.
 *
 * A screen tap gesture is recognized when the tip of a finger pokes forward
 * and then springs back to approximately the original postion, as if
 * tapping a vertical screen. The tapping finger must pause briefly before beginning the tap.
 *
 * ![ScreenTap](images/Leap_Gesture_Tap2.png)
 *
 * ScreenTap gestures are discrete. The ScreenTapGesture object representing a tap always
 * has the state, STATE_STOP. Only one ScreenTapGesture object is created for each
 * screen tap gesture recognized.
 */
var ScreenTapGesture = function(data) {
 /**
  * The position where the screen tap is registered.
  *
  * @member position
  * @memberof Leap.ScreenTapGesture.prototype
  * @type {number[]}
  */
  this.position = data.position;
 /**
  * The direction of finger tip motion.
  *
  * @member direction
  * @memberof Leap.ScreenTapGesture.prototype
  * @type {number[]}
  */
  this.direction = data.direction;
 /**
  * The progess value is always 1.0 for a screen tap gesture.
  *
  * @member progress
  * @memberof Leap.ScreenTapGesture.prototype
  * @type {number}
  */
  this.progress = data.progress;
}

ScreenTapGesture.prototype.toString = function() {
  return "ScreenTapGesture ["+JSON.stringify(this)+"]";
}

/**
 * Constructs a new KeyTapGesture object.
 *
 * An uninitialized KeyTapGesture object is considered invalid. Get valid instances
 * of the KeyTapGesture class from a Frame object.
 *
 * @class KeyTapGesture
 * @memberof Leap
 * @augments Leap.Gesture
 * @classdesc
 * The KeyTapGesture class represents a tapping gesture by a finger or tool.
 *
 * A key tap gesture is recognized when the tip of a finger rotates down toward the
 * palm and then springs back to approximately the original postion, as if
 * tapping. The tapping finger must pause briefly before beginning the tap.
 *
 * ![KeyTap](images/Leap_Gesture_Tap.png)
 *
 * Key tap gestures are discrete. The KeyTapGesture object representing a tap always
 * has the state, STATE_STOP. Only one KeyTapGesture object is created for each
 * key tap gesture recognized.
 */
var KeyTapGesture = function(data) {
    /**
     * The position where the key tap is registered.
     *
     * @member position
     * @memberof Leap.KeyTapGesture.prototype
     * @type {number[]}
     */
    this.position = data.position;
    /**
     * The direction of finger tip motion.
     *
     * @member direction
     * @memberof Leap.KeyTapGesture.prototype
     * @type {number[]}
     */
    this.direction = data.direction;
    /**
     * The progess value is always 1.0 for a key tap gesture.
     *
     * @member progress
     * @memberof Leap.KeyTapGesture.prototype
     * @type {number}
     */
    this.progress = data.progress;
}

KeyTapGesture.prototype.toString = function() {
  return "KeyTapGesture ["+JSON.stringify(this)+"]";
}

},{"events":29,"gl-matrix":22,"underscore":23}],12:[function(require,module,exports){
var Pointable = require("./pointable")
  , Bone = require('./bone')
  , glMatrix = require("gl-matrix")
  , mat3 = glMatrix.mat3
  , vec3 = glMatrix.vec3
  , _ = require("underscore");

/**
 * Constructs a Hand object.
 *
 * An uninitialized hand is considered invalid.
 * Get valid Hand objects from a Frame object.
 * @class Hand
 * @memberof Leap
 * @classdesc
 * The Hand class reports the physical characteristics of a detected hand.
 *
 * Hand tracking data includes a palm position and velocity; vectors for
 * the palm normal and direction to the fingers; properties of a sphere fit
 * to the hand; and lists of the attached fingers and tools.
 *
 * Note that Hand objects can be invalid, which means that they do not contain
 * valid tracking data and do not correspond to a physical entity. Invalid Hand
 * objects can be the result of asking for a Hand object using an ID from an
 * earlier frame when no Hand objects with that ID exist in the current frame.
 * A Hand object created from the Hand constructor is also invalid.
 * Test for validity with the [Hand.valid]{@link Leap.Hand#valid} property.
 */
var Hand = module.exports = function(data) {
  /**
   * A unique ID assigned to this Hand object, whose value remains the same
   * across consecutive frames while the tracked hand remains visible. If
   * tracking is lost (for example, when a hand is occluded by another hand
   * or when it is withdrawn from or reaches the edge of the Leap field of view),
   * the Leap may assign a new ID when it detects the hand in a future frame.
   *
   * Use the ID value with the {@link Frame.hand}() function to find this
   * Hand object in future frames.
   *
   * @member id
   * @memberof Leap.Hand.prototype
   * @type {String}
   */
  this.id = data.id;
  /**
   * The center position of the palm in millimeters from the Leap origin.
   * @member palmPosition
   * @memberof Leap.Hand.prototype
   * @type {number[]}
   */
  this.palmPosition = data.palmPosition;
  /**
   * The direction from the palm position toward the fingers.
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the directed line from the palm position to the fingers.
   *
   * @member direction
   * @memberof Leap.Hand.prototype
   * @type {number[]}
   */
  this.direction = data.direction;
  /**
   * The rate of change of the palm position in millimeters/second.
   *
   * @member palmVeclocity
   * @memberof Leap.Hand.prototype
   * @type {number[]}
   */
  this.palmVelocity = data.palmVelocity;
  /**
   * The normal vector to the palm. If your hand is flat, this vector will
   * point downward, or "out" of the front surface of your palm.
   *
   * ![Palm Vectors](images/Leap_Palm_Vectors.png)
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the palm normal (that is, a vector orthogonal to the palm).
   * @member palmNormal
   * @memberof Leap.Hand.prototype
   * @type {number[]}
   */
  this.palmNormal = data.palmNormal;
  /**
   * The center of a sphere fit to the curvature of this hand.
   *
   * This sphere is placed roughly as if the hand were holding a ball.
   *
   * ![Hand Ball](images/Leap_Hand_Ball.png)
   * @member sphereCenter
   * @memberof Leap.Hand.prototype
   * @type {number[]}
   */
  this.sphereCenter = data.sphereCenter;
  /**
   * The radius of a sphere fit to the curvature of this hand, in millimeters.
   *
   * This sphere is placed roughly as if the hand were holding a ball. Thus the
   * size of the sphere decreases as the fingers are curled into a fist.
   *
   * @member sphereRadius
   * @memberof Leap.Hand.prototype
   * @type {number}
   */
  this.sphereRadius = data.sphereRadius;
  /**
   * Reports whether this is a valid Hand object.
   *
   * @member valid
   * @memberof Leap.Hand.prototype
   * @type {boolean}
   */
  this.valid = true;
  /**
   * The list of Pointable objects (fingers and tools) detected in this frame
   * that are associated with this hand, given in arbitrary order. The list
   * can be empty if no fingers or tools associated with this hand are detected.
   *
   * Use the {@link Pointable} tool property to determine
   * whether or not an item in the list represents a tool or finger.
   * You can also get only the tools using the Hand.tools[] list or
   * only the fingers using the Hand.fingers[] list.
   *
   * @member pointables[]
   * @memberof Leap.Hand.prototype
   * @type {Leap.Pointable[]}
   */
  this.pointables = [];
  /**
   * The list of fingers detected in this frame that are attached to
   * this hand, given in arbitrary order.
   *
   * The list can be empty if no fingers attached to this hand are detected.
   *
   * @member fingers[]
   * @memberof Leap.Hand.prototype
   * @type {Leap.Pointable[]}
   */
  this.fingers = [];
  
  if (data.armBasis){
    this.arm = new Bone(this, {
      type: 4,
      width: data.armWidth,
      prevJoint: data.elbow,
      nextJoint: data.wrist,
      basis: data.armBasis
    });
  }else{
    this.arm = null;
  }
  
  /**
   * The list of tools detected in this frame that are held by this
   * hand, given in arbitrary order.
   *
   * The list can be empty if no tools held by this hand are detected.
   *
   * @member tools[]
   * @memberof Leap.Hand.prototype
   * @type {Leap.Pointable[]}
   */
  this.tools = [];
  this._translation = data.t;
  this._rotation = _.flatten(data.r);
  this._scaleFactor = data.s;

  /**
   * Time the hand has been visible in seconds.
   *
   * @member timeVisible
   * @memberof Leap.Hand.prototype
   * @type {number}
   */
   this.timeVisible = data.timeVisible;

  /**
   * The palm position with stabalization
   * @member stabilizedPalmPosition
   * @memberof Leap.Hand.prototype
   * @type {number[]}
   */
   this.stabilizedPalmPosition = data.stabilizedPalmPosition;

   /**
   * Reports whether this is a left or a right hand.
   *
   * @member type
   * @type {String}
   * @memberof Leap.Hand.prototype
   */
   this.type = data.type;
   this.grabStrength = data.grabStrength;
   this.pinchStrength = data.pinchStrength;
   this.confidence = data.confidence;
}

/**
 * The finger with the specified ID attached to this hand.
 *
 * Use this function to retrieve a Pointable object representing a finger
 * attached to this hand using an ID value obtained from a previous frame.
 * This function always returns a Pointable object, but if no finger
 * with the specified ID is present, an invalid Pointable object is returned.
 *
 * Note that the ID values assigned to fingers persist across frames, but only
 * until tracking of a particular finger is lost. If tracking of a finger is
 * lost and subsequently regained, the new Finger object representing that
 * finger may have a different ID than that representing the finger in an
 * earlier frame.
 *
 * @method finger
 * @memberof Leap.Hand.prototype
 * @param {String} id The ID value of a finger from a previous frame.
 * @returns {Leap.Pointable} The Finger object with
 * the matching ID if one exists for this hand in this frame; otherwise, an
 * invalid Finger object is returned.
 */
Hand.prototype.finger = function(id) {
  var finger = this.frame.finger(id);
  return (finger && (finger.handId == this.id)) ? finger : Pointable.Invalid;
}

/**
 * The angle of rotation around the rotation axis derived from the change in
 * orientation of this hand, and any associated fingers and tools, between the
 * current frame and the specified frame.
 *
 * The returned angle is expressed in radians measured clockwise around the
 * rotation axis (using the right-hand rule) between the start and end frames.
 * The value is always between 0 and pi radians (0 and 180 degrees).
 *
 * If a corresponding Hand object is not found in sinceFrame, or if either
 * this frame or sinceFrame are invalid Frame objects, then the angle of rotation is zero.
 *
 * @method rotationAngle
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @param {numnber[]} [axis] The axis to measure rotation around.
 * @returns {number} A positive value representing the heuristically determined
 * rotational change of the hand between the current frame and that specified in
 * the sinceFrame parameter.
 */
Hand.prototype.rotationAngle = function(sinceFrame, axis) {
  if (!this.valid || !sinceFrame.valid) return 0.0;
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return 0.0;
  var rot = this.rotationMatrix(sinceFrame);
  var cs = (rot[0] + rot[4] + rot[8] - 1.0)*0.5
  var angle = Math.acos(cs);
  angle = isNaN(angle) ? 0.0 : angle;
  if (axis !== undefined) {
    var rotAxis = this.rotationAxis(sinceFrame);
    angle *= vec3.dot(rotAxis, vec3.normalize(vec3.create(), axis));
  }
  return angle;
}

/**
 * The axis of rotation derived from the change in orientation of this hand, and
 * any associated fingers and tools, between the current frame and the specified frame.
 *
 * The returned direction vector is normalized.
 *
 * If a corresponding Hand object is not found in sinceFrame, or if either
 * this frame or sinceFrame are invalid Frame objects, then this method returns a zero vector.
 *
 * @method rotationAxis
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {number[]} A normalized direction Vector representing the axis of the heuristically determined
 * rotational change of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.rotationAxis = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return vec3.create();
  var sinceHand = sinceFrame.hand(this.id);
  if (!sinceHand.valid) return vec3.create();
  return vec3.normalize(vec3.create(), [
    this._rotation[7] - sinceHand._rotation[5],
    this._rotation[2] - sinceHand._rotation[6],
    this._rotation[3] - sinceHand._rotation[1]
  ]);
}

/**
 * The transform matrix expressing the rotation derived from the change in
 * orientation of this hand, and any associated fingers and tools, between
 * the current frame and the specified frame.
 *
 * If a corresponding Hand object is not found in sinceFrame, or if either
 * this frame or sinceFrame are invalid Frame objects, then this method returns
 * an identity matrix.
 *
 * @method rotationMatrix
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {number[]} A transformation Matrix containing the heuristically determined
 * rotational change of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.rotationMatrix = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return mat3.create();
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return mat3.create();
  var transpose = mat3.transpose(mat3.create(), this._rotation);
  var m = mat3.multiply(mat3.create(), sinceHand._rotation, transpose);
  return m;
}

/**
 * The scale factor derived from the hand's motion between the current frame and the specified frame.
 *
 * The scale factor is always positive. A value of 1.0 indicates no scaling took place.
 * Values between 0.0 and 1.0 indicate contraction and values greater than 1.0 indicate expansion.
 *
 * The Leap derives scaling from the relative inward or outward motion of a hand
 * and its associated fingers and tools (independent of translation and rotation).
 *
 * If a corresponding Hand object is not found in sinceFrame, or if either this frame or sinceFrame
 * are invalid Frame objects, then this method returns 1.0.
 *
 * @method scaleFactor
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative scaling.
 * @returns {number} A positive value representing the heuristically determined
 * scaling change ratio of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.scaleFactor = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return 1.0;
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return 1.0;

  return Math.exp(this._scaleFactor - sinceHand._scaleFactor);
}

/**
 * The change of position of this hand between the current frame and the specified frame
 *
 * The returned translation vector provides the magnitude and direction of the
 * movement in millimeters.
 *
 * If a corresponding Hand object is not found in sinceFrame, or if either this frame or
 * sinceFrame are invalid Frame objects, then this method returns a zero vector.
 *
 * @method translation
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative translation.
 * @returns {number[]} A Vector representing the heuristically determined change in hand
 * position between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.translation = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return vec3.create();
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return vec3.create();
  return [
    this._translation[0] - sinceHand._translation[0],
    this._translation[1] - sinceHand._translation[1],
    this._translation[2] - sinceHand._translation[2]
  ];
}

/**
 * A string containing a brief, human readable description of the Hand object.
 * @method toString
 * @memberof Leap.Hand.prototype
 * @returns {String} A description of the Hand as a string.
 */
Hand.prototype.toString = function() {
  return "Hand (" + this.type + ") [ id: "+ this.id + " | palm velocity:"+this.palmVelocity+" | sphere center:"+this.sphereCenter+" ] ";
}

/**
 * The pitch angle in radians.
 *
 * Pitch is the angle between the negative z-axis and the projection of
 * the vector onto the y-z plane. In other words, pitch represents rotation
 * around the x-axis.
 * If the vector points upward, the returned angle is between 0 and pi radians
 * (180 degrees); if it points downward, the angle is between 0 and -pi radians.
 *
 * @method pitch
 * @memberof Leap.Hand.prototype
 * @returns {number} The angle of this vector above or below the horizon (x-z plane).
 *
 */
Hand.prototype.pitch = function() {
  return Math.atan2(this.direction[1], -this.direction[2]);
}

/**
 *  The yaw angle in radians.
 *
 * Yaw is the angle between the negative z-axis and the projection of
 * the vector onto the x-z plane. In other words, yaw represents rotation
 * around the y-axis. If the vector points to the right of the negative z-axis,
 * then the returned angle is between 0 and pi radians (180 degrees);
 * if it points to the left, the angle is between 0 and -pi radians.
 *
 * @method yaw
 * @memberof Leap.Hand.prototype
 * @returns {number} The angle of this vector to the right or left of the y-axis.
 *
 */
Hand.prototype.yaw = function() {
  return Math.atan2(this.direction[0], -this.direction[2]);
}

/**
 *  The roll angle in radians.
 *
 * Roll is the angle between the y-axis and the projection of
 * the vector onto the x-y plane. In other words, roll represents rotation
 * around the z-axis. If the vector points to the left of the y-axis,
 * then the returned angle is between 0 and pi radians (180 degrees);
 * if it points to the right, the angle is between 0 and -pi radians.
 *
 * @method roll
 * @memberof Leap.Hand.prototype
 * @returns {number} The angle of this vector to the right or left of the y-axis.
 *
 */
Hand.prototype.roll = function() {
  return Math.atan2(this.palmNormal[0], -this.palmNormal[1]);
}

/**
 * An invalid Hand object.
 *
 * You can use an invalid Hand object in comparisons testing
 * whether a given Hand instance is valid or invalid. (You can also use the
 * Hand valid property.)
 *
 * @static
 * @type {Leap.Hand}
 * @name Invalid
 * @memberof Leap.Hand
 */
Hand.Invalid = {
  valid: false,
  fingers: [],
  tools: [],
  pointables: [],
  left: false,
  pointable: function() { return Pointable.Invalid },
  finger: function() { return Pointable.Invalid },
  toString: function() { return "invalid frame" },
  dump: function() { return this.toString(); },
  rotationAngle: function() { return 0.0; },
  rotationMatrix: function() { return mat3.create(); },
  rotationAxis: function() { return vec3.create(); },
  scaleFactor: function() { return 1.0; },
  translation: function() { return vec3.create(); }
};

},{"./bone":2,"./pointable":16,"gl-matrix":22,"underscore":23}],13:[function(require,module,exports){
/**
 * Leap is the global namespace of the Leap API.
 * @namespace Leap
 */
module.exports = {
  Controller: require("./controller"),
  Frame: require("./frame"),
  Gesture: require("./gesture"),
  Hand: require("./hand"),
  Pointable: require("./pointable"),
  Finger: require("./finger"),
  InteractionBox: require("./interaction_box"),
  CircularBuffer: require("./circular_buffer"),
  UI: require("./ui"),
  JSONProtocol: require("./protocol").JSONProtocol,
  glMatrix: require("gl-matrix"),
  mat3: require("gl-matrix").mat3,
  vec3: require("gl-matrix").vec3,
  loopController: undefined,
  version: require('./version.js'),

  /**
   * Expose utility libraries for convenience
   * Use carefully - they may be subject to upgrade or removal in different versions of LeapJS.
   *
   */
  _: require('underscore'),
  EventEmitter: require('events').EventEmitter,

  /**
   * The Leap.loop() function passes a frame of Leap data to your
   * callback function and then calls window.requestAnimationFrame() after
   * executing your callback function.
   *
   * Leap.loop() sets up the Leap controller and WebSocket connection for you.
   * You do not need to create your own controller when using this method.
   *
   * Your callback function is called on an interval determined by the client
   * browser. Typically, this is on an interval of 60 frames/second. The most
   * recent frame of Leap data is passed to your callback function. If the Leap
   * is producing frames at a slower rate than the browser frame rate, the same
   * frame of Leap data can be passed to your function in successive animation
   * updates.
   *
   * As an alternative, you can create your own Controller object and use a
   * {@link Controller#onFrame onFrame} callback to process the data at
   * the frame rate of the Leap device. See {@link Controller} for an
   * example.
   *
   * @method Leap.loop
   * @param {function} callback A function called when the browser is ready to
   * draw to the screen. The most recent {@link Frame} object is passed to
   * your callback function.
   *
   * ```javascript
   *    Leap.loop( function( frame ) {
   *        // ... your code here
   *    })
   * ```
   */
  loop: function(opts, callback) {
    if (opts && callback === undefined &&  ( ({}).toString.call(opts) === '[object Function]' ) ) {
      callback = opts;
      opts = {};
    }

    if (this.loopController) {
      if (opts){
        this.loopController.setupFrameEvents(opts);
      }
    }else{
      this.loopController = new this.Controller(opts);
    }

    this.loopController.loop(callback);
    return this.loopController;
  },

  /*
   * Convenience method for Leap.Controller.plugin
   */
  plugin: function(name, options){
    this.Controller.plugin(name, options)
  }
}

},{"./circular_buffer":3,"./controller":7,"./finger":9,"./frame":10,"./gesture":11,"./hand":12,"./interaction_box":14,"./pointable":16,"./protocol":17,"./ui":18,"./version.js":21,"events":29,"gl-matrix":22,"underscore":23}],14:[function(require,module,exports){
var glMatrix = require("gl-matrix")
  , vec3 = glMatrix.vec3;

/**
 * Constructs a InteractionBox object.
 *
 * @class InteractionBox
 * @memberof Leap
 * @classdesc
 * The InteractionBox class represents a box-shaped region completely within
 * the field of view of the Leap Motion controller.
 *
 * The interaction box is an axis-aligned rectangular prism and provides
 * normalized coordinates for hands, fingers, and tools within this box.
 * The InteractionBox class can make it easier to map positions in the
 * Leap Motion coordinate system to 2D or 3D coordinate systems used
 * for application drawing.
 *
 * ![Interaction Box](images/Leap_InteractionBox.png)
 *
 * The InteractionBox region is defined by a center and dimensions along the x, y, and z axes.
 */
var InteractionBox = module.exports = function(data) {
  /**
   * Indicates whether this is a valid InteractionBox object.
   *
   * @member valid
   * @type {Boolean}
   * @memberof Leap.InteractionBox.prototype
   */
  this.valid = true;
  /**
   * The center of the InteractionBox in device coordinates (millimeters).
   * This point is equidistant from all sides of the box.
   *
   * @member center
   * @type {number[]}
   * @memberof Leap.InteractionBox.prototype
   */
  this.center = data.center;

  this.size = data.size;
  /**
   * The width of the InteractionBox in millimeters, measured along the x-axis.
   *
   * @member width
   * @type {number}
   * @memberof Leap.InteractionBox.prototype
   */
  this.width = data.size[0];
  /**
   * The height of the InteractionBox in millimeters, measured along the y-axis.
   *
   * @member height
   * @type {number}
   * @memberof Leap.InteractionBox.prototype
   */
  this.height = data.size[1];
  /**
   * The depth of the InteractionBox in millimeters, measured along the z-axis.
   *
   * @member depth
   * @type {number}
   * @memberof Leap.InteractionBox.prototype
   */
  this.depth = data.size[2];
}

/**
 * Converts a position defined by normalized InteractionBox coordinates
 * into device coordinates in millimeters.
 *
 * This function performs the inverse of normalizePoint().
 *
 * @method denormalizePoint
 * @memberof Leap.InteractionBox.prototype
 * @param {number[]} normalizedPosition The input position in InteractionBox coordinates.
 * @returns {number[]} The corresponding denormalized position in device coordinates.
 */
InteractionBox.prototype.denormalizePoint = function(normalizedPosition) {
  return vec3.fromValues(
    (normalizedPosition[0] - 0.5) * this.size[0] + this.center[0],
    (normalizedPosition[1] - 0.5) * this.size[1] + this.center[1],
    (normalizedPosition[2] - 0.5) * this.size[2] + this.center[2]
  );
}

/**
 * Normalizes the coordinates of a point using the interaction box.
 *
 * Coordinates from the Leap Motion frame of reference (millimeters) are
 * converted to a range of [0..1] such that the minimum value of the
 * InteractionBox maps to 0 and the maximum value of the InteractionBox maps to 1.
 *
 * @method normalizePoint
 * @memberof Leap.InteractionBox.prototype
 * @param {number[]} position The input position in device coordinates.
 * @param {Boolean} clamp Whether or not to limit the output value to the range [0,1]
 * when the input position is outside the InteractionBox. Defaults to true.
 * @returns {number[]} The normalized position.
 */
InteractionBox.prototype.normalizePoint = function(position, clamp) {
  var vec = vec3.fromValues(
    ((position[0] - this.center[0]) / this.size[0]) + 0.5,
    ((position[1] - this.center[1]) / this.size[1]) + 0.5,
    ((position[2] - this.center[2]) / this.size[2]) + 0.5
  );

  if (clamp) {
    vec[0] = Math.min(Math.max(vec[0], 0), 1);
    vec[1] = Math.min(Math.max(vec[1], 0), 1);
    vec[2] = Math.min(Math.max(vec[2], 0), 1);
  }
  return vec;
}

/**
 * Writes a brief, human readable description of the InteractionBox object.
 *
 * @method toString
 * @memberof Leap.InteractionBox.prototype
 * @returns {String} A description of the InteractionBox object as a string.
 */
InteractionBox.prototype.toString = function() {
  return "InteractionBox [ width:" + this.width + " | height:" + this.height + " | depth:" + this.depth + " ]";
}

/**
 * An invalid InteractionBox object.
 *
 * You can use this InteractionBox instance in comparisons testing
 * whether a given InteractionBox instance is valid or invalid. (You can also use the
 * InteractionBox.valid property.)
 *
 * @static
 * @type {Leap.InteractionBox}
 * @name Invalid
 * @memberof Leap.InteractionBox
 */
InteractionBox.Invalid = { valid: false };

},{"gl-matrix":22}],15:[function(require,module,exports){
var Pipeline = module.exports = function (controller) {
  this.steps = [];
  this.controller = controller;
}

Pipeline.prototype.addStep = function (step) {
  this.steps.push(step);
}

Pipeline.prototype.run = function (frame) {
  var stepsLength = this.steps.length;
  for (var i = 0; i != stepsLength; i++) {
    if (!frame) break;
    frame = this.steps[i](frame);
  }
  return frame;
}

Pipeline.prototype.removeStep = function(step){
  var index = this.steps.indexOf(step);
  if (index === -1) throw "Step not found in pipeline";
  this.steps.splice(index, 1);
}

/*
 * Wraps a plugin callback method in method which can be run inside the pipeline.
 * This wrapper method loops the callback over objects within the frame as is appropriate,
 * calling the callback for each in turn.
 *
 * @method createStepFunction
 * @memberOf Leap.Controller.prototype
 * @param {Controller} The controller on which the callback is called.
 * @param {String} type What frame object the callback is run for and receives.
 *       Can be one of 'frame', 'finger', 'hand', 'pointable', 'tool'
 * @param {function} callback The method which will be run inside the pipeline loop.  Receives one argument, such as a hand.
 * @private
 */
Pipeline.prototype.addWrappedStep = function (type, callback) {
  var controller = this.controller,
    step = function (frame) {
      var dependencies, i, len;
      dependencies = (type == 'frame') ? [frame] : (frame[type + 's'] || []);

      for (i = 0, len = dependencies.length; i < len; i++) {
        callback.call(controller, dependencies[i]);
      }

      return frame;
    };

  this.addStep(step);
  return step;
};
},{}],16:[function(require,module,exports){
var glMatrix = require("gl-matrix")
  , vec3 = glMatrix.vec3;

/**
 * Constructs a Pointable object.
 *
 * An uninitialized pointable is considered invalid.
 * Get valid Pointable objects from a Frame or a Hand object.
 *
 * @class Pointable
 * @memberof Leap
 * @classdesc
 * The Pointable class reports the physical characteristics of a detected
 * finger or tool.
 *
 * Both fingers and tools are classified as Pointable objects. Use the
 * Pointable.tool property to determine whether a Pointable object represents a
 * tool or finger. The Leap classifies a detected entity as a tool when it is
 * thinner, straighter, and longer than a typical finger.
 *
 * Note that Pointable objects can be invalid, which means that they do not
 * contain valid tracking data and do not correspond to a physical entity.
 * Invalid Pointable objects can be the result of asking for a Pointable object
 * using an ID from an earlier frame when no Pointable objects with that ID
 * exist in the current frame. A Pointable object created from the Pointable
 * constructor is also invalid. Test for validity with the Pointable.valid
 * property.
 */
var Pointable = module.exports = function(data) {
  /**
   * Indicates whether this is a valid Pointable object.
   *
   * @member valid
   * @type {Boolean}
   * @memberof Leap.Pointable.prototype
   */
  this.valid = true;
  /**
   * A unique ID assigned to this Pointable object, whose value remains the
   * same across consecutive frames while the tracked finger or tool remains
   * visible. If tracking is lost (for example, when a finger is occluded by
   * another finger or when it is withdrawn from the Leap field of view), the
   * Leap may assign a new ID when it detects the entity in a future frame.
   *
   * Use the ID value with the pointable() functions defined for the
   * {@link Frame} and {@link Frame.Hand} classes to find this
   * Pointable object in future frames.
   *
   * @member id
   * @type {String}
   * @memberof Leap.Pointable.prototype
   */
  this.id = data.id;
  this.handId = data.handId;
  /**
   * The estimated length of the finger or tool in millimeters.
   *
   * The reported length is the visible length of the finger or tool from the
   * hand to tip. If the length isn't known, then a value of 0 is returned.
   *
   * @member length
   * @type {number}
   * @memberof Leap.Pointable.prototype
   */
  this.length = data.length;
  /**
   * Whether or not the Pointable is believed to be a tool.
   * Tools are generally longer, thinner, and straighter than fingers.
   *
   * If tool is false, then this Pointable must be a finger.
   *
   * @member tool
   * @type {Boolean}
   * @memberof Leap.Pointable.prototype
   */
  this.tool = data.tool;
  /**
   * The estimated width of the tool in millimeters.
   *
   * The reported width is the average width of the visible portion of the
   * tool from the hand to the tip. If the width isn't known,
   * then a value of 0 is returned.
   *
   * Pointable objects representing fingers do not have a width property.
   *
   * @member width
   * @type {number}
   * @memberof Leap.Pointable.prototype
   */
  this.width = data.width;
  /**
   * The direction in which this finger or tool is pointing.
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the tip.
   *
   * ![Finger](images/Leap_Finger_Model.png)
   * @member direction
   * @type {number[]}
   * @memberof Leap.Pointable.prototype
   */
  this.direction = data.direction;
  /**
   * The tip position in millimeters from the Leap origin.
   * Stabilized
   *
   * @member stabilizedTipPosition
   * @type {number[]}
   * @memberof Leap.Pointable.prototype
   */
  this.stabilizedTipPosition = data.stabilizedTipPosition;
  /**
   * The tip position in millimeters from the Leap origin.
   *
   * @member tipPosition
   * @type {number[]}
   * @memberof Leap.Pointable.prototype
   */
  this.tipPosition = data.tipPosition;
  /**
   * The rate of change of the tip position in millimeters/second.
   *
   * @member tipVelocity
   * @type {number[]}
   * @memberof Leap.Pointable.prototype
   */
  this.tipVelocity = data.tipVelocity;
  /**
   * The current touch zone of this Pointable object.
   *
   * The Leap Motion software computes the touch zone based on a floating touch
   * plane that adapts to the user's finger movement and hand posture. The Leap
   * Motion software interprets purposeful movements toward this plane as potential touch
   * points. When a Pointable moves close to the adaptive touch plane, it enters the
   * "hovering" zone. When a Pointable reaches or passes through the plane, it enters
   * the "touching" zone.
   *
   * The possible states include:
   *
   * * "none" -- The Pointable is outside the hovering zone.
   * * "hovering" -- The Pointable is close to, but not touching the touch plane.
   * * "touching" -- The Pointable has penetrated the touch plane.
   *
   * The touchDistance value provides a normalized indication of the distance to
   * the touch plane when the Pointable is in the hovering or touching zones.
   *
   * @member touchZone
   * @type {String}
   * @memberof Leap.Pointable.prototype
   */
  this.touchZone = data.touchZone;
  /**
   * A value proportional to the distance between this Pointable object and the
   * adaptive touch plane.
   *
   * ![Touch Distance](images/Leap_Touch_Plane.png)
   *
   * The touch distance is a value in the range [-1, 1]. The value 1.0 indicates the
   * Pointable is at the far edge of the hovering zone. The value 0 indicates the
   * Pointable is just entering the touching zone. A value of -1.0 indicates the
   * Pointable is firmly within the touching zone. Values in between are
   * proportional to the distance from the plane. Thus, the touchDistance of 0.5
   * indicates that the Pointable is halfway into the hovering zone.
   *
   * You can use the touchDistance value to modulate visual feedback given to the
   * user as their fingers close in on a touch target, such as a button.
   *
   * @member touchDistance
   * @type {number}
   * @memberof Leap.Pointable.prototype
   */
  this.touchDistance = data.touchDistance;

  /**
   * How long the pointable has been visible in seconds.
   *
   * @member timeVisible
   * @type {number}
   * @memberof Leap.Pointable.prototype
   */
  this.timeVisible = data.timeVisible;
}

/**
 * A string containing a brief, human readable description of the Pointable
 * object.
 *
 * @method toString
 * @memberof Leap.Pointable.prototype
 * @returns {String} A description of the Pointable object as a string.
 */
Pointable.prototype.toString = function() {
  return "Pointable [ id:" + this.id + " " + this.length + "mmx | width:" + this.width + "mm | direction:" + this.direction + ' ]';
}

/**
 * Returns the hand which the pointable is attached to.
 */
Pointable.prototype.hand = function(){
  return this.frame.hand(this.handId);
}

/**
 * An invalid Pointable object.
 *
 * You can use this Pointable instance in comparisons testing
 * whether a given Pointable instance is valid or invalid. (You can also use the
 * Pointable.valid property.)

 * @static
 * @type {Leap.Pointable}
 * @name Invalid
 * @memberof Leap.Pointable
 */
Pointable.Invalid = { valid: false };

},{"gl-matrix":22}],17:[function(require,module,exports){
var Frame = require('./frame')
  , Hand = require('./hand')
  , Pointable = require('./pointable')
  , Finger = require('./finger')
  , _ = require('underscore')
  , EventEmitter = require('events').EventEmitter;

var Event = function(data) {
  this.type = data.type;
  this.state = data.state;
};

exports.chooseProtocol = function(header) {
  var protocol;
  switch(header.version) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      protocol = JSONProtocol(header);
      protocol.sendBackground = function(connection, state) {
        connection.send(protocol.encode({background: state}));
      }
      protocol.sendFocused = function(connection, state) {
        connection.send(protocol.encode({focused: state}));
      }
      protocol.sendOptimizeHMD = function(connection, state) {
        connection.send(protocol.encode({optimizeHMD: state}));
      }
      break;
    default:
      throw "unrecognized version";
  }
  return protocol;
}

var JSONProtocol = exports.JSONProtocol = function(header) {

  var protocol = function(frameData) {

    if (frameData.event) {

      return new Event(frameData.event);

    } else {

      protocol.emit('beforeFrameCreated', frameData);

      var frame = new Frame(frameData);

      protocol.emit('afterFrameCreated', frame, frameData);

      return frame;

    }

  };

  protocol.encode = function(message) {
    return JSON.stringify(message);
  };
  protocol.version = header.version;
  protocol.serviceVersion = header.serviceVersion;
  protocol.versionLong = 'Version ' + header.version;
  protocol.type = 'protocol';

  _.extend(protocol, EventEmitter.prototype);

  return protocol;
};



},{"./finger":9,"./frame":10,"./hand":12,"./pointable":16,"events":29,"underscore":23}],18:[function(require,module,exports){
exports.UI = {
  Region: require("./ui/region"),
  Cursor: require("./ui/cursor")
};
},{"./ui/cursor":19,"./ui/region":20}],19:[function(require,module,exports){
var Cursor = module.exports = function() {
  return function(frame) {
    var pointable = frame.pointables.sort(function(a, b) { return a.z - b.z })[0]
    if (pointable && pointable.valid) {
      frame.cursorPosition = pointable.tipPosition
    }
    return frame
  }
}

},{}],20:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter
  , _ = require('underscore')

var Region = module.exports = function(start, end) {
  this.start = new Vector(start)
  this.end = new Vector(end)
  this.enteredFrame = null
}

Region.prototype.hasPointables = function(frame) {
  for (var i = 0; i != frame.pointables.length; i++) {
    var position = frame.pointables[i].tipPosition
    if (position.x >= this.start.x && position.x <= this.end.x && position.y >= this.start.y && position.y <= this.end.y && position.z >= this.start.z && position.z <= this.end.z) {
      return true
    }
  }
  return false
}

Region.prototype.listener = function(opts) {
  var region = this
  if (opts && opts.nearThreshold) this.setupNearRegion(opts.nearThreshold)
  return function(frame) {
    return region.updatePosition(frame)
  }
}

Region.prototype.clipper = function() {
  var region = this
  return function(frame) {
    region.updatePosition(frame)
    return region.enteredFrame ? frame : null
  }
}

Region.prototype.setupNearRegion = function(distance) {
  var nearRegion = this.nearRegion = new Region(
    [this.start.x - distance, this.start.y - distance, this.start.z - distance],
    [this.end.x + distance, this.end.y + distance, this.end.z + distance]
  )
  var region = this
  nearRegion.on("enter", function(frame) {
    region.emit("near", frame)
  })
  nearRegion.on("exit", function(frame) {
    region.emit("far", frame)
  })
  region.on('exit', function(frame) {
    region.emit("near", frame)
  })
}

Region.prototype.updatePosition = function(frame) {
  if (this.nearRegion) this.nearRegion.updatePosition(frame)
  if (this.hasPointables(frame) && this.enteredFrame == null) {
    this.enteredFrame = frame
    this.emit("enter", this.enteredFrame)
  } else if (!this.hasPointables(frame) && this.enteredFrame != null) {
    this.enteredFrame = null
    this.emit("exit", this.enteredFrame)
  }
  return frame
}

Region.prototype.normalize = function(position) {
  return new Vector([
    (position.x - this.start.x) / (this.end.x - this.start.x),
    (position.y - this.start.y) / (this.end.y - this.start.y),
    (position.z - this.start.z) / (this.end.z - this.start.z)
  ])
}

Region.prototype.mapToXY = function(position, width, height) {
  var normalized = this.normalize(position)
  var x = normalized.x, y = normalized.y
  if (x > 1) x = 1
  else if (x < -1) x = -1
  if (y > 1) y = 1
  else if (y < -1) y = -1
  return [
    (x + 1) / 2 * width,
    (1 - y) / 2 * height,
    normalized.z
  ]
}

_.extend(Region.prototype, EventEmitter.prototype)
},{"events":29,"underscore":23}],21:[function(require,module,exports){
// This file is automatically updated from package.json by grunt.
module.exports = {
  full: '0.6.4',
  major: 0,
  minor: 6,
  dot: 4
}
},{}],22:[function(require,module,exports){
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.1
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function(_global) {
  "use strict";

  var shim = {};
  if (typeof(exports) === 'undefined') {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define(function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = typeof(window) !== 'undefined' ? window : _global;
    }
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matricies
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/*
* Rotate a 3D vector around the x-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/*
* Rotate a 3D vector around the y-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/*
* Rotate a 3D vector around the z-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) { 
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};


if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};


if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[7]-m[5])*fRoot;
        out[1] = (m[2]-m[6])*fRoot;
        out[2] = (m[3]-m[1])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[k*3+j] - m[j*3+k]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;













  })(shim.exports);
})(this);

},{}],23:[function(require,module,exports){
//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

},{}],24:[function(require,module,exports){
(function (global){
/// shim for browser packaging

module.exports = function() {
  return global.WebSocket || global.MozWebSocket;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],25:[function(require,module,exports){
var DTW = {};

function createMatrix(n, m, v) {
    var d = new Array(n);
    for (var i = 0; i < d.length; i++) {
	d[i] = new Array(m);
	for (var j = 0; j < d[i].length; j++) {
	    d[i][j] = v;
	}
    }
    return d;
}

DTW.distance = function(ts1, ts2, distFunc, w) {
    var n = ts1.length;
    var m = ts2.length;

    // default window size
    if (typeof w === 'undefined') {
	w = Math.max(n, m);
    }

    w = Math.max(w, Math.abs(n - m));
    // console.log(w);

    var costMatrix = createMatrix(n+1, m+1, Number.POSITIVE_INFINITY);
    costMatrix[0][0] = 0;

    for (var i = 1; i <= n; i++) {
	var begin = Math.max(1, i - w);
	var end   = Math.min(m, i + w);
	for (var j = begin; j <= end; j++) {
	    var cost = distFunc(ts1[i-1], ts2[j-1]);
	    costMatrix[i][j] = cost + Math.min(costMatrix[i-1][j  ],
					       costMatrix[i  ][j-1],
					       costMatrix[i-1][j-1]);
	}
    }
    // console.log(costMatrix);

    return costMatrix[n][m];
};

module.exports = DTW;

},{}],26:[function(require,module,exports){
var DTW = require('./dtw.js');
var $ = require('jquery');
var Leap = require('leapjs');
var Sketch = require('./sketch.js');
var showColor = '#87ceeb';
var drawColor = '#000080';
var sketch = new Sketch('sketch');
var samples = require('./samples.json');

var points = [];
var isRecording = false;
var result = [];

Leap.loop({enableGestures: true}, function(frame){
    if(frame.hands.length <= 0){
	return;
    }

    var hand = frame.hands[0];
    var finger = hand.indexFinger;
    var point = getFingertip(finger);

    if (!isRecording) {
	sketch.clear();
	points = [];
	sketch.setStrokeStyle(showColor);
	sketch.drawCircle(point.x, -point.y);

	return;
    }

    sketch.setStrokeStyle(drawColor);
    sketch.drawCircle(point.x, -point.y);

    points.push(point);
});

function getFingertip(finger){
    var point = {"x": finger.tipPosition[0],
		 "y": finger.tipPosition[1],
		 "z": finger.tipPosition[2]
		};
    return point;
}

function changeOfPosition(data) {
    var n = data.length - 1;
    var d = [];
    for (var i = 0; i < n; i++) {
	d.push({
	    x: data[i+1].x - data[i].x,
	    y: data[i+1].y - data[i].y,
	    z: data[i+1].z - data[i].z
	});
    }
    return d;
}

function clear(data){
    var n = data.length;
    var d = [];
    for (var i = 0; i < n; i++) {
	d.push(0);
    }
    return d;
}



function setNormalizeArray(arrayX,arrayY,arrayZ){
    var arrayN =[];
    for (var i = 0; i < arrayX.length; i++) {
	arrayN.push({
	    x: arrayX[i],
	    y: arrayY[i],
	    z: arrayZ[i]
	});
    }
    return arrayN;
}

function normalize(value, min, max) {
    return (value - min) / (max - min);
};

// points を min から max で正規化
function normalizePoints(points) {
    var d = points.map(function(d) { return [d.x, d.y, d.z]; });
    var ary = Array.prototype.concat.apply([], d);
    var min = Math.min.apply(null, ary);
    var max = Math.max.apply(null, ary);

    var npoints = [];
    for (var i = 0; i < points.length; i++) {
	var p = points[i];
	var np = {
	    x: normalize(p.x, min, max),
	    y: normalize(p.y, min, max),
	    z: normalize(p.z, min, max)
	};

	npoints.push(np);
    }

    return npoints;
}


function extractAxis(points, axis) {
    return points.map(function(e) { return e[axis]; });
}

function searchTimeSeries(tsQuery) {
    // スコアの計算
    // 全データ (db) との類似度を求める
    var n = samples.length;
    var score = [];

    var ts_Qd = changeOfPosition(tsQuery);
    var ts_Qn = normalizePoints(ts_Qd);
    var ts_QX = extractAxis(ts_Qn, 'x');
    var ts_QY = extractAxis(ts_Qn, 'y');
    var ts_QZ = extractAxis(ts_Qn, 'z');
    var ts_QZc = clear(ts_QZ);

    var ts_Q = setNormalizeArray(ts_QX, ts_QY, ts_QZc);
    console.log(ts_Q);

    for (var i = 0; i < n; i++){

	var ts_Sd = changeOfPosition(samples[i].points);
	var ts_Sn = normalizePoints(ts_Sd);
	var ts_SX = extractAxis(ts_Sn, 'x');
	var ts_SY = extractAxis(ts_Sn, 'y');
	var ts_SZ = extractAxis(ts_Sn, 'z');
	var ts_SZc = clear(ts_SZ);
	
	var ts_S = setNormalizeArray(ts_SX, ts_SY, ts_SZc);
	
	var d = DTW.distance(ts_Q, ts_S, distance, 30);
	score.push({
	    name:samples[i].name,
	    score:d
	});
    }
    score.sort(function(a,b){
	if(a.score < b.score) return -1;
	if(a.score > b.score) return 1;
	return 0;
    });    
    console.log(score);
    return score;
};

function distance(p1, p2) {
    var x = Math.pow(p1.x - p2.x, 2);
    var y = Math.pow(p1.y - p2.y, 2);
    var z = Math.pow(p1.z - p2.z, 2);
    var d = Math.sqrt(x + y + z);
    return d;
};

function recordFinger(){
    if (isRecording) {
	console.log('end');

    } else {
	console.log('begin');
	$("#output").empty();

    }
    isRecording = !isRecording;
}

function searchData(){
    if(isRecording){
	isRecording = false;
	console.log('search start');
	result =searchTimeSeries(points);
	console.log(result);
	$.each(result, function(index, item){

	    var imgPath = './img/' + item.name + '.png';
	    var img = '<img src="' + imgPath + '">';
  
	    $("#output").append(
		$("<div/>").attr('class', 'view').append(img),
		$("<div/>").attr('class', 'sample'),
		$("<div/>").attr('class', 'result').
		    append('<p/>').
		    append(item.name).
		    append('<br/>').
		    append(item.score)
	    ).trigger('create');
	    $('.view').show(img);
		
	});
	console.log('search end');

    }else{
	console.log("nothing");
    }
}

    var speedX = 3.0;
    var speedY = 4.0;
    var locX = 200;
    var locY = 150;
    var ctx;
 
    function init(){
	var canvas = document.getElementById('tutorial');
        if (canvas.getContext){
            ctx = canvas.getContext('2d');
	    setInterval(draw, 33);
	}
    }
 
    function draw(){
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "rgba(8,8,12,.2)";
	ctx.fillRect(0, 0, 400, 300);
	ctx.globalCompositeOperation = "lighter";
 
	//位置を更新
	locX += speedX;
	locY += speedY;
	
	if(locX < 0 || locX > 400){
	    speedX *= -1;
	}
 
	if(locY < 0 || locY > 300){
	    speedY *= -1;
	}
	
	//更新した座標で円を描く
	ctx.beginPath();
        ctx.fillStyle = '#3399FF';
        ctx.arc(locX, locY, 4, 0, Math.PI*2.0, true);
        ctx.fill();
    }

$('#rec-button').click(recordFinger);
$('#search-button').click(searchData);

},{"./dtw.js":25,"./samples.json":27,"./sketch.js":28,"jquery":1,"leapjs":13}],27:[function(require,module,exports){
module.exports=[
    {
	"name": "1",
	"points": [ { x: -169.897, y: 110.723, z: 9.71903 },
		    { x: -170.507, y: 111.062, z: 10.4725 },
		    { x: -170.617, y: 111.308, z: 11.0072 },
		    { x: -170.955, y: 111.776, z: 11.1872 },
		    { x: -171.076, y: 112.004, z: 11.4294 },
		    { x: -175.522, y: 107.898, z: 5.41265 },
		    { x: -180.677, y: 108.086, z: 2.8646 },
		    { x: -182.06, y: 108.587, z: 0.742934 },
		    { x: -182.121, y: 109.74, z: 1.86046 },
		    { x: -182.16, y: 110.446, z: 2.65619 },
		    { x: -180.645, y: 114.183, z: 4.17831 },
		    { x: -178.684, y: 113.5, z: 3.58282 },
		    { x: -178.22, y: 112.636, z: 3.19227 },
		    { x: -175.174, y: 112.583, z: 10.0256 },
		    { x: -173.106, y: 110.688, z: 5.83266 },
		    { x: -170.223, y: 111.594, z: 7.03603 },
		    { x: -167.4, y: 111.88, z: 5.2312 },
		    { x: -163.993, y: 110.809, z: 3.98124 },
		    { x: -159.691, y: 110.152, z: 2.01416 },
		    { x: -155.268, y: 107.407, z: -1.69046 },
		    { x: -150.912, y: 105.941, z: -3.85341 },
		    { x: -147.709, y: 105.544, z: -6.39012 },
	 	    { x: -143.554, y: 106.632, z: -7.85637 },
		    { x: -139.914, y: 107.652, z: -9.79192 },
		    { x: -134.908, y: 110.107, z: -5.5642 },
		    { x: -129.643, y: 112.352, z: -2.97844 },
		    { x: -126.066, y: 111.513, z: -4.11704 },
		    { x: -122.622, y: 110.114, z: -7.16365 },
		    { x: -119.12, y: 109.51, z: -10.5297 },
		    { x: -115.24, y: 109.47, z: -12.3013 },
		    { x: -111.66, y: 109.433, z: -13.4373 },
		    { x: -108.729, y: 109.616, z: -14.3415 },
		    { x: -104.512, y: 111.758, z: -10.6368 },
		    { x: -102.659, y: 112.409, z: -10.3111 },
		    { x: -100.181, y: 113.121, z: -11.0817 },
		    { x: -97.5108, y: 113.429, z: -11.8019 },
		    { x: -94.9407, y: 113.89, z: -12.5438 },
		    { x: -91.9617, y: 114.12, z: -13.7771 },
		    { x: -89.8463, y: 114.531, z: -14.6595 },
		    { x: -87.2707, y: 114.929, z: -15.2296 },
		    { x: -87.2707, y: 114.929, z: -15.2296 },
		    { x: -84.5202, y: 115.728, z: -16.9571 },
		    { x: -82.9907, y: 115.862, z: -17.2954 },
		    { x: -80.2604, y: 116.242, z: -17.4631 },
		    { x: -78.2424, y: 116.9, z: -17.4881 },
		    { x: -77.0874, y: 117.178, z: -17.4794 },
		    { x: -75.5218, y: 117.8, z: -17.5202 },
		    { x: -74.9125, y: 117.841, z: -17.7967 },
		    { x: -73.8302, y: 117.969, z: -18.2984 },
		    { x: -73.2454, y: 118.027, z: -18.4822 },
		    { x: -72.1609, y: 118.064, z: -18.6806 },
		    { x: -71.8731, y: 118.102, z: -18.7919 },
		    { x: -71.456, y: 118.243, z: -18.8304 },
		    { x: -71.0769, y: 118.463, z: -18.8985 },
		    { x: -70.8378, y: 118.54, z: -18.9039 },
		    { x: -70.5883, y: 118.703, z: -18.8815 },
		    { x: -70.491, y: 118.809, z: -18.841 },
		    { x: -70.4999, y: 118.893, z: -18.8262 },
		    { x: -70.483, y: 119, z: -18.8129 },
		    { x: -70.4675, y: 119.122, z: -18.8041 },
		    { x: -70.5464, y: 119.718, z: -18.4996 },
		    { x: -70.6924, y: 120.004, z: -18.4351 },
		    { x: -70.8143, y: 120.233, z: -18.4414 },
		    { x: -71.0289, y: 120.457, z: -18.5468 },
		    { x: -71.1865, y: 120.621, z: -18.6292 },
		    { x: -71.2893, y: 120.765, z: -18.642 },
		    { x: -71.4745, y: 120.864, z: -18.585 },
		    { x: -71.6967, y: 120.869, z: -18.2453 },
		    { x: -71.6967, y: 120.869, z: -18.2453 },
		    { x: -71.9159, y: 120.844, z: -17.8973 },
		    { x: -72.0703, y: 120.783, z: -17.6801 },
		    { x: -72.1519, y: 120.547, z: -17.5317 },
		    { x: -72.2236, y: 120.439, z: -17.5014 },
		    { x: -72.4173, y: 120.4, z: -17.4984 },
		    { x: -72.4173, y: 120.4, z: -17.4984 },
		    { x: -72.7098, y: 120.283, z: -17.5789 },
		    { x: -72.8828, y: 120.08, z: -17.6608 },
		    { x: -72.9969, y: 119.935, z: -17.7296 },
		    { x: -73.1199, y: 119.809, z: -17.854 },
		    { x: -73.1199, y: 119.809, z: -17.854 },
		    { x: -73.259, y: 119.713, z: -17.9284 },
		    { x: -73.3328, y: 119.64, z: -17.9873 },
		    { x: -73.384, y: 119.584, z: -18.0439 },
		    { x: -73.384, y: 119.584, z: -18.0439 },
		    { x: -73.3923, y: 119.53, z: -17.9634 },
		    { x: -73.4079, y: 119.541, z: -17.9451 },
		    { x: -73.4185, y: 119.551, z: -17.9238 },
		    { x: -73.4124, y: 119.579, z: -17.8825 },
		    { x: -73.4124, y: 119.579, z: -17.8825 },
		    { x: -73.423, y: 119.583, z: -17.8341 },
		    { x: -73.4289, y: 119.598, z: -17.8065 },
		    { x: -73.4184, y: 119.614, z: -17.811 },
		    { x: -73.4184, y: 119.614, z: -17.811 },
		    { x: -73.4512, y: 119.651, z: -17.813 },
		    { x: -73.5201, y: 119.706, z: -17.8435 },
		    { x: -73.583, y: 119.772, z: -17.8742 },
		    { x: -73.583, y: 119.772, z: -17.8742 },
		    { x: -73.6482, y: 119.824, z: -17.9118 },
		    { x: -73.7011, y: 119.866, z: -17.9392 },
		    { x: -73.7011, y: 119.866, z: -17.9392 },
		    { x: -73.7665, y: 119.888, z: -17.9642 },
		    { x: -73.8689, y: 119.89, z: -17.9572 },
		    { x: -73.8689, y: 119.89, z: -17.9572 },
		    { x: -73.9027, y: 119.787, z: -17.784 },
		    { x: -73.9002, y: 119.756, z: -17.7347 },
		    { x: -73.9002, y: 119.756, z: -17.7347 },
		    { x: -73.865, y: 119.677, z: -17.7113 },
		    { x: -73.828, y: 119.576, z: -17.6664 },
		    { x: -73.828, y: 119.576, z: -17.6664 },
		    { x: -73.7904, y: 119.501, z: -17.6383 },
		    { x: -73.7014, y: 119.48, z: -17.667 },
		    { x: -73.7014, y: 119.48, z: -17.667 },
		    { x: -73.7121, y: 119.486, z: -17.7021 },
		    { x: -73.7325, y: 119.503, z: -17.7239 }]
    },
    {
	"name": "1'",
	"points":[ { x: -5.49821, y: 78.6334, z: -26.2063 },
		   { x: -5.52948, y: 78.7125, z: -26.2316 },
		   { x: -5.57791, y: 78.7756, z: -26.2533 },
		   { x: -5.77662, y: 78.8193, z: -26.2991 },
		   { x: -5.77662, y: 78.8193, z: -26.2991 },
		   { x: -6.2453, y: 78.673, z: -26.3833 },
		   { x: -6.2453, y: 78.673, z: -26.3833 },
		   { x: -6.2453, y: 78.673, z: -26.3833 },
		   { x: -9.28235, y: 78.1665, z: -26.1817 },
		   { x: -11.7653, y: 77.9391, z: -26.032 },
		   { x: -15.8093, y: 77.7153, z: -26.1149 },
		   { x: -19.8867, y: 77.3178, z: -25.9456 },
		   { x: -23.6965, y: 77.0533, z: -25.9905 },
		   { x: -27.3371, y: 76.903, z: -26.4744 },
		   { x: -30.7448, y: 77.1057, z: -26.9653 },
		   { x: -34.1866, y: 77.1754, z: -27.7272 },
		   { x: -37.1943, y: 77.2898, z: -28.2607 },
		   { x: -39.9003, y: 76.9707, z: -28.0312 },
		   { x: -44.1944, y: 77.1307, z: -27.7477 },
		   { x: -46.7447, y: 77.3582, z: -28.0361 },
		   { x: -48.98, y: 77.6201, z: -28.2579 },
		   { x: -48.98, y: 77.6201, z: -28.2579 },
		   { x: -54.0152, y: 78.2074, z: -28.3032 },
		   { x: -55.4722, y: 78.5045, z: -28.3522 },
		   { x: -58.8505, y: 79.2047, z: -28.2035 },
		   { x: -60.4914, y: 79.5283, z: -28.1098 },
		   { x: -62.1869, y: 79.9195, z: -28.0594 },
		   { x: -66.556, y: 81.8883, z: -27.8667 },
		   { x: -68.0582, y: 82.4068, z: -27.7089 },
		   { x: -69.3876, y: 82.6286, z: -27.5596 },
		   { x: -72.7765, y: 83.3484, z: -27.3354 },
		   { x: -75.1642, y: 84.1344, z: -27.1247 },
		   { x: -77.2407, y: 84.5927, z: -26.9357 },
		   { x: -79.0818, y: 84.8513, z: -26.8392 },
		   { x: -83.2541, y: 85.6206, z: -26.4423 },
		   { x: -84.5939, y: 85.3529, z: -26.4086 },
		   { x: -85.2139, y: 84.6321, z: -26.5788 },
		   { x: -86.5362, y: 83.8858, z: -27.0837 },
		   { x: -88.5034, y: 82.1214, z: -27.9099 },
		   { x: -89.4185, y: 81.7871, z: -28.1833 },
		   { x: -90.0946, y: 81.4322, z: -28.4012 },
		   { x: -91.0274, y: 81.2323, z: -28.6589 },
		   { x: -91.7015, y: 80.8915, z: -28.8159 },
		   { x: -93.613, y: 80.5233, z: -29.1309 },
		   { x: -94.6898, y: 80.4877, z: -29.3185 },
		   { x: -95.6048, y: 80.4677, z: -29.3892 },
		   { x: -96.3342, y: 80.4055, z: -29.4017 },
		   { x: -97.1369, y: 80.4424, z: -29.4016 },
		   { x: -97.8216, y: 80.4443, z: -29.4399 },
		   { x: -98.4668, y: 80.3403, z: -29.5509 },
		   { x: -99.6753, y: 80.1554, z: -29.9601 },
		   { x: -100.326, y: 80.1604, z: -30.2022 },
		   { x: -100.909, y: 80.1327, z: -30.3774 },
		   { x: -101.446, y: 80.135, z: -30.5367 },
		   { x: -101.936, y: 80.1226, z: -30.6626 },
		   { x: -102.391, y: 80.1389, z: -30.7779 },
		   { x: -102.979, y: 80.2118, z: -30.8572 },
		   { x: -103.396, y: 80.2908, z: -30.9061 },
		   { x: -103.667, y: 80.3634, z: -30.9308 },
		   { x: -103.869, y: 80.4229, z: -30.9449 },
		   { x: -104.034, y: 80.4955, z: -30.9497 },
		   { x: -104.276, y: 80.5695, z: -31.0371 },
		   { x: -104.276, y: 80.5695, z: -31.0371 },
		   { x: -104.466, y: 80.6354, z: -31.104 },
		   { x: -104.621, y: 80.7101, z: -31.2203 },
		   { x: -104.787, y: 80.7739, z: -31.2982 },
		   { x: -104.954, y: 80.8763, z: -31.3855 },
		   { x: -105.064, y: 80.9943, z: -31.4612 },
		   { x: -105.118, y: 81.1217, z: -31.5125 },
		   { x: -105.118, y: 81.1217, z: -31.5125 },
		   { x: -105.17, y: 81.2404, z: -31.5495 },
		   { x: -105.175, y: 81.3767, z: -31.6001 },
		   { x: -105.21, y: 81.4705, z: -31.6269 },
		   { x: -105.21, y: 81.4705, z: -31.6269 },
		   { x: -105.245, y: 81.5584, z: -31.6476 },
		   { x: -105.276, y: 81.64, z: -31.6656 },
		   { x: -105.276, y: 81.64, z: -31.6656 },
		   { x: -105.317, y: 81.7096, z: -31.6778 },
		   { x: -105.374, y: 81.7736, z: -31.6836 },
		   { x: -105.879, y: 81.8755, z: -31.2604 },
		   { x: -105.879, y: 81.8755, z: -31.2604 },
		   { x: -106.603, y: 81.9498, z: -30.7864 },
		   { x: -107.295, y: 81.8419, z: -30.4447 },
		   { x: -107.295, y: 81.8419, z: -30.4447 },
		   { x: -107.822, y: 81.8225, z: -30.1519 },
		   { x: -108.123, y: 81.8869, z: -29.9863 },
		   { x: -108.423, y: 81.9583, z: -29.8568 },
		   { x: -108.423, y: 81.9583, z: -29.8568 },
		   { x: -108.879, y: 82.0299, z: -29.6431 },
		   { x: -109.195, y: 82.1427, z: -29.4541 },
		   { x: -109.651, y: 82.4299, z: -29.2034 },
		   { x: -109.651, y: 82.4299, z: -29.2034 },
		   { x: -109.935, y: 82.66, z: -29.0306 },
		   { x: -110.328, y: 82.9797, z: -28.7728 },
		   { x: -110.852, y: 83.3693, z: -28.3189 },
		   { x: -110.852, y: 83.3693, z: -28.3189 },
		   { x: -111.254, y: 83.7424, z: -27.9515 },
		   { x: -111.533, y: 84.0235, z: -27.6547 },
		   { x: -111.722, y: 84.3248, z: -27.3609 },
		   { x: -111.927, y: 84.6619, z: -27.0418 },
		   { x: -111.927, y: 84.6619, z: -27.0418 },
		   { x: -112.016, y: 84.88, z: -26.8067 },
		   { x: -112.026, y: 85.1114, z: -26.5088 },
		   { x: -112.003, y: 85.3495, z: -26.2596 },
		   { x: -112.003, y: 85.3495, z: -26.2596 },
		   { x: -111.946, y: 85.5612, z: -25.9712 },
		   { x: -111.81, y: 85.7548, z: -25.6604 },
		   { x: -111.698, y: 85.8947, z: -25.5163 },
		   { x: -111.698, y: 85.8947, z: -25.5163 },
		   { x: -111.569, y: 85.9708, z: -25.4331 },
		   { x: -111.475, y: 86.0035, z: -25.4088 },
		   { x: -111.353, y: 86.0536, z: -25.4038 },
		   { x: -111.353, y: 86.0536, z: -25.4038 },
		   { x: -111.219, y: 86.153, z: -25.392 },
		   { x: -111.016, y: 86.2548, z: -25.386 },
		   { x: -110.785, y: 86.4939, z: -25.4113 },
		   { x: -110.785, y: 86.4939, z: -25.4113 },
		   { x: -110.474, y: 86.6756, z: -25.3591 },
		   { x: -110.247, y: 86.7959, z: -25.3581 },
		   { x: -110.247, y: 86.7959, z: -25.3581 },
		   { x: -109.98, y: 86.9275, z: -25.3555 },
		   { x: -109.751, y: 87.11, z: -25.399 },
		   { x: -109.509, y: 87.2399, z: -25.4808 },
		   { x: -109.509, y: 87.2399, z: -25.4808 },
		   { x: -109.333, y: 87.3758, z: -25.5821 },
		   { x: -109.077, y: 87.5787, z: -25.6851 },
		   { x: -108.828, y: 87.6949, z: -25.8462 },
		   { x: -108.828, y: 87.6949, z: -25.8462 },
		   { x: -108.604, y: 87.7758, z: -25.9818 } ]
    },
    {
	"name":"2",
	"points":[{ x: -130.382, y: 60.6884, z: -25.1259 },
		  { x: -130.284, y: 59.9657, z: -25.4692 },
		  { x: -130.345, y: 59.0702, z: -25.7096 },
		  { x: -130.298, y: 58.2307, z: -26.0376 },
		  { x: -130.333, y: 58.0954, z: -25.9724 },
		  { x: -130.333, y: 58.0954, z: -25.9724 },
		  { x: -130.294, y: 58.4077, z: -25.9471 },
		  { x: -130.275, y: 58.4882, z: -25.9173 },
		  { x: -130.447, y: 58.8889, z: -25.712 },
		  { x: -130.549, y: 59.2317, z: -25.5667 },
		  { x: -130.549, y: 59.2317, z: -25.5667 },
		  { x: -130.614, y: 59.4492, z: -25.2569 },
		  { x: -130.761, y: 59.5723, z: -24.9668 },
		  { x: -130.814, y: 60.2464, z: -24.5355 },
		  { x: -130.766, y: 60.2648, z: -24.3478 },
		  { x: -130.766, y: 60.2648, z: -24.3478 },
		  { x: -130.766, y: 60.2648, z: -24.3478 },
		  { x: -130.766, y: 60.2648, z: -24.3478 },
		  { x: -130.303, y: 60.2986, z: -24.5937 },
		  { x: -129.886, y: 60.4198, z: -24.7928 },
		  { x: -129.18, y: 61.9526, z: -25.7018 },
		  { x: -127.786, y: 63.4496, z: -27.4843 },
		  { x: -126.57, y: 67.0598, z: -28.3656 },
		  { x: -125.785, y: 71.213, z: -30.1469 },
		  { x: -124.567, y: 73.8108, z: -31.3435 },
		  { x: -123.5, y: 75.8607, z: -32.1164 },
		  { x: -117.614, y: 79.4257, z: -32.298 },
		  { x: -115.245, y: 81.8037, z: -32.3222 },
		  { x: -111.108, y: 83.2379, z: -32.8824 },
		  { x: -103.254, y: 87.2311, z: -33.8244 },
		  { x: -99.6948, y: 89.4513, z: -32.5077 },
		  { x: -92.2322, y: 90.6416, z: -35.8502 },
		  { x: -88.1123, y: 92.6509, z: -36.9081 },
		  { x: -86.2532, y: 93.9331, z: -36.7758 },
		  { x: -83.5366, y: 96.9547, z: -34.2345 },
		  { x: -80.3296, y: 97.4469, z: -33.9321 },
		  { x: -77.0051, y: 97.2943, z: -34.4913 },
		  { x: -74.6756, y: 97.2866, z: -33.809 },
		  { x: -71.0388, y: 96.5402, z: -32.9646 },
		  { x: -68.198, y: 95.6956, z: -33.1434 },
		  { x: -66.8633, y: 94.7617, z: -33.671 },
		  { x: -64.1543, y: 93.5486, z: -33.9338 },
		  { x: -60.57, y: 90.9604, z: -31.7759 },
		  { x: -59.6126, y: 90.1954, z: -31.4151 },
		  { x: -56.818, y: 87.9607, z: -29.7639 },
		  { x: -53.8835, y: 86.5776, z: -28.4129 },
		  { x: -52.8044, y: 85.3108, z: -27.2957 },
		  { x: -51.2896, y: 82.8385, z: -25.8611 },
		  { x: -50.5186, y: 79.631, z: -25.5866 },
		  { x: -49.7945, y: 77.8317, z: -25.0331 },
		  { x: -49.1418, y: 76.2037, z: -24.4792 },
		  { x: -47.8892, y: 73.1082, z: -23.5697 },
		  { x: -47.1608, y: 71.42, z: -23.0299 },
		  { x: -45.5248, y: 68.3841, z: -21.9964 },
		  { x: -44.7484, y: 67.1902, z: -21.7384 },
		  { x: -43.7063, y: 65.787, z: -21.3726 },
		  { x: -40.8163, y: 62.4016, z: -20.2965 },
		  { x: -39.1321, y: 60.8354, z: -19.9632 },
		  { x: -37.372, y: 59.3952, z: -19.67 },
		  { x: -32.6235, y: 57.0171, z: -19.0259 },
		  { x: -30.0197, y: 56.0708, z: -18.7477 },
		  { x: -26.4354, y: 54.5929, z: -17.6461 },
		  { x: -20.47, y: 52.4633, z: -16.3442 },
		  { x: -17.9166, y: 51.8204, z: -16.2537 },
		  { x: -15.32, y: 51.3812, z: -16.2035 },
		  { x: -9.80093, y: 51.3942, z: -16.2261 },
		  { x: -7.07565, y: 51.6363, z: -16.3971 },
		  { x: -4.45838, y: 52.0284, z: -16.9623 },
		  { x: 0.288199, y: 53.2732, z: -18.4892 },
		  { x: 2.62024, y: 54.3049, z: -19.8787 },
		  { x: 4.62963, y: 55.5311, z: -20.8641 },
		  { x: 8.1605, y: 58.392, z: -22.5586 },
		  { x: 10.0035, y: 60.3873, z: -23.8755 },
		  { x: 13.014, y: 64.1333, z: -25.398 },
		  { x: 15.1253, y: 67.0244, z: -26.1821 },
		  { x: 16.7129, y: 69.4125, z: -26.6193 },
		  { x: 21.1213, y: 77.1728, z: -28.4314 },
		  { x: 24.0926, y: 81.2212, z: -29.1281 },
		  { x: 28.4763, y: 87.8802, z: -30.2727 },
		  { x: 30.0892, y: 91.178, z: -30.6445 },
		  { x: 33.4131, y: 96.164, z: -31.2457 },
		  { x: 34.8124, y: 97.9087, z: -31.4924 },
		  { x: 37.9483, y: 101.545, z: -31.4075 },
		  { x: 39.5153, y: 103.054, z: -31.5208 },
		  { x: 40.7654, y: 103.969, z: -31.7814 },
		  { x: 43.7182, y: 107.055, z: -32.8792 },
		  { x: 46.2614, y: 108.556, z: -32.9114 },
		  { x: 47.6838, y: 109.555, z: -33.1784 },
		  { x: 50.0345, y: 111.106, z: -32.7561 },
		  { x: 50.2155, y: 110.868, z: -32.7909 },
		  { x: 52.5523, y: 111.311, z: -32.6446 },
		  { x: 55.8623, y: 111.763, z: -32.3743 },
		  { x: 57.0991, y: 111.797, z: -32.1642 },
		  { x: 60.1912, y: 111.704, z: -31.6771 },
		  { x: 61.2451, y: 111.474, z: -31.4869 },
		  { x: 62.2153, y: 110.935, z: -31.2571 },
		  { x: 64.0579, y: 109.289, z: -29.6299 },
		  { x: 64.9718, y: 108.499, z: -28.9816 },
		  { x: 66.8467, y: 106.654, z: -27.8468 },
		  { x: 68.2396, y: 105.989, z: -27.1872 },
		  { x: 69.3754, y: 105.038, z: -26.8059 },
		  { x: 72.2758, y: 101.241, z: -23.7524 },
		  { x: 73.212, y: 99.7098, z: -23.0424 },
		  { x: 73.9516, y: 98.401, z: -22.4087 },
		  { x: 75.9464, y: 94.5122, z: -19.9794 },
		  { x: 75.9464, y: 94.5122, z: -19.9794 },
		  { x: 75.9464, y: 94.5122, z: -19.9794 },
		  { x: 79.2818, y: 89.7382, z: -17.997 },
		  { x: 79.6914, y: 88.2823, z: -17.6044 },
		  { x: 81.4922, y: 85.5857, z: -16.26 },
		  { x: 82.266, y: 84.6134, z: -15.6898 },
		  { x: 83.4972, y: 83.2214, z: -14.9115 },
		  { x: 85.6551, y: 80.782, z: -13.4341 },
		  { x: 86.3165, y: 79.771, z: -12.9199 },
		  { x: 87.737, y: 77.8491, z: -11.943 },
		  { x: 88.9444, y: 75.9842, z: -10.2107 },
		  { x: 90.6611, y: 72.8153, z: -7.26881 },
		  { x: 91.4034, y: 71.318, z: -6.12351 },
		  { x: 92.2931, y: 69.7608, z: -5.00147 },
		  { x: 93.2631, y: 68.443, z: -3.91191 },
		  { x: 95.1757, y: 65.8408, z: -2.15077 },
		  { x: 96.5679, y: 64.8884, z: -1.29994 },
		  { x: 97.835, y: 63.72, z: -0.543963 },
		  { x: 99.4469, y: 63.1042, z: 0.226746 },
		  { x: 102.811, y: 62.0585, z: 1.75432 },
		  { x: 104.863, y: 61.6943, z: 2.65319 },
		  { x: 106.395, y: 61.4167, z: 2.89493 },
		  { x: 107.377, y: 60.7992, z: 3.18109 },
		  { x: 108.003, y: 60.4076, z: 3.38236 },
		  { x: 112.413, y: 60.8613, z: 4.03899 },
		  { x: 114.426, y: 61.2223, z: 4.11784 },
		  { x: 115.418, y: 61.3503, z: 3.83989 },
		  { x: 118.149, y: 62.206, z: 3.89884 },
		  { x: 119.331, y: 62.5849, z: 3.98838 },
		  { x: 120.058, y: 62.8704, z: 4.03365 },
		  { x: 124.54, y: 65.0527, z: 2.91862 },
		  { x: 126.574, y: 66.2851, z: 2.14777 },
		  { x: 128.094, y: 66.8765, z: 1.65742 },
		  { x: 131.955, y: 68.9018, z: 2.34554 },
		  { x: 133.274, y: 70.139, z: 2.95247 },
		  { x: 137.77, y: 72.8698, z: 1.54415 },
		  { x: 138.587, y: 73.6832, z: 0.340906 },
		  { x: 140.406, y: 75.262, z: -0.108547 },
		  { x: 141.631, y: 76.5683, z: -0.219539 },
		  { x: 144.038, y: 80.2604, z: -0.767319 },
		  { x: 144.712, y: 81.3866, z: -1.38398 },
		  { x: 146.424, y: 83.4582, z: -3.01039 },
		  { x: 148.432, y: 86.0299, z: -2.35742 },
		  { x: 149.141, y: 86.8772, z: -2.17715 },
		  { x: 150.476, y: 88.7761, z: -1.7068 },
		  { x: 151.463, y: 89.9018, z: -1.31568 },
		  { x: 155.795, y: 96.5916, z: 0.340873 },
		  { x: 158.473, y: 100.31, z: 1.81431 },
		  { x: 158.558, y: 101.55, z: 2.41402 },
		  { x: 149.005, y: 146.087, z: 42.0762 },
		  { x: 152.597, y: 148.847, z: 41.2229 },
		  { x: 151.876, y: 148.381, z: 37.7849 },
		  { x: 151.889, y: 148.904, z: 36.2001 },
		  { x: 151.552, y: 148.994, z: 34.9842 },
		  { x: 151.823, y: 149.024, z: 34.7764 },
		  { x: 152.091, y: 149.852, z: 33.2284 },
		  { x: 154.081, y: 150.909, z: 34.7266 },
		  { x: 157.197, y: 151.637, z: 32.6142 },
		  { x: 160.033, y: 152.526, z: 28.8703 },
		  { x: 160.525, y: 152.641, z: 27.65 },
		  { x: 160.761, y: 151.689, z: 27.1135 },
		  { x: 160.689, y: 151.489, z: 27.3584 },
		  { x: 162.513, y: 151.229, z: 27.5742 },
		  { x: 164.405, y: 150.743, z: 27.4592 },
		  { x: 167.415, y: 150.625, z: 29.6871 },
		  { x: 168.525, y: 151, z: 35.5181 },
		  { x: 170.084, y: 150.683, z: 39.2324 },
		  { x: 172.723, y: 151.468, z: 52.8199 },
		  { x: 169.88, y: 148.629, z: 65.4089 },
		  { x: 199.03, y: 154.204, z: 26.7918 },
		  { x: 215.998, y: 152.744, z: 16.5589 },
		  { x: 211.929, y: 149.056, z: 1.30937 },
		  { x: 214.494, y: 139.357, z: -10.5868 },
		  { x: 217.212, y: 131.784, z: -19.5229 },
		  { x: 216.906, y: 131.467, z: -23.3245 },
		  { x: 215.678, y: 130.023, z: -26.0229 },
		  { x: 215.426, y: 128.425, z: -27.2866 },
		  { x: 214.439, y: 126.678, z: -29.0332 },
		  { x: 213.804, y: 126.083, z: -29.841 },
		  { x: 212.065, y: 125.263, z: -31.4138 },
		  { x: 211.603, y: 119.102, z: -31.2428 },
		  { x: 211.467, y: 119.281, z: -30.6697 },
		  { x: 209.129, y: 120.399, z: -31.0082 },
		  { x: 207.51, y: 119.145, z: -25.9214 } ]
    },
    {
	"name":"2'",
	"points":[{ x: 84.709, y: 83.0414, z: -16.9649 },
		  { x: 84.7107, y: 83.1293, z: -16.9486 },
		  { x: 84.7164, y: 83.2446, z: -16.9165 },
		  { x: 84.7164, y: 83.2446, z: -16.9165 },
		  { x: 84.7072, y: 83.5895, z: -16.7793 },
		  { x: 84.1488, y: 83.4567, z: -16.3225 },
		  { x: 84.1488, y: 83.4567, z: -16.3225 },
		  { x: 83.9025, y: 83.4222, z: -16.0982 },
		  { x: 83.7962, y: 83.446, z: -15.9807 },
		  { x: 83.7513, y: 83.5051, z: -15.9049 },
		  { x: 83.7217, y: 83.5423, z: -15.8508 },
		  { x: 83.7217, y: 83.5423, z: -15.8508 },
		  { x: 83.864, y: 83.5059, z: -15.8599 },
		  { x: 84.0149, y: 83.43, z: -16.216 },
		  { x: 84.2549, y: 82.9939, z: -16.4128 },
		  { x: 84.3007, y: 82.4681, z: -16.4199 },
		  { x: 84.1111, y: 81.5027, z: -16.4198 },
		  { x: 83.6977, y: 80.4741, z: -16.4005 },
		  { x: 83.6977, y: 80.4741, z: -16.4005 },
		  { x: 82.8716, y: 78.7443, z: -16.1448 },
		  { x: 81.8302, y: 76.6475, z: -15.8848 },
		  { x: 81.8302, y: 76.6475, z: -15.8848 },
		  { x: 81.8302, y: 76.6475, z: -15.8848 },
		  { x: 78.7888, y: 71.5377, z: -14.8853 },
		  { x: 76.3977, y: 68.6326, z: -13.8564 },
		  { x: 75.1554, y: 67.193, z: -13.6095 },
		  { x: 73.9286, y: 65.9638, z: -13.5129 },
		  { x: 72.8046, y: 64.8847, z: -13.3922 },
		  { x: 71.3715, y: 63.6875, z: -13.0722 },
		  { x: 70.0911, y: 62.7116, z: -12.7617 },
		  { x: 69.1077, y: 61.9936, z: -12.5683 },
		  { x: 68.543, y: 61.5753, z: -12.4652 },
		  { x: 67.288, y: 60.8124, z: -12.4098 },
		  { x: 65.0345, y: 59.6363, z: -12.2212 },
		  { x: 63.9761, y: 59.235, z: -12.1871 },
		  { x: 62.9647, y: 58.9322, z: -12.1868 },
		  { x: 61.6439, y: 58.6945, z: -12.2905 },
		  { x: 60.4324, y: 58.5685, z: -12.4465 },
		  { x: 59.1027, y: 58.4108, z: -12.7101 },
		  { x: 58.2564, y: 58.3442, z: -12.8795 },
		  { x: 56.9474, y: 58.6054, z: -13.1612 },
		  { x: 55.5925, y: 58.9587, z: -13.4541 },
		  { x: 54.4866, y: 59.5914, z: -14.0025 },
		  { x: 53.4952, y: 60.313, z: -14.4636 },
		  { x: 52.5043, y: 61.2612, z: -15.0318 },
		  { x: 51.4773, y: 62.397, z: -15.6435 },
		  { x: 50.3899, y: 63.8418, z: -16.4154 },
		  { x: 49.385, y: 65.3187, z: -17.1128 },
		  { x: 48.3188, y: 66.9041, z: -17.768 },
		  { x: 46.3336, y: 70.356, z: -18.9614 },
		  { x: 45.3928, y: 72.1959, z: -19.5149 },
		  { x: 44.3662, y: 74.1713, z: -20.213 },
		  { x: 43.4476, y: 75.8862, z: -20.8629 },
		  { x: 42.5995, y: 77.6281, z: -21.5955 },
		  { x: 41.8683, y: 79.0428, z: -22.0178 },
		  { x: 40.8476, y: 80.2212, z: -22.6032 },
		  { x: 39.7888, y: 81.6247, z: -22.7828 },
		  { x: 38.5652, y: 83.2091, z: -22.949 },
		  { x: 37.4973, y: 84.7998, z: -22.9426 },
		  { x: 35.6653, y: 88.0572, z: -22.7011 },
		  { x: 34.5365, y: 89.2664, z: -22.1104 },
		  { x: 33.3034, y: 90.8031, z: -21.694 },
		  { x: 31.8429, y: 92.6604, z: -21.6977 },
		  { x: 30.314, y: 94.2415, z: -21.5407 },
		  { x: 28.8231, y: 95.6768, z: -21.7393 },
		  { x: 25.9806, y: 97.1684, z: -21.7385 },
		  { x: 24.6061, y: 97.7101, z: -21.6653 },
		  { x: 22.7438, y: 98.3528, z: -21.5195 },
		  { x: 20.4722, y: 98.8184, z: -21.2547 },
		  { x: 16.2866, y: 99.4169, z: -20.6975 },
		  { x: 14.3401, y: 99.4084, z: -20.5895 },
		  { x: 12.6895, y: 99.3633, z: -20.3847 },
		  { x: 10.9978, y: 99.1243, z: -20.2443 },
		  { x: 7.7631, y: 97.7869, z: -20.3602 },
		  { x: 6.20055, y: 96.6146, z: -20.0748 },
		  { x: 4.67344, y: 95.3877, z: -19.9331 },
		  { x: 3.44942, y: 94.2517, z: -19.8864 },
		  { x: 2.45583, y: 92.9041, z: -19.4195 },
		  { x: 0.622955, y: 89.7538, z: -18.6025 },
		  { x: -0.275261, y: 87.7753, z: -18.3455 },
		  { x: -1.0993, y: 85.5079, z: -18.1047 },
		  { x: -1.79674, y: 83.0511, z: -17.8374 },
		  { x: -2.41089, y: 80.619, z: -17.5088 },
		  { x: -3.15914, y: 75.8219, z: -16.6953 },
		  { x: -3.54167, y: 73.1468, z: -16.1643 },
		  { x: -3.92171, y: 70.9604, z: -15.6687 },
		  { x: -4.32428, y: 68.8652, z: -15.0988 },
		  { x: -5.37323, y: 64.3017, z: -13.6043 },
		  { x: -6.13641, y: 61.9418, z: -12.9761 },
		  { x: -6.91499, y: 59.4841, z: -12.3577 },
		  { x: -7.84419, y: 57.1707, z: -11.633 },
		  { x: -9.95421, y: 53.4681, z: -10.7554 },
		  { x: -11.0974, y: 51.6709, z: -10.3654 },
		  { x: -12.2558, y: 49.9968, z: -10.1484 },
		  { x: -14.5676, y: 47.1628, z: -9.63174 },
		  { x: -15.6804, y: 45.9053, z: -9.39821 },
		  { x: -16.7472, y: 44.836, z: -9.1468 },
		  { x: -17.7659, y: 43.8554, z: -8.94992 },
		  { x: -19.7932, y: 42.2046, z: -8.65554 },
		  { x: -20.8106, y: 41.6463, z: -8.54192 },
		  { x: -21.7712, y: 41.1813, z: -8.49005 },
		  { x: -23.6821, y: 40.8081, z: -8.56184 },
		  { x: -24.846, y: 40.8451, z: -8.87373 },
		  { x: -25.9821, y: 41.0724, z: -9.17939 },
		  { x: -27.092, y: 41.5222, z: -9.53466 },
		  { x: -28.2161, y: 42.1727, z: -9.94824 },
		  { x: -30.7834, y: 44.1708, z: -11.2456 },
		  { x: -32.0714, y: 45.3973, z: -11.7795 },
		  { x: -33.2299, y: 46.6989, z: -12.3693 },
		  { x: -34.3864, y: 48.9065, z: -13.5597 },
		  { x: -35.447, y: 50.7763, z: -14.3228 },
		  { x: -36.4274, y: 52.9254, z: -14.6491 },
		  { x: -37.4055, y: 54.9412, z: -15.2665 },
		  { x: -38.2332, y: 56.8088, z: -16.0813 },
		  { x: -39.9379, y: 61.0051, z: -17.7998 },
		  { x: -40.7089, y: 63.4027, z: -18.6487 },
		  { x: -41.439, y: 65.7129, z: -19.5174 },
		  { x: -41.9065, y: 67.7623, z: -20.168 },
		  { x: -42.4143, y: 69.9985, z: -20.8225 },
		  { x: -43.1052, y: 72.4997, z: -21.7289 },
		  { x: -43.6237, y: 77.8838, z: -22.1969 },
		  { x: -44.0473, y: 80.565, z: -21.8863 },
		  { x: -43.6006, y: 82.728, z: -23.5766 },
		  { x: -44.573, y: 85.3082, z: -24.2888 },
		  { x: -47.1005, y: 88.394, z: -24.7161 },
		  { x: -49.0709, y: 89.7678, z: -25.4368 },
		  { x: -50.6677, y: 92.6851, z: -25.3969 },
		  { x: -51.6578, y: 94.7741, z: -25.5622 },
		  { x: -53.0078, y: 97.7236, z: -25.7 },
		  { x: -53.0078, y: 97.7236, z: -25.7 },
		  { x: -57.9232, y: 106.948, z: -26.502 },
		  { x: -58.6992, y: 108.462, z: -26.3252 },
		  { x: -61.0398, y: 111.679, z: -25.6316 },
		  { x: -62.2772, y: 112.734, z: -25.6917 },
		  { x: -63.1954, y: 113.25, z: -25.8289 },
		  { x: -65.9307, y: 114.525, z: -26.282 },
		  { x: -67.118, y: 114.922, z: -26.2857 },
		  { x: -67.7686, y: 113.93, z: -28.331 },
		  { x: -68.8514, y: 114.275, z: -27.7046 },
		  { x: -70.0291, y: 114.886, z: -26.5632 },
		  { x: -70.6482, y: 114.877, z: -26.1963 },
		  { x: -72.1952, y: 114.485, z: -25.4561 },
		  { x: -73.4939, y: 113.954, z: -22.8479 },
		  { x: -74.76, y: 113.034, z: -21.2763 },
		  { x: -76.5615, y: 110.396, z: -19.7303 },
		  { x: -77.5266, y: 108.788, z: -18.727 },
		  { x: -78.0246, y: 106.1, z: -19.6481 },
		  { x: -77.3765, y: 101.271, z: -20.6612 },
		  { x: -79.8225, y: 97.0111, z: -17.4031 },
		  { x: -80.6778, y: 95.2303, z: -16.2772 },
		  { x: -80.8141, y: 93.2078, z: -15.8447 },
		  { x: -82.038, y: 88.391, z: -13.7328 },
		  { x: -82.2452, y: 86.2467, z: -13.2717 },
		  { x: -82.284, y: 84.3739, z: -12.6705 },
		  { x: -82.5799, y: 80.4857, z: -11.1943 },
		  { x: -82.4963, y: 78.0676, z: -10.439 },
		  { x: -82.2151, y: 73.0384, z: -8.66175 },
		  { x: -82.1774, y: 70.7968, z: -7.89087 },
		  { x: -82.1608, y: 68.8039, z: -7.33154 },
		  { x: -81.7667, y: 64.482, z: -6.31092 },
		  { x: -81.5444, y: 62.3691, z: -5.83066 },
		  { x: -81.1865, y: 58.1721, z: -4.82629 },
		  { x: -81.1238, y: 56.2532, z: -4.29619 },
		  { x: -81.1707, y: 52.5481, z: -3.42039 },
		  { x: -81.0644, y: 50.6363, z: -3.03588 },
		  { x: -81.0282, y: 48.5925, z: -2.64338 },
		  { x: -80.814, y: 44.5146, z: -2.24009 },
		  { x: -80.8429, y: 42.4695, z: -1.81699 },
		  { x: -81.041, y: 40.0356, z: -1.13666 },
		  { x: -81.0231, y: 33.5966, z: -0.150273 },
		  { x: -81.3602, y: 30.0963, z: 0.702549 },
		  { x: -81.9341, y: 25.9131, z: 1.74682 },
		  { x: -83.2538, y: 19.0668, z: 2.54817 },
		  { x: -84.2626, y: 17.2241, z: 2.57129 },
		  { x: -86.8003, y: 14.709, z: 0.378109 },
		  { x: -88.0616, y: 14.1414, z: -0.697356 },
		  { x: -89.4592, y: 14.4272, z: -0.811879 },
		  { x: -91.8516, y: 14.9419, z: -0.906064 },
		  { x: -93.4016, y: 15.3005, z: -0.727004 },
		  { x: -97.0903, y: 18.6919, z: -0.692938 },
		  { x: -98.874, y: 20.7057, z: -0.828964 },
		  { x: -100.98, y: 23.0138, z: -0.896264 },
		  { x: -104.822, y: 28.4448, z: -1.66023 },
		  { x: -106.869, y: 31.4637, z: -2.00162 },
		  { x: -108.9, y: 37.019, z: -2.84749 },
		  { x: -110.331, y: 41.0981, z: -2.89389 },
		  { x: -112.896, y: 50.1971, z: -3.11505 },
		  { x: -114.015, y: 53.417, z: -3.01968 },
		  { x: -115.513, y: 57.7918, z: -3.09584 },
		  { x: -116.102, y: 59.5189, z: -3.2328 },
		  { x: -117.32, y: 63.1243, z: -3.91794 },
		  { x: -117.979, y: 65.2653, z: -4.55273 },
		  { x: -118.624, y: 68.303, z: -5.49243 },
		  { x: -118.819, y: 69.6373, z: -5.90725 },
		  { x: -119.782, y: 73.4971, z: -7.46436 },
		  { x: -120.159, y: 75.3637, z: -8.13945 },
		  { x: -120.333, y: 78.1635, z: -9.01039 },
		  { x: -120.358, y: 79.6435, z: -9.31608 },
		  { x: -120.456, y: 82.9809, z: -10.1068 },
		  { x: -120.837, y: 84.6398, z: -10.3859 },
		  { x: -120.722, y: 87.1921, z: -10.8789 },
		  { x: -120.079, y: 88.2827, z: -10.4155 },
		  { x: -119.985, y: 89.2802, z: -10.2671 },
		  { x: -120.049, y: 92.1643, z: -10.4917 },
		  { x: -120.136, y: 93.6476, z: -10.5363 },
		  { x: -120.082, y: 94.6394, z: -10.2896 },
		  { x: -120.078, y: 95.2185, z: -10.2864 },
		  { x: -120.688, y: 96.8392, z: -11.0942 },
		  { x: -121.07, y: 97.5083, z: -11.3722 },
		  { x: -121.196, y: 97.671, z: -11.427 },
		  { x: -120.89, y: 97.9183, z: -10.6174 },
		  { x: -120.554, y: 98.0892, z: -9.85099 },
		  { x: -120.678, y: 98.0333, z: -9.96111 },
		  { x: -120.698, y: 97.8475, z: -9.97266 },
		  { x: -120.78, y: 97.5651, z: -9.88381 },
		  { x: -120.638, y: 96.934, z: -8.95158 },
		  { x: -120.48, y: 96.2299, z: -7.88871 },
		  { x: -120.562, y: 94.9228, z: -6.80518 },
		  { x: -120.562, y: 94.9228, z: -6.80518 },
		  { x: -120.514, y: 94.3843, z: -6.66538 },
		  { x: -120.494, y: 93.8599, z: -6.57711 },
		  { x: -120.266, y: 93.1794, z: -6.2616 },
		  { x: -120.194, y: 92.7392, z: -6.22629 },
		  { x: -120.194, y: 92.7392, z: -6.22629 },
		  { x: -120.194, y: 92.7392, z: -6.22629 },
		  { x: -120.076, y: 92.321, z: -6.30114 },
		  { x: -120.019, y: 92.2023, z: -6.3131 },
		  { x: -119.87, y: 92.0597, z: -6.37326 },
		  { x: -119.728, y: 92.0275, z: -6.76235 },
		  { x: -119.545, y: 92.042, z: -7.10802 },
		  { x: -119.421, y: 92.0807, z: -7.63455 },
		  { x: -119.278, y: 92.119, z: -7.98742 },
		  { x: -119.278, y: 92.119, z: -7.98742 },
		  { x: -119.169, y: 92.1265, z: -8.27037 },
		  { x: -119.011, y: 92.1651, z: -8.50766 },
		  { x: -118.786, y: 92.1668, z: -8.63142 },
		  { x: -118.417, y: 92.1463, z: -8.77355 },
		  { x: -118.417, y: 92.1463, z: -8.77355 },
		  { x: -117.96, y: 92.0981, z: -8.88911 },
		  { x: -117.666, y: 92.116, z: -8.94738 },
		  { x: -117.443, y: 92.1307, z: -8.99128 },
		  { x: -117.443, y: 92.1307, z: -8.99128 },
		  { x: -117.326, y: 92.0872, z: -9.04723 },
		  { x: -117.326, y: 92.0872, z: -9.04723 },
		  { x: -117.326, y: 92.0872, z: -9.04723 },
		  { x: -116.81, y: 92.037, z: -8.87799 },
		  { x: -116.632, y: 92.0122, z: -8.81713 },
		  { x: -116.441, y: 91.9816, z: -8.80541 },
		  { x: -116.303, y: 91.923, z: -8.80048 },
		  { x: -116.303, y: 91.923, z: -8.80048 },
		  { x: -116.214, y: 91.8722, z: -8.91166 },
		  { x: -116.14, y: 91.7973, z: -8.97983 },
		  { x: -115.951, y: 91.8261, z: -8.97455 },
		  { x: -115.951, y: 91.8261, z: -8.97455 },
		  { x: -115.849, y: 91.759, z: -8.98872 },
		  { x: -115.772, y: 91.6797, z: -9.00002 },
		  { x: -115.772, y: 91.6797, z: -9.00002 },
		  { x: -115.746, y: 91.6191, z: -9.06445 },
		  { x: -115.666, y: 91.573, z: -9.08385 },
		  { x: -115.6, y: 91.557, z: -9.10852 },
		  { x: -115.6, y: 91.557, z: -9.10852 },
		  { x: -115.541, y: 91.5504, z: -9.1198 },
		  { x: -115.49, y: 91.5634, z: -9.12343 },
		  { x: -115.441, y: 91.5736, z: -9.11842 },
		  { x: -115.441, y: 91.5736, z: -9.11842 },
		  { x: -115.392, y: 91.5592, z: -9.09283 },
		  { x: -115.273, y: 91.5855, z: -9.04546 },
		  { x: -115.144, y: 91.6246, z: -9.00913 },
		  { x: -115.144, y: 91.6246, z: -9.00913 },
		  { x: -115.019, y: 91.6645, z: -9.0044 },
		  { x: -114.942, y: 91.6916, z: -9.05621 },
		  { x: -114.942, y: 91.6916, z: -9.05621 },
		  { x: -114.771, y: 91.7127, z: -9.0235 },
		  { x: -114.577, y: 91.7722, z: -9.04261 },
		  { x: -114.415, y: 91.8432, z: -9.08924 },
		  { x: -114.415, y: 91.8432, z: -9.08924 },
		  { x: -114.111, y: 91.9035, z: -9.07359 },
		  { x: -113.852, y: 91.9552, z: -9.08701 },
		  { x: -113.852, y: 91.9552, z: -9.08701 },
		  { x: -113.622, y: 91.9872, z: -9.10293 },
		  { x: -113.407, y: 92.021, z: -9.1335 },
		  { x: -113.407, y: 92.021, z: -9.1335 },
		  { x: -113.207, y: 92.0501, z: -9.17336 },
		  { x: -113.007, y: 92.0321, z: -9.31928 },
		  { x: -112.843, y: 92.0403, z: -9.41943 },
		  { x: -112.843, y: 92.0403, z: -9.41943 },
		  { x: -112.699, y: 92.057, z: -9.50873 },
		  { x: -112.604, y: 92.0618, z: -9.579 } ]
    },
    {
	"name": "3",
	"points":[ { x: -94.5389, y: 96.2864, z: -21.7056 },
		   { x: -94.4825, y: 96.2919, z: -21.765 },
		   { x: -94.4825, y: 96.2919, z: -21.765 },
		   { x: -94.4378, y: 96.2998, z: -21.8334 },
		   { x: -94.4261, y: 96.3231, z: -21.8963 },
		   { x: -94.4261, y: 96.3231, z: -21.8963 },
		   { x: -94.4302, y: 96.341, z: -21.9373 },
		   { x: -94.4344, y: 96.356, z: -21.9716 },
		   { x: -94.4344, y: 96.356, z: -21.9716 },
		   { x: -94.4085, y: 96.4292, z: -22.0027 },
		   { x: -94.3913, y: 96.4966, z: -22.0275 },
		   { x: -94.3843, y: 96.6059, z: -22.083 },
		   { x: -94.3843, y: 96.6059, z: -22.083 },
		   { x: -94.3774, y: 96.6981, z: -22.1295 },
		   { x: -94.3659, y: 96.8214, z: -22.1817 },
		   { x: -94.3659, y: 96.8214, z: -22.1817 },
		   { x: -94.309, y: 96.9417, z: -22.2088 },
		   { x: -94.1432, y: 97.1127, z: -22.2604 },
		   { x: -94.1432, y: 97.1127, z: -22.2604 },
		   { x: -93.6994, y: 97.2522, z: -22.333 },
		   { x: -92.6194, y: 97.3351, z: -21.9599 },
		   { x: -92.6194, y: 97.3351, z: -21.9599 },
		   { x: -91.3409, y: 97.3844, z: -22.0092 },
		   { x: -89.4243, y: 97.3681, z: -22.0465 },
		   { x: -87.4462, y: 97.2713, z: -22.3692 },
		   { x: -87.4462, y: 97.2713, z: -22.3692 },
		   { x: -85.2203, y: 97.2307, z: -22.5738 },
		   { x: -82.8597, y: 96.81, z: -22.7656 },
		   { x: -80.5924, y: 96.5421, z: -22.8023 },
		   { x: -78.41, y: 96.3816, z: -22.6417 },
		   { x: -76.275, y: 96.2026, z: -22.8586 },
		   { x: -74.2126, y: 96.133, z: -23.1136 },
		   { x: -72.1117, y: 95.9651, z: -23.3902 },
		   { x: -69.6503, y: 95.8335, z: -23.1851 },
		   { x: -67.1925, y: 95.6276, z: -23.3234 },
		   { x: -64.9972, y: 95.181, z: -23.7134 },
		   { x: -62.8731, y: 94.8021, z: -23.9185 },
		   { x: -58.3214, y: 94.3626, z: -24.7697 },
		   { x: -55.8102, y: 93.9659, z: -25.3374 },
		   { x: -53.3856, y: 93.722, z: -25.7494 },
		   { x: -50.0672, y: 92.9541, z: -25.6684 },
		   { x: -47.1506, y: 92.8593, z: -25.483 },
		   { x: -44.5269, y: 92.9825, z: -25.2428 },
		   { x: -38.8187, y: 93.4634, z: -24.7377 },
		   { x: -36.1402, y: 93.7555, z: -24.5482 },
		   { x: -33.5823, y: 94.22, z: -24.2733 },
		   { x: -28.866, y: 94.753, z: -24.3855 },
		   { x: -26.8071, y: 94.8538, z: -24.4249 },
		   { x: -24.6069, y: 94.9991, z: -24.6505 },
		   { x: -19.5052, y: 94.4498, z: -26.2843 },
		   { x: -16.9104, y: 94.2752, z: -26.8564 },
		   { x: -14.2318, y: 93.8184, z: -27.6865 },
		   { x: -8.36906, y: 93.1833, z: -28.6465 },
		   { x: -5.2912, y: 92.8957, z: -28.6487 },
		   { x: -2.65485, y: 92.6185, z: -28.6111 },
		   { x: 1.89016, y: 92.7198, z: -28.835 },
		   { x: 4.09416, y: 92.8061, z: -29.0167 },
		   { x: 8.4368, y: 93.1435, z: -29.5212 },
		   { x: 10.7121, y: 93.2676, z: -29.6263 },
		   { x: 13.0045, y: 93.7418, z: -29.7034 },
		   { x: 17.3212, y: 94.2266, z: -29.8048 },
		   { x: 19.3959, y: 94.5358, z: -29.85 },
		   { x: 21.0388, y: 94.5011, z: -30.0054 },
		   { x: 24.8039, y: 94.9609, z: -30.1919 },
		   { x: 24.8039, y: 94.9609, z: -30.1919 },
		   { x: 24.8039, y: 94.9609, z: -30.1919 },
		   { x: 32.4819, y: 96.1604, z: -29.6411 },
		   { x: 34.2721, y: 96.3758, z: -29.5174 },
		   { x: 35.7181, y: 96.4294, z: -29.5321 },
		   { x: 39.0192, y: 96.742, z: -29.5619 },
		   { x: 40.9394, y: 97.1704, z: -29.5829 },
		   { x: 42.3351, y: 97.3733, z: -29.5987 },
		   { x: 45.1993, y: 97.649, z: -29.5244 },
		   { x: 46.8054, y: 97.6, z: -29.5162 },
		   { x: 48.3071, y: 97.5551, z: -29.5881 },
		   { x: 51.6788, y: 97.6244, z: -30.0651 },
		   { x: 53.7359, y: 98.0925, z: -31.3589 },
		   { x: 55.7253, y: 98.4487, z: -32.7273 },
		   { x: 57.5741, y: 99.1454, z: -32.8514 },
		   { x: 59.1198, y: 99.632, z: -32.8442 },
		   { x: 62.0913, y: 99.9091, z: -33.2278 },
		   { x: 63.9709, y: 99.7368, z: -33.684 },
		   { x: 65.4639, y: 100.048, z: -33.75 },
		   { x: 67.2251, y: 100.321, z: -34.0859 },
		   { x: 70.5906, y: 101.355, z: -34.3674 },
		   { x: 72.2494, y: 102.014, z: -34.3296 },
		   { x: 74.3371, y: 102.976, z: -34.2433 },
		   { x: 75.9927, y: 103.204, z: -33.1144 },
		   { x: 78.7768, y: 103.304, z: -32.4574 },
		   { x: 80.0615, y: 103.478, z: -32.3736 },
		   { x: 81.8424, y: 104.615, z: -31.6948 },
		   { x: 83.4093, y: 105.195, z: -31.3861 },
		   { x: 84.4586, y: 105.543, z: -31.1795 },
		   { x: 88.3765, y: 107.073, z: -30.8971 },
		   { x: 89.7823, y: 107.442, z: -30.7281 },
		   { x: 91.1075, y: 107.636, z: -30.3452 },
		   { x: 91.8404, y: 107.667, z: -30.2037 },
		   { x: 93.4299, y: 107.611, z: -30.0828 },
		   { x: 94.8685, y: 107.828, z: -30.0768 },
		   { x: 95.8741, y: 107.785, z: -30.0886 },
		   { x: 96.4761, y: 107.69, z: -30.0892 },
		   { x: 98.4525, y: 107.248, z: -29.9464 },
		   { x: 104.88, y: 107.79, z: -29.1844 },
		   { x: 108.108, y: 108.149, z: -28.483 },
		   { x: 111.28, y: 108.793, z: -28.1886 },
		   { x: 113.536, y: 109.078, z: -27.9942 },
		   { x: 116.919, y: 109.353, z: -27.6724 },
		   { x: 118.409, y: 109.583, z: -27.5025 },
		   { x: 120.012, y: 109.854, z: -27.2287 },
		   { x: 121.426, y: 109.997, z: -27.0572 },
		   { x: 124.278, y: 110.514, z: -27.1279 },
		   { x: 124.971, y: 110.218, z: -27.1814 },
		   { x: 125.826, y: 110.021, z: -27.2146 },
		   { x: 127.942, y: 109.856, z: -27.4419 },
		   { x: 130.175, y: 109.829, z: -27.6075 },
		   { x: 132.934, y: 109.904, z: -27.3687 },
		   { x: 134.104, y: 110.189, z: -27.3005 },
		   { x: 135.192, y: 110.031, z: -26.9597 },
		   { x: 136.089, y: 109.76, z: -27.1764 },
		   { x: 139.674, y: 110.803, z: -27.318 },
		   { x: 140.836, y: 111.258, z: -27.0369 },
		   { x: 141.345, y: 111.407, z: -26.922 },
		   { x: 142.778, y: 111.471, z: -26.414 },
		   { x: 144.412, y: 109.729, z: -26.1103 },
		   { x: 143.769, y: 108.725, z: -25.9757 },
		   { x: 144.048, y: 107.003, z: -25.4348 },
		   { x: 144.643, y: 106.628, z: -25.1531 },
		   { x: 145.92, y: 106.565, z: -24.6384 },
		   { x: 146.471, y: 106.033, z: -24.2063 },
		   { x: 147.259, y: 106.13, z: -24.2004 },
		   { x: 147.84, y: 106.116, z: -24.1143 },
		   { x: 149.859, y: 106.105, z: -24.159 },
		   { x: 149.082, y: 104.775, z: -24.6606 },
		   { x: 150.68, y: 105.283, z: -24.5738 },
		   { x: 151.523, y: 105.72, z: -24.5623 },
		   { x: 153.581, y: 106.586, z: -24.506 },
		   { x: 158.603, y: 109.115, z: -24.263 },
		   { x: 160.144, y: 110.063, z: -24.399 },
		   { x: 160.534, y: 110.139, z: -24.5174 },
		   { x: 161.044, y: 110.369, z: -24.5609 },
		   { x: 160.796, y: 110.324, z: -24.6941 },
		   { x: 160.505, y: 110.412, z: -24.8229 },
		   { x: 163.377, y: 112.337, z: -24.8902 },
		   { x: 164.522, y: 112.638, z: -25.2555 },
		   { x: 164.918, y: 111.57, z: -25.9367 },
		   { x: 165.834, y: 111.167, z: -26.3124 },
		   { x: 166.988, y: 110.951, z: -26.4875 },
		   { x: 168.735, y: 110.895, z: -26.6813 },
		   { x: 169.528, y: 110.923, z: -26.6907 },
		   { x: 171.469, y: 108.737, z: -26.478 },
		   { x: 171.254, y: 104.615, z: -26.1429 },
		   { x: 171.149, y: 100.672, z: -25.5525 },
		   { x: 172.905, y: 98.3252, z: -25.0961 },
		   { x: 176.205, y: 95.208, z: -21.5049 },
		   { x: 177.744, y: 94.6452, z: -20.2544 },
		   { x: 180.877, y: 95.6037, z: -19.0599 },
		   { x: 181.343, y: 93.1645, z: -17.2105 },
		   { x: 182.667, y: 92.5424, z: -16.0073 },
		   { x: 183.385, y: 91.3586, z: -13.4781 },
		   { x: 183.71, y: 90.2627, z: -12.9359 },
		   { x: 180.52, y: 85.54, z: -13.8458 },
		   { x: 178.175, y: 83.3667, z: -14.0851 },
		   { x: 169.135, y: 83.4013, z: -9.49324 },
		   { x: 169.002, y: 83.2877, z: -5.24128 },
		   { x: 169.002, y: 83.2877, z: -5.24128 },
		   { x: 168.713, y: 81.7423, z: -4.54178 },
		   { x: 169.185, y: 83.7326, z: -4.62498 },
		   { x: 160.771, y: 79.2834, z: -0.00679269 },
		   { x: 169.737, y: 92.7513, z: -0.61072 },
		   { x: 174.335, y: 98.2324, z: -1.63701 },
		   { x: 176.288, y: 104.25, z: -4.98615 },
		   { x: 179.502, y: 108.455, z: -6.69978 },
		   { x: 179.77, y: 109.194, z: -7.95535 },
		   { x: 180.755, y: 107.207, z: -9.09203 },
		   { x: 179.834, y: 94.6027, z: -9.67626 },
		   { x: 179.741, y: 90.3906, z: -11.7049 },
		   { x: 183.304, y: 92.4794, z: -15.7062 },
		   { x: 192.881, y: 84.8614, z: -13.8744 } ]
    },
    {
	"name": "3'",
	"points":[ { x: 142.396, y: 123.484, z: -26.1569 },
		   { x: 142.253, y: 123.44, z: -25.9945 },
		   { x: 142.152, y: 123.383, z: -25.8735 },
		   { x: 142.117, y: 123.185, z: -25.9467 },
		   { x: 141.719, y: 122.973, z: -25.6041 },
		   { x: 142.984, y: 118.804, z: -23.7519 },
		   { x: 144.777, y: 117.363, z: -22.0375 },
		   { x: 145.442, y: 117.171, z: -21.4683 },
		   { x: 145.642, y: 117.22, z: -21.3021 },
		   { x: 145.735, y: 117.394, z: -21.1826 },
		   { x: 145.733, y: 117.492, z: -21.1526 },
		   { x: 145.71, y: 117.583, z: -21.1327 },
		   { x: 146.434, y: 117.614, z: -21.5346 },
		   { x: 146.965, y: 117.697, z: -21.8723 },
		   { x: 147.222, y: 117.673, z: -22.0567 },
		   { x: 148.955, y: 117.701, z: -21.7956 },
		   { x: 149.345, y: 118.006, z: -21.7805 },
		   { x: 149.456, y: 118.217, z: -21.7998 },
		   { x: 149.43, y: 118.375, z: -21.8384 },
		   { x: 148.569, y: 117.835, z: -21.9988 },
		   { x: 148.09, y: 117.666, z: -22.0197 },
		   { x: 148.09, y: 117.666, z: -22.0197 },
		   { x: 148.09, y: 117.666, z: -22.0197 },
		   { x: 147.419, y: 117.811, z: -22.1097 },
		   { x: 145.749, y: 117.921, z: -23.3244 },
		   { x: 144.255, y: 117.509, z: -24.5066 },
		   { x: 142.632, y: 116.934, z: -26.0037 },
		   { x: 140.171, y: 116.718, z: -26.9335 },
		   { x: 139.06, y: 116.737, z: -26.972 },
		   { x: 137.205, y: 117.193, z: -27.026 },
		   { x: 133.686, y: 117.572, z: -27.7819 },
		   { x: 131.987, y: 117.862, z: -28.3913 },
		   { x: 129.734, y: 118.191, z: -28.846 },
		   { x: 128.743, y: 118.289, z: -29.064 },
		   { x: 126.355, y: 117.843, z: -29.5705 },
		   { x: 123.05, y: 117.883, z: -30.7069 },
		   { x: 121.519, y: 118.149, z: -31.4018 },
		   { x: 118.672, y: 118.424, z: -32.4624 },
		   { x: 116.615, y: 118.633, z: -33.0199 },
		   { x: 108.559, y: 117.443, z: -34.677 },
		   { x: 106.258, y: 117.512, z: -34.8818 },
		   { x: 102.039, y: 117.856, z: -35.8898 },
		   { x: 99.8427, y: 118.468, z: -36.5377 },
		   { x: 97.4063, y: 118.284, z: -37.689 },
		   { x: 95.7659, y: 118.033, z: -38.4906 },
		   { x: 94.6973, y: 118.012, z: -38.9609 },
		   { x: 91.0773, y: 117.476, z: -40.0195 },
		   { x: 88.1043, y: 117.833, z: -40.7059 },
		   { x: 86.317, y: 118.007, z: -41.3943 },
		   { x: 83.1316, y: 118.2, z: -41.967 },
		   { x: 81.5503, y: 118.619, z: -42.2904 },
		   { x: 75.9806, y: 119.746, z: -42.8692 },
		   { x: 74.6958, y: 121.324, z: -41.3589 },
		   { x: 72.8541, y: 121.652, z: -40.9734 },
		   { x: 70.8136, y: 121.238, z: -41.1521 },
		   { x: 67.4028, y: 120.44, z: -42.2172 },
		   { x: 64.7341, y: 120.679, z: -42.9756 },
		   { x: 61.6758, y: 119.943, z: -44.0437 },
		   { x: 58.9334, y: 119.478, z: -44.5304 },
		   { x: 56.7089, y: 119.577, z: -44.2105 },
		   { x: 55.7795, y: 119.523, z: -44.0976 },
		   { x: 53.7879, y: 119.987, z: -44.1131 },
		   { x: 51.5073, y: 120.016, z: -44.1914 },
		   { x: 48.9183, y: 120.243, z: -44.2787 },
		   { x: 46.3119, y: 120.536, z: -44.2565 },
		   { x: 43.6722, y: 121.101, z: -44.441 },
		   { x: 42.6117, y: 120.99, z: -44.7121 },
		   { x: 40.4228, y: 120.941, z: -44.8566 },
		   { x: 37.5684, y: 121.33, z: -45.1875 },
		   { x: 35.6603, y: 121.287, z: -45.3078 },
		   { x: 33.7454, y: 120.462, z: -45.7557 },
		   { x: 31.8176, y: 120.265, z: -45.9942 },
		   { x: 29.6991, y: 120.318, z: -46.1584 },
		   { x: 25.6054, y: 120.065, z: -46.3566 },
		   { x: 23.2677, y: 119.334, z: -46.8413 },
		   { x: 21.2221, y: 118.837, z: -47.1037 },
		   { x: 19.053, y: 118.762, z: -47.6938 },
		   { x: 17.0195, y: 119.188, z: -47.7852 },
		   { x: 13.6576, y: 119.874, z: -47.8476 },
		   { x: 11.9459, y: 120.2, z: -47.8586 },
		   { x: 10.2835, y: 120.614, z: -47.7924 },
		   { x: 8.59285, y: 120.791, z: -47.9169 },
		   { x: 6.9659, y: 120.914, z: -48.0327 },
		   { x: 3.44374, y: 121.351, z: -48.1181 },
		   { x: 1.70358, y: 121.335, z: -48.1827 },
		   { x: 0.096869, y: 121.293, z: -48.3812 },
		   { x: -1.43025, y: 120.857, z: -48.5832 },
		   { x: -2.86551, y: 120.79, z: -48.6511 },
		   { x: -6.11374, y: 121.047, z: -48.8706 },
		   { x: -7.70054, y: 121.11, z: -48.9606 },
		   { x: -9.13957, y: 121.297, z: -48.9957 },
		   { x: -10.9546, y: 121.402, z: -49.1831 },
		   { x: -12.7058, y: 121.176, z: -49.616 },
		   { x: -16.1851, y: 120.872, z: -50.1919 },
		   { x: -17.389, y: 120.716, z: -50.3718 },
		   { x: -19.1899, y: 120.838, z: -50.5206 },
		   { x: -21.3125, y: 120.668, z: -50.8709 },
		   { x: -23.5865, y: 120.285, z: -51.6593 },
		   { x: -25.5978, y: 120.186, z: -51.8383 },
		   { x: -27.3365, y: 120.183, z: -51.942 },
		   { x: -31.1648, y: 120.26, z: -51.9442 },
		   { x: -33.1385, y: 120.362, z: -51.8396 },
		   { x: -34.6964, y: 120.328, z: -51.752 },
		   { x: -36.5735, y: 120.223, z: -51.6808 },
		   { x: -38.7245, y: 119.968, z: -51.7551 },
		   { x: -41.023, y: 119.627, z: -51.9392 },
		   { x: -43.0858, y: 119.393, z: -51.9322 },
		   { x: -47.4527, y: 118.68, z: -51.8177 },
		   { x: -49.497, y: 118.228, z: -51.9626 },
		   { x: -51.5901, y: 117.532, z: -52.1832 },
		   { x: -53.383, y: 116.942, z: -52.2658 },
		   { x: -55.3004, y: 116.743, z: -51.9704 },
		   { x: -58.3738, y: 115.186, z: -51.3823 },
		   { x: -58.3738, y: 115.186, z: -51.3823 },
		   { x: -58.3738, y: 115.186, z: -51.3823 },
		   { x: -63.8352, y: 113.516, z: -52.0024 },
		   { x: -65.4893, y: 113.226, z: -51.9005 },
		   { x: -67.1523, y: 112.989, z: -51.7116 },
		   { x: -70.1532, y: 112.319, z: -51.9089 },
		   { x: -71.656, y: 111.956, z: -51.9388 },
		   { x: -73.3439, y: 111.949, z: -51.7934 },
		   { x: -75.354, y: 112.218, z: -51.7048 },
		   { x: -77.1095, y: 112.224, z: -51.9108 },
		   { x: -78.6853, y: 112.152, z: -52.4537 },
		   { x: -81.4739, y: 111.327, z: -53.7248 },
		   { x: -82.9931, y: 110.899, z: -54.2942 },
		   { x: -84.8547, y: 110.963, z: -54.8477 },
		   { x: -86.7139, y: 111.3, z: -55.1387 },
		   { x: -88.5111, y: 111.568, z: -55.2089 },
		   { x: -90.0367, y: 111.678, z: -55.2005 },
		   { x: -91.8317, y: 112.414, z: -55.3014 },
		   { x: -94.9502, y: 112.646, z: -55.5915 },
		   { x: -96.7503, y: 113.117, z: -56.0734 },
		   { x: -98.495, y: 113.69, z: -56.3594 },
		   { x: -100.094, y: 113.901, z: -56.5752 },
		   { x: -101.347, y: 113.922, z: -56.4153 },
		   { x: -102.549, y: 113.884, z: -56.3708 },
		   { x: -103.933, y: 114.076, z: -56.5903 },
		   { x: -105.457, y: 114.243, z: -56.6131 },
		   { x: -107.783, y: 114.834, z: -56.2464 },
		   { x: -108.774, y: 114.865, z: -56.2733 },
		   { x: -110.004, y: 114.948, z: -56.1302 },
		   { x: -111.029, y: 115.125, z: -55.9921 },
		   { x: -112.74, y: 115.66, z: -56.0644 },
		   { x: -114.918, y: 115.857, z: -56.1526 },
		   { x: -116.053, y: 116.33, z: -55.5746 },
		   { x: -117.022, y: 116.766, z: -55.0593 },
		   { x: -117.94, y: 116.868, z: -54.7558 },
		   { x: -119.372, y: 117.025, z: -54.6162 },
		   { x: -122.489, y: 116.992, z: -54.8598 },
		   { x: -123.716, y: 117.018, z: -54.4573 },
		   { x: -124.54, y: 116.93, z: -54.0953 },
		   { x: -125.651, y: 116.377, z: -54.5365 },
		   { x: -127.287, y: 116.129, z: -54.6593 },
		   { x: -128.836, y: 116.461, z: -54.785 },
		   { x: -131.436, y: 116.762, z: -54.7743 },
		   { x: -133.021, y: 116.437, z: -54.8104 },
		   { x: -135.038, y: 116.943, z: -55.0879 },
		   { x: -136.001, y: 117.286, z: -55.2057 },
		   { x: -136.935, y: 116.899, z: -55.2634 },
		   { x: -136.935, y: 116.899, z: -55.2634 },
		   { x: -139, y: 117.221, z: -55.0745 },
		   { x: -139.997, y: 116.79, z: -55.1721 },
		   { x: -141.359, y: 116.592, z: -55.3269 },
		   { x: -142.638, y: 116.379, z: -55.2605 },
		   { x: -143.92, y: 116.289, z: -54.9002 },
		   { x: -145.167, y: 116.421, z: -55.0335 },
		   { x: -146.322, y: 116.425, z: -55.0492 },
		   { x: -147.528, y: 116.483, z: -55.0821 },
		   { x: -148.595, y: 116.086, z: -54.9885 },
		   { x: -149.762, y: 115.718, z: -55.2469 },
		   { x: -150.922, y: 115.382, z: -55.1418 },
		   { x: -152.447, y: 115.09, z: -55.0689 },
		   { x: -154.098, y: 115.506, z: -54.9467 },
		   { x: -155.712, y: 115.09, z: -54.9842 },
		   { x: -157.036, y: 114.365, z: -55.6367 },
		   { x: -158.197, y: 114.851, z: -55.9191 },
		   { x: -159.627, y: 115.052, z: -55.677 },
		   { x: -161.527, y: 115.872, z: -55.2258 },
		   { x: -160.989, y: 114.625, z: -55.2224 },
		   { x: -161.556, y: 114.327, z: -55.0539 },
		   { x: -164.137, y: 115.006, z: -55.5215 },
		   { x: -165.243, y: 113.855, z: -56.9594 },
		   { x: -166.074, y: 113.242, z: -58.4765 },
		   { x: -167.036, y: 114.645, z: -58.6842 },
		   { x: -167.143, y: 113.123, z: -59.8071 },
		   { x: -167.382, y: 112.857, z: -59.8301 },
		   { x: -167.611, y: 112.568, z: -59.8201 },
		   { x: -168.029, y: 111.96, z: -60.1749 },
		   { x: -168.207, y: 111.767, z: -60.2808 },
		   { x: -168.373, y: 111.584, z: -60.3512 },
		   { x: -170.238, y: 112.215, z: -59.6768 },
		   { x: -172.78, y: 113.249, z: -59.1739 },
		   { x: -172.406, y: 113.079, z: -59.603 },
		   { x: -172.627, y: 112.952, z: -59.5706 },
		   { x: -173.517, y: 112.717, z: -59.702 },
		   { x: -177.16, y: 115.245, z: -59.393 },
		   { x: -176.418, y: 113.433, z: -59.6578 },
		   { x: -177.006, y: 112.982, z: -60.0262 },
		   { x: -178.644, y: 114.336, z: -59.6688 },
		   { x: -179.632, y: 114.388, z: -59.5438 },
		   { x: -178.537, y: 111.231, z: -61.0791 },
		   { x: -177.873, y: 109.736, z: -61.4871 },
		   { x: -178.308, y: 108.363, z: -61.309 },
		   { x: -180.701, y: 109.589, z: -61.0346 },
		   { x: -182.018, y: 110.732, z: -60.8746 },
		   { x: -182.231, y: 110.671, z: -60.8304 },
		   { x: -177.168, y: 105.828, z: -63.8588 },
		   { x: -179.462, y: 107.754, z: -62.6031 },
		   { x: -179.833, y: 107.813, z: -62.3632 },
		   { x: -184.447, y: 109.448, z: -61.5062 },
		   { x: -184.813, y: 109.206, z: -61.6884 },
		   { x: -184.451, y: 108.935, z: -62.133 },
		   { x: -184.494, y: 108.805, z: -62.1353 },
		   { x: -183.943, y: 108.451, z: -62.3885 },
		   { x: -184.069, y: 108.589, z: -62.0395 },
		   { x: -183.991, y: 108.038, z: -61.9051 },
		   { x: -183.775, y: 108.378, z: -61.3802 },
		   { x: -184.134, y: 114.225, z: -59.3388 },
		   { x: -188.95, y: 121.952, z: -57.9683 },
		   { x: -191.5, y: 124.873, z: -57.0942 },
		   { x: -191.5, y: 124.873, z: -57.0942 },
		   { x: -191.803, y: 125.162, z: -56.9352 },
		   { x: -191.852, y: 125.249, z: -56.9156 },
		   { x: -192.698, y: 125.868, z: -56.4636 },
		   { x: -192.716, y: 125.877, z: -56.452 },
		   { x: -192.545, y: 125.971, z: -56.4079 },
		   { x: -186.277, y: 123.238, z: -57.828 },
		   { x: -187.731, y: 123.902, z: -56.9437 },
		   { x: -187.731, y: 123.902, z: -56.9437 },
		   { x: -188.76, y: 123.66, z: -56.6024 },
		   { x: -188.087, y: 123.135, z: -56.8705 },
		   { x: -187.697, y: 122.877, z: -56.8229 },
		   { x: -186.991, y: 122.171, z: -56.5196 },
		   { x: -186.793, y: 122.403, z: -56.4389 },
		   { x: -187.759, y: 123.27, z: -56.1603 },
		   { x: -189.276, y: 123.676, z: -59.0797 },
		   { x: -189.608, y: 122.817, z: -60.3209 },
		   { x: -186.865, y: 121.483, z: -59.2453 },
		   { x: -187.294, y: 120.894, z: -60.0189 },
		   { x: -187.738, y: 121.616, z: -58.5949 },
		   { x: -187.252, y: 122.351, z: -58.8166 },
		   { x: -187.012, y: 122.642, z: -58.7994 },
		   { x: -186.896, y: 122.759, z: -58.8498 },
		   { x: -186.561, y: 122.936, z: -58.9623 },
		   { x: -186.503, y: 123.411, z: -59.0528 },
		   { x: -186.466, y: 124.01, z: -59.1895 },
		   { x: -186.443, y: 124.021, z: -59.2021 },
		   { x: -186.418, y: 124.023, z: -59.2196 },
		   { x: -185.731, y: 123.373, z: -60.1367 },
		   { x: -184.877, y: 123.1, z: -60.9638 },
		   { x: -184.228, y: 123.181, z: -61.259 },
		   { x: -182.994, y: 123.276, z: -61.4644 },
		   { x: -182.706, y: 123.304, z: -61.5947 },
		   { x: -182.833, y: 123.389, z: -61.4734 },
		   { x: -182.859, y: 123.539, z: -61.3437 },
		   { x: -178.195, y: 122.801, z: -63.4249 },
		   { x: -174.153, y: 122.98, z: -64.0014 },
		   { x: -172.14, y: 123.16, z: -64.0967 },
		   { x: -171.05, y: 123.029, z: -63.9523 },
		   { x: -170.385, y: 123.186, z: -63.7547 },
		   { x: -168.306, y: 122.137, z: -63.9 },
		   { x: -165.469, y: 119.527, z: -63.3551 },
		   { x: -163.262, y: 118.334, z: -61.8665 },
		   { x: -161.162, y: 117.095, z: -60.9613 },
		   { x: -160.537, y: 115.844, z: -60.4372 },
		   { x: -160.624, y: 113.94, z: -59.84 },
		   { x: -160.276, y: 112.567, z: -59.0653 } ]
    },
    {    "name": "4",
	 "points": [ { x: -56.2428, y: 54.5958, z: -35.241 },
		     { x: -56.1163, y: 54.9552, z: -35.1402 },
		     { x: -55.8536, y: 55.3817, z: -34.9047 },
		     { x: -55.4212, y: 55.807, z: -34.4179 },
		     { x: -54.8481, y: 56.1838, z: -33.8291 },
		     { x: -54.4299, y: 56.5155, z: -33.5058 },
		     { x: -54.1124, y: 56.8474, z: -33.3269 },
		     { x: -53.8802, y: 57.1578, z: -33.1734 },
		     { x: -53.7908, y: 57.3154, z: -33.1183 },
		     { x: -53.6353, y: 57.618, z: -33.0451 },
		     { x: -53.5986, y: 57.7231, z: -33.0204 },
		     { x: -53.501, y: 58.0639, z: -32.933 },
		     { x: -53.4298, y: 58.353, z: -32.851 },
		     { x: -53.395, y: 58.5653, z: -32.7715 },
		     { x: -53.358, y: 58.7376, z: -32.7078 },
		     { x: -53.3666, y: 58.8997, z: -32.6488 },
		     { x: -53.3733, y: 58.9784, z: -32.5983 },
		     { x: -53.3761, y: 59.0416, z: -32.5592 },
		     { x: -53.3449, y: 59.0751, z: -32.5376 },
		     { x: -53.2037, y: 59.0609, z: -32.5543 },
		     { x: -52.8507, y: 58.9595, z: -32.6305 },
		     { x: -52.1228, y: 58.7028, z: -32.7873 },
		     { x: -51.2374, y: 58.4327, z: -33.0074 },
		     { x: -49.6372, y: 58.0663, z: -33.3921 },
		     { x: -48.5529, y: 57.8618, z: -33.6 },
		     { x: -46.437, y: 57.5283, z: -34.1929 },
		     { x: -43.6622, y: 57.3212, z: -34.9384 },
		     { x: -40.8274, y: 57.1235, z: -35.5831 },
		     { x: -37.8729, y: 57.1529, z: -36.4202 },
		     { x: -35.0863, y: 57.7118, z: -36.9771 },
		     { x: -32.3399, y: 58.2919, z: -37.5388 },
		     { x: -29.2387, y: 58.3218, z: -38.5172 },
		     { x: -26.5467, y: 58.4099, z: -39.3908 },
		     { x: -23.8138, y: 58.7436, z: -39.9908 },
		     { x: -20.9147, y: 59.321, z: -40.523 },
		     { x: -17.7608, y: 59.8479, z: -41.1103 },
		     { x: -14.5203, y: 60.2929, z: -41.7777 },
		     { x: -12.9468, y: 60.5388, z: -42.0722 },
		     { x: -9.63206, y: 61.0349, z: -42.6114 },
		     { x: -6.12759, y: 61.5062, z: -43.0812 },
		     { x: -2.65483, y: 62.0143, z: -43.4216 },
		     { x: 0.495749, y: 62.6837, z: -43.6635 },
		     { x: 3.98219, y: 63.4847, z: -43.9275 },
		     { x: 7.50245, y: 64.5501, z: -44.2097 },
		     { x: 10.61, y: 65.2752, z: -44.2317 },
		     { x: 13.745, y: 66.0213, z: -44.1055 },
		     { x: 17.2102, y: 66.4333, z: -43.5209 },
		     { x: 20.3645, y: 66.6651, z: -43.1251 },
		     { x: 22.9324, y: 67.1844, z: -43.0472 },
		     { x: 25.4553, y: 67.8224, z: -43.2916 },
		     { x: 28.1582, y: 68.4921, z: -43.8311 },
		     { x: 31.0467, y: 69.7316, z: -44.566 },
		     { x: 32.4301, y: 70.0695, z: -44.7736 },
		     { x: 35.152, y: 70.7934, z: -44.6826 },
		     { x: 37.6322, y: 70.6843, z: -44.8404 },
		     { x: 40.2758, y: 71.1208, z: -44.8536 },
		     { x: 42.7442, y: 71.1742, z: -44.9288 },
		     { x: 45.203, y: 71.1419, z: -45.1764 },
		     { x: 47.7412, y: 70.7695, z: -45.3167 },
		     { x: 50.2923, y: 70.4719, z: -45.363 },
		     { x: 52.353, y: 69.9718, z: -45.273 },
		     { x: 54.213, y: 69.3884, z: -45.2888 },
		     { x: 55.4457, y: 68.838, z: -45.3711 },
		     { x: 56.6413, y: 68.3884, z: -45.5191 },
		     { x: 57.5535, y: 68.0575, z: -45.4972 },
		     { x: 58.1397, y: 67.8762, z: -45.4547 },
		     { x: 58.3242, y: 67.8321, z: -45.4328 },
		     { x: 58.561, y: 67.7432, z: -45.3927 },
		     { x: 58.6298, y: 67.6916, z: -45.3477 },
		     { x: 58.5806, y: 67.8281, z: -45.2343 },
		     { x: 58.3432, y: 68.1661, z: -45.124 },
		     { x: 57.5005, y: 69.0629, z: -44.9844 },
		     { x: 56.283, y: 70.405, z: -44.8394 },
		     { x: 54.3236, y: 72.3184, z: -44.2097 },
		     { x: 53.4669, y: 73.4734, z: -44.1066 },
		     { x: 51.8235, y: 76.9302, z: -44.7712 },
		     { x: 51.4931, y: 79.1714, z: -45.3001 },
		     { x: 51.4001, y: 83.4525, z: -45.0964 },
		     { x: 52.2566, y: 88.8049, z: -43.8872 },
		     { x: 53.6345, y: 93.4011, z: -42.3705 },
		     { x: 54.5135, y: 95.9511, z: -41.6124 },
		     { x: 56.471, y: 100.193, z: -40.7125 },
		     { x: 59.2889, y: 104.65, z: -40.8478 },
		     { x: 61.6403, y: 108.262, z: -39.9885 },
		     { x: 64.013, y: 111.294, z: -38.4609 },
		     { x: 66.8769, y: 112.962, z: -37.5078 },
		     { x: 69.7738, y: 114.736, z: -34.8788 },
		     { x: 73.2709, y: 115.296, z: -31.9743 },
		     { x: 76.9312, y: 115.06, z: -34.6873 },
		     { x: 80.036, y: 114.078, z: -35.3617 },
		     { x: 83.2585, y: 112.671, z: -35.8385 },
		     { x: 86.371, y: 110.583, z: -34.5316 },
		     { x: 89.0404, y: 107.61, z: -34.3448 },
		     { x: 90.1434, y: 105.889, z: -34.2334 },
		     { x: 92.5464, y: 101.543, z: -34.5437 },
		     { x: 94.7229, y: 97.1389, z: -34.3533 },
		     { x: 96.3051, y: 92.4502, z: -33.8043 },
		     { x: 97.7033, y: 88.3825, z: -32.6105 },
		     { x: 98.3707, y: 84.2992, z: -31.3393 },
		     { x: 99.2514, y: 80.1217, z: -31.4432 },
		     { x: 100.206, y: 75.4819, z: -31.6385 },
		     { x: 100.386, y: 71.7566, z: -31.5448 },
		     { x: 100.952, y: 68.0023, z: -31.0943 },
		     { x: 101.071, y: 65.5032, z: -30.9509 },
		     { x: 101.152, y: 63.5472, z: -30.4645 },
		     { x: 101.565, y: 61.6858, z: -30.0374 },
		     { x: 101.671, y: 60.6924, z: -29.8118 },
		     { x: 101.691, y: 60.6162, z: -29.8068 },
		     { x: 101.67, y: 60.6555, z: -29.8592 },
		     { x: 101.868, y: 61.5284, z: -30.6312 },
		     { x: 101.614, y: 62.3481, z: -30.6568 },
		     { x: 100.686, y: 63.6912, z: -31.2614 },
		     { x: 101.127, y: 65.8775, z: -32.8238 },
		     { x: 102.06, y: 68.6651, z: -33.2241 },
		     { x: 102.456, y: 71.7474, z: -33.4168 },
		     { x: 103.847, y: 76.1779, z: -34.7377 },
		     { x: 104.966, y: 80.2479, z: -34.9034 },
		     { x: 106.927, y: 83.3289, z: -34.6301 },
		     { x: 109.154, y: 87.9372, z: -34.8195 },
		     { x: 111.407, y: 91.3379, z: -36.9772 },
		     { x: 113.046, y: 93.4252, z: -38.7163 },
		     { x: 113.613, y: 94.3587, z: -39.3709 },
		     { x: 115.963, y: 96.2614, z: -40.5291 },
		     { x: 120.491, y: 99.4501, z: -40.9164 },
		     { x: 123.439, y: 101.086, z: -41.1993 },
		     { x: 126.07, y: 102.091, z: -41.3783 },
		     { x: 129.575, y: 102.171, z: -40.674 },
		     { x: 133.052, y: 102.442, z: -40.4554 },
		     { x: 136.092, y: 102.564, z: -40.5949 },
		     { x: 133.969, y: 99.426, z: -40.0704 },
		     { x: 139.378, y: 99.7482, z: -38.8182 },
		     { x: 144.977, y: 98.4571, z: -37.8139 },
		     { x: 152.773, y: 98.4338, z: -35.8846 },
		     { x: 157.172, y: 99.6822, z: -35.902 },
		     { x: 160.04, y: 99.6525, z: -35.8545 },
		     { x: 163.307, y: 99.415, z: -37.3715 },
		     { x: 158.458, y: 91.4968, z: -39.5818 },
		     { x: 156.508, y: 87.0245, z: -39.5767 },
		     { x: 157.286, y: 84.9152, z: -39.0986 },
		     { x: 161.749, y: 85.265, z: -37.5708 },
		     { x: 164.356, y: 86.1265, z: -36.62 },
		     { x: 164.329, y: 83.6955, z: -36.7747 },
		     { x: 162.843, y: 77.8299, z: -35.2144 },
		     { x: 163.519, y: 74.6497, z: -32.6129 },
		     { x: 166.295, y: 74.9028, z: -32.3573 } ]
    },
    {
	"name": "4'",
	"points": [ { x: 78.6581, y: 57.4065, z: -71.3868 },
		    { x: 72.7614, y: 54.0803, z: -71.2273 },
		    { x: 69.8536, y: 52.9168, z: -69.4426 },
		    { x: 70.2136, y: 52.9931, z: -68.4017 },
		    { x: 70.2879, y: 52.9388, z: -68.0689 },
		    { x: 69.7529, y: 52.6035, z: -67.9564 },
		    { x: 70.0592, y: 52.5963, z: -67.9543 },
		    { x: 70.4866, y: 52.4009, z: -68.0404 },
		    { x: 70.2563, y: 51.9587, z: -67.8125 },
		    { x: 69.0847, y: 51.1093, z: -67.9528 },
		    { x: 69.7731, y: 51.0241, z: -67.8275 },
		    { x: 71.1272, y: 51.6153, z: -67.4949 },
		    { x: 71.5492, y: 51.47, z: -67.3486 },
		    { x: 71.632, y: 51.521, z: -67.3277 },
		    { x: 71.7935, y: 51.5619, z: -67.2942 },
		    { x: 71.7918, y: 51.3848, z: -67.0872 },
		    { x: 71.9381, y: 51.4583, z: -66.9044 },
		    { x: 72.2089, y: 51.8204, z: -66.7785 },
		    { x: 72.1876, y: 51.9722, z: -66.7751 },
		    { x: 71.8172, y: 52.2491, z: -66.9674 },
		    { x: 72.4325, y: 54.2637, z: -66.7628 },
		    { x: 72.124, y: 56.0139, z: -66.9361 },
		    { x: 70.8098, y: 57.2888, z: -67.2803 },
		    { x: 70.0454, y: 60.1544, z: -66.9571 },
		    { x: 68.8262, y: 63.8548, z: -66.0576 },
		    { x: 68.1788, y: 68.9381, z: -65.2753 },
		    { x: 66.5571, y: 72.8004, z: -65.7953 },
		    { x: 65.9196, y: 74.7742, z: -66.4795 },
		    { x: 64.2782, y: 80.6266, z: -69.0002 },
		    { x: 62.1643, y: 85.0498, z: -71.933 },
		    { x: 60.1332, y: 89.9743, z: -74.3091 },
		    { x: 57.6897, y: 95.8502, z: -75.6524 },
		    { x: 54.9493, y: 101.785, z: -76.7291 },
		    { x: 51.0489, y: 106.65, z: -77.8274 },
		    { x: 46.8185, y: 111.338, z: -78.2613 },
		    { x: 42.1527, y: 115.326, z: -77.9489 },
		    { x: 36.9653, y: 117.656, z: -77.9048 },
		    { x: 32.2928, y: 119.813, z: -77.9692 },
		    { x: 27.7583, y: 121.453, z: -78.2072 },
		    { x: 23.2678, y: 122.449, z: -77.678 },
		    { x: 21.2823, y: 122.836, z: -77.3847 },
		    { x: 17.5458, y: 122.532, z: -76.9765 },
		    { x: 12.6619, y: 121.258, z: -76.1464 },
		    { x: 7.85267, y: 118.563, z: -74.8851 },
		    { x: 3.72838, y: 114.722, z: -74.0684 },
		    { x: -0.234335, y: 109.317, z: -72.3113 },
		    { x: -3.10875, y: 103.788, z: -70.4872 },
		    { x: -5.1967, y: 98.1557, z: -69.8432 },
		    { x: -6.75534, y: 92.1706, z: -69.7218 },
		    { x: -7.01135, y: 86.2032, z: -70.2811 },
		    { x: -6.97761, y: 79.1457, z: -70.6265 },
		    { x: -6.91772, y: 76.0101, z: -70.1317 },
		    { x: -7.03826, y: 66.1873, z: -69.2002 },
		    { x: -5.8499, y: 61.5641, z: -69.5126 },
		    { x: -5.29623, y: 57.3897, z: -70.0487 },
		    { x: -5.07211, y: 53.8681, z: -70.6039 },
		    { x: -5.03206, y: 52.193, z: -70.7392 },
		    { x: -4.82373, y: 49.3058, z: -70.5532 },
		    { x: -4.14064, y: 47.7183, z: -70.102 },
		    { x: -2.54446, y: 48.0597, z: -68.834 },
		    { x: -1.86521, y: 49.2045, z: -68.1064 },
		    { x: -1.58636, y: 49.574, z: -67.8559 },
		    { x: -1.24045, y: 54.5041, z: -66.2441 },
		    { x: -0.613432, y: 56.6365, z: -66.2765 },
		    { x: -0.0959971, y: 60.3643, z: -67.3134 },
		    { x: 0.506553, y: 65.2991, z: -70.3454 },
		    { x: 0.248154, y: 70.2357, z: -73.6972 },
		    { x: -0.477026, y: 75.0581, z: -75.8527 },
		    { x: -0.561923, y: 77.8265, z: -76.7723 },
		    { x: -1.95148, y: 83.007, z: -77.7341 },
		    { x: -3.69835, y: 87.9836, z: -79.0017 },
		    { x: -5.5913, y: 94.1298, z: -80.0067 },
		    { x: -8.02862, y: 98.9448, z: -80.004 },
		    { x: -10.5552, y: 102.034, z: -79.9298 },
		    { x: -12.8235, y: 104.913, z: -79.7194 },
		    { x: -15.1361, y: 107.479, z: -79.3802 },
		    { x: -17.6088, y: 109.168, z: -78.9615 },
		    { x: -20.7089, y: 110.095, z: -78.4244 },
		    { x: -23.3734, y: 110.062, z: -77.8486 },
		    { x: -26.9726, y: 110.238, z: -76.5411 },
		    { x: -30.4016, y: 109.878, z: -74.4631 },
		    { x: -33.3501, y: 107.893, z: -72.6716 },
		    { x: -34.885, y: 105.743, z: -72.0833 },
		    { x: -38.1918, y: 101.901, z: -70.3736 },
		    { x: -40.9933, y: 95.6841, z: -68.0441 },
		    { x: -42.8428, y: 90.528, z: -67.2986 },
		    { x: -45.1945, y: 84.114, z: -64.4847 },
		    { x: -45.8909, y: 79.3509, z: -62.0973 },
		    { x: -45.5924, y: 73.9695, z: -62.4723 },
		    { x: -46.2116, y: 69.42, z: -63.2025 },
		    { x: -45.9026, y: 65.0674, z: -63.879 },
		    { x: -46.7134, y: 60.4156, z: -65.8516 },
		    { x: -45.6368, y: 56.7291, z: -67.5664 },
		    { x: -45.251, y: 54.4219, z: -68.1407 },
		    { x: -45.122, y: 53.3897, z: -68.386 },
		    { x: -45.2856, y: 51.8317, z: -68.5715 },
		    { x: -45.3532, y: 50.7729, z: -68.6263 },
		    { x: -44.8292, y: 49.0485, z: -68.7354 },
		    { x: -44.1694, y: 47.3305, z: -68.7044 },
		    { x: -43.6508, y: 46.2262, z: -68.7206 },
		    { x: -44.3122, y: 45.4283, z: -69.0685 },
		    { x: -45.9353, y: 45.4167, z: -69.7118 },
		    { x: -48.2429, y: 46.6819, z: -69.8598 },
		    { x: -51.4231, y: 48.0187, z: -69.8374 },
		    { x: -54.1783, y: 50.0075, z: -69.0998 },
		    { x: -57.4843, y: 51.3684, z: -66.9559 },
		    { x: -60.5702, y: 51.5189, z: -64.5248 },
		    { x: -63.2296, y: 52.1824, z: -61.5585 },
		    { x: -66.6546, y: 52.5453, z: -60.5428 },
		    { x: -76.6132, y: 52.7512, z: -60.8217 },
		    { x: -79.3579, y: 57.8792, z: -51.1674 },
		    { x: -82.4832, y: 62.7241, z: -46.7705 },
		    { x: -85.8027, y: 63.4993, z: -44.8534 },
		    { x: -89.7929, y: 63.9835, z: -42.7157 },
		    { x: -94.4323, y: 64.2501, z: -41.4448 },
		    { x: -98.2288, y: 64.0493, z: -40.3644 },
		    { x: -109.446, y: 64.2836, z: -35.8675 },
		    { x: -110.952, y: 62.6844, z: -32.8058 },
		    { x: -110.965, y: 59.7634, z: -29.7826 },
		    { x: -109.58, y: 59.168, z: -25.3716 },
		    { x: -110.826, y: 59.9899, z: -23.6033 },
		    { x: -117.682, y: 61.768, z: -29.6027 },
		    { x: -122.905, y: 63.0018, z: -30.4916 },
		    { x: -126.117, y: 63.1485, z: -30.6911 },
		    { x: -128.768, y: 61.5732, z: -29.9666 },
		    { x: -141.401, y: 67.743, z: -32.0506 },
		    { x: -145.95, y: 69.9792, z: -37.5504 },
		    { x: -136.736, y: 62.7556, z: -45.2782 },
		    { x: -131.437, y: 57.8147, z: -47.3852 },
		    { x: -128.679, y: 53.0378, z: -48.0588 },
		    { x: -127.432, y: 52.473, z: -47.8239 },
		    { x: -127.333, y: 51.8987, z: -46.755 },
		    { x: -139.217, y: 53.7077, z: -38.961 },
		    { x: -154.47, y: 58.1993, z: -32.5204 },
		    { x: -180.555, y: 68.6949, z: -20.0403 } ]
    },
    {
	"name": "5",
	"points": [ { x: -79.4077, y: 53.3224, z: -50.6046 },
		    { x: -79.3446, y: 53.4074, z: -50.6101 },
		    { x: -79.3193, y: 53.451, z: -50.5993 },
		    { x: -79.3883, y: 53.5611, z: -50.5053 },
		    { x: -79.659, y: 53.6821, z: -50.172 },
		    { x: -80.0106, y: 53.9157, z: -49.7295 },
		    { x: -80.1831, y: 54.0586, z: -49.4939 },
		    { x: -80.4054, y: 54.3968, z: -49.1917 },
		    { x: -80.4856, y: 54.6211, z: -49.0684 },
		    { x: -80.504, y: 54.7223, z: -49.0315 },
		    { x: -80.5434, y: 54.7909, z: -49.0125 },
		    { x: -80.5606, y: 54.8618, z: -48.9606 },
		    { x: -80.5458, y: 54.901, z: -48.9573 },
		    { x: -80.6256, y: 55.0539, z: -48.9156 },
		    { x: -80.6208, y: 55.1389, z: -48.9844 },
		    { x: -80.3539, y: 55.1974, z: -49.3194 },
		    { x: -80.0266, y: 55.1544, z: -49.5919 },
		    { x: -79.0239, y: 55.3548, z: -50.3368 },
		    { x: -77.4409, y: 55.834, z: -50.8433 },
		    { x: -76.3235, y: 56.1529, z: -50.8656 },
		    { x: -73.7862, y: 56.2567, z: -51.4327 },
		    { x: -70.9344, y: 56.4386, z: -52.8474 },
		    { x: -68.967, y: 56.5516, z: -53.3989 },
		    { x: -65.1422, y: 57.2422, z: -54.6715 },
		    { x: -60.985, y: 57.907, z: -55.8765 },
		    { x: -56.7669, y: 57.8403, z: -57.3286 },
		    { x: -55.0754, y: 58.5061, z: -57.9613 },
		    { x: -51.3564, y: 59.2676, z: -59.7542 },
		    { x: -47.6761, y: 58.8569, z: -61.8787 },
		    { x: -45.5808, y: 58.4692, z: -62.9012 },
		    { x: -40.4765, y: 58.3087, z: -62.5596 },
		    { x: -36.1887, y: 56.8775, z: -62.9707 },
		    { x: -34.4031, y: 56.8271, z: -63.3673 },
		    { x: -29.5597, y: 57.2962, z: -65.8309 },
		    { x: -26.0837, y: 55.9364, z: -66.3148 },
		    { x: -23.9289, y: 55.433, z: -65.8835 },
		    { x: -20.1243, y: 55.0274, z: -63.3096 },
		    { x: -15.8897, y: 56.2495, z: -57.7479 },
		    { x: -13.9786, y: 55.5302, z: -56.9483 },
		    { x: -13.1106, y: 54.8837, z: -56.4702 },
		    { x: -11.2295, y: 53.6025, z: -55.759 },
		    { x: -9.49, y: 51.7756, z: -55.2132 },
		    { x: -8.79634, y: 50.7256, z: -54.8099 },
		    { x: -7.99408, y: 48.4049, z: -53.3079 },
		    { x: -7.97176, y: 46.0502, z: -52.1199 },
		    { x: -7.16828, y: 44.0147, z: -51.3489 },
		    { x: -6.88915, y: 42.8406, z: -50.4907 },
		    { x: -6.54985, y: 41.1031, z: -49.3499 },
		    { x: -6.56768, y: 38.9333, z: -47.9585 },
		    { x: -6.75143, y: 37.8144, z: -46.6625 },
		    { x: -7.51541, y: 36.2902, z: -43.7326 },
		    { x: -8.09215, y: 35.6021, z: -42.1924 },
		    { x: -9.67318, y: 34.8424, z: -40.7264 },
		    { x: -10.8047, y: 34.3103, z: -39.7958 },
		    { x: -12.8652, y: 33.7609, z: -38.4582 },
		    { x: -15.1778, y: 33.2398, z: -36.6551 },
		    { x: -16.1261, y: 33.2833, z: -36.061 },
		    { x: -19.4397, y: 33.2768, z: -34.3904 },
		    { x: -22.9578, y: 33.5887, z: -33.0436 },
		    { x: -24.9456, y: 33.8876, z: -32.6512 },
		    { x: -28.9943, y: 34.2749, z: -31.992 },
		    { x: -31.8591, y: 34.9473, z: -31.7713 },
		    { x: -34.869, y: 35.745, z: -31.4638 },
		    { x: -36.0956, y: 36.0043, z: -31.0635 },
		    { x: -38.252, y: 36.5712, z: -30.639 },
		    { x: -41.8292, y: 36.8092, z: -30.1989 },
		    { x: -43.2711, y: 36.8262, z: -30.1627 },
		    { x: -48.2801, y: 37.2232, z: -32.8102 },
		    { x: -49.9214, y: 37.473, z: -34.152 },
		    { x: -51.3242, y: 37.9526, z: -36.5693 },
		    { x: -53.1635, y: 39.8564, z: -39.9382 },
		    { x: -54.1908, y: 41.7929, z: -40.6051 },
		    { x: -54.9949, y: 46.9734, z: -41.3947 },
		    { x: -54.9702, y: 48.8692, z: -42.4559 },
		    { x: -53.8982, y: 52.4114, z: -44.0827 },
		    { x: -53.2983, y: 57.6801, z: -45.9429 },
		    { x: -52.6286, y: 59.9855, z: -46.7303 },
		    { x: -50.722, y: 63.7412, z: -48.7699 },
		    { x: -50.722, y: 63.7412, z: -48.7699 },
		    { x: -47.8849, y: 75.2707, z: -60.252 },
		    { x: -46.9023, y: 77.7046, z: -62.1912 },
		    { x: -43.8448, y: 80.3891, z: -64.7384 },
		    { x: -41.628, y: 81.4355, z: -66.5038 },
		    { x: -36.8018, y: 83.9964, z: -69.732 },
		    { x: -32.4253, y: 86.1058, z: -72.3813 },
		    { x: -28.0471, y: 86.9187, z: -74.8422 },
		    { x: -25.9115, y: 87.587, z: -75.9239 },
		    { x: -21.0788, y: 88.397, z: -78.3712 },
		    { x: -15.7893, y: 88.724, z: -80.0598 },
		    { x: -12.8957, y: 88.5344, z: -81.1249 },
		    { x: -7.37823, y: 87.3982, z: -81.9749 },
		    { x: -2.2465, y: 86.9422, z: -82.4096 },
		    { x: 3.77119, y: 87.0301, z: -81.7295 },
		    { x: 6.45704, y: 86.6943, z: -81.5852 },
		    { x: 11.978, y: 86.9751, z: -81.2322 },
		    { x: 16.7925, y: 84.8334, z: -81.7728 },
		    { x: 20.0497, y: 83.1944, z: -82.2855 },
		    { x: 25.8277, y: 81.1956, z: -82.4611 },
		    { x: 32.111, y: 78.7428, z: -82.2306 },
		    { x: 35.197, y: 77.3158, z: -81.516 },
		    { x: 40.4325, y: 74.6695, z: -79.9298 },
		    { x: 45.5619, y: 73.8924, z: -77.8728 },
		    { x: 51.9285, y: 73.8938, z: -75.4619 },
		    { x: 54.7225, y: 72.9725, z: -73.8057 },
		    { x: 61.1619, y: 73.83, z: -68.2403 },
		    { x: 66.3869, y: 74.6318, z: -67.7188 },
		    { x: 68.0267, y: 74.7582, z: -67.5451 },
		    { x: 71.8802, y: 74.4797, z: -66.7115 },
		    { x: 73.5299, y: 74.3801, z: -66.3813 },
		    { x: 74.6818, y: 73.687, z: -65.2969 },
		    { x: 76.0194, y: 72.8379, z: -64.0391 },
		    { x: 76.3111, y: 71.8191, z: -63.1828 },
		    { x: 76.1903, y: 70.7391, z: -62.7233 },
		    { x: 75.8015, y: 70.1453, z: -62.4997 },
		    { x: 75.4315, y: 68.8789, z: -61.8683 },
		    { x: 72.0959, y: 65.6428, z: -59.9241 },
		    { x: 70.3159, y: 64.9303, z: -59.2593 },
		    { x: 67.5603, y: 63.1187, z: -58.2828 },
		    { x: 65.2677, y: 62.1099, z: -57.1875 },
		    { x: 60.7805, y: 59.7478, z: -56.1448 },
		    { x: 56.2435, y: 57.9311, z: -54.214 },
		    { x: 51.5723, y: 56.1766, z: -53.6197 },
		    { x: 48.3728, y: 55.1838, z: -53.0187 },
		    { x: 46.3283, y: 54.474, z: -52.7346 },
		    { x: 42.4584, y: 52.5055, z: -51.9723 },
		    { x: 39.1603, y: 51.9422, z: -51.0804 },
		    { x: 36.5096, y: 50.6904, z: -50.5419 },
		    { x: 31.6481, y: 47.6134, z: -49.9642 },
		    { x: 28.0105, y: 46.826, z: -49.3799 },
		    { x: 26.3859, y: 46.6499, z: -49.1948 },
		    { x: 23.3189, y: 46.2158, z: -49.3854 },
		    { x: 19.842, y: 46.0155, z: -50.0502 },
		    { x: 17.0542, y: 46.3395, z: -50.7615 },
		    { x: 15.2089, y: 46.6017, z: -51.917 },
		    { x: 12.1014, y: 47.5194, z: -54.2099 },
		    { x: 9.53476, y: 48.2768, z: -55.4918 },
		    { x: 8.50418, y: 48.5881, z: -55.9471 },
		    { x: 5.45529, y: 49.2956, z: -57.4222 },
		    { x: 3.40848, y: 48.4486, z: -59.31 },
		    { x: 2.81181, y: 49.1504, z: -59.7663 },
		    { x: 1.54113, y: 50.8016, z: -60.657 },
		    { x: 0.473556, y: 51.7516, z: -62.5656 },
		    { x: 2.26765, y: 53.8536, z: -66.5135 },
		    { x: 4.30911, y: 56.6589, z: -68.9805 },
		    { x: 6.60568, y: 59.9905, z: -71.3163 },
		    { x: 7.85814, y: 61.4982, z: -72.4683 },
		    { x: 10.5301, y: 64.0273, z: -74.7372 },
		    { x: 14.2829, y: 66.9457, z: -77.2855 },
		    { x: 15.693, y: 68.1835, z: -78.1922 },
		    { x: 19.762, y: 71.2398, z: -80.2989 },
		    { x: 24.9092, y: 75.8728, z: -82.4687 },
		    { x: 26.8233, y: 77.4745, z: -83.0902 },
		    { x: 26.8233, y: 77.4745, z: -83.0902 },
		    { x: 37.0066, y: 82.6643, z: -84.7606 },
		    { x: 39.6356, y: 83.4957, z: -84.8679 },
		    { x: 45.6018, y: 85.5425, z: -84.1608 },
		    { x: 51.773, y: 86.896, z: -84.2374 },
		    { x: 57.3125, y: 87.0869, z: -83.4546 },
		    { x: 59.9339, y: 87.0579, z: -83.0806 },
		    { x: 65.534, y: 86.4384, z: -81.997 },
		    { x: 71.6467, y: 85.9353, z: -81.3088 },
		    { x: 74.4863, y: 85.2878, z: -80.866 },
		    { x: 80.9217, y: 84.225, z: -80.6132 },
		    { x: 87.4503, y: 83.3674, z: -80.1859 },
		    { x: 93.6736, y: 82.7098, z: -78.5903 },
		    { x: 96.7721, y: 82.175, z: -77.9465 },
		    { x: 102.286, y: 82.1279, z: -76.8818 },
		    { x: 108.807, y: 81.0219, z: -78.9879 },
		    { x: 111.85, y: 80.3796, z: -78.494 },
		    { x: 116.775, y: 79.9792, z: -77.1354 },
		    { x: 121.77, y: 78.7458, z: -76.5411 },
		    { x: 124.392, y: 77.8515, z: -75.3947 },
		    { x: 128.822, y: 77.8651, z: -72.2067 },
		    { x: 132.836, y: 77.3298, z: -67.9326 },
		    { x: 135.321, y: 76.3474, z: -64.9497 },
		    { x: 135.671, y: 75.7154, z: -64.2781 },
		    { x: 135.847, y: 74.5993, z: -63.4266 },
		    { x: 134.223, y: 71.7672, z: -66.3248 },
		    { x: 135.42, y: 71.3772, z: -67.0808 },
		    { x: 144.605, y: 40.1277, z: -19.7135 },
		    { x: 152.72, y: 37.5434, z: -18.4134 },
		    { x: 155.762, y: 38.4838, z: -19.0305 },
		    { x: 157.025, y: 38.5155, z: -18.8289 },
		    { x: 158.972, y: 38.8375, z: -19.328 },
		    { x: 159.468, y: 39.97, z: -20.6884 },
		    { x: 159.917, y: 40.0403, z: -20.6147 },
		    { x: 160.318, y: 40.111, z: -19.9513 },
		    { x: 161.259, y: 42.0327, z: -20.2775 },
		    { x: 162.13, y: 41.5717, z: -19.3712 },
		    { x: 166.693, y: 43.0166, z: -17.8864 },
		    { x: 167.79, y: 45.2215, z: -20.0591 },
		    { x: 167.243, y: 49.181, z: -26.0414 },
		    { x: 166.743, y: 52.0377, z: -32.7253 },
		    { x: 167.544, y: 51.6948, z: -33.9987 },
		    { x: 165.007, y: 53.4777, z: -37.2105 },
		    { x: 164.288, y: 53.902, z: -37.8728 },
		    { x: 160.133, y: 51.2654, z: -37.0749 },
		    { x: 158.356, y: 49.8361, z: -36.8886 },
		    { x: 157.727, y: 49.8479, z: -37.1915 },
		    { x: 157.14, y: 49.8553, z: -37.5094 },
		    { x: 156.776, y: 49.9188, z: -37.8714 },
		    { x: 156.882, y: 48.9631, z: -36.7971 },
		    { x: 156.837, y: 48.9107, z: -36.5313 },
		    { x: 158.73, y: 47.5466, z: -33.6347 },
		    { x: 158.79, y: 49.5829, z: -33.5394 },
		    { x: 158.849, y: 50.6596, z: -33.5182 },
		    { x: 158.828, y: 51.1086, z: -33.2418 },
		    { x: 158.471, y: 49.8814, z: -31.482 },
		    { x: 158.416, y: 49.2326, z: -30.3818 },
		    { x: 158.182, y: 49.097, z: -29.7739 },
		    { x: 156.75, y: 48.2212, z: -29.8297 },
		    { x: 156.485, y: 48.6863, z: -30.4725 },
		    { x: 155.668, y: 51.1285, z: -33.5974 },
		    { x: 155.276, y: 52.1742, z: -35.0104 },
		    { x: 155.399, y: 54.4092, z: -38.8656 },
		    { x: 155.526, y: 55.4125, z: -40.7983 },
		    { x: 155.645, y: 56.6215, z: -42.6084 },
		    { x: 155.315, y: 57.5863, z: -44.1508 },
		    { x: 154.948, y: 58.0395, z: -45.2511 },
		    { x: 154.601, y: 59.1931, z: -46.5975 },
		    { x: 154.16, y: 60.8239, z: -47.973 },
		    { x: 153.478, y: 61.9735, z: -49.8941 },
		    { x: 153.476, y: 62.1684, z: -51.1406 },
		    { x: 153.86, y: 62.0478, z: -52.6925 },
		    { x: 153.932, y: 62.2054, z: -53.6727 },
		    { x: 153.854, y: 62.1534, z: -54.0108 },
		    { x: 153.779, y: 61.8553, z: -54.1989 },
		    { x: 153.45, y: 61.9267, z: -54.3939 },
		    { x: 153.362, y: 61.9485, z: -54.4427 },
		    { x: 153.136, y: 62.119, z: -54.6359 },
		    { x: 152.995, y: 62.3409, z: -54.9033 },
		    { x: 152.569, y: 63.5348, z: -55.3772 },
		    { x: 152.415, y: 63.8882, z: -55.5474 },
		    { x: 151.811, y: 64.3188, z: -55.6914 },
		    { x: 151.36, y: 64.7215, z: -55.7461 },
		    { x: 151.166, y: 64.9545, z: -55.7686 },
		    { x: 151.145, y: 65.4737, z: -55.291 },
		    { x: 150.467, y: 66.6726, z: -54.3861 },
		    { x: 150.533, y: 66.7606, z: -54.1824 },
		    { x: 150.103, y: 66.3003, z: -53.8846 },
		    { x: 148.305, y: 65.3636, z: -53.8362 },
		    { x: 147.083, y: 65.3506, z: -53.9807 },
		    { x: 146.937, y: 65.0909, z: -53.9084 },
		    { x: 146.744, y: 65.059, z: -53.7928 },
		    { x: 146.707, y: 65.0807, z: -53.7631 },
		    { x: 146.414, y: 65.1907, z: -53.9035 },
		    { x: 145.865, y: 65.0724, z: -53.8906 },
		    { x: 145.256, y: 64.762, z: -53.5969 },
		    { x: 144.881, y: 64.3502, z: -53.4084 },
		    { x: 144.403, y: 63.8069, z: -53.1922 },
		    { x: 144.199, y: 63.6155, z: -53.0063 },
		    { x: 144.419, y: 63.2206, z: -52.7635 },
		    { x: 144.898, y: 62.8348, z: -52.4885 },
		    { x: 145.508, y: 63.1365, z: -51.4988 },
		    { x: 145.357, y: 63.046, z: -51.2857 },
		    { x: 145.124, y: 62.9787, z: -51.0305 },
		    { x: 147.791, y: 61.5621, z: -53.0735 },
		    { x: 148.859, y: 61.3106, z: -54.4537 },
		    { x: 149.637, y: 61.4724, z: -55.3418 },
		    { x: 189.183, y: 110.713, z: 14.9502 },
		    { x: 189.638, y: 106.395, z: 15.996 },
		    { x: 189.965, y: 103.443, z: 15.6064 },
		    { x: 190.445, y: 104.498, z: 14.9585 },
		    { x: 191.133, y: 105.012, z: 14.8377 },
		    { x: 191.581, y: 106.577, z: 14.8509 },
		    { x: 192.303, y: 108.347, z: 14.3928 },
		    { x: 192.774, y: 110.521, z: 14.1576 },
		    { x: 192.745, y: 109.82, z: 14.2381 },
		    { x: 192.681, y: 110.182, z: 14.1473 },
		    { x: 192.566, y: 110.325, z: 13.8946 },
		    { x: 192.547, y: 110.12, z: 13.8152 },
		    { x: 192.568, y: 108.956, z: 13.9966 },
		    { x: 192.634, y: 106.599, z: 14.3508 },
		    { x: 193.072, y: 106.886, z: 14.1006 },
		    { x: 193.124, y: 107.276, z: 14.1249 },
		    { x: 193.571, y: 107.079, z: 14.0266 },
		    { x: 193.808, y: 106.692, z: 13.9374 },
		    { x: 193.68, y: 107.637, z: 14.0762 },
		    { x: 193.61, y: 108.503, z: 14.2351 } ]
    },
    {
	"name": "5'",
	"points": [ { x: 106.613, y: 57.5143, z: -99.4655 },
		    { x: 106.719, y: 57.5731, z: -99.4291 },
		    { x: 106.945, y: 58.124, z: -99.4593 },
		    { x: 107.069, y: 58.3967, z: -99.4692 },
		    { x: 107.102, y: 58.5826, z: -99.418 },
		    { x: 107.263, y: 58.7192, z: -99.3451 },
		    { x: 107.377, y: 58.7563, z: -99.2146 },
		    { x: 107.384, y: 58.7385, z: -99.1892 },
		    { x: 107.404, y: 58.7385, z: -99.1667 },
		    { x: 107.427, y: 58.7085, z: -99.137 },
		    { x: 107.607, y: 58.869, z: -99.1723 },
		    { x: 107.656, y: 58.8883, z: -99.1925 },
		    { x: 107.573, y: 58.9435, z: -99.2219 },
		    { x: 107.348, y: 59.0112, z: -99.3097 },
		    { x: 107.217, y: 59.0615, z: -99.3135 },
		    { x: 106.356, y: 58.5497, z: -99.1703 },
		    { x: 105.734, y: 58.6192, z: -99.1409 },
		    { x: 105.202, y: 58.8026, z: -99.1519 },
		    { x: 103.226, y: 58.8012, z: -98.9239 },
		    { x: 100.772, y: 58.1999, z: -98.3578 },
		    { x: 98.9335, y: 58.6612, z: -98.1116 },
		    { x: 97.6802, y: 59.0805, z: -98.3292 },
		    { x: 96.9715, y: 62.9741, z: -99.6455 },
		    { x: 95.3581, y: 65.9678, z: -102.283 },
		    { x: 94.2511, y: 66.8243, z: -103.347 },
		    { x: 87.6032, y: 64.3946, z: -102.003 },
		    { x: 83.9148, y: 65.2779, z: -101.06 },
		    { x: 81.6266, y: 65.7791, z: -101.351 },
		    { x: 77.7879, y: 65.1637, z: -101.345 },
		    { x: 74.1671, y: 66.2212, z: -102.15 },
		    { x: 71.0953, y: 64.1559, z: -102.575 },
		    { x: 66.438, y: 62.6988, z: -106.264 },
		    { x: 63.4804, y: 63.299, z: -109.135 },
		    { x: 60.3657, y: 65.9938, z: -107.916 },
		    { x: 59.0789, y: 66.5725, z: -108.547 },
		    { x: 56.7329, y: 67.7361, z: -108.534 },
		    { x: 53.7295, y: 68.3048, z: -108.095 },
		    { x: 52.0323, y: 68.0706, z: -107.869 },
		    { x: 48.7391, y: 67.0153, z: -107.16 },
		    { x: 44.3619, y: 65.8143, z: -106.822 },
		    { x: 42.1861, y: 64.8656, z: -106.613 },
		    { x: 37.5951, y: 63.4708, z: -105.957 },
		    { x: 33.3228, y: 62.5053, z: -103.744 },
		    { x: 29.4946, y: 62.9635, z: -102.394 },
		    { x: 27.8904, y: 63.1179, z: -101.621 },
		    { x: 23.0542, y: 60.5063, z: -99.4244 },
		    { x: 18.5192, y: 56.6529, z: -97.2221 },
		    { x: 17.1061, y: 56.0887, z: -96.363 },
		    { x: 11.8446, y: 53.3386, z: -93.5286 },
		    { x: 9.29506, y: 53.3428, z: -91.1121 },
		    { x: 8.24075, y: 52.7764, z: -90.2611 },
		    { x: 5.22695, y: 53.4783, z: -87.0327 },
		    { x: 3.1702, y: 52.9878, z: -84.0529 },
		    { x: 1.89343, y: 51.2555, z: -82.6557 },
		    { x: 1.36957, y: 50.2788, z: -81.7259 },
		    { x: 1.0238, y: 48.3385, z: -79.8926 },
		    { x: 0.571126, y: 46.2773, z: -77.7278 },
		    { x: 0.42862, y: 45.2669, z: -76.861 },
		    { x: -0.139143, y: 44.7673, z: -75.1451 },
		    { x: -1.03322, y: 44.5562, z: -73.5915 },
		    { x: -0.699778, y: 44.4608, z: -72.7588 },
		    { x: -0.609519, y: 42.778, z: -71.3493 },
		    { x: 0.0819411, y: 41.2067, z: -70.4924 },
		    { x: 1.40828, y: 39.2129, z: -70.2425 },
		    { x: 2.45564, y: 37.9041, z: -70.2486 },
		    { x: 6.09931, y: 35.2006, z: -70.181 },
		    { x: 10.607, y: 33.5977, z: -69.9518 },
		    { x: 14.5699, y: 32.4992, z: -69.13 },
		    { x: 14.5699, y: 32.4992, z: -69.13 },
		    { x: 25.4301, y: 30.2955, z: -69.753 },
		    { x: 27.6284, y: 30.061, z: -70.1721 },
		    { x: 32.1486, y: 29.6539, z: -70.9177 },
		    { x: 36.2085, y: 28.7, z: -71.2942 },
		    { x: 40.3006, y: 28.4445, z: -71.6752 },
		    { x: 42.3213, y: 28.789, z: -72.0102 },
		    { x: 45.941, y: 29.2991, z: -72.8016 },
		    { x: 50.4957, y: 30.6779, z: -74.5737 },
		    { x: 52.0804, y: 30.8998, z: -75.11 },
		    { x: 54.895, y: 31.3661, z: -76.558 },
		    { x: 58.0995, y: 32.6099, z: -77.3394 },
		    { x: 60.5847, y: 33.9666, z: -77.6069 },
		    { x: 62.8193, y: 36.9879, z: -77.3822 },
		    { x: 64.8691, y: 41.1615, z: -76.3281 },
		    { x: 64.1825, y: 43.7822, z: -76.9291 },
		    { x: 65.3573, y: 46.9839, z: -78.9016 },
		    { x: 65.1714, y: 50.9782, z: -85.5503 },
		    { x: 64.2424, y: 53.0722, z: -88.0035 },
		    { x: 63.3711, y: 54.3114, z: -88.7634 },
		    { x: 61.9751, y: 59.8856, z: -93.4182 },
		    { x: 58.8965, y: 63.4669, z: -98.0926 },
		    { x: 57.1099, y: 64.7207, z: -99.412 },
		    { x: 52.9132, y: 65.626, z: -101.361 },
		    { x: 48.0173, y: 67.2664, z: -102.949 },
		    { x: 42.7386, y: 71.4507, z: -104.436 },
		    { x: 40.0835, y: 73.7329, z: -104.856 },
		    { x: 34.184, y: 76.5761, z: -105.049 },
		    { x: 31.1116, y: 77.4416, z: -105.352 },
		    { x: 24.8941, y: 77.9714, z: -105.599 },
		    { x: 18.2898, y: 77.683, z: -105.178 },
		    { x: 11.1757, y: 77.2558, z: -104.004 },
		    { x: 7.80903, y: 77.8061, z: -103.362 },
		    { x: 1.18267, y: 77.9489, z: -102.18 },
		    { x: -5.50235, y: 79.1487, z: -97.7046 },
		    { x: -8.10589, y: 78.718, z: -95.9727 },
		    { x: -12.8419, y: 75.7231, z: -95.0624 },
		    { x: -18.6378, y: 75.2488, z: -95.7189 },
		    { x: -26.0538, y: 76.7833, z: -96.8401 },
		    { x: -29.0262, y: 76.4312, z: -96.7435 },
		    { x: -34.6045, y: 74.9721, z: -96.1904 },
		    { x: -40.3673, y: 74.5413, z: -94.5136 },
		    { x: -42.2403, y: 74.2462, z: -94.1515 },
		    { x: -45.8904, y: 73.9503, z: -93.2552 },
		    { x: -49.6272, y: 71.9913, z: -92.3367 },
		    { x: -51.5628, y: 70.7853, z: -91.7734 },
		    { x: -55.4165, y: 68.4799, z: -90.5544 },
		    { x: -58.7617, y: 66.3406, z: -89.5738 },
		    { x: -61.9006, y: 65.236, z: -88.1535 },
		    { x: -63.1982, y: 65.5129, z: -87.326 },
		    { x: -64.9566, y: 62.8221, z: -85.8818 },
		    { x: -66.4465, y: 60.584, z: -84.9271 },
		    { x: -67.0884, y: 59.7782, z: -84.4067 },
		    { x: -68.043, y: 57.8781, z: -83.026 },
		    { x: -68.2848, y: 55.3468, z: -80.9584 },
		    { x: -68.5985, y: 54.8079, z: -79.2659 },
		    { x: -69.0372, y: 52.5589, z: -76.7654 },
		    { x: -69.1397, y: 50.5445, z: -74.9142 },
		    { x: -69.7646, y: 47.3861, z: -74.9209 },
		    { x: -69.6528, y: 47.8158, z: -73.6182 },
		    { x: -67.7052, y: 48.4369, z: -72.1454 },
		    { x: -65.669, y: 48.8736, z: -70.7363 },
		    { x: -62.0272, y: 49.2039, z: -68.0206 },
		    { x: -58.6363, y: 51.9198, z: -65.423 },
		    { x: -54.0432, y: 50.5097, z: -64.5413 },
		    { x: -52.2276, y: 49.6026, z: -64.8882 },
		    { x: -46.5764, y: 54.3352, z: -62.8579 },
		    { x: -43.0579, y: 50.9128, z: -61.9071 },
		    { x: -41.403, y: 50.3692, z: -63.4542 },
		    { x: -40.4457, y: 50.0546, z: -64.6557 },
		    { x: -37.245, y: 49.3537, z: -67.7608 },
		    { x: -32.6447, y: 49.9348, z: -71.1492 },
		    { x: -30.3071, y: 50.2057, z: -72.7847 },
		    { x: -25.6554, y: 49.9988, z: -75.6438 },
		    { x: -23.8563, y: 50.4668, z: -77.0349 },
		    { x: -23.8563, y: 50.4668, z: -77.0349 },
		    { x: -17.2923, y: 53.9884, z: -82.8862 },
		    { x: -15.0981, y: 56.292, z: -86.0758 },
		    { x: -14.5423, y: 57.884, z: -89.8966 },
		    { x: -14.517, y: 58.3838, z: -91.0093 },
		    { x: -14.6191, y: 58.5993, z: -93.6733 },
		    { x: -15.9913, y: 57.7035, z: -96.0941 },
		    { x: -17.3154, y: 57.5251, z: -97.2574 },
		    { x: -20.6959, y: 57.3409, z: -99.8938 },
		    { x: -24.0474, y: 57.6173, z: -101.628 },
		    { x: -26.47, y: 58.835, z: -101.803 },
		    { x: -30.8988, y: 60.1754, z: -102.469 },
		    { x: -34.6372, y: 63.907, z: -104.363 },
		    { x: -40.495, y: 64.3158, z: -104.947 },
		    { x: -45.7472, y: 62.0055, z: -103.803 },
		    { x: -54.3168, y: 56.8139, z: -102.648 },
		    { x: -65.077, y: 54.292, z: -98.4202 },
		    { x: -66.2477, y: 57.3845, z: -99.8502 },
		    { x: -70.5393, y: 61.975, z: -102.503 },
		    { x: -79.6271, y: 61.6183, z: -98.2038 },
		    { x: -72.3947, y: 52.3252, z: -39.0185 },
		    { x: -69.7099, y: 45.7619, z: -35.5654 },
		    { x: -69.9594, y: 44.6388, z: -36.6749 },
		    { x: -71.416, y: 43.8915, z: -35.2567 },
		    { x: -72.5448, y: 43.6843, z: -34.307 },
		    { x: -75.4034, y: 43.2261, z: -32.5742 },
		    { x: -78.731, y: 42.8634, z: -31.4116 },
		    { x: -80.6441, y: 42.7013, z: -30.6522 },
		    { x: -84.1475, y: 42.6361, z: -29.4104 },
		    { x: -87.4613, y: 42.69, z: -28.1342 },
		    { x: -92.8103, y: 44.2509, z: -25.0956 },
		    { x: -94.7452, y: 44.7517, z: -23.9015 },
		    { x: -98.2062, y: 45.7705, z: -22.7506 },
		    { x: -102.085, y: 47.5666, z: -21.5202 },
		    { x: -103.766, y: 48.2858, z: -20.7884 },
		    { x: -107.221, y: 49.7669, z: -18.767 },
		    { x: -110.613, y: 51.7962, z: -16.9099 },
		    { x: -112.228, y: 52.7437, z: -16.1923 },
		    { x: -115.041, y: 54.275, z: -14.9968 },
		    { x: -118.035, y: 56.4895, z: -15.4442 },
		    { x: -119.138, y: 56.6655, z: -15.4694 },
		    { x: -120.288, y: 56.4267, z: -14.9397 },
		    { x: -121.126, y: 56.2971, z: -14.7234 },
		    { x: -125.365, y: 59.4232, z: -21.6274 },
		    { x: -125.054, y: 58.7678, z: -20.9572 },
		    { x: -121.608, y: 80.9437, z: -51.8284 },
		    { x: -128.372, y: 83.8873, z: -59.3655 },
		    { x: -129.456, y: 83.6178, z: -59.2725 },
		    { x: -130.829, y: 82.8465, z: -59.1103 },
		    { x: -131.353, y: 83.4559, z: -59.567 },
		    { x: -132.223, y: 83.8701, z: -60.103 },
		    { x: -132.616, y: 83.6992, z: -60.4528 },
		    { x: -133.92, y: 84.9091, z: -60.6427 },
		    { x: -134.814, y: 85.8532, z: -60.7355 },
		    { x: -135.539, y: 86.6797, z: -60.7236 },
		    { x: -136.769, y: 87.7534, z: -60.6737 },
		    { x: -138.881, y: 89.0667, z: -60.3161 },
		    { x: -139.712, y: 89.4742, z: -60.0313 },
		    { x: -140.853, y: 89.9544, z: -59.8631 },
		    { x: -142.004, y: 90.3952, z: -59.4977 },
		    { x: -142.9, y: 90.6065, z: -59.0163 },
		    { x: -143.331, y: 91.0633, z: -58.666 },
		    { x: -143.792, y: 90.7348, z: -58.168 },
		    { x: -144.257, y: 90.8453, z: -57.6824 },
		    { x: -144.378, y: 90.9023, z: -57.4257 },
		    { x: -144.372, y: 91.1262, z: -57.0801 },
		    { x: -144.281, y: 90.7291, z: -56.816 },
		    { x: -144.209, y: 90.6587, z: -56.7521 },
		    { x: -144.208, y: 90.4675, z: -56.5027 },
		    { x: -143.583, y: 90.4737, z: -56.4959 },
		    { x: -143.04, y: 90.3934, z: -56.4759 },
		    { x: -142.948, y: 90.1406, z: -56.4142 },
		    { x: -143.012, y: 89.5239, z: -56.2515 },
		    { x: -143.028, y: 89.3439, z: -56.0953 },
		    { x: -143.028, y: 89.3439, z: -56.0953 },
		    { x: -142.781, y: 89.2426, z: -56.1051 },
		    { x: -142.385, y: 88.9594, z: -56.2301 },
		    { x: -142.31, y: 88.8311, z: -56.2468 },
		    { x: -142.084, y: 88.708, z: -56.2362 },
		    { x: -141.728, y: 88.5095, z: -56.2187 },
		    { x: -141.027, y: 88.1234, z: -56.2631 },
		    { x: -140.77, y: 87.9593, z: -56.2661 },
		    { x: -140.603, y: 87.5, z: -56.2541 },
		    { x: -140.351, y: 87.0024, z: -56.3184 },
		    { x: -140.22, y: 86.7168, z: -56.3695 },
		    { x: -140.043, y: 87.0618, z: -56.3459 },
		    { x: -139.813, y: 87.2286, z: -56.2147 },
		    { x: -139.644, y: 87.2284, z: -56.16 },
		    { x: -139.355, y: 87.2582, z: -56.0554 },
		    { x: -139.08, y: 87.4057, z: -55.8138 },
		    { x: -138.722, y: 87.356, z: -55.6445 },
		    { x: -138.63, y: 87.3428, z: -55.5438 },
		    { x: -138.286, y: 87.2718, z: -55.2809 },
		    { x: -138.26, y: 87.2998, z: -55.0102 },
		    { x: -138.097, y: 87.2661, z: -54.9086 },
		    { x: -138.053, y: 87.1784, z: -54.7878 },
		    { x: -137.952, y: 86.8325, z: -54.8787 },
		    { x: -137.876, y: 86.6278, z: -54.9417 },
		    { x: -137.755, y: 86.2911, z: -55.0401 },
		    { x: -137.461, y: 85.7267, z: -55.4334 },
		    { x: -137.266, y: 85.2968, z: -55.7131 },
		    { x: -136.998, y: 84.7835, z: -56.024 },
		    { x: -136.934, y: 84.7919, z: -56.1504 },
		    { x: -136.903, y: 84.5982, z: -56.4699 },
		    { x: -136.859, y: 84.4601, z: -56.5392 },
		    { x: -136.809, y: 84.2706, z: -56.6358 },
		    { x: -136.778, y: 84.244, z: -56.6952 },
		    { x: -136.694, y: 83.998, z: -56.97 },
		    { x: -136.999, y: 85.2216, z: -57.0088 },
		    { x: -136.524, y: 85.6866, z: -57.1262 },
		    { x: -136.384, y: 85.7144, z: -57.1773 },
		    { x: -136.015, y: 86.0543, z: -57.379 },
		    { x: -135.624, y: 86.1772, z: -57.3701 },
		    { x: -135.567, y: 86.4149, z: -57.3144 },
		    { x: -135.551, y: 86.3702, z: -57.354 },
		    { x: -135.558, y: 86.402, z: -57.4173 },
		    { x: -135.615, y: 86.788, z: -57.4892 },
		    { x: -135.661, y: 86.9815, z: -57.5202 },
		    { x: -135.729, y: 87.1916, z: -57.6094 },
		    { x: -135.656, y: 86.9864, z: -57.7706 },
		    { x: -135.615, y: 87.0639, z: -57.7985 },
		    { x: -135.521, y: 87.3964, z: -57.8404 },
		    { x: -135.405, y: 87.7533, z: -57.8877 },
		    { x: -135.437, y: 87.9359, z: -57.9163 },
		    { x: -135.456, y: 88.0113, z: -57.9372 },
		    { x: -135.463, y: 88.0029, z: -57.9857 },
		    { x: -135.523, y: 88.0831, z: -58.0228 },
		    { x: -135.572, y: 88.1703, z: -58.041 },
		    { x: -135.642, y: 88.2553, z: -58.0861 },
		    { x: -135.771, y: 88.5792, z: -58.1281 },
		    { x: -135.859, y: 88.8239, z: -58.1731 },
		    { x: -135.998, y: 89.1688, z: -58.2502 } ]
    },
    {
	"name": "6",
	"points": [ { x: -63.9776, y: 101.159, z: -38.8082 },
		    { x: -63.9141, y: 101.306, z: -38.788 },
		    { x: -63.8549, y: 101.488, z: -38.7598 },
		    { x: -63.8196, y: 101.626, z: -38.7108 },
		    { x: -63.8196, y: 101.626, z: -38.7108 },
		    { x: -63.7472, y: 101.761, z: -38.7231 },
		    { x: -63.673, y: 101.86, z: -38.7414 },
		    { x: -63.673, y: 101.86, z: -38.7414 },
		    { x: -63.603, y: 101.937, z: -38.7605 },
		    { x: -63.5243, y: 101.979, z: -38.7879 },
		    { x: -63.5243, y: 101.979, z: -38.7879 },
		    { x: -63.4667, y: 102.009, z: -38.7985 },
		    { x: -63.4458, y: 102.036, z: -38.7859 },
		    { x: -63.4458, y: 102.036, z: -38.7859 },
		    { x: -63.3886, y: 102.092, z: -38.7458 },
		    { x: -63.3016, y: 102.031, z: -38.6846 },
		    { x: -63.3016, y: 102.031, z: -38.6846 },
		    { x: -63.1266, y: 101.861, z: -38.675 },
		    { x: -62.7474, y: 101.51, z: -38.698 },
		    { x: -62.7474, y: 101.51, z: -38.698 },
		    { x: -62.2219, y: 100.985, z: -38.6566 },
		    { x: -60.999, y: 99.7457, z: -38.3083 },
		    { x: -60.999, y: 99.7457, z: -38.3083 },
		    { x: -59.2895, y: 98.2245, z: -37.822 },
		    { x: -57.6907, y: 96.5686, z: -37.8458 },
		    { x: -56.1812, y: 94.2947, z: -38.0197 },
		    { x: -53.8878, y: 92.1203, z: -37.6801 },
		    { x: -51.183, y: 89.7558, z: -37.0184 },
		    { x: -51.183, y: 89.7558, z: -37.0184 },
		    { x: -46.0947, y: 86.2979, z: -35.3195 },
		    { x: -44.2619, y: 84.9698, z: -34.681 },
		    { x: -42.6611, y: 82.5332, z: -34.9676 },
		    { x: -41.1512, y: 80.0093, z: -35.4429 },
		    { x: -39.936, y: 78.4965, z: -35.7505 },
		    { x: -38.7096, y: 77.2062, z: -35.8456 },
		    { x: -37.508, y: 76.0434, z: -35.963 },
		    { x: -35.8337, y: 74.563, z: -35.7542 },
		    { x: -32.3082, y: 71.2411, z: -34.1695 },
		    { x: -31.3085, y: 70.2907, z: -33.5509 },
		    { x: -30.7607, y: 69.7519, z: -33.3332 },
		    { x: -30.1081, y: 68.4832, z: -33.0818 },
		    { x: -28.4495, y: 65.7519, z: -32.7955 },
		    { x: -26.9163, y: 64.1831, z: -32.4841 },
		    { x: -25.3121, y: 62.5842, z: -32.2768 },
		    { x: -24.003, y: 61.196, z: -32.3765 },
		    { x: -22.0844, y: 59.1873, z: -32.2887 },
		    { x: -20.9546, y: 58.3135, z: -32.2611 },
		    { x: -19.9881, y: 57.6539, z: -32.3236 },
		    { x: -19.3461, y: 56.8111, z: -32.4449 },
		    { x: -19.1996, y: 56.4976, z: -32.501 },
		    { x: -19.2463, y: 56.4118, z: -32.5195 },
		    { x: -18.6027, y: 55.5861, z: -32.2752 },
		    { x: -18.6027, y: 55.5861, z: -32.2752 },
		    { x: -16.1465, y: 52.632, z: -30.9304 },
		    { x: -15.4662, y: 51.6929, z: -30.4902 },
		    { x: -14.8437, y: 50.7752, z: -29.9995 },
		    { x: -14.3232, y: 49.9305, z: -29.5089 },
		    { x: -14.4342, y: 49.0328, z: -29.4051 },
		    { x: -13.6779, y: 48.6346, z: -28.7577 },
		    { x: -13.2065, y: 48.7071, z: -28.4252 },
		    { x: -13.0681, y: 48.9691, z: -28.2906 },
		    { x: -13.028, y: 49.276, z: -28.2618 },
		    { x: -13.2813, y: 49.5479, z: -28.2767 },
		    { x: -13.3782, y: 49.9818, z: -28.3511 },
		    { x: -13.4844, y: 50.4271, z: -28.416 },
		    { x: -13.6279, y: 50.9403, z: -28.471 },
		    { x: -13.6748, y: 51.5946, z: -28.5304 },
		    { x: -13.6615, y: 52.3868, z: -28.8434 },
		    { x: -13.8615, y: 52.9218, z: -28.8784 },
		    { x: -13.7633, y: 53.8777, z: -29.655 },
		    { x: -12.9684, y: 55.4845, z: -31.8279 },
		    { x: -12.6859, y: 57.8021, z: -33.2733 },
		    { x: -12.6608, y: 58.6336, z: -33.725 },
		    { x: -12.7824, y: 59.1636, z: -33.9083 },
		    { x: -13.0414, y: 59.5012, z: -34.1099 },
		    { x: -13.3006, y: 59.7662, z: -34.2222 },
		    { x: -13.3006, y: 59.7662, z: -34.2222 },
		    { x: -13.6577, y: 60.0506, z: -34.3145 },
		    { x: -13.8276, y: 60.1101, z: -34.3831 },
		    { x: -14.0477, y: 60.175, z: -34.4859 },
		    { x: -14.2967, y: 60.2868, z: -34.5879 },
		    { x: -14.6872, y: 60.2458, z: -34.7985 },
		    { x: -15.0733, y: 60.1465, z: -35.0064 },
		    { x: -15.4327, y: 60.0829, z: -35.1609 },
		    { x: -15.6756, y: 60.1834, z: -35.2151 },
		    { x: -15.8889, y: 60.3491, z: -35.2695 },
		    { x: -16.0816, y: 60.4828, z: -35.3616 },
		    { x: -16.0816, y: 60.4828, z: -35.3616 },
		    { x: -16.2605, y: 60.6308, z: -35.4875 },
		    { x: -16.4087, y: 60.9078, z: -35.618 },
		    { x: -16.5615, y: 61.1871, z: -35.7507 },
		    { x: -16.7561, y: 61.4562, z: -35.8316 },
		    { x: -16.7561, y: 61.4562, z: -35.8316 },
		    { x: -16.959, y: 61.6865, z: -35.8814 },
		    { x: -17.1553, y: 61.9376, z: -35.9152 },
		    { x: -17.1553, y: 61.9376, z: -35.9152 },
		    { x: -17.3447, y: 62.2001, z: -35.9394 },
		    { x: -17.5563, y: 62.4453, z: -35.9428 },
		    { x: -17.7553, y: 62.691, z: -35.9508 },
		    { x: -17.7553, y: 62.691, z: -35.9508 },
		    { x: -17.9215, y: 62.915, z: -35.9541 },
		    { x: -17.9215, y: 62.915, z: -35.9541 },
		    { x: -18.1118, y: 63.2217, z: -35.9805 },
		    { x: -18.1118, y: 63.2217, z: -35.9805 },
		    { x: -18.2077, y: 63.4019, z: -35.9891 },
		    { x: -18.4121, y: 63.5702, z: -35.9469 },
		    { x: -18.5905, y: 63.7668, z: -35.9119 },
		    { x: -18.5905, y: 63.7668, z: -35.9119 },
		    { x: -18.7502, y: 63.9635, z: -35.8763 },
		    { x: -18.9078, y: 64.1096, z: -35.8298 },
		    { x: -18.9078, y: 64.1096, z: -35.8298 },
		    { x: -18.9196, y: 64.3214, z: -35.8153 },
		    { x: -18.9544, y: 64.5227, z: -35.7758 },
		    { x: -18.9544, y: 64.5227, z: -35.7758 },
		    { x: -19.0054, y: 64.7174, z: -35.7205 },
		    { x: -18.6227, y: 65.6423, z: -35.3696 },
		    { x: -18.6227, y: 65.6423, z: -35.3696 },
		    { x: -18.5782, y: 65.901, z: -35.3005 },
		    { x: -18.5881, y: 66.0591, z: -35.2386 },
		    { x: -18.5881, y: 66.0591, z: -35.2386 },
		    { x: -18.5871, y: 66.2347, z: -35.2041 },
		    { x: -18.6006, y: 66.4118, z: -35.1705 },
		    { x: -18.6052, y: 66.5742, z: -35.1505 } ]
    },
    {
	"name": "6'",
	"points": [ { x: 16.8848, y: 40.3609, z: -23.9701 },
		    { x: 16.7535, y: 40.445, z: -23.9742 },
		    { x: 16.6723, y: 40.4916, z: -23.9825 },
		    { x: 16.6186, y: 40.5121, z: -23.9961 },
		    { x: 16.6186, y: 40.5121, z: -23.9961 },
		    { x: 16.5854, y: 40.5297, z: -24.0132 },
		    { x: 16.563, y: 40.537, z: -24.0435 },
		    { x: 16.5544, y: 40.5448, z: -24.0684 },
		    { x: 16.5686, y: 40.5284, z: -24.068 },
		    { x: 16.5686, y: 40.5284, z: -24.068 },
		    { x: 16.5986, y: 40.4965, z: -24.0572 },
		    { x: 16.63, y: 40.4462, z: -24.0433 },
		    { x: 16.63, y: 40.4462, z: -24.0433 },
		    { x: 16.6632, y: 40.4096, z: -24.0245 },
		    { x: 16.7133, y: 40.3625, z: -24.0044 },
		    { x: 16.7344, y: 40.3444, z: -23.9963 },
		    { x: 16.7344, y: 40.3444, z: -23.9963 },
		    { x: 16.648, y: 40.4068, z: -24.0255 },
		    { x: 16.5525, y: 40.4409, z: -24.2015 },
		    { x: 16.5525, y: 40.4409, z: -24.2015 },
		    { x: 16.2046, y: 40.6054, z: -24.7513 },
		    { x: 15.5308, y: 41.0564, z: -25.2449 },
		    { x: 15.5308, y: 41.0564, z: -25.2449 },
		    { x: 14.682, y: 41.9049, z: -26.2283 },
		    { x: 13.2681, y: 43.338, z: -27.5849 },
		    { x: 11.6315, y: 45.3222, z: -29.4976 },
		    { x: 9.9725, y: 47.1297, z: -30.9947 },
		    { x: 8.18144, y: 48.8158, z: -32.3406 },
		    { x: 6.29655, y: 50.6231, z: -33.6949 },
		    { x: 4.56312, y: 52.2425, z: -34.7317 },
		    { x: 2.76385, y: 53.9091, z: -35.8971 },
		    { x: 0.555895, y: 58.3243, z: -38.7002 },
		    { x: -0.929823, y: 59.2197, z: -39.3087 },
		    { x: -1.47794, y: 60.914, z: -40.1248 },
		    { x: -4.54779, y: 63.5853, z: -43.1194 },
		    { x: -6.01896, y: 64.1628, z: -43.8444 },
		    { x: -8.06804, y: 64.7556, z: -43.8956 },
		    { x: -10.0709, y: 65.3377, z: -44.2104 },
		    { x: -11.1884, y: 65.8363, z: -44.4208 },
		    { x: -13.3842, y: 66.8892, z: -45.1373 },
		    { x: -15.5194, y: 67.713, z: -45.8841 },
		    { x: -17.4575, y: 69.085, z: -46.6668 },
		    { x: -18.5605, y: 69.703, z: -47.1517 },
		    { x: -20.6373, y: 71.1108, z: -48.25 },
		    { x: -22.3892, y: 72.3822, z: -49.1866 },
		    { x: -23.2085, y: 73.1583, z: -49.4855 },
		    { x: -24.9333, y: 73.9848, z: -50.2292 },
		    { x: -26.4258, y: 74.8286, z: -50.8975 },
		    { x: -27.1545, y: 75.3808, z: -51.2559 },
		    { x: -28.7856, y: 76.813, z: -52.3584 },
		    { x: -30.7553, y: 77.704, z: -53.3129 },
		    { x: -31.9371, y: 77.9213, z: -53.7021 },
		    { x: -33.1739, y: 78.009, z: -54.1446 },
		    { x: -35.8559, y: 78.5608, z: -54.6517 },
		    { x: -37.2329, y: 79.2864, z: -54.6918 },
		    { x: -38.7037, y: 79.857, z: -55.1998 },
		    { x: -40.4209, y: 81.1816, z: -55.6038 },
		    { x: -41.9229, y: 84.2739, z: -55.4127 },
		    { x: -43.2009, y: 84.6211, z: -55.4607 },
		    { x: -44.5149, y: 84.8597, z: -55.8676 },
		    { x: -46.1803, y: 87.7731, z: -56.5086 },
		    { x: -47.1463, y: 87.2833, z: -57.2353 },
		    { x: -49.1912, y: 89.6201, z: -58.2051 },
		    { x: -50.0338, y: 91.2818, z: -59.2972 },
		    { x: -50.5539, y: 90.6703, z: -60.1185 },
		    { x: -50.8872, y: 90.5123, z: -60.5789 },
		    { x: -51.0433, y: 90.5353, z: -61.1551 },
		    { x: -51.2109, y: 90.5912, z: -61.3644 },
		    { x: -51.2842, y: 90.8316, z: -61.3846 },
		    { x: -51.3753, y: 90.9938, z: -61.3771 },
		    { x: -51.4847, y: 91.0737, z: -61.3648 },
		    { x: -51.6759, y: 90.9364, z: -61.3517 },
		    { x: -51.6818, y: 90.952, z: -61.3127 },
		    { x: -51.6389, y: 90.3421, z: -61.2818 },
		    { x: -51.5493, y: 90.2819, z: -61.1741 },
		    { x: -51.3372, y: 90.2178, z: -61.0274 },
		    { x: -50.8463, y: 90.3974, z: -60.6749 },
		    { x: -50.8463, y: 90.3974, z: -60.6749 },
		    { x: -50.5881, y: 89, z: -60.8915 },
		    { x: -50.5881, y: 89, z: -60.8915 },
		    { x: -50.5881, y: 89, z: -60.8915 },
		    { x: -49.8075, y: 87.1127, z: -61.703 },
		    { x: -49.5945, y: 86.5781, z: -61.9598 },
		    { x: -48.8514, y: 87.7866, z: -61.9179 },
		    { x: -48.8514, y: 87.7866, z: -61.9179 },
		    { x: -48.3121, y: 86.8545, z: -61.9627 },
		    { x: -48.2048, y: 88.0795, z: -61.6152 },
		    { x: -48.1737, y: 89.1062, z: -61.4791 },
		    { x: -48.2017, y: 87.9752, z: -61.8712 },
		    { x: -48.2017, y: 87.9752, z: -61.8712 },
		    { x: -48.1094, y: 87.0158, z: -62.2042 },
		    { x: -48.0376, y: 86.4249, z: -62.4599 },
		    { x: -48.0896, y: 85.8689, z: -62.6122 },
		    { x: -48.1072, y: 85.5348, z: -62.7236 },
		    { x: -48.1466, y: 85.3426, z: -62.7953 },
		    { x: -48.2214, y: 85.1987, z: -62.8477 },
		    { x: -48.2214, y: 85.1987, z: -62.8477 },
		    { x: -48.2972, y: 85.0929, z: -62.8878 },
		    { x: -48.3704, y: 85.0646, z: -62.9274 },
		    { x: -48.4455, y: 85.0676, z: -62.9545 },
		    { x: -48.4625, y: 85.0066, z: -62.9903 },
		    { x: -48.4625, y: 85.0066, z: -62.9903 },
		    { x: -48.4495, y: 84.9227, z: -63.0261 },
		    { x: -48.3898, y: 84.811, z: -63.0831 },
		    { x: -48.2757, y: 84.6831, z: -63.1693 },
		    { x: -48.1904, y: 84.5874, z: -63.2383 },
		    { x: -48.1904, y: 84.5874, z: -63.2383 },
		    { x: -48.1398, y: 84.5308, z: -63.2909 },
		    { x: -48.1282, y: 84.5222, z: -63.3284 },
		    { x: -48.1708, y: 84.5345, z: -63.3405 },
		    { x: -48.1708, y: 84.5345, z: -63.3405 },
		    { x: -48.2472, y: 84.5802, z: -63.3359 },
		    { x: -48.3124, y: 84.6115, z: -63.3719 },
		    { x: -48.3124, y: 84.6115, z: -63.3719 },
		    { x: -48.4441, y: 84.7456, z: -63.3769 },
		    { x: -48.596, y: 84.9497, z: -63.389 },
		    { x: -48.7445, y: 85.2296, z: -63.3745 } ]
    },
    {
	"name": "7",
	"points": [ { x: -85.5092, y: 101.689, z: -46.6896 },
		    { x: -85.5843, y: 101.601, z: -46.6291 },
		    { x: -85.6104, y: 101.606, z: -46.5894 },
		    { x: -85.613, y: 101.605, z: -46.5504 },
		    { x: -85.613, y: 101.605, z: -46.5504 },
		    { x: -85.5477, y: 101.616, z: -46.5203 },
		    { x: -85.3564, y: 101.804, z: -46.3878 },
		    { x: -85.2614, y: 101.763, z: -46.3498 },
		    { x: -85.2614, y: 101.763, z: -46.3498 },
		    { x: -85.1114, y: 101.791, z: -46.2952 },
		    { x: -84.7404, y: 101.716, z: -46.3029 },
		    { x: -84.7404, y: 101.716, z: -46.3029 },
		    { x: -84.1632, y: 101.612, z: -46.1475 },
		    { x: -83.4771, y: 101.233, z: -46.074 },
		    { x: -83.4771, y: 101.233, z: -46.074 },
		    { x: -82.6561, y: 100.726, z: -46.1619 },
		    { x: -80.8458, y: 99.9634, z: -46.3545 },
		    { x: -78.209, y: 97.92, z: -46.7581 },
		    { x: -78.209, y: 97.92, z: -46.7581 },
		    { x: -74.6166, y: 95.0982, z: -47.2643 },
		    { x: -70.8752, y: 91.8398, z: -47.9321 },
		    { x: -66.4481, y: 89.3535, z: -47.4765 },
		    { x: -62.6843, y: 87.2825, z: -46.5117 },
		    { x: -60.2101, y: 84.432, z: -46.1399 },
		    { x: -53.8945, y: 79.0101, z: -44.817 },
		    { x: -53.8945, y: 79.0101, z: -44.817 },
		    { x: -53.8945, y: 79.0101, z: -44.817 },
		    { x: -45.1307, y: 74.3465, z: -39.2238 },
		    { x: -43.5933, y: 73.5215, z: -39.1131 },
		    { x: -42.4082, y: 72.4528, z: -39.259 },
		    { x: -38.6775, y: 68.3412, z: -40.0197 },
		    { x: -36.711, y: 66.3831, z: -40.2752 },
		    { x: -32.2597, y: 62.7827, z: -40.4872 },
		    { x: -29.5525, y: 60.2261, z: -38.7675 },
		    { x: -23.3518, y: 56.8335, z: -36.0886 },
		    { x: -20.5919, y: 55.5249, z: -34.4765 },
		    { x: -16.7489, y: 54.3894, z: -32.7713 },
		    { x: -12.2496, y: 53.572, z: -31.1035 },
		    { x: -10.2994, y: 53.2009, z: -30.5316 },
		    { x: -6.74097, y: 52.3267, z: -29.5629 },
		    { x: -2.76891, y: 51.3747, z: -28.3529 },
		    { x: -0.94607, y: 50.7326, z: -27.9259 },
		    { x: 2.20323, y: 49.4134, z: -27.0126 },
		    { x: 5.42493, y: 47.2885, z: -26.1392 },
		    { x: 7.09844, y: 46.1628, z: -25.7004 },
		    { x: 10.5939, y: 45.1901, z: -25.0979 },
		    { x: 12.5737, y: 45.6967, z: -25.4171 },
		    { x: 16.371, y: 45.7385, z: -23.6568 },
		    { x: 18.3687, y: 43.9894, z: -20.7278 },
		    { x: 19.8687, y: 43.1773, z: -19.9422 },
		    { x: 22.3252, y: 42.4557, z: -19.4199 },
		    { x: 24.5245, y: 41.9144, z: -19.0156 },
		    { x: 25.5892, y: 41.5773, z: -18.7597 },
		    { x: 27.7894, y: 40.843, z: -18.414 },
		    { x: 29.6044, y: 40.1729, z: -17.7244 },
		    { x: 31.4074, y: 39.4177, z: -17.1158 },
		    { x: 32.1182, y: 39.0339, z: -16.9339 },
		    { x: 33.8512, y: 38.4467, z: -16.1548 },
		    { x: 35.3647, y: 37.7997, z: -15.407 },
		    { x: 36.0169, y: 37.4676, z: -15.0567 },
		    { x: 37.2167, y: 36.7772, z: -14.2894 },
		    { x: 38.3185, y: 36.0595, z: -13.5659 },
		    { x: 38.7611, y: 35.8477, z: -13.1622 },
		    { x: 39.5684, y: 35.5147, z: -12.3975 },
		    { x: 39.9339, y: 35.4093, z: -12.0409 } ]
    },
    {
	"name": "7'",
	"points": [ { x: -45.4844, y: 18.6702, z: -11.7634 },
		    { x: -19.4762, y: 44.4766, z: -35.43 },
		    { x: -11.2632, y: 48.4675, z: -40.281 },
		    { x: -10.2727, y: 49.2435, z: -41.0792 },
		    { x: -10.1767, y: 49.9261, z: -41.5931 },
		    { x: -10.6276, y: 51.8328, z: -43.1726 },
		    { x: -12.0202, y: 53.6563, z: -45.1698 },
		    { x: -13.4866, y: 54.0712, z: -46.226 },
		    { x: -15.1733, y: 55.2635, z: -47.1833 },
		    { x: -17.0326, y: 56.6542, z: -47.9644 },
		    { x: -20.2092, y: 63.5948, z: -47.2679 },
		    { x: -21.9987, y: 64.4533, z: -48.5808 },
		    { x: -24.4624, y: 64.0086, z: -49.6895 },
		    { x: -26.3907, y: 64.1536, z: -51.2955 },
		    { x: -28.0642, y: 64.9007, z: -52.736 },
		    { x: -29.6023, y: 65.7189, z: -53.5487 },
		    { x: -31.4171, y: 67.1865, z: -54.1675 },
		    { x: -33.5484, y: 68.7901, z: -55.1742 },
		    { x: -34.6401, y: 69.85, z: -56.0004 },
		    { x: -36.6412, y: 71.815, z: -56.8206 },
		    { x: -37.6648, y: 73.141, z: -57.1331 },
		    { x: -38.7745, y: 74.7272, z: -57.4229 },
		    { x: -41.5184, y: 78.1921, z: -58.6092 },
		    { x: -42.9943, y: 79.671, z: -58.9557 },
		    { x: -46.5316, y: 83.0873, z: -60.3345 },
		    { x: -48.6202, y: 84.4143, z: -61.1635 },
		    { x: -52.9625, y: 88.3042, z: -63.7161 },
		    { x: -54.8253, y: 89.5367, z: -65.4502 },
		    { x: -56.6368, y: 90.9141, z: -66.4106 },
		    { x: -58.7557, y: 92.2595, z: -67.351 },
		    { x: -62.3616, y: 94.7022, z: -67.5421 },
		    { x: -64.8275, y: 96.3097, z: -67.8077 },
		    { x: -67.4916, y: 97.552, z: -68.1436 },
		    { x: -72.0475, y: 102.04, z: -68.6897 },
		    { x: -74.7465, y: 104.005, z: -69.5615 },
		    { x: -77.2558, y: 104.771, z: -70.2313 },
		    { x: -80.1491, y: 106.167, z: -70.3902 },
		    { x: -81.748, y: 106.909, z: -70.5466 },
		    { x: -83.2678, y: 107.526, z: -70.5668 },
		    { x: -86.2251, y: 109.339, z: -71.3553 },
		    { x: -88.4311, y: 110.625, z: -72.1031 },
		    { x: -89.9199, y: 112.028, z: -72.9382 },
		    { x: -92.1978, y: 114.291, z: -74.5544 },
		    { x: -93.167, y: 115.216, z: -75.3724 },
		    { x: -94.2934, y: 116.2, z: -76.3645 },
		    { x: -96.3002, y: 118.341, z: -77.5275 },
		    { x: -97.6107, y: 120.123, z: -77.6947 },
		    { x: -97.9658, y: 117.962, z: -78.271 },
		    { x: -99.153, y: 119.396, z: -78.5037 },
		    { x: -101.735, y: 122.017, z: -80.0816 },
		    { x: -102.923, y: 124.124, z: -80.3065 },
		    { x: -104.256, y: 125.906, z: -80.4242 },
		    { x: -105.419, y: 127.154, z: -80.4578 },
		    { x: -109.295, y: 129.712, z: -81.9372 },
		    { x: -111.302, y: 131.443, z: -82.6286 },
		    { x: -112.542, y: 130.756, z: -83.2258 },
		    { x: -113.867, y: 131.947, z: -83.6108 },
		    { x: -114.395, y: 130.222, z: -83.8758 },
		    { x: -115.968, y: 132.187, z: -83.6016 },
		    { x: -117.156, y: 131.636, z: -83.4592 },
		    { x: -118.383, y: 132.282, z: -83.3261 },
		    { x: -123.043, y: 140.807, z: -83.4296 },
		    { x: -124.062, y: 141.615, z: -83.7034 },
		    { x: -125.261, y: 139.658, z: -84.8478 },
		    { x: -128.879, y: 146.467, z: -84.3199 },
		    { x: -130.848, y: 147.957, z: -84.7867 },
		    { x: -132.193, y: 149.064, z: -85.172 },
		    { x: -134.631, y: 151.731, z: -86.416 },
		    { x: -138.496, y: 157.925, z: -87.1547 },
		    { x: -142.659, y: 163.38, z: -88.3123 },
		    { x: -142.352, y: 163.674, z: -88.2871 },
		    { x: -144.987, y: 166.394, z: -87.1919 },
		    { x: -148.446, y: 174.938, z: -88.2125 },
		    { x: -150.951, y: 177.323, z: -87.1419 },
		    { x: -153.41, y: 181.399, z: -86.1374 },
		    { x: -156.141, y: 183.046, z: -86.281 },
		    { x: -159.358, y: 187.038, z: -86.6562 },
		    { x: -162.396, y: 192.41, z: -86.5119 },
		    { x: -163.055, y: 193.956, z: -87.1814 },
		    { x: -169.922, y: 196.038, z: -87.1707 },
		    { x: -171.173, y: 195.826, z: -87.4904 },
		    { x: -171.173, y: 195.826, z: -87.4904 },
		    { x: -176.668, y: 197.026, z: -86.0811 },
		    { x: -178.101, y: 198.394, z: -86.0696 },
		    { x: -180.904, y: 198.531, z: -85.8284 },
		    { x: -181.398, y: 197.391, z: -86.3227 },
		    { x: -183.58, y: 196.232, z: -86.8484 },
		    { x: -186.72, y: 199.599, z: -85.705 },
		    { x: -187.498, y: 200.107, z: -85.5261 },
		    { x: -189.992, y: 197.92, z: -85.6503 },
		    { x: -190.813, y: 197.141, z: -85.7404 },
		    { x: -193.454, y: 199.983, z: -86.1907 },
		    { x: -194.765, y: 200.055, z: -86.2159 },
		    { x: -195.61, y: 198.288, z: -87.0214 },
		    { x: -195.571, y: 196.795, z: -88.2098 },
		    { x: -195.491, y: 195.065, z: -89.5961 },
		    { x: -195.45, y: 194.265, z: -90.2346 },
		    { x: -195.377, y: 193.875, z: -90.6202 },
		    { x: -194.739, y: 193.696, z: -91.8206 },
		    { x: -194.125, y: 194.683, z: -93.3086 },
		    { x: -194.352, y: 196.016, z: -93.3771 },
		    { x: -194.267, y: 197.344, z: -93.3601 },
		    { x: -193.981, y: 197.771, z: -93.3676 },
		    { x: -193.382, y: 197.953, z: -93.4161 },
		    { x: -192.475, y: 196.611, z: -94.0548 },
		    { x: -191.758, y: 197.088, z: -93.7619 },
		    { x: -190.946, y: 196.782, z: -94.5111 },
		    { x: -190.365, y: 196.566, z: -95.0393 },
		    { x: -189.925, y: 196.405, z: -95.4346 },
		    { x: -189.066, y: 195.972, z: -96.4077 },
		    { x: -188.416, y: 195.651, z: -97.13 },
		    { x: -187.941, y: 195.42, z: -97.6521 },
		    { x: -154.675, y: 145.604, z: -92.6532 },
		    { x: -130.086, y: 128.052, z: -65.0264 },
		    { x: -121.465, y: 123.514, z: -57.038 },
		    { x: -117.413, y: 122.31, z: -54.2516 },
		    { x: -116.407, y: 126.943, z: -44.3505 },
		    { x: -116.483, y: 128.166, z: -42.1588 },
		    { x: -116.492, y: 128.614, z: -41.5535 },
		    { x: -116.534, y: 128.949, z: -41.3378 },
		    { x: -116.553, y: 129.077, z: -41.2717 },
		    { x: -116.668, y: 129.434, z: -41.3011 },
		    { x: -116.957, y: 130.012, z: -41.9721 },
		    { x: -117.03, y: 130.387, z: -42.581 },
		    { x: -117.303, y: 131.124, z: -44.0181 },
		    { x: -117.339, y: 131.374, z: -44.4529 },
		    { x: -117.384, y: 131.697, z: -44.9723 },
		    { x: -117.513, y: 132.018, z: -45.371 },
		    { x: -117.498, y: 132.386, z: -46.0764 },
		    { x: -117.395, y: 132.792, z: -46.7971 },
		    { x: -117.44, y: 132.675, z: -48.8057 },
		    { x: -117.475, y: 132.661, z: -49.3161 },
		    { x: -117.622, y: 132.664, z: -49.8566 },
		    { x: -117.703, y: 132.659, z: -50.0413 },
		    { x: -117.81, y: 132.67, z: -50.2939 },
		    { x: -117.976, y: 132.687, z: -50.4957 },
		    { x: -118.186, y: 132.705, z: -50.6716 },
		    { x: -118.403, y: 132.72, z: -50.8349 },
		    { x: -118.564, y: 132.721, z: -51.0024 },
		    { x: -119.094, y: 132.554, z: -51.6803 },
		    { x: -119.267, y: 132.504, z: -51.8956 },
		    { x: -119.398, y: 132.467, z: -52.0562 },
		    { x: -119.5, y: 132.44, z: -52.1791 },
		    { x: -119.585, y: 132.418, z: -52.2787 },
		    { x: -119.801, y: 132.272, z: -52.5795 },
		    { x: -120.195, y: 132.026, z: -52.9343 } ]
    },
    {
	"name": "8",
	"points": [ { x: -110.137, y: 158.729, z: -65.7815 },
		    { x: -110.137, y: 158.729, z: -65.7815 },
		    { x: -110.07, y: 158.767, z: -65.8038 },
		    { x: -109.996, y: 158.72, z: -65.8401 },
		    { x: -109.996, y: 158.72, z: -65.8401 },
		    { x: -109.933, y: 158.706, z: -65.8703 },
		    { x: -109.882, y: 158.697, z: -65.8958 },
		    { x: -109.882, y: 158.697, z: -65.8958 },
		    { x: -109.829, y: 158.735, z: -65.9105 },
		    { x: -109.782, y: 158.768, z: -65.9249 },
		    { x: -109.735, y: 158.795, z: -65.9406 },
		    { x: -109.735, y: 158.795, z: -65.9406 },
		    { x: -109.684, y: 158.81, z: -65.9598 },
		    { x: -109.63, y: 158.81, z: -65.9806 },
		    { x: -109.63, y: 158.81, z: -65.9806 },
		    { x: -109.58, y: 158.806, z: -65.9995 },
		    { x: -109.548, y: 158.768, z: -66.0057 },
		    { x: -109.548, y: 158.768, z: -66.0057 },
		    { x: -109.492, y: 158.719, z: -66.0189 },
		    { x: -109.097, y: 158.37, z: -66.0252 },
		    { x: -109.097, y: 158.37, z: -66.0252 },
		    { x: -107.96, y: 157.446, z: -65.9552 },
		    { x: -106.227, y: 155.871, z: -66.1945 },
		    { x: -106.227, y: 155.871, z: -66.1945 },
		    { x: -103.91, y: 153.184, z: -67.3414 },
		    { x: -100.956, y: 150.877, z: -68.8985 },
		    { x: -96.935, y: 147.471, z: -70.4326 },
		    { x: -92.6211, y: 144.337, z: -71.4583 },
		    { x: -88.6322, y: 141.318, z: -71.9439 },
		    { x: -84.8233, y: 137.698, z: -71.76 },
		    { x: -78.6788, y: 129.229, z: -72.5475 },
		    { x: -75.8236, y: 125.081, z: -72.5843 },
		    { x: -72.7372, y: 122.135, z: -72.585 },
		    { x: -66.3057, y: 118.197, z: -70.1103 },
		    { x: -64.4689, y: 115.397, z: -69.6647 },
		    { x: -61.8954, y: 109.177, z: -68.9648 },
		    { x: -59.952, y: 102.382, z: -68.1283 },
		    { x: -58.8558, y: 98.7514, z: -67.3739 },
		    { x: -57.1611, y: 90.7868, z: -65.7313 },
		    { x: -56.2046, y: 87.6743, z: -64.8318 },
		    { x: -56.1228, y: 80.9809, z: -60.0111 },
		    { x: -56.0858, y: 75.9532, z: -56.497 },
		    { x: -56.3221, y: 74.2976, z: -55.5775 },
		    { x: -57.8056, y: 70.1901, z: -52.9357 },
		    { x: -59.4895, y: 67.8551, z: -48.5105 },
		    { x: -60.1755, y: 66.8793, z: -47.3725 },
		    { x: -61.8379, y: 65.703, z: -46.0637 },
		    { x: -63.8104, y: 64.5179, z: -44.8861 },
		    { x: -64.8187, y: 64.4646, z: -44.4959 },
		    { x: -68.333, y: 64.4986, z: -45.0687 },
		    { x: -69.7234, y: 64.9291, z: -45.5087 },
		    { x: -72.3508, y: 66.8934, z: -45.6309 },
		    { x: -74.7897, y: 70.2821, z: -45.9373 },
		    { x: -76.9119, y: 74.9254, z: -46.4092 },
		    { x: -78.1163, y: 77.3759, z: -47.3308 },
		    { x: -79.4589, y: 81.782, z: -50.6453 },
		    { x: -80.2715, y: 84.9206, z: -51.3218 },
		    { x: -79.8091, y: 88.8507, z: -53.6815 },
		    { x: -79.1628, y: 90.8976, z: -54.9034 },
		    { x: -78.0968, y: 92.6612, z: -56.7845 },
		    { x: -75.9021, y: 95.9254, z: -60.7491 },
		    { x: -74.5406, y: 96.361, z: -62.5745 },
		    { x: -71.8366, y: 98.5076, z: -65.1621 },
		    { x: -69.7922, y: 98.1084, z: -66.0964 },
		    { x: -68.0923, y: 97.5958, z: -67.0655 },
		    { x: -63.3491, y: 95.3635, z: -69.3049 },
		    { x: -61.0539, y: 94.1631, z: -69.9921 },
		    { x: -54.208, y: 93.0651, z: -70.7235 },
		    { x: -50.6099, y: 93.0795, z: -70.4418 },
		    { x: -47.0392, y: 91.5624, z: -69.5823 },
		    { x: -40.4394, y: 89.3446, z: -67.7096 },
		    { x: -37.4866, y: 87.9765, z: -66.6852 },
		    { x: -32.0063, y: 83.5076, z: -64.3845 },
		    { x: -29.7405, y: 80.9941, z: -62.8718 },
		    { x: -25.2518, y: 75.9204, z: -56.4234 },
		    { x: -23.8891, y: 74.7925, z: -55.2726 },
		    { x: -20.2715, y: 70.7695, z: -54.0364 },
		    { x: -18.5449, y: 67.8084, z: -53.3196 },
		    { x: -15.673, y: 62.2287, z: -51.8641 },
		    { x: -12.8455, y: 56.8153, z: -50.3629 },
		    { x: -11.6101, y: 54.5515, z: -49.3936 },
		    { x: -10.1368, y: 51.4581, z: -47.4491 },
		    { x: -9.38578, y: 49.2634, z: -45.166 },
		    { x: -9.37633, y: 48.4623, z: -44.229 },
		    { x: -9.87954, y: 47.0459, z: -42.5532 },
		    { x: -10.4529, y: 46.493, z: -41.8196 },
		    { x: -12.2018, y: 45.8159, z: -40.4625 },
		    { x: -16.3321, y: 46.4242, z: -37.5618 },
		    { x: -18.2777, y: 46.5668, z: -36.2949 },
		    { x: -22.2209, y: 45.8615, z: -34.4307 },
		    { x: -22.2209, y: 45.8615, z: -34.4307 },
		    { x: -30.7385, y: 46.0588, z: -32.1195 },
		    { x: -32.6677, y: 46.036, z: -31.6617 },
		    { x: -34.9459, y: 46.0251, z: -31.3501 },
		    { x: -40.4685, y: 46.1559, z: -31.5212 },
		    { x: -43.0579, y: 46.319, z: -31.7699 },
		    { x: -45.3386, y: 46.3647, z: -32.0631 },
		    { x: -49.1962, y: 47.2423, z: -33.0065 },
		    { x: -50.9613, y: 48.025, z: -34.1055 },
		    { x: -52.2491, y: 48.7294, z: -35.3856 },
		    { x: -53.1352, y: 48.8224, z: -37.1897 },
		    { x: -53.0131, y: 50.6081, z: -40.1996 },
		    { x: -52.7172, y: 51.4971, z: -41.7853 },
		    { x: -51.9638, y: 52.2469, z: -43.6214 },
		    { x: -49.362, y: 54.21, z: -47.3533 },
		    { x: -47.4477, y: 55.2154, z: -49.2324 },
		    { x: -45.0316, y: 56.2554, z: -51.1767 },
		    { x: -38.8722, y: 58.1091, z: -55.19 },
		    { x: -36.1377, y: 58.3408, z: -56.6164 },
		    { x: -32.8464, y: 58.4328, z: -58.2913 },
		    { x: -29.141, y: 58.6653, z: -58.8113 },
		    { x: -23.0082, y: 56.8429, z: -57.9974 },
		    { x: -21.2003, y: 55.9621, z: -58.2983 },
		    { x: -19.4147, y: 55.6585, z: -58.3482 },
		    { x: -14.4773, y: 54.4318, z: -58.1901 },
		    { x: -11.5156, y: 53.751, z: -57.3571 },
		    { x: -5.65042, y: 51.6628, z: -54.7403 },
		    { x: -3.45253, y: 50.2196, z: -53.6556 },
		    { x: -0.992406, y: 48.9567, z: -51.6446 },
		    { x: 2.76909, y: 46.6586, z: -49.1284 },
		    { x: 4.36474, y: 45.5131, z: -47.4222 },
		    { x: 7.01805, y: 43.1317, z: -44.4915 },
		    { x: 8.14417, y: 41.8718, z: -42.9316 },
		    { x: 10.3211, y: 39.101, z: -39.958 },
		    { x: 11.4391, y: 37.9488, z: -38.5718 },
		    { x: 14.7539, y: 36.6232, z: -36.8762 },
		    { x: 16.9273, y: 36.5577, z: -35.3244 },
		    { x: 17.2026, y: 36.3842, z: -34.8706 },
		    { x: 18.1365, y: 35.7146, z: -33.6216 },
		    { x: 18.6809, y: 35.3104, z: -33.1098 },
		    { x: 19.5985, y: 34.3137, z: -32.3627 },
		    { x: 20.2124, y: 33.671, z: -31.9883 },
		    { x: 21.7532, y: 32.664, z: -31.0531 },
		    { x: 22.7209, y: 32.0233, z: -30.4503 },
		    { x: 24.7422, y: 30.6433, z: -29 },
		    { x: 25.5731, y: 29.8914, z: -28.4806 },
		    { x: 27.092, y: 28.522, z: -27.245 },
		    { x: 27.877, y: 27.7435, z: -26.5113 },
		    { x: 29.6576, y: 26.129, z: -24.2971 },
		    { x: 30.1757, y: 25.5841, z: -23.4515 },
		    { x: 30.5561, y: 24.9013, z: -22.7931 },
		    { x: 31.1583, y: 24.1597, z: -21.0364 },
		    { x: 31.439, y: 24.2215, z: -20.4663 },
		    { x: 31.6318, y: 24.3428, z: -20.112 },
		    { x: 31.9524, y: 24.5706, z: -19.5439 },
		    { x: 32.081, y: 24.6634, z: -19.2282 },
		    { x: 32.246, y: 24.7525, z: -18.9723 },
		    { x: 32.5481, y: 24.8082, z: -18.6128 },
		    { x: 32.792, y: 24.7526, z: -18.3743 },
		    { x: 33.2835, y: 24.629, z: -17.9803 },
		    { x: 33.5974, y: 24.5028, z: -17.6759 },
		    { x: 33.8956, y: 23.5578, z: -17.0956 },
		    { x: 33.9402, y: 23.0112, z: -16.8193 },
		    { x: 32.5896, y: 19.9502, z: -15.3819 },
		    { x: 30.6987, y: 16.2575, z: -13.5129 },
		    { x: 30.6987, y: 16.2575, z: -13.5129 },
		    { x: 29.1965, y: 13.1497, z: -12.0598 } ]
    },
    {
	"name": "8'",
	"points": [ { x: 2.67005, y: 43.5962, z: -51.0118 },
		    { x: 1.16318, y: 43.7258, z: -49.8527 },
		    { x: 0.372104, y: 43.6476, z: -49.3151 },
		    { x: -2.32822, y: 43.759, z: -47.933 },
		    { x: -4.64429, y: 43.7949, z: -46.9022 },
		    { x: -7.04994, y: 43.7394, z: -46.0425 },
		    { x: -9.39222, y: 43.4049, z: -45.1837 },
		    { x: -11.5508, y: 42.6719, z: -44.3497 },
		    { x: -11.5508, y: 42.6719, z: -44.3497 },
		    { x: -13.3242, y: 41.7025, z: -43.6752 },
		    { x: -14.7976, y: 40.8353, z: -43.0821 },
		    { x: -16.0201, y: 39.917, z: -42.5301 },
		    { x: -16.9109, y: 38.8912, z: -42.0764 },
		    { x: -17.5211, y: 37.8514, z: -41.7502 },
		    { x: -18.5067, y: 35.8517, z: -41.136 },
		    { x: -18.9725, y: 34.5459, z: -40.792 },
		    { x: -19.4477, y: 33.5251, z: -40.5131 },
		    { x: -19.9508, y: 32.4347, z: -40.1673 },
		    { x: -20.611, y: 31.3727, z: -39.7016 },
		    { x: -21.2203, y: 30.381, z: -39.1343 },
		    { x: -21.8252, y: 29.3406, z: -38.5294 },
		    { x: -22.4786, y: 28.2664, z: -37.7302 },
		    { x: -23.3124, y: 27.0131, z: -36.5286 },
		    { x: -23.9366, y: 25.6973, z: -35.2958 },
		    { x: -24.3785, y: 24.5286, z: -34.1092 },
		    { x: -24.6863, y: 23.5436, z: -33.3167 },
		    { x: -22.5742, y: 16.3823, z: -30.5788 },
		    { x: -22.0658, y: 15.8103, z: -29.7039 },
		    { x: -21.2175, y: 15.1475, z: -29.295 },
		    { x: -19.1258, y: 13.4519, z: -28.5987 },
		    { x: -18.3743, y: 12.9025, z: -28.2457 },
		    { x: -18.3743, y: 12.9025, z: -28.2457 },
		    { x: -15.3392, y: 11.5846, z: -28.0308 },
		    { x: -14.299, y: 11.2131, z: -28.1495 },
		    { x: -10.8763, y: 10.0475, z: -28.8198 },
		    { x: -9.13981, y: 9.74701, z: -29.34 },
		    { x: -7.30792, y: 9.54312, z: -30.0648 },
		    { x: -3.73283, y: 9.59188, z: -31.9105 },
		    { x: -2.00643, y: 9.8681, z: -33.0458 },
		    { x: 1.26699, y: 10.7368, z: -35.3057 },
		    { x: 2.77297, y: 11.3041, z: -36.6417 },
		    { x: 3.93917, y: 12.0416, z: -37.8787 },
		    { x: 5.49408, y: 13.5965, z: -40.1197 },
		    { x: 5.37066, y: 16.8555, z: -41.771 },
		    { x: 6.01684, y: 20.4441, z: -44.3097 },
		    { x: 9.3482, y: 20.0121, z: -45.5458 },
		    { x: 11.1662, y: 20.5513, z: -46.2516 },
		    { x: 11.6822, y: 21.5745, z: -46.6869 },
		    { x: 13.7345, y: 25.2596, z: -48.851 },
		    { x: 12.3083, y: 27.1084, z: -50.4451 },
		    { x: 10.9071, y: 29.0759, z: -52.0883 },
		    { x: 8.36038, y: 33.4018, z: -54.6525 },
		    { x: 7.05657, y: 35.6033, z: -55.9294 },
		    { x: 5.27483, y: 38.0963, z: -57.3615 },
		    { x: 1.40102, y: 42.4439, z: -60.97 },
		    { x: -0.616151, y: 44.4736, z: -62.0632 },
		    { x: -4.31557, y: 48.1763, z: -63.9626 },
		    { x: -5.29251, y: 50.1816, z: -63.9867 },
		    { x: -3.60772, y: 51.935, z: -64.4282 },
		    { x: -1.54214, y: 59.073, z: -64.6045 },
		    { x: -1.42942, y: 61.7325, z: -65.0954 },
		    { x: -3.09238, y: 67.261, z: -66.5498 },
		    { x: -5.9046, y: 69.8031, z: -67.2821 },
		    { x: -9.24068, y: 70.7617, z: -67.8724 },
		    { x: -13.6336, y: 71.393, z: -68.3437 },
		    { x: -18.1816, y: 72.5949, z: -68.9616 },
		    { x: -20.3689, y: 73.1907, z: -69.1595 },
		    { x: -24.5135, y: 74.3944, z: -69.4625 },
		    { x: -28.3926, y: 75.3915, z: -69.5098 },
		    { x: -32.0513, y: 76.1926, z: -69.1429 },
		    { x: -35.5612, y: 76.4024, z: -68.3162 },
		    { x: -38.8498, y: 76.4278, z: -67.2415 },
		    { x: -42.0703, y: 76.329, z: -66.0107 },
		    { x: -43.5921, y: 76.1634, z: -65.3444 },
		    { x: -46.5827, y: 75.3542, z: -63.8187 },
		    { x: -49.3742, y: 74.4768, z: -62.1427 },
		    { x: -52.408, y: 72.7471, z: -60.0102 },
		    { x: -53.9098, y: 71.3799, z: -58.5266 },
		    { x: -55.2664, y: 69.8525, z: -57.0019 },
		    { x: -57.6584, y: 66.6306, z: -53.7946 },
		    { x: -58.5423, y: 64.979, z: -52.4047 },
		    { x: -59.1066, y: 62.9959, z: -50.8101 },
		    { x: -59.4488, y: 61.1362, z: -49.2302 },
		    { x: -58.9012, y: 56.9141, z: -46.2045 },
		    { x: -58.2292, y: 55.0038, z: -44.7555 },
		    { x: -57.3074, y: 53.2192, z: -43.5894 },
		    { x: -54.5004, y: 49.4499, z: -41.7421 },
		    { x: -52.6808, y: 47.6977, z: -41.0563 },
		    { x: -50.7559, y: 46.034, z: -40.5668 },
		    { x: -46.3888, y: 43.1655, z: -40.1446 },
		    { x: -43.9686, y: 41.734, z: -40.1951 },
		    { x: -41.5033, y: 40.6334, z: -40.5091 },
		    { x: -38.9778, y: 39.7591, z: -41.0944 },
		    { x: -33.6093, y: 38.1162, z: -42.9225 },
		    { x: -30.9382, y: 37.6024, z: -44.0794 },
		    { x: -28.3944, y: 37.404, z: -45.239 },
		    { x: -24.0081, y: 38.1848, z: -47.7462 },
		    { x: -22.0516, y: 39.0868, z: -48.9798 },
		    { x: -20.3046, y: 40.4523, z: -50.5288 },
		    { x: -17.3405, y: 43.2448, z: -54.1431 },
		    { x: -16.2962, y: 44.6241, z: -55.6697 },
		    { x: -15.5006, y: 46.1901, z: -57.1769 },
		    { x: -14.627, y: 49.7783, z: -60.7786 },
		    { x: -14.6934, y: 51.3949, z: -62.526 },
		    { x: -15.0653, y: 53.2629, z: -64.114 },
		    { x: -16.7845, y: 57.1839, z: -67.6978 },
		    { x: -18.113, y: 59.258, z: -69.7887 },
		    { x: -19.6878, y: 60.8992, z: -71.1795 },
		    { x: -23.898, y: 65.1298, z: -74.9738 },
		    { x: -26.293, y: 66.9236, z: -76.4778 },
		    { x: -28.9388, y: 68.5862, z: -77.9991 },
		    { x: -34.5694, y: 71.4208, z: -80.5779 },
		    { x: -37.566, y: 73.0612, z: -82.0329 },
		    { x: -43.8834, y: 76.0567, z: -84.3512 },
		    { x: -46.9966, y: 77.1359, z: -85.877 },
		    { x: -50.1539, y: 78.9293, z: -86.8252 },
		    { x: -57.1518, y: 83.9155, z: -89.7908 },
		    { x: -60.0972, y: 85.9148, z: -90.4002 },
		    { x: -66.7708, y: 89.4124, z: -91.5354 },
		    { x: -66.7708, y: 89.4124, z: -91.5354 },
		    { x: -76.8859, y: 97.8406, z: -92.4591 },
		    { x: -82.3491, y: 104.05, z: -94.1703 },
		    { x: -84.5047, y: 106.03, z: -94.4432 },
		    { x: -88.2648, y: 109.992, z: -93.8572 },
		    { x: -93.0041, y: 115.93, z: -94.1689 },
		    { x: -94.7341, y: 116.893, z: -94.3747 },
		    { x: -98.9683, y: 121.909, z: -94.9907 },
		    { x: -101.024, y: 123.375, z: -95.6377 },
		    { x: -104.541, y: 130.408, z: -94.854 },
		    { x: -108.171, y: 134.876, z: -95.7901 },
		    { x: -109.76, y: 136.711, z: -95.5767 },
		    { x: -112.195, y: 140.158, z: -94.0863 },
		    { x: -114.877, y: 145.912, z: -91.4797 },
		    { x: -115.828, y: 147.418, z: -91.1829 },
		    { x: -117.609, y: 152.48, z: -89.5809 },
		    { x: -119.087, y: 156.795, z: -88.1184 },
		    { x: -119.762, y: 158.754, z: -87.2883 },
		    { x: -120.36, y: 160.865, z: -87.4988 },
		    { x: -120.696, y: 161.152, z: -87.9679 },
		    { x: -120.948, y: 163.24, z: -89.1686 },
		    { x: -120.954, y: 163.832, z: -89.3909 },
		    { x: -121.133, y: 165.08, z: -89.015 },
		    { x: -121.039, y: 165.141, z: -89.0375 },
		    { x: -120.684, y: 165.54, z: -89.2433 },
		    { x: -120.428, y: 165.529, z: -89.635 },
		    { x: -120.087, y: 165.424, z: -90.2381 },
		    { x: -119.682, y: 165.231, z: -90.9782 },
		    { x: -119.387, y: 165.533, z: -90.9874 },
		    { x: -119.033, y: 165.806, z: -91.0398 },
		    { x: -118.322, y: 165.213, z: -91.5371 },
		    { x: -117.953, y: 164.785, z: -91.7673 },
		    { x: -117.286, y: 163.827, z: -91.9073 },
		    { x: -116.828, y: 163.165, z: -91.9585 },
		    { x: -116.396, y: 162.296, z: -92.0096 },
		    { x: -116.01, y: 161.603, z: -91.8898 },
		    { x: -116.01, y: 161.603, z: -91.8898 },
		    { x: -115.68, y: 160.555, z: -91.9883 },
		    { x: -115.405, y: 159.853, z: -91.9789 },
		    { x: -115.251, y: 159.261, z: -91.9923 },
		    { x: -115.13, y: 158.951, z: -91.9231 },
		    { x: -115.014, y: 158.866, z: -91.7398 },
		    { x: -114.899, y: 158.82, z: -91.5637 },
		    { x: -114.899, y: 158.82, z: -91.5637 },
		    { x: -114.773, y: 158.717, z: -91.4373 },
		    { x: -114.664, y: 158.63, z: -91.3555 },
		    { x: -114.561, y: 158.442, z: -91.3019 },
		    { x: -114.493, y: 158.327, z: -91.2126 },
		    { x: -114.493, y: 158.327, z: -91.2126 },
		    { x: -114.434, y: 158.243, z: -91.1124 },
		    { x: -114.374, y: 158.264, z: -90.9371 },
		    { x: -114.334, y: 158.172, z: -90.8022 },
		    { x: -114.311, y: 158.035, z: -90.7202 },
		    { x: -114.311, y: 158.035, z: -90.7202 },
		    { x: -114.292, y: 157.814, z: -90.6876 },
		    { x: -114.306, y: 157.627, z: -90.6354 },
		    { x: -114.336, y: 157.558, z: -90.5688 },
		    { x: -114.336, y: 157.558, z: -90.5688 },
		    { x: -114.414, y: 157.66, z: -90.3455 },
		    { x: -114.521, y: 157.609, z: -90.1646 },
		    { x: -114.521, y: 157.609, z: -90.1646 },
		    { x: -114.62, y: 157.833, z: -90.1041 },
		    { x: -114.7, y: 157.936, z: -90.0688 },
		    { x: -114.7, y: 157.936, z: -90.0688 },
		    { x: -114.802, y: 157.545, z: -89.8496 },
		    { x: -114.676, y: 156.957, z: -89.6945 },
		    { x: -114.632, y: 156.379, z: -89.6005 },
		    { x: -114.632, y: 156.379, z: -89.6005 } ]
    },
    {    "name": "9",
	 "points": [ { x: -98.1576, y: 156.263, z: -30.7876 },
		     { x: -98.1576, y: 156.263, z: -30.7876 },
		     { x: -98.2102, y: 156.251, z: -30.7323 },
		     { x: -98.2785, y: 156.256, z: -30.6766 },
		     { x: -98.4204, y: 156.22, z: -30.5722 },
		     { x: -98.4204, y: 156.22, z: -30.5722 },
		     { x: -98.6216, y: 156.137, z: -30.4205 },
		     { x: -98.8951, y: 156.052, z: -30.2336 },
		     { x: -98.8951, y: 156.052, z: -30.2336 },
		     { x: -99.1785, y: 155.9, z: -30.0237 },
		     { x: -99.3738, y: 155.675, z: -29.8869 },
		     { x: -99.3738, y: 155.675, z: -29.8869 },
		     { x: -99.588, y: 155.297, z: -29.6822 },
		     { x: -99.7327, y: 154.662, z: -29.3824 },
		     { x: -99.7327, y: 154.662, z: -29.3824 },
		     { x: -99.6954, y: 153.762, z: -29.1828 },
		     { x: -99.601, y: 152.859, z: -29.2546 },
		     { x: -99.601, y: 152.859, z: -29.2546 },
		     { x: -98.9273, y: 151.121, z: -29.3937 },
		     { x: -97.5926, y: 148.845, z: -29.9586 },
		     { x: -95.3944, y: 145.255, z: -30.6058 },
		     { x: -92.8772, y: 141.416, z: -31.0791 },
		     { x: -90.0364, y: 137.509, z: -31.4691 },
		     { x: -87.3817, y: 134.435, z: -31.8251 },
		     { x: -84.7066, y: 131.067, z: -32.2495 },
		     { x: -83.5798, y: 129.373, z: -32.9587 },
		     { x: -81.4612, y: 126.629, z: -34.5237 },
		     { x: -78.2202, y: 123.141, z: -35.2042 },
		     { x: -72.0665, y: 117.697, z: -36.1661 },
		     { x: -69.5069, y: 115.198, z: -36.5579 },
		     { x: -67.2172, y: 112.881, z: -37.2621 },
		     { x: -61.8053, y: 107.777, z: -38.191 },
		     { x: -59.4747, y: 105.446, z: -38.5403 },
		     { x: -54.229, y: 99.8649, z: -39.5221 },
		     { x: -52.5192, y: 98.0206, z: -40.1145 },
		     { x: -48.5268, y: 93.9992, z: -40.9315 },
		     { x: -46.8143, y: 92.053, z: -40.8796 },
		     { x: -43.7078, y: 88.528, z: -40.8212 },
		     { x: -42.4142, y: 86.9731, z: -40.7601 },
		     { x: -40.2739, y: 84.5053, z: -40.8642 },
		     { x: -39.3594, y: 83.4476, z: -40.9471 },
		     { x: -37.9384, y: 82.1277, z: -41.0582 },
		     { x: -37.9384, y: 82.1277, z: -41.0582 },
		     { x: -36.6687, y: 79.6591, z: -41.2459 },
		     { x: -36.255, y: 78.8021, z: -41.2718 },
		     { x: -35.8919, y: 77.9769, z: -41.3574 },
		     { x: -35.3115, y: 76.4875, z: -41.4514 },
		     { x: -35.0169, y: 76.0157, z: -41.5389 },
		     { x: -34.3513, y: 75.5918, z: -41.8152 },
		     { x: -34.0198, y: 75.6626, z: -42.0272 },
		     { x: -33.6624, y: 75.8477, z: -42.2794 },
		     { x: -33.1223, y: 76.166, z: -42.6169 },
		     { x: -33.1223, y: 76.166, z: -42.6169 },
		     { x: -29.7664, y: 78.1042, z: -44.5791 },
		     { x: -28.7298, y: 78.8055, z: -45.1305 },
		     { x: -27.2616, y: 79.5621, z: -45.9629 },
		     { x: -25.5257, y: 80.3185, z: -46.8102 },
		     { x: -23.8016, y: 80.8574, z: -47.5965 },
		     { x: -22.0002, y: 81.5008, z: -48.4453 },
		     { x: -20.312, y: 81.5459, z: -49.0114 },
		     { x: -19.3061, y: 81.194, z: -49.3068 },
		     { x: -18.6728, y: 79.8506, z: -49.2751 },
		     { x: -18.884, y: 73.989, z: -48.478 },
		     { x: -20.3269, y: 70, z: -47.589 },
		     { x: -22.048, y: 66.0028, z: -46.2825 },
		     { x: -24.2221, y: 62.459, z: -45.1285 },
		     { x: -26.4233, y: 59.7899, z: -43.5371 },
		     { x: -28.656, y: 57.0106, z: -42.1796 },
		     { x: -32.913, y: 53.2958, z: -37.9568 },
		     { x: -34.8863, y: 51.9446, z: -36.0409 },
		     { x: -36.8593, y: 50.8212, z: -34.1697 },
		     { x: -39.7397, y: 49.0565, z: -31.1083 },
		     { x: -40.8422, y: 48.3924, z: -29.939 },
		     { x: -41.6566, y: 47.8983, z: -29.0359 },
		     { x: -42.407, y: 47.3023, z: -28.0064 },
		     { x: -42.5114, y: 47.2116, z: -27.7449 },
		     { x: -42.4728, y: 47.2021, z: -27.6037 },
		     { x: -41.5348, y: 47.8189, z: -27.5997 },
		     { x: -40.1294, y: 48.728, z: -28.1668 },
		     { x: -37.9733, y: 50.115, z: -29.3758 },
		     { x: -31.5936, y: 53.1615, z: -33.0866 },
		     { x: -28.1009, y: 54.475, z: -35.5093 },
		     { x: -24.2845, y: 55.7188, z: -37.4284 },
		     { x: -15.6345, y: 57.3398, z: -40.798 },
		     { x: -11.3721, y: 58.6898, z: -42.2037 },
		     { x: -7.96, y: 59.5133, z: -43.8721 },
		     { x: -1.13531, y: 61.4376, z: -46.0815 },
		     { x: 1.77215, y: 62.307, z: -46.9007 },
		     { x: 4.31656, y: 62.7666, z: -47.482 },
		     { x: 8.33275, y: 63.5507, z: -48.9533 },
		     { x: 9.72436, y: 63.869, z: -49.6312 },
		     { x: 12.4831, y: 65.4351, z: -50.9692 },
		     { x: 13.4065, y: 65.6398, z: -51.3519 },
		     { x: 14.8839, y: 65.5848, z: -51.7192 },
		     { x: 15.2863, y: 65.3531, z: -51.7574 },
		     { x: 15.5854, y: 63.9265, z: -51.3609 },
		     { x: 15.1662, y: 62.665, z: -50.8788 },
		     { x: 14.3045, y: 61.0042, z: -49.6729 },
		     { x: 10.7089, y: 56.3581, z: -47.3654 },
		     { x: 8.56073, y: 54.1351, z: -45.8866 },
		     { x: 5.98149, y: 51.2532, z: -44.0359 },
		     { x: 1.26807, y: 45.4656, z: -39.0526 },
		     { x: -0.93229, y: 43.0198, z: -36.2112 },
		     { x: -3.39035, y: 40.6884, z: -33.8074 },
		     { x: -8.17232, y: 36.8811, z: -30.3159 },
		     { x: -10.9247, y: 35.3282, z: -29.089 },
		     { x: -15.1522, y: 32.1912, z: -26.9863 },
		     { x: -16.7958, y: 30.7755, z: -25.7471 },
		     { x: -18.1091, y: 29.7738, z: -24.8237 },
		     { x: -19.9251, y: 28.7854, z: -23.2131 },
		     { x: -20.9737, y: 28.2006, z: -22.0571 },
		     { x: -21.7301, y: 27.4459, z: -20.623 },
		     { x: -21.9034, y: 27.0486, z: -20.1542 },
		     { x: -20.9183, y: 27.0081, z: -20.3273 },
		     { x: -20.213, y: 26.9434, z: -20.5505 },
		     { x: -17.7738, y: 27.0809, z: -22.0928 },
		     { x: -15.9223, y: 27.3531, z: -23.3216 },
		     { x: -11.6004, y: 27.7162, z: -25.6958 },
		     { x: -8.67875, y: 27.7945, z: -27.1755 },
		     { x: -5.70895, y: 27.956, z: -28.5262 },
		     { x: 1.09099, y: 28.0477, z: -31.6543 },
		     { x: 4.62736, y: 27.9494, z: -33.1244 },
		     { x: 12.3158, y: 28.5127, z: -36.3368 },
		     { x: 15.8748, y: 28.7314, z: -37.6242 },
		     { x: 19.6161, y: 29.4954, z: -38.8448 },
		     { x: 26.1662, y: 30.9386, z: -40.5974 },
		     { x: 31.1106, y: 32.1617, z: -42.4993 },
		     { x: 33.2858, y: 32.5855, z: -43.3996 },
		     { x: 37.5303, y: 33.0417, z: -44.7466 },
		     { x: 39.2937, y: 32.9819, z: -45.115 },
		     { x: 41.1807, y: 32.9521, z: -45.4906 },
		     { x: 43.0027, y: 33.6972, z: -46.1365 },
		     { x: 43.8036, y: 34.0115, z: -46.3944 },
		     { x: 45.0592, y: 34.4746, z: -46.7892 },
		     { x: 45.5933, y: 34.6833, z: -46.9165 },
		     { x: 45.6138, y: 34.7101, z: -46.8542 },
		     { x: 44.8876, y: 34.5056, z: -46.2608 },
		     { x: 43.7854, y: 34.1465, z: -45.5818 },
		     { x: 40.2081, y: 33.1613, z: -43.6558 },
		     { x: 37.8841, y: 32.3647, z: -42.4841 },
		     { x: 33.5721, y: 30.7683, z: -40.5621 },
		     { x: 30.6223, y: 30.0849, z: -38.9982 },
		     { x: 27.4484, y: 29.1726, z: -37.4047 },
		     { x: 22.8023, y: 28.0173, z: -35.6584 },
		     { x: 22.8023, y: 28.0173, z: -35.6584 },
		     { x: 22.8023, y: 28.0173, z: -35.6584 },
		     { x: 13.743, y: 25.8681, z: -31.4227 },
		     { x: 9.80265, y: 25.365, z: -29.6604 },
		     { x: 8.15287, y: 24.934, z: -28.8707 },
		     { x: 6.675, y: 24.4033, z: -28.1675 },
		     { x: 4.88088, y: 23.6689, z: -26.9692 },
		     { x: 3.08683, y: 23.0482, z: -25.7013 },
		     { x: 2.67364, y: 22.9674, z: -25.3922 },
		     { x: 2.29491, y: 22.8441, z: -25.116 },
		     { x: 1.80578, y: 22.4976, z: -24.8194 },
		     { x: 1.80578, y: 22.4976, z: -24.8194 },
		     { x: 1.61097, y: 22.1633, z: -24.6155 },
		     { x: 1.42562, y: 21.8706, z: -24.5169 },
		     { x: 1.25952, y: 21.6746, z: -24.4686 },
		     { x: 1.14327, y: 21.4959, z: -24.4302 },
		     { x: 1.20376, y: 21.4409, z: -24.4475 },
		     { x: 1.28331, y: 21.4346, z: -24.4372 },
		     { x: 1.3492, y: 21.4114, z: -24.4593 },
		     { x: 1.33704, y: 21.4728, z: -24.4556 },
		     { x: 1.32371, y: 21.5458, z: -24.4392 },
		     { x: 1.41313, y: 21.6334, z: -24.4555 },
		     { x: 1.56633, y: 21.9869, z: -24.5233 },
		     { x: 1.62597, y: 22.0958, z: -24.5531 },
		     { x: 1.67713, y: 22.3339, z: -24.5731 },
		     { x: 1.55798, y: 22.5238, z: -24.5487 },
		     { x: 1.55937, y: 22.6578, z: -24.5371 },
		     { x: 1.5639, y: 22.9143, z: -24.4542 },
		     { x: 1.30123, y: 23.0548, z: -24.3595 },
		     { x: 1.40128, y: 23.1833, z: -24.681 },
		     { x: 1.59232, y: 23.1524, z: -24.826 },
		     { x: 1.37798, y: 23.0562, z: -24.7281 },
		     { x: 1.37798, y: 23.0562, z: -24.7281 },
		     { x: 1.25743, y: 22.8576, z: -24.8514 },
		     { x: 0.930129, y: 22.2901, z: -25.1175 },
		     { x: -0.0379273, y: 22.4171, z: -24.8651 },
		     { x: -0.104971, y: 22.4401, z: -24.8551 },
		     { x: -0.386874, y: 22.3806, z: -24.8298 },
		     { x: -0.585744, y: 22.3475, z: -24.8151 },
		     { x: -0.734717, y: 22.3419, z: -24.7988 },
		     { x: -0.846237, y: 22.3539, z: -24.7864 },
		     { x: -0.980846, y: 22.3462, z: -24.7809 },
		     { x: -1.08484, y: 22.3445, z: -24.7905 },
		     { x: -1.18148, y: 22.3591, z: -24.7853 },
		     { x: -1.23843, y: 22.3958, z: -24.7796 },
		     { x: -1.58153, y: 22.6268, z: -24.7417 },
		     { x: -1.7019, y: 22.7542, z: -24.7336 },
		     { x: -1.8002, y: 22.8668, z: -24.7258 },
		     { x: -1.85851, y: 22.9625, z: -24.7304 },
		     { x: -1.90272, y: 23.0346, z: -24.7384 },
		     { x: -1.94082, y: 23.1031, z: -24.745 },
		     { x: -1.97411, y: 23.1665, z: -24.7516 },
		     { x: -2.10276, y: 23.3413, z: -24.7809 },
		     { x: -2.10276, y: 23.3413, z: -24.7809 },
		     { x: -2.20274, y: 23.4816, z: -24.8025 },
		     { x: -2.26602, y: 23.5955, z: -24.8179 },
		     { x: -2.27961, y: 23.6679, z: -24.8375 },
		     { x: -2.29746, y: 23.7414, z: -24.8605 },
		     { x: -2.29746, y: 23.7414, z: -24.8605 },
		     { x: -2.31095, y: 23.7964, z: -24.879 },
		     { x: -2.31241, y: 23.8323, z: -24.8924 },
		     { x: -2.31241, y: 23.8323, z: -24.8924 },
		     { x: -2.31044, y: 23.8952, z: -24.9284 },
		     { x: -2.29993, y: 23.9734, z: -24.9806 },
		     { x: -2.29094, y: 24.0539, z: -25.0279 },
		     { x: -2.29094, y: 24.0539, z: -25.0279 },
		     { x: -2.28876, y: 24.1053, z: -25.0529 } ]
    },
    {
	"name": "9'",
	"points": [ { x: 15.8609, y: 81.6491, z: -21.6201 },
		    { x: 14.6082, y: 84.0639, z: -22.3515 },
		    { x: 14.6082, y: 84.0639, z: -22.3515 },
		    { x: 11.6966, y: 89.7062, z: -22.2966 },
		    { x: 9.16407, y: 92.2939, z: -22.3372 },
		    { x: 7.22688, y: 94.4999, z: -22.5118 },
		    { x: 5.51602, y: 96.1625, z: -22.6312 },
		    { x: 3.65239, y: 96.6477, z: -22.8386 },
		    { x: 0.682271, y: 97.3661, z: -22.1978 },
		    { x: -0.497227, y: 97.5332, z: -22.0752 },
		    { x: -1.52561, y: 97.7456, z: -22.1065 },
		    { x: -2.5608, y: 97.7686, z: -22.1362 },
		    { x: -3.84744, y: 96.7871, z: -22.7912 },
		    { x: -4.88907, y: 95.5432, z: -23.4043 },
		    { x: -6.14934, y: 92.4724, z: -23.5585 },
		    { x: -6.51942, y: 90.708, z: -23.5743 },
		    { x: -6.74719, y: 88.8338, z: -23.6349 },
		    { x: -6.99445, y: 86.989, z: -23.5958 },
		    { x: -7.33264, y: 84.7404, z: -23.6777 },
		    { x: -8.15771, y: 78.7005, z: -23.5787 },
		    { x: -8.88486, y: 75.4335, z: -23.7088 },
		    { x: -10.2308, y: 71.3441, z: -22.4731 },
		    { x: -11.4758, y: 67.8055, z: -20.719 },
		    { x: -12.877, y: 64.4047, z: -19.0891 },
		    { x: -14.7325, y: 58.1425, z: -16.6877 },
		    { x: -15.5118, y: 55.3026, z: -15.9459 },
		    { x: -16.2124, y: 52.2359, z: -14.8409 },
		    { x: -17.0481, y: 45.4914, z: -12.6125 },
		    { x: -17.4393, y: 42.5255, z: -12.1347 },
		    { x: -17.6758, y: 39.9036, z: -11.6149 },
		    { x: -18.624, y: 36.415, z: -10.8013 },
		    { x: -18.959, y: 35.1806, z: -10.5168 },
		    { x: -19.7149, y: 32.6751, z: -9.94048 },
		    { x: -20.1434, y: 31.6954, z: -9.77677 },
		    { x: -20.9844, y: 30.3403, z: -9.61163 },
		    { x: -21.3799, y: 29.9929, z: -9.61432 },
		    { x: -22.4462, y: 28.1239, z: -9.72646 },
		    { x: -23.4079, y: 29.4685, z: -10.2 },
		    { x: -24.0215, y: 30.3787, z: -10.5058 },
		    { x: -28.2974, y: 36.4573, z: -12.339 },
		    { x: -29.1078, y: 38.1214, z: -13.022 },
		    { x: -30.1249, y: 40.4325, z: -13.5749 },
		    { x: -32.5739, y: 46.4355, z: -15.4948 },
		    { x: -33.8163, y: 49.6214, z: -16.6448 },
		    { x: -36.4916, y: 54.7409, z: -19.4826 },
		    { x: -38.0645, y: 56.094, z: -20.4 },
		    { x: -39.5823, y: 60.1965, z: -21.3907 },
		    { x: -43.9558, y: 66.5911, z: -24.8913 },
		    { x: -48.4576, y: 74.4239, z: -25.0323 },
		    { x: -48.4576, y: 74.4239, z: -25.0323 },
		    { x: -53.8619, y: 86.0352, z: -23.0533 },
		    { x: -57.0859, y: 91.303, z: -22.1858 },
		    { x: -59.0887, y: 94.38, z: -22.5769 },
		    { x: -62.7065, y: 99.0311, z: -22.2997 },
		    { x: -66.0293, y: 103.825, z: -20.5349 },
		    { x: -67.9405, y: 106.099, z: -20.1531 },
		    { x: -71.0909, y: 110.315, z: -18.9826 },
		    { x: -74.2618, y: 113.872, z: -17.3479 },
		    { x: -75.9286, y: 114.829, z: -16.5403 },
		    { x: -79.8672, y: 115.946, z: -14.9397 },
		    { x: -84.0757, y: 116.759, z: -13.0072 },
		    { x: -88.438, y: 116.282, z: -11.1329 },
		    { x: -90.426, y: 115.714, z: -10.0863 },
		    { x: -94.4462, y: 113.917, z: -7.5216 },
		    { x: -96.5983, y: 112.908, z: -6.01724 },
		    { x: -100.662, y: 109.608, z: -3.23544 },
		    { x: -102.267, y: 107.95, z: -1.99468 },
		    { x: -106.087, y: 102.899, z: 0.457086 },
		    { x: -107.843, y: 100.403, z: 2.03576 },
		    { x: -111.017, y: 95.3718, z: 4.97163 },
		    { x: -112.336, y: 93.0575, z: 5.65364 },
		    { x: -114.254, y: 88.8228, z: 7.96409 },
		    { x: -114.683, y: 86.7357, z: 9.23428 },
		    { x: -115.419, y: 82.4597, z: 11.6485 },
		    { x: -115.652, y: 80.5071, z: 12.6244 },
		    { x: -115.871, y: 77.6245, z: 13.9593 },
		    { x: -115.941, y: 76.1164, z: 14.6211 },
		    { x: -115.563, y: 73.3073, z: 14.7428 },
		    { x: -115.501, y: 72.3311, z: 14.8719 },
		    { x: -115.412, y: 71.6012, z: 14.4684 },
		    { x: -115.05, y: 70.3787, z: 13.7377 },
		    { x: -114.771, y: 69.71, z: 12.9368 },
		    { x: -114.304, y: 69.084, z: 11.2327 },
		    { x: -114.199, y: 69.3309, z: 9.94139 },
		    { x: -114.318, y: 69.8126, z: 8.46045 },
		    { x: -114.702, y: 70.4246, z: 7.22911 },
		    { x: -115.944, y: 73.1939, z: 4.85294 },
		    { x: -117.506, y: 75.1141, z: 3.26472 },
		    { x: -118.755, y: 76.0897, z: 1.55374 },
		    { x: -122.612, y: 78.4203, z: -0.983332 },
		    { x: -124.323, y: 80.1952, z: -1.76648 },
		    { x: -129.888, y: 84.1037, z: -3.56421 },
		    { x: -135.563, y: 91.0054, z: -3.1957 },
		    { x: -138.084, y: 94.0259, z: -2.52862 },
		    { x: -145.164, y: 102.757, z: -0.630813 },
		    { x: -148.674, y: 107.097, z: -0.540719 },
		    { x: -155.872, y: 115.539, z: 2.26248 },
		    { x: -163.015, y: 124.031, z: 5.37148 },
		    { x: -169.445, y: 131.133, z: 8.07722 },
		    { x: -173.174, y: 136.136, z: 10.2575 },
		    { x: -179.644, y: 143.874, z: 13.62 },
		    { x: -185.785, y: 152.151, z: 16.8348 },
		    { x: -191.9, y: 159.915, z: 21.242 },
		    { x: -197.258, y: 168.151, z: 26.0585 },
		    { x: -197.258, y: 168.151, z: 26.0585 },
		    { x: -206.551, y: 179.152, z: 29.9113 },
		    { x: -211.272, y: 184.889, z: 34.2854 },
		    { x: -214.961, y: 190.862, z: 39.1056 },
		    { x: -218.334, y: 196.069, z: 43.7456 },
		    { x: -222.079, y: 201.335, z: 47.9257 },
		    { x: -225.332, y: 206.216, z: 51.5258 },
		    { x: -227.146, y: 208.042, z: 53.7734 },
		    { x: -229.805, y: 211.005, z: 56.9887 },
		    { x: -231.925, y: 213.582, z: 59.465 },
		    { x: -234.514, y: 216.518, z: 62.0505 },
		    { x: -235.712, y: 218.487, z: 64.7773 },
		    { x: -237.386, y: 220.705, z: 68.4681 },
		    { x: -239.132, y: 223.596, z: 73.2217 },
		    { x: -239.472, y: 224.32, z: 74.0113 },
		    { x: -240.675, y: 227.208, z: 75.9683 },
		    { x: -241.387, y: 228.176, z: 77.1219 },
		    { x: -241.474, y: 229.863, z: 80.0157 },
		    { x: -241.464, y: 229.229, z: 78.909 },
		    { x: -241.209, y: 229.32, z: 78.3717 },
		    { x: -240.876, y: 230.26, z: 78.2537 },
		    { x: -240.493, y: 229.824, z: 78.1468 },
		    { x: -239.356, y: 228.513, z: 78.021 },
		    { x: -236.775, y: 226.423, z: 76.5859 },
		    { x: -236.277, y: 225.749, z: 76.0534 },
		    { x: -233.598, y: 223.428, z: 75.6694 },
		    { x: -232.166, y: 222.114, z: 74.927 },
		    { x: -231.452, y: 221.317, z: 74.1995 },
		    { x: -229.803, y: 219.798, z: 72.7098 },
		    { x: -229.031, y: 219.318, z: 71.9077 },
		    { x: -228.436, y: 219.121, z: 71.2794 },
		    { x: -227.61, y: 218.763, z: 70.6796 },
		    { x: -227.304, y: 218.723, z: 70.4155 },
		    { x: -225.473, y: 218.319, z: 69.9495 },
		    { x: -224.086, y: 217.553, z: 69.9123 },
		    { x: -223.091, y: 217.287, z: 69.556 },
		    { x: -222.495, y: 216.041, z: 67.8796 },
		    { x: -221.998, y: 215.672, z: 68.2327 },
		    { x: -221.852, y: 215.319, z: 67.917 },
		    { x: -221.07, y: 214.895, z: 67.0774 },
		    { x: -221.296, y: 215.083, z: 67.4412 },
		    { x: -221.677, y: 215.414, z: 67.9645 },
		    { x: -221.762, y: 215.466, z: 67.9391 },
		    { x: -222.074, y: 215.703, z: 67.8424 },
		    { x: -222.041, y: 215.485, z: 67.7834 },
		    { x: -222.038, y: 215.284, z: 67.6959 },
		    { x: -222.057, y: 215.344, z: 67.6279 },
		    { x: -222.548, y: 215.9, z: 67.9165 },
		    { x: -222.936, y: 216.084, z: 68.055 },
		    { x: -223.349, y: 216.172, z: 68.163 },
		    { x: -223.75, y: 216.083, z: 68.2913 },
		    { x: -224.103, y: 216.323, z: 68.5655 },
		    { x: -224.321, y: 216.076, z: 68.6045 },
		    { x: -224.543, y: 215.982, z: 68.7417 },
		    { x: -224.746, y: 215.765, z: 68.9667 },
		    { x: -224.675, y: 214.936, z: 69.0595 },
		    { x: -224.675, y: 214.936, z: 69.0595 },
		    { x: -224.815, y: 214.784, z: 69.6092 },
		    { x: -225.414, y: 215.402, z: 70.3848 },
		    { x: -225.47, y: 215.345, z: 70.7708 },
		    { x: -225.584, y: 215.117, z: 71.0076 },
		    { x: -225.584, y: 215.117, z: 71.0076 },
		    { x: -225.705, y: 214.923, z: 71.1575 },
		    { x: -225.827, y: 214.979, z: 71.3137 },
		    { x: -225.829, y: 214.545, z: 71.0619 },
		    { x: -225.781, y: 214.266, z: 70.9197 },
		    { x: -225.8, y: 214.225, z: 70.8377 } ]
    },
    {
	"name": "10",
	"points": [ { x: -104.631, y: 130.145, z: -27.0498 },
		    { x: -104.631, y: 130.145, z: -27.0498 },
		    { x: -104.822, y: 129.853, z: -26.8789 },
		    { x: -105.02, y: 129.594, z: -26.7229 },
		    { x: -105.02, y: 129.594, z: -26.7229 },
		    { x: -105.198, y: 129.409, z: -26.593 },
		    { x: -105.381, y: 129.135, z: -26.4525 },
		    { x: -105.381, y: 129.135, z: -26.4525 },
		    { x: -105.741, y: 128.586, z: -26.2892 },
		    { x: -106.085, y: 128.182, z: -26.1394 },
		    { x: -106.085, y: 128.182, z: -26.1394 },
		    { x: -106.501, y: 127.643, z: -26.0669 },
		    { x: -106.929, y: 127.134, z: -25.984 },
		    { x: -106.929, y: 127.134, z: -25.984 },
		    { x: -107.495, y: 126.554, z: -25.8917 },
		    { x: -108.004, y: 126.126, z: -25.7779 },
		    { x: -108.004, y: 126.126, z: -25.7779 },
		    { x: -108.427, y: 125.855, z: -25.4131 },
		    { x: -108.744, y: 125.624, z: -25.1355 },
		    { x: -109.021, y: 125.412, z: -24.912 },
		    { x: -109.021, y: 125.412, z: -24.912 },
		    { x: -109.291, y: 125.2, z: -24.7066 },
		    { x: -109.431, y: 125.009, z: -24.6621 },
		    { x: -109.409, y: 124.933, z: -24.7453 },
		    { x: -109.409, y: 124.933, z: -24.7453 },
		    { x: -109.05, y: 124.917, z: -25.1693 },
		    { x: -107.801, y: 125.449, z: -26.4278 },
		    { x: -105.477, y: 126.725, z: -28.1487 },
		    { x: -105.477, y: 126.725, z: -28.1487 },
		    { x: -102.554, y: 128.118, z: -30.1299 },
		    { x: -99.3417, y: 129.768, z: -31.8662 },
		    { x: -96.5146, y: 131.197, z: -33.2804 },
		    { x: -94.0554, y: 132.32, z: -34.2263 },
		    { x: -91.8276, y: 133.317, z: -35.0698 },
		    { x: -89.7716, y: 135.155, z: -35.6314 },
		    { x: -87.5945, y: 136.518, z: -36.1847 },
		    { x: -84.1898, y: 137.061, z: -36.8505 },
		    { x: -82.3454, y: 137.406, z: -36.7756 },
		    { x: -80.2759, y: 137.43, z: -36.7431 },
		    { x: -80.2759, y: 137.43, z: -36.7431 },
		    { x: -80.2759, y: 137.43, z: -36.7431 },
		    { x: -75.144, y: 135.027, z: -36.2386 },
		    { x: -72.9164, y: 132.949, z: -35.6098 },
		    { x: -71.6029, y: 130.875, z: -35.0545 },
		    { x: -70.8701, y: 128.806, z: -34.5323 },
		    { x: -70.723, y: 126.33, z: -33.9739 },
		    { x: -71.0675, y: 123.555, z: -32.7203 },
		    { x: -71.4777, y: 121.069, z: -31.6235 },
		    { x: -73.1731, y: 114.533, z: -27.5916 },
		    { x: -74.1753, y: 111.402, z: -25.961 },
		    { x: -75.3675, y: 108.585, z: -23.4004 },
		    { x: -77.6422, y: 103.335, z: -20.2693 },
		    { x: -78.4451, y: 100.968, z: -18.6791 },
		    { x: -78.816, y: 97.6593, z: -17.4972 },
		    { x: -80.1015, y: 92.8493, z: -11.6153 },
		    { x: -81.8002, y: 91.8834, z: -8.9278 },
		    { x: -82.9278, y: 91.0085, z: -7.77491 },
		    { x: -83.8687, y: 90.0611, z: -6.95702 },
		    { x: -84.1256, y: 89.6484, z: -6.65721 },
		    { x: -84.2904, y: 89.0437, z: -6.29171 },
		    { x: -84.1752, y: 88.9798, z: -6.17649 },
		    { x: -83.9158, y: 88.9257, z: -6.43471 },
		    { x: -81.7919, y: 88.6158, z: -9.60911 },
		    { x: -79.7141, y: 88.7283, z: -11.3925 },
		    { x: -76.4871, y: 89.7436, z: -14.3392 },
		    { x: -74.2341, y: 90.8096, z: -15.7993 },
		    { x: -71.2911, y: 92.0329, z: -17.6431 },
		    { x: -65.4483, y: 94.6133, z: -21.5508 },
		    { x: -62.7231, y: 95.543, z: -24.1183 },
		    { x: -57.148, y: 98.6226, z: -27.8712 },
		    { x: -54.376, y: 99.887, z: -29.139 },
		    { x: -51.6523, y: 100.958, z: -30.3742 },
		    { x: -45.6881, y: 103.41, z: -32.2628 },
		    { x: -42.5263, y: 104.398, z: -32.8879 },
		    { x: -39.2639, y: 105.568, z: -32.4648 },
		    { x: -34.2527, y: 106.931, z: -33.0328 },
		    { x: -31.8098, y: 107.131, z: -33.3154 },
		    { x: -26.9677, y: 107.941, z: -33.2879 },
		    { x: -24.8775, y: 108.329, z: -33.3797 },
		    { x: -21.5636, y: 107.617, z: -33.1107 },
		    { x: -20.3663, y: 106.956, z: -32.9033 },
		    { x: -19.1641, y: 105.98, z: -32.3806 },
		    { x: -17.1734, y: 103.527, z: -31.1693 },
		    { x: -16.6146, y: 101.397, z: -30.8316 },
		    { x: -16.2745, y: 97.3258, z: -28.916 },
		    { x: -16.4157, y: 95.3877, z: -27.9671 },
		    { x: -16.8809, y: 92.3492, z: -26.4185 },
		    { x: -18.5701, y: 86.957, z: -23.4249 },
		    { x: -19.9365, y: 84.884, z: -22.0749 },
		    { x: -24.2064, y: 79.1336, z: -17.7317 },
		    { x: -27.0872, y: 76.0418, z: -14.5118 },
		    { x: -29.9212, y: 72.5981, z: -12.0203 },
		    { x: -34.6721, y: 68.6996, z: -8.00406 },
		    { x: -36.8295, y: 66.8501, z: -5.68368 },
		    { x: -38.7751, y: 64.9565, z: -3.67008 },
		    { x: -42.2167, y: 61.5265, z: -0.651471 },
		    { x: -43.6292, y: 60.5601, z: 0.851294 },
		    { x: -46.596, y: 57.742, z: 2.48222 },
		    { x: -47.6545, y: 57.6159, z: 2.95785 },
		    { x: -47.76, y: 55.3905, z: 4.38272 },
		    { x: -47.7581, y: 55.0424, z: 4.72372 },
		    { x: -47.7462, y: 54.8913, z: 4.77096 },
		    { x: -47.7102, y: 54.9877, z: 4.5766 },
		    { x: -47.0789, y: 55.5626, z: 3.66394 },
		    { x: -46.2542, y: 56.4321, z: 2.91952 },
		    { x: -42.979, y: 59.2764, z: 0.223338 },
		    { x: -41.2555, y: 60.487, z: -1.20372 },
		    { x: -38.8986, y: 61.9955, z: -2.97135 },
		    { x: -33.1751, y: 65.1595, z: -6.22199 },
		    { x: -30.5333, y: 66.7569, z: -7.44849 },
		    { x: -27.9541, y: 67.6918, z: -9.38099 },
		    { x: -22.7824, y: 69.3378, z: -12.622 },
		    { x: -19.325, y: 70.3372, z: -14.6888 },
		    { x: -15.9072, y: 71.4762, z: -16.2408 },
		    { x: -8.55343, y: 73.9335, z: -18.9894 },
		    { x: -5.35746, y: 74.3855, z: -20.1945 },
		    { x: -2.9409, y: 74.6275, z: -20.9572 },
		    { x: 2.35476, y: 74.7243, z: -22.3656 },
		    { x: 5.09041, y: 74.8359, z: -22.9367 },
		    { x: 9.82589, y: 75.6117, z: -23.4312 },
		    { x: 11.362, y: 75.3314, z: -23.4607 },
		    { x: 13.7102, y: 73.0886, z: -22.939 },
		    { x: 14.7588, y: 71.9496, z: -22.5532 },
		    { x: 15.6741, y: 70.9344, z: -22.0907 },
		    { x: 17.2523, y: 67.8422, z: -20.5612 },
		    { x: 17.9918, y: 65.7947, z: -19.1475 },
		    { x: 18.4424, y: 61.4581, z: -15.9311 },
		    { x: 18.1662, y: 59.444, z: -14.4414 },
		    { x: 17.5524, y: 56.8468, z: -12.2087 },
		    { x: 14.5514, y: 51.2238, z: -8.5285 },
		    { x: 12.8461, y: 48.9561, z: -6.03881 },
		    { x: 11.1919, y: 47.1758, z: -3.89069 },
		    { x: 11.1919, y: 47.1758, z: -3.89069 },
		    { x: 4.03463, y: 40.1927, z: 5.13436 },
		    { x: 1.69874, y: 37.1249, z: 6.81615 },
		    { x: 1.04433, y: 36.7606, z: 7.80225 },
		    { x: -0.131761, y: 36.2636, z: 9.12235 },
		    { x: -1.44693, y: 35.1858, z: 10.451 },
		    { x: -2.49782, y: 34.4333, z: 11.3138 },
		    { x: -4.77166, y: 32.6616, z: 12.5154 },
		    { x: -5.45515, y: 32.1655, z: 12.7789 },
		    { x: -6.12954, y: 31.5581, z: 12.8044 },
		    { x: -6.58562, y: 31.532, z: 12.9679 },
		    { x: -6.76101, y: 31.9273, z: 12.8996 },
		    { x: -6.81279, y: 32.699, z: 12.2613 },
		    { x: -6.32982, y: 34.8511, z: 10.7426 },
		    { x: -5.94181, y: 36.1175, z: 9.81272 },
		    { x: -5.29804, y: 38.1688, z: 7.82135 },
		    { x: -4.27862, y: 41.0122, z: 5.68344 },
		    { x: -2.40153, y: 47.2194, z: 0.60397 },
		    { x: -1.05991, y: 49.9743, z: -2.1641 },
		    { x: 0.308091, y: 52.1572, z: -3.88758 },
		    { x: 1.92739, y: 54.2277, z: -5.69496 },
		    { x: 5.79012, y: 58.2106, z: -8.95206 },
		    { x: 8.13742, y: 59.7133, z: -10.0373 },
		    { x: 11.1079, y: 61.3908, z: -11.6223 },
		    { x: 16.5024, y: 63.7445, z: -14.3424 },
		    { x: 19.1131, y: 64.4731, z: -15.5587 },
		    { x: 21.744, y: 65.1727, z: -16.7962 },
		    { x: 26.7986, y: 65.7615, z: -18.9314 },
		    { x: 28.9586, y: 65.5807, z: -19.7326 },
		    { x: 31.0672, y: 65.3352, z: -20.5576 },
		    { x: 35.4376, y: 64.6318, z: -21.61 },
		    { x: 37.516, y: 64.1492, z: -22.2722 },
		    { x: 41.5837, y: 63.2536, z: -23.2773 },
		    { x: 43.6434, y: 62.5176, z: -23.5408 },
		    { x: 47.4493, y: 60.2604, z: -22.2365 },
		    { x: 48.9675, y: 58.9852, z: -21.653 },
		    { x: 50.6221, y: 57.5021, z: -20.4278 },
		    { x: 53.1888, y: 54.1126, z: -18.2672 },
		    { x: 53.852, y: 52.0553, z: -17.7731 },
		    { x: 54.0253, y: 49.409, z: -18.0454 },
		    { x: 54.1098, y: 45.8439, z: -17.0919 },
		    { x: 54.1295, y: 44.631, z: -16.1481 },
		    { x: 53.2592, y: 41.5479, z: -13.4859 },
		    { x: 52.8247, y: 40.1332, z: -12.2343 },
		    { x: 50.7234, y: 36.6963, z: -9.07683 },
		    { x: 49.0662, y: 34.2232, z: -7.483 },
		    { x: 47.8723, y: 32.2778, z: -6.22663 },
		    { x: 47.4168, y: 31.3538, z: -5.6747 } ]
    },
    {
	"name": "10'",
	"points":  [ { x: 75.5829, y: 46.8849, z: -9.6385 },
		     { x: 75.049, y: 49.8741, z: -10.4127 },
		     { x: 75.049, y: 49.8741, z: -10.4127 },
		     { x: 72.6658, y: 54.218, z: -12.8235 },
		     { x: 71.0515, y: 57.3175, z: -14.055 },
		     { x: 69.8047, y: 61.0207, z: -15.1001 },
		     { x: 68.4234, y: 63.5232, z: -16.0642 },
		     { x: 67.0551, y: 65.247, z: -16.4357 },
		     { x: 64.4298, y: 68.0183, z: -16.3557 },
		     { x: 63.3386, y: 68.7034, z: -16.2712 },
		     { x: 62.0964, y: 69.3497, z: -15.9768 },
		     { x: 60.7562, y: 69.5056, z: -15.6838 },
		     { x: 59.2537, y: 69.6686, z: -15.1036 },
		     { x: 56.4243, y: 69.2906, z: -14.3194 },
		     { x: 55.1109, y: 68.8523, z: -13.8441 },
		     { x: 53.4594, y: 68.115, z: -13.2669 },
		     { x: 51.5405, y: 67.1986, z: -12.4177 },
		     { x: 48.0545, y: 63.747, z: -10.8411 },
		     { x: 46.2835, y: 61.7544, z: -9.80327 },
		     { x: 44.5727, y: 60.1227, z: -9.22111 },
		     { x: 41.2553, y: 55.5346, z: -6.74248 },
		     { x: 39.9797, y: 53.2543, z: -6.34031 },
		     { x: 38.8667, y: 51.4141, z: -5.59381 },
		     { x: 37.5291, y: 49.1152, z: -4.97496 },
		     { x: 34.659, y: 44.0569, z: -4.10434 },
		     { x: 33.6758, y: 41.9217, z: -3.82666 },
		     { x: 32.5017, y: 39.3442, z: -3.77326 },
		     { x: 30.8832, y: 35.0424, z: -3.2263 },
		     { x: 30.0578, y: 33.004, z: -3.12995 },
		     { x: 28.393, y: 28.6766, z: -2.55073 },
		     { x: 27.9988, y: 27.5511, z: -2.51663 },
		     { x: 27.7447, y: 26.5678, z: -2.6146 },
		     { x: 27.6939, y: 25.4044, z: -3.04762 },
		     { x: 27.6556, y: 24.9309, z: -3.20871 },
		     { x: 27.7044, y: 24.3404, z: -3.44524 },
		     { x: 27.6961, y: 24.2828, z: -3.5493 },
		     { x: 27.7186, y: 24.3371, z: -3.73251 },
		     { x: 28.0274, y: 24.7332, z: -4.66788 },
		     { x: 28.3202, y: 24.9149, z: -5.4052 },
		     { x: 28.7473, y: 25.5729, z: -6.8172 },
		     { x: 29.4585, y: 26.6208, z: -6.10969 },
		     { x: 30.019, y: 27.8162, z: -7.24852 },
		     { x: 31.5392, y: 31.6298, z: -9.07608 },
		     { x: 32.349, y: 34.5412, z: -10.3309 },
		     { x: 33.9282, y: 40.8859, z: -13.0282 },
		     { x: 34.3355, y: 43.9622, z: -14.1972 },
		     { x: 34.5859, y: 47.3564, z: -15.5855 },
		     { x: 34.748, y: 50.7094, z: -16.6993 },
		     { x: 34.6405, y: 58.1818, z: -19.415 },
		     { x: 34.2092, y: 60.8999, z: -20.1736 },
		     { x: 33.0846, y: 64.254, z: -21.7979 },
		     { x: 31.0494, y: 71.44, z: -23.5256 },
		     { x: 31.0494, y: 71.44, z: -23.5256 },
		     { x: 31.0494, y: 71.44, z: -23.5256 },
		     { x: 25.5774, y: 84.247, z: -25.062 },
		     { x: 24.1012, y: 86.7066, z: -25.2991 },
		     { x: 20.3794, y: 92.5691, z: -27.0084 },
		     { x: 18.513, y: 95.5511, z: -27.8268 },
		     { x: 14.8465, y: 100.367, z: -29.5397 },
		     { x: 12.8826, y: 102.698, z: -30.0979 },
		     { x: 8.56335, y: 107.091, z: -30.7103 },
		     { x: 6.13134, y: 108.654, z: -30.8043 },
		     { x: 0.756285, y: 112.931, z: -30.3018 },
		     { x: -4.36218, y: 116.574, z: -29.7795 },
		     { x: -6.67316, y: 117.886, z: -29.2701 },
		     { x: -11.7061, y: 119.977, z: -27.9341 },
		     { x: -14.0314, y: 120.422, z: -27.5118 },
		     { x: -18.494, y: 120.05, z: -25.6769 },
		     { x: -20.9475, y: 119.818, z: -24.9394 },
		     { x: -26.1573, y: 118.629, z: -23.0169 },
		     { x: -28.2701, y: 117.128, z: -21.6777 },
		     { x: -32.4892, y: 114.496, z: -19.7792 },
		     { x: -34.862, y: 112.6, z: -18.214 },
		     { x: -39.2192, y: 108.574, z: -16.0001 },
		     { x: -42.3483, y: 104.712, z: -13.4761 },
		     { x: -43.743, y: 102.132, z: -12.34 },
		     { x: -45.8559, y: 97.4067, z: -10.8544 },
		     { x: -46.6424, y: 94.8818, z: -10.2001 },
		     { x: -47.7727, y: 90.5638, z: -9.38774 },
		     { x: -48.4296, y: 84.5297, z: -8.18495 },
		     { x: -49.0505, y: 80.054, z: -7.57584 },
		     { x: -49.0601, y: 79.4098, z: -7.36249 },
		     { x: -49.2848, y: 76.037, z: -7.27785 },
		     { x: -49.0855, y: 76.3086, z: -6.9346 },
		     { x: -48.8088, y: 75.8534, z: -6.87428 },
		     { x: -48.0491, y: 75.6117, z: -7.07774 },
		     { x: -47.458, y: 75.8257, z: -7.07283 },
		     { x: -46.0908, y: 76.7758, z: -9.32718 },
		     { x: -45.2414, y: 76.6572, z: -10.1533 },
		     { x: -43.7157, y: 76.708, z: -11.2413 },
		     { x: -42.7658, y: 76.8959, z: -11.7732 },
		     { x: -40.2476, y: 77.7185, z: -12.842 },
		     { x: -38.7134, y: 78.607, z: -13.4613 },
		     { x: -35.2419, y: 81.2633, z: -14.6779 },
		     { x: -33.6021, y: 83.4665, z: -15.478 },
		     { x: -30.8781, y: 86.8558, z: -16.5492 },
		     { x: -29.5227, y: 88.719, z: -17.6571 },
		     { x: -28.2183, y: 91.1759, z: -18.9744 },
		     { x: -25.9458, y: 96.9608, z: -20.9036 },
		     { x: -25.007, y: 99.4911, z: -21.9662 },
		     { x: -23.6096, y: 103.99, z: -23.023 },
		     { x: -23.2451, y: 106.822, z: -23.9074 },
		     { x: -22.8744, y: 109.155, z: -24.3921 },
		     { x: -22.6353, y: 113.736, z: -25.4089 },
		     { x: -22.6554, y: 116.581, z: -25.9267 },
		     { x: -23.2559, y: 121.058, z: -26.6612 },
		     { x: -23.667, y: 122.95, z: -26.7717 },
		     { x: -25.4364, y: 126.272, z: -27.2055 },
		     { x: -26.6549, y: 127.83, z: -27.4352 },
		     { x: -29.2574, y: 131.429, z: -27.4666 },
		     { x: -30.7159, y: 133.071, z: -27.282 },
		     { x: -34.3718, y: 136.553, z: -27.0171 },
		     { x: -36.4263, y: 137.676, z: -26.9812 },
		     { x: -38.5596, y: 138.506, z: -26.7658 },
		     { x: -43.139, y: 139.296, z: -26.1022 },
		     { x: -46.4828, y: 139.906, z: -25.9997 },
		     { x: -52.1666, y: 139.83, z: -25.3136 },
		     { x: -55.3383, y: 140.154, z: -25.2446 },
		     { x: -57.3941, y: 139.224, z: -23.7834 },
		     { x: -63.3741, y: 138.883, z: -22.8558 },
		     { x: -66.5487, y: 137.911, z: -21.8568 },
		     { x: -72.8416, y: 134.357, z: -20.3243 },
		     { x: -75.338, y: 133.645, z: -19.4407 },
		     { x: -80.4209, y: 129.311, z: -17.5103 },
		     { x: -83.107, y: 128.719, z: -17.1605 },
		     { x: -85.9332, y: 127.721, z: -16.0604 },
		     { x: -89.9888, y: 121.286, z: -13.319 },
		     { x: -92.0787, y: 119.264, z: -12.6836 },
		     { x: -94.4365, y: 116.178, z: -11.3151 },
		     { x: -96.697, y: 112.649, z: -10.0054 },
		     { x: -97.4413, y: 110.901, z: -8.9817 },
		     { x: -98.6193, y: 108.144, z: -7.60184 },
		     { x: -99.0188, y: 106.764, z: -7.35472 },
		     { x: -99.7317, y: 103.166, z: -7.65108 },
		     { x: -99.6883, y: 101.786, z: -7.95411 },
		     { x: -99.9423, y: 97.742, z: -8.61171 },
		     { x: -98.7306, y: 96.5144, z: -9.05762 },
		     { x: -98.7306, y: 96.5144, z: -9.05762 },
		     { x: -95.7664, y: 95.4621, z: -10.29 },
		     { x: -94.9573, y: 95.4512, z: -11.5087 },
		     { x: -92.3744, y: 96.2407, z: -16.3409 },
		     { x: -91.1827, y: 97.6606, z: -18.7904 },
		     { x: -90.107, y: 99.6772, z: -21.2916 },
		     { x: -86.8607, y: 102.44, z: -24.5526 },
		     { x: -85.5897, y: 104.89, z: -26.2713 },
		     { x: -83.9378, y: 110.294, z: -29.9599 },
		     { x: -83.2107, y: 112.676, z: -31.9604 },
		     { x: -82.7183, y: 116.082, z: -33.8161 },
		     { x: -82.4409, y: 121.734, z: -36.4523 },
		     { x: -82.748, y: 124.808, z: -37.7105 },
		     { x: -84.1727, y: 130.647, z: -39.6702 },
		     { x: -85.7225, y: 133.864, z: -40.3538 },
		     { x: -88.7312, y: 140.248, z: -41.3561 },
		     { x: -90.4438, y: 142.932, z: -41.663 },
		     { x: -95.229, y: 147.729, z: -42.7127 },
		     { x: -98.0241, y: 151.669, z: -42.1982 },
		     { x: -103.142, y: 156.543, z: -42.6121 },
		     { x: -109.104, y: 162.075, z: -41.5821 },
		     { x: -111.316, y: 163.878, z: -40.1399 },
		     { x: -116.698, y: 167.158, z: -37.8018 },
		     { x: -122.958, y: 170.484, z: -35.7106 },
		     { x: -126.553, y: 173.063, z: -34.7524 },
		     { x: -132.732, y: 173.782, z: -29.9023 },
		     { x: -138.393, y: 175.923, z: -27.2039 },
		     { x: -141.736, y: 178.034, z: -26.5215 },
		     { x: -147.05, y: 178.333, z: -23.1627 },
		     { x: -153.968, y: 180.719, z: -21.7373 },
		     { x: -157.274, y: 181.327, z: -21.129 },
		     { x: -162.401, y: 180.888, z: -18.6173 },
		     { x: -165.917, y: 177.051, z: -13.7202 },
		     { x: -170.267, y: 174.528, z: -10.3724 },
		     { x: -172.106, y: 173.588, z: -9.25301 },
		     { x: -175.307, y: 170.107, z: -4.76177 },
		     { x: -180.347, y: 169.401, z: -5.21372 },
		     { x: -182.337, y: 168.241, z: -4.87182 },
		     { x: -185.569, y: 164.958, z: -3.35368 },
		     { x: -188.771, y: 162.756, z: -1.90554 },
		     { x: -192.4, y: 160.135, z: -0.541541 },
		     { x: -193.827, y: 158.859, z: 0.447863 },
		     { x: -196.207, y: 155.483, z: 1.91273 },
		     { x: -197.275, y: 153.869, z: 2.18946 },
		     { x: -200.142, y: 151.012, z: 3.55447 },
		     { x: -201.223, y: 148.595, z: 4.4758 },
		     { x: -200.838, y: 147.453, z: 5.04884 },
		     { x: -201.58, y: 146.192, z: 5.64657 },
		     { x: -202.597, y: 145.253, z: 5.3586 },
		     { x: -202.17, y: 142.902, z: 5.19806 },
		     { x: -201.92, y: 142.546, z: 4.75463 },
		     { x: -201.734, y: 142.119, z: 4.02854 },
		     { x: -201.414, y: 141.991, z: 3.93973 },
		     { x: -201.899, y: 141.924, z: 3.60378 },
		     { x: -201.814, y: 141.829, z: 3.40841 },
		     { x: -201.781, y: 141.667, z: 3.6848 },
		     { x: -200.729, y: 140.384, z: 3.6199 },
		     { x: -199.675, y: 139.363, z: 3.59756 },
		     { x: -198.766, y: 138.276, z: 3.70933 },
		     { x: -198.816, y: 137.95, z: 2.99503 },
		     { x: -198.617, y: 137.662, z: 2.32567 },
		     { x: -197.955, y: 137.537, z: 1.50783 },
		     { x: -197.639, y: 137.647, z: 1.31538 },
		     { x: -197.308, y: 137.871, z: 1.18853 },
		     { x: -196.673, y: 138.203, z: 0.85756 },
		     { x: -196.283, y: 138.727, z: 0.475924 },
		     { x: -195.599, y: 140.038, z: -1.33436 },
		     { x: -194.83, y: 139.861, z: -1.60068 },
		     { x: -194.04, y: 139.657, z: -1.11458 },
		     { x: -193.454, y: 139.88, z: -0.978403 },
		     { x: -193.881, y: 140.799, z: -1.60343 },
		     { x: -194.287, y: 141.489, z: -2.11328 },
		     { x: -195.538, y: 142.963, z: -2.72804 },
		     { x: -195.158, y: 143.641, z: -3.01564 },
		     { x: -194.806, y: 144.254, z: -3.10805 },
		     { x: -194.248, y: 144.613, z: -3.23137 },
		     { x: -194.517, y: 145.049, z: -3.3281 },
		     { x: -194.483, y: 145.703, z: -3.42576 },
		     { x: -194.593, y: 146.306, z: -3.41337 },
		     { x: -194.255, y: 146.649, z: -3.48564 },
		     { x: -193.89, y: 147.006, z: -3.52341 },
		     { x: -193.323, y: 147.37, z: -3.82136 },
		     { x: -192.632, y: 147.845, z: -3.8046 },
		     { x: -192.231, y: 148.262, z: -3.83967 },
		     { x: -191.944, y: 148.276, z: -3.6829 },
		     { x: -191.791, y: 148.277, z: -3.60759 } ]
    },
    {
	"name": "11",
	"points":  [ { x: 7.44908, y: 99.9709, z: -87.3742 },
		     { x: 7.65108, y: 99.901, z: -87.4365 },
		     { x: 7.65108, y: 99.901, z: -87.4365 },
		     { x: 7.79089, y: 99.8577, z: -87.4849 },
		     { x: 7.90951, y: 99.7909, z: -87.5256 },
		     { x: 7.90951, y: 99.7909, z: -87.5256 },
		     { x: 8.05491, y: 99.7157, z: -87.5625 },
		     { x: 8.18253, y: 99.6442, z: -87.5903 },
		     { x: 8.18253, y: 99.6442, z: -87.5903 },
		     { x: 8.32443, y: 99.5094, z: -87.6203 },
		     { x: 8.49169, y: 99.3122, z: -87.6292 },
		     { x: 8.49169, y: 99.3122, z: -87.6292 },
		     { x: 8.63034, y: 99.0579, z: -87.6116 },
		     { x: 8.63057, y: 98.6935, z: -87.6479 },
		     { x: 8.63057, y: 98.6935, z: -87.6479 },
		     { x: 8.62646, y: 98.424, z: -87.6507 },
		     { x: 8.49024, y: 97.7199, z: -87.5167 },
		     { x: 8.49024, y: 97.7199, z: -87.5167 },
		     { x: 8.17635, y: 96.2762, z: -87.0293 },
		     { x: 7.6179, y: 94.0137, z: -86.549 },
		     { x: 6.67696, y: 91.7163, z: -85.6209 },
		     { x: 6.67696, y: 91.7163, z: -85.6209 },
		     { x: 5.51458, y: 89.4092, z: -84.5039 },
		     { x: 4.55569, y: 86.3018, z: -83.8372 },
		     { x: 2.98632, y: 82.8333, z: -82.9169 },
		     { x: 1.91386, y: 79.5622, z: -81.5996 },
		     { x: 1.17234, y: 76.7716, z: -80.8432 },
		     { x: 0.852255, y: 74.0359, z: -79.8578 },
		     { x: -0.328618, y: 70.6882, z: -80.0349 },
		     { x: -1.07761, y: 68.0332, z: -79.9684 },
		     { x: -2.25773, y: 62.5363, z: -79.4257 },
		     { x: -3.05132, y: 59.2712, z: -79.5548 },
		     { x: -4.11262, y: 55.7333, z: -79.9226 },
		     { x: -4.69265, y: 53.5656, z: -80.1167 },
		     { x: -5.11696, y: 49.3569, z: -80.1618 },
		     { x: -5.14581, y: 44.7688, z: -79.9254 },
		     { x: -7.14982, y: 41.8191, z: -76.8324 },
		     { x: -7.97902, y: 39.9839, z: -74.8072 },
		     { x: -7.58152, y: 38.5977, z: -73.7412 },
		     { x: -7.51978, y: 36.9749, z: -73.2823 },
		     { x: -7.13022, y: 34.8192, z: -72.7689 },
		     { x: -6.98515, y: 33.9973, z: -72.5418 },
		     { x: -6.67294, y: 33.4995, z: -72.4014 },
		     { x: -5.90509, y: 32.5484, z: -72.2361 },
		     { x: -5.51878, y: 31.9301, z: -72.1616 },
		     { x: -5.21389, y: 31.3752, z: -72.0408 },
		     { x: -4.72527, y: 30.1088, z: -71.7112 },
		     { x: -4.48379, y: 29.5973, z: -71.5855 },
		     { x: -4.15158, y: 29.2498, z: -71.4727 },
		     { x: -3.35828, y: 28.8567, z: -71.3687 },
		     { x: -2.84355, y: 29.2523, z: -71.1054 },
		     { x: -2.29854, y: 29.705, z: -70.8771 },
		     { x: -1.82636, y: 30.0908, z: -70.7178 },
		     { x: -1.27962, y: 30.4165, z: -70.6085 },
		     { x: -0.642706, y: 31.2598, z: -70.3161 },
		     { x: -0.149144, y: 32.0184, z: -70.1158 },
		     { x: 0.274286, y: 32.715, z: -69.9982 },
		     { x: 0.682866, y: 33.4269, z: -69.9588 },
		     { x: 0.682866, y: 33.4269, z: -69.9588 },
		     { x: 1.07952, y: 34.78, z: -69.8691 },
		     { x: 1.13453, y: 35.8269, z: -69.5114 },
		     { x: 1.41517, y: 36.5252, z: -69.0515 },
		     { x: 1.76509, y: 36.9074, z: -68.6583 },
		     { x: 1.96009, y: 37.3751, z: -68.5003 },
		     { x: 1.96009, y: 37.3751, z: -68.5003 },
		     { x: 2.08951, y: 37.6912, z: -68.437 },
		     { x: 2.13257, y: 37.8796, z: -68.3914 },
		     { x: 2.15838, y: 38.105, z: -68.3876 },
		     { x: 2.21055, y: 38.2771, z: -68.3876 },
		     { x: 2.05523, y: 38.5018, z: -68.1395 },
		     { x: 2.05523, y: 38.5018, z: -68.1395 },
		     { x: 2.09623, y: 38.635, z: -67.9723 },
		     { x: 2.10974, y: 39.043, z: -67.9444 },
		     { x: 2.23047, y: 39.4185, z: -67.9603 },
		     { x: 2.44307, y: 39.5892, z: -68.4966 },
		     { x: 2.55017, y: 39.9305, z: -68.901 },
		     { x: 2.55017, y: 39.9305, z: -68.901 },
		     { x: 2.58416, y: 40.2402, z: -69.1636 },
		     { x: 2.41449, y: 40.3741, z: -69.4324 },
		     { x: 2.26896, y: 40.5534, z: -69.6702 },
		     { x: 2.26896, y: 40.5534, z: -69.6702 },
		     { x: 2.15131, y: 40.78, z: -69.8669 },
		     { x: 2.06958, y: 41.0041, z: -70.0295 },
		     { x: 2.00355, y: 41.2146, z: -70.1684 },
		     { x: 2.00355, y: 41.2146, z: -70.1684 },
		     { x: 2.03105, y: 41.4403, z: -70.3216 } ]
    },
    {
	"name": "11'",
	"points":  [ { x: -45.4143, y: 31.7005, z: -20.7345 },
		     { x: -45.3399, y: 31.4889, z: -18.9577 },
		     { x: -45.5717, y: 31.7544, z: -17.7975 },
		     { x: -46.5488, y: 33.0066, z: -16.2471 },
		     { x: -48.3915, y: 37.7314, z: -14.0554 },
		     { x: -49.2533, y: 40.2848, z: -13.5428 },
		     { x: -50.3298, y: 43.1535, z: -12.713 },
		     { x: -51.6133, y: 46.0844, z: -12.0524 },
		     { x: -52.6075, y: 49.0092, z: -11.486 },
		     { x: -53.3835, y: 51.9756, z: -11.1562 },
		     { x: -53.731, y: 55.3358, z: -11.3178 },
		     { x: -54.0572, y: 59.5764, z: -12.9262 },
		     { x: -54.5888, y: 61.247, z: -13.2858 },
		     { x: -55.132, y: 63.0685, z: -12.7798 },
		     { x: -55.439, y: 64.6252, z: -12.5154 },
		     { x: -56.4676, y: 67.9264, z: -13.0425 },
		     { x: -57.1054, y: 69.7084, z: -15.1436 },
		     { x: -58.4202, y: 72.699, z: -18.0671 },
		     { x: -59.5631, y: 77.2905, z: -18.2125 },
		     { x: -60.9506, y: 82.4588, z: -16.9096 },
		     { x: -62.4915, y: 89.1437, z: -15.0573 },
		     { x: -63.2903, y: 93.1534, z: -15.7743 },
		     { x: -63.7863, y: 97.0712, z: -16.4728 },
		     { x: -65.9483, y: 102.002, z: -22.276 },
		     { x: -66.5152, y: 103.599, z: -23.055 },
		     { x: -66.7371, y: 104.671, z: -21.1596 },
		     { x: -66.7371, y: 104.671, z: -21.1596 },
		     { x: -67.0294, y: 109.306, z: -21.5141 },
		     { x: -67.0784, y: 110.071, z: -22.0111 },
		     { x: -67.1246, y: 111.454, z: -22.4819 },
		     { x: -67.1749, y: 112.107, z: -22.5795 },
		     { x: -67.174, y: 112.698, z: -22.7611 },
		     { x: -67.1191, y: 114.006, z: -23.3046 },
		     { x: -67.1037, y: 114.369, z: -23.4138 },
		     { x: -67.0472, y: 115.307, z: -23.1477 },
		     { x: -67.0178, y: 115.521, z: -23.1095 },
		     { x: -66.738, y: 116.656, z: -22.333 },
		     { x: -66.4854, y: 117.465, z: -21.8428 },
		     { x: -66.2462, y: 118.138, z: -21.5414 },
		     { x: -65.9634, y: 119.772, z: -21.0894 },
		     { x: -65.8478, y: 120.211, z: -21.0178 },
		     { x: -65.7191, y: 120.601, z: -20.9881 },
		     { x: -65.61, y: 120.88, z: -20.9923 },
		     { x: -65.3813, y: 121.442, z: -20.8514 },
		     { x: -65.2439, y: 122.132, z: -20.3629 },
		     { x: -65.0962, y: 122.631, z: -20.0863 },
		     { x: -64.9011, y: 123.097, z: -19.6477 },
		     { x: -64.6882, y: 123.493, z: -19.4434 },
		     { x: -64.2834, y: 124.093, z: -19.4111 },
		     { x: -64.0953, y: 124.333, z: -19.4638 },
		     { x: -63.9436, y: 124.513, z: -19.5181 },
		     { x: -63.8193, y: 124.636, z: -19.5788 },
		     { x: -63.7002, y: 124.729, z: -19.656 },
		     { x: -63.5877, y: 124.804, z: -19.737 },
		     { x: -63.4926, y: 124.86, z: -19.8096 },
		     { x: -63.3997, y: 124.942, z: -19.8648 },
		     { x: -63.3091, y: 124.995, z: -19.9397 },
		     { x: -63.2283, y: 125.028, z: -20.0144 },
		     { x: -63.2283, y: 125.028, z: -20.0144 },
		     { x: -63.1393, y: 125.054, z: -20.1056 },
		     { x: -63.0514, y: 125.056, z: -20.2104 },
		     { x: -62.9672, y: 125.04, z: -20.3234 },
		     { x: -62.9672, y: 125.04, z: -20.3234 },
		     { x: -62.9715, y: 124.845, z: -20.2408 },
		     { x: -62.963, y: 124.677, z: -20.1866 },
		     { x: -62.9394, y: 124.541, z: -20.1858 },
		     { x: -62.9394, y: 124.541, z: -20.1858 },
		     { x: -62.9087, y: 124.426, z: -20.2085 },
		     { x: -62.8696, y: 124.314, z: -20.2641 },
		     { x: -62.8336, y: 124.203, z: -20.328 },
		     { x: -62.8336, y: 124.203, z: -20.328 },
		     { x: -62.8206, y: 124.135, z: -20.3452 },
		     { x: -62.8071, y: 124.057, z: -20.376 },
		     { x: -62.7998, y: 124.011, z: -20.3835 },
		     { x: -62.7998, y: 124.011, z: -20.3835 },
		     { x: -62.8001, y: 123.991, z: -20.3673 },
		     { x: -62.8022, y: 123.969, z: -20.353 },
		     { x: -62.8047, y: 123.948, z: -20.3403 },
		     { x: -62.8047, y: 123.948, z: -20.3403 },
		     { x: -62.8068, y: 123.931, z: -20.3278 },
		     { x: -62.9167, y: 123.863, z: -20.228 },
		     { x: -62.9167, y: 123.863, z: -20.228 },
		     { x: -63.2566, y: 123.688, z: -19.9973 },
		     { x: -63.4993, y: 123.561, z: -19.8266 },
		     { x: -63.7295, y: 123.573, z: -19.5675 },
		     { x: -63.7295, y: 123.573, z: -19.5675 },
		     { x: -63.8848, y: 123.54, z: -19.4199 } ]
    },
    {
	"name": "12",
	"points":  [ { x: -6.91777, y: 166.093, z: -65.7583 },
		     { x: -6.67177, y: 166.2, z: -65.7398 },
		     { x: -6.57747, y: 166.099, z: -65.7118 },
		     { x: -6.57747, y: 166.099, z: -65.7118 },
		     { x: -7.05601, y: 164.512, z: -67.1802 },
		     { x: -6.59844, y: 164.585, z: -67.8568 },
		     { x: -6.49202, y: 163.861, z: -68.7817 },
		     { x: -6.42109, y: 163.312, z: -69.3967 },
		     { x: -6.49327, y: 162.425, z: -70.0066 },
		     { x: -6.49327, y: 162.425, z: -70.0066 },
		     { x: -6.47819, y: 161.914, z: -70.333 },
		     { x: -6.45596, y: 161.318, z: -70.7751 },
		     { x: -6.44163, y: 160.445, z: -71.2787 },
		     { x: -6.85692, y: 158.415, z: -72.0011 },
		     { x: -7.09917, y: 156.758, z: -72.389 },
		     { x: -7.02231, y: 155.1, z: -72.6786 },
		     { x: -7.02231, y: 155.1, z: -72.6786 },
		     { x: -7.0575, y: 153.01, z: -72.9084 },
		     { x: -7.45546, y: 150.195, z: -73.0359 },
		     { x: -7.84788, y: 146.465, z: -73.1673 },
		     { x: -9.44274, y: 144.048, z: -72.5477 },
		     { x: -10.9271, y: 140.748, z: -72.3946 },
		     { x: -11.9086, y: 135.795, z: -72.3371 },
		     { x: -13.0925, y: 130.925, z: -72.0563 },
		     { x: -13.6706, y: 123.501, z: -70.0289 },
		     { x: -13.823, y: 120.023, z: -69.8103 },
		     { x: -13.3964, y: 116.212, z: -69.828 },
		     { x: -11.1735, y: 113.088, z: -64.2646 },
		     { x: -11.8049, y: 108.855, z: -65.0968 },
		     { x: -12.1298, y: 104.747, z: -65.9181 },
		     { x: -12.4775, y: 97.7794, z: -65.9099 },
		     { x: -12.1384, y: 95.0279, z: -66.0868 },
		     { x: -11.7801, y: 89.7722, z: -66.0267 },
		     { x: -11.4842, y: 87.2808, z: -65.8262 },
		     { x: -10.6354, y: 82.2277, z: -65.7958 },
		     { x: -10.1968, y: 80.1005, z: -65.4085 },
		     { x: -9.72417, y: 76.5319, z: -65.2534 },
		     { x: -9.38629, y: 74.8637, z: -64.9548 },
		     { x: -9.01277, y: 73.1047, z: -64.6266 },
		     { x: -8.35977, y: 69.7352, z: -63.6823 },
		     { x: -8.24191, y: 68.1565, z: -63.0454 },
		     { x: -8.18555, y: 65.514, z: -62.5336 },
		     { x: -8.14057, y: 64.0858, z: -62.4352 },
		     { x: -5.29192, y: 63.448, z: -63.7289 },
		     { x: -5.95458, y: 61.8222, z: -62.7983 },
		     { x: -6.31855, y: 60.7141, z: -62.3121 },
		     { x: -6.31855, y: 60.7141, z: -62.3121 },
		     { x: -6.31233, y: 57.4583, z: -61.0064 },
		     { x: -6.28904, y: 56.6746, z: -60.5943 },
		     { x: -6.25989, y: 55.8407, z: -60.0714 },
		     { x: -5.95068, y: 54.3533, z: -58.9151 },
		     { x: -6.17049, y: 53.8635, z: -58.753 },
		     { x: -6.06234, y: 53.5705, z: -58.5547 },
		     { x: -5.91902, y: 53.1827, z: -58.3499 },
		     { x: -5.76231, y: 52.8794, z: -58.212 },
		     { x: -5.26985, y: 51.8576, z: -57.7385 },
		     { x: -4.8912, y: 51.0346, z: -57.432 },
		     { x: -4.55256, y: 50.2403, z: -57.0713 },
		     { x: -4.26385, y: 49.4892, z: -56.638 },
		     { x: -3.98893, y: 48.6003, z: -55.9471 },
		     { x: -3.82607, y: 47.7899, z: -55.1981 },
		     { x: -3.79733, y: 47.3446, z: -54.2787 },
		     { x: -3.95259, y: 46.9999, z: -53.4187 },
		     { x: -4.19633, y: 46.8029, z: -52.9747 },
		     { x: -4.43948, y: 46.7229, z: -52.5989 },
		     { x: -4.59388, y: 46.7275, z: -52.5715 },
		     { x: -4.66546, y: 46.4166, z: -52.3627 },
		     { x: -4.72654, y: 46.0183, z: -52.0369 },
		     { x: -4.79269, y: 45.2677, z: -51.641 },
		     { x: -4.86876, y: 44.6693, z: -51.2771 },
		     { x: -4.99467, y: 43.9634, z: -50.9307 },
		     { x: -5.20343, y: 43.0902, z: -50.5828 },
		     { x: -5.47185, y: 41.9962, z: -50.2024 },
		     { x: -5.9011, y: 40.4063, z: -49.3905 },
		     { x: -6.2882, y: 38.9172, z: -48.7229 },
		     { x: -6.65381, y: 37.2456, z: -48.0107 },
		     { x: -6.8464, y: 35.9499, z: -47.5402 },
		     { x: -6.91103, y: 34.6292, z: -46.9936 },
		     { x: -6.73663, y: 32.6037, z: -44.752 },
		     { x: -6.77145, y: 31.0402, z: -42.513 },
		     { x: -6.85893, y: 30.3487, z: -41.453 },
		     { x: -6.75641, y: 29.7002, z: -40.1573 },
		     { x: -6.59717, y: 29.3396, z: -39.4649 },
		     { x: -6.34712, y: 29.0259, z: -38.7167 },
		     { x: -6.17829, y: 28.8594, z: -38.164 },
		     { x: -5.94851, y: 28.5814, z: -37.0481 },
		     { x: -6, y: 28.3892, z: -36.6165 },
		     { x: -6.0435, y: 28.171, z: -36.1685 },
		     { x: -6.05266, y: 27.8911, z: -35.72 },
		     { x: -5.96022, y: 26.9103, z: -34.5161 },
		     { x: -5.89314, y: 26.5235, z: -34.0957 },
		     { x: -5.70858, y: 25.9698, z: -33.4881 },
		     { x: -5.54008, y: 25.5116, z: -33.0053 },
		     { x: -5.39549, y: 24.9831, z: -32.5202 },
		     { x: -5.33239, y: 24.6636, z: -32.3267 },
		     { x: -5.25684, y: 24.2612, z: -32.107 },
		     { x: -5.27338, y: 23.896, z: -31.9049 },
		     { x: -5.29764, y: 23.4663, z: -31.5422 },
		     { x: -5.32051, y: 22.8996, z: -31.1537 },
		     { x: -5.3289, y: 22.2422, z: -30.7518 },
		     { x: -5.37822, y: 21.4915, z: -30.1606 },
		     { x: -5.70236, y: 20.8119, z: -29.6402 },
		     { x: -6.03689, y: 20.0597, z: -29.1488 },
		     { x: -6.32784, y: 19.2676, z: -28.6649 },
		     { x: -6.65167, y: 18.6379, z: -28.2115 },
		     { x: -6.65167, y: 18.6379, z: -28.2115 },
		     { x: -6.95057, y: 18.0067, z: -27.6841 },
		     { x: -7.17721, y: 17.4976, z: -27.2148 },
		     { x: -7.38125, y: 17.0609, z: -26.7865 },
		     { x: -7.5846, y: 16.6959, z: -26.4297 },
		     { x: -7.78584, y: 16.4239, z: -26.0789 },
		     { x: -7.78584, y: 16.4239, z: -26.0789 },
		     { x: -8.02074, y: 16.2708, z: -25.7322 },
		     { x: -8.20533, y: 16.1422, z: -25.4566 },
		     { x: -8.35472, y: 16.0369, z: -25.239 },
		     { x: -8.49726, y: 15.9841, z: -25.0564 },
		     { x: -8.65253, y: 15.9478, z: -24.8968 },
		     { x: -8.65253, y: 15.9478, z: -24.8968 },
		     { x: -8.78892, y: 15.9128, z: -24.7594 },
		     { x: -8.92419, y: 15.8683, z: -24.627 },
		     { x: -9.07048, y: 15.8398, z: -24.4925 },
		     { x: -9.07048, y: 15.8398, z: -24.4925 },
		     { x: -9.21284, y: 15.8407, z: -24.362 },
		     { x: -9.32797, y: 15.8356, z: -24.2521 },
		     { x: -9.40204, y: 15.8117, z: -24.1633 },
		     { x: -9.40204, y: 15.8117, z: -24.1633 },
		     { x: -9.35102, y: 15.7561, z: -24.0441 },
		     { x: -9.30755, y: 15.6876, z: -23.9235 },
		     { x: -9.29214, y: 15.6493, z: -23.8154 },
		     { x: -9.29214, y: 15.6493, z: -23.8154 },
		     { x: -9.25518, y: 15.6015, z: -23.707 },
		     { x: -9.22967, y: 15.5569, z: -23.6223 },
		     { x: -9.21058, y: 15.5173, z: -23.5512 },
		     { x: -9.21058, y: 15.5173, z: -23.5512 },
		     { x: -9.18507, y: 15.4786, z: -23.4814 },
		     { x: -9.15679, y: 15.4395, z: -23.4169 },
		     { x: -9.15679, y: 15.4395, z: -23.4169 },
		     { x: -9.21157, y: 15.3831, z: -23.3062 },
		     { x: -9.23633, y: 15.3372, z: -23.2181 },
		     { x: -9.24273, y: 15.3023, z: -23.148 },
		     { x: -9.24273, y: 15.3023, z: -23.148 },
		     { x: -9.2396, y: 15.2747, z: -23.086 },
		     { x: -9.23419, y: 15.2551, z: -23.0348 },
		     { x: -9.23419, y: 15.2551, z: -23.0348 },
		     { x: -9.233, y: 15.2457, z: -22.9875 },
		     { x: -9.22935, y: 15.2384, z: -22.9309 },
		     { x: -9.22935, y: 15.2384, z: -22.9309 },
		     { x: -9.21904, y: 15.2369, z: -22.8699 },
		     { x: -9.2097, y: 15.2412, z: -22.8079 },
		     { x: -9.2097, y: 15.2412, z: -22.8079 },
		     { x: -9.20194, y: 15.2394, z: -22.721 },
		     { x: -9.19835, y: 15.2239, z: -22.6281 },
		     { x: -9.19504, y: 15.219, z: -22.5531 },
		     { x: -9.19504, y: 15.219, z: -22.5531 },
		     { x: -9.19119, y: 15.2429, z: -22.4822 } ]
    },
    {
	"name": "12'",
	"points":  [ { x: -47.4992, y: 16.4636, z: -17.1548 },
		     { x: -46.613, y: 14.3183, z: -17.4878 },
		     { x: -46.1331, y: 15.8349, z: -17.698 },
		     { x: -46.2521, y: 19.5935, z: -16.1098 },
		     { x: -46.3312, y: 22.8035, z: -14.4543 },
		     { x: -46.1594, y: 27.1189, z: -12.0052 },
		     { x: -13.8923, y: -18.5565, z: 15.6279 },
		     { x: -13.9784, y: -19.0678, z: 19.1167 },
		     { x: -14.6738, y: -18.0304, z: 19.7043 },
		     { x: -16.7822, y: -15.1978, z: 20.5645 },
		     { x: -17.5906, y: -13.0629, z: 20.2771 },
		     { x: -17.8253, y: -10.7939, z: 18.1166 },
		     { x: -17.9422, y: -9.35601, z: 14.4445 },
		     { x: -18.3202, y: -7.24094, z: 11.0348 },
		     { x: -18.8312, y: -4.59727, z: 7.12322 },
		     { x: -19.3272, y: -3.45411, z: 6.20955 },
		     { x: -15.1721, y: 0.789552, z: 22.8176 },
		     { x: -11.1617, y: 3.75795, z: 35.0688 },
		     { x: -9.96118, y: 5.46423, z: 38.2423 },
		     { x: -10.6919, y: 12.9819, z: 46.0922 },
		     { x: -10.3277, y: 16.279, z: 49.4963 },
		     { x: -22.1636, y: 44.3749, z: -2.62599 },
		     { x: -22.1636, y: 44.3749, z: -2.62599 },
		     { x: -19.8492, y: 67.0746, z: -30.0376 },
		     { x: -18.1949, y: 72.0197, z: -34.3138 },
		     { x: -17.7734, y: 75.282, z: -36.1417 },
		     { x: -17.7708, y: 77.8738, z: -37.2737 },
		     { x: -17.8122, y: 80.3347, z: -38.1298 },
		     { x: -17.8227, y: 81.5336, z: -38.6279 },
		     { x: -18.2673, y: 84.0295, z: -39.6734 },
		     { x: -18.1297, y: 86.136, z: -39.8881 },
		     { x: -17.8111, y: 88.5282, z: -39.8451 },
		     { x: -17.9006, y: 91.2703, z: -40.5959 },
		     { x: -18.1174, y: 94.5194, z: -41.7448 },
		     { x: -18.0848, y: 96.2254, z: -41.7239 },
		     { x: -18.4863, y: 100.092, z: -43.9854 },
		     { x: -18.5366, y: 102.929, z: -44.6476 },
		     { x: -22.4124, y: 98.4535, z: -45.581 },
		     { x: -22.2482, y: 106.731, z: -47.58 },
		     { x: -22.1531, y: 111.701, z: -48.1552 },
		     { x: -22.4613, y: 114.129, z: -49.0649 },
		     { x: -22.8539, y: 117.209, z: -50.282 },
		     { x: -22.9877, y: 121.979, z: -51.4085 },
		     { x: -22.9249, y: 124.383, z: -52.6893 },
		     { x: -22.8574, y: 127.946, z: -53.6049 },
		     { x: -22.9342, y: 129.78, z: -53.9541 },
		     { x: -23.2007, y: 133.491, z: -55.0349 },
		     { x: -23.5948, y: 135.76, z: -55.355 },
		     { x: -24.1191, y: 139.94, z: -56.1398 },
		     { x: -24.519, y: 142.277, z: -56.7112 },
		     { x: -24.7449, y: 145.74, z: -57.4516 },
		     { x: -24.8491, y: 147.403, z: -57.9224 },
		     { x: -25.4035, y: 152.033, z: -59.3384 },
		     { x: -25.625, y: 154.102, z: -60.2576 },
		     { x: -26.197, y: 159.186, z: -61.2889 },
		     { x: -26.2155, y: 161.205, z: -61.6212 },
		     { x: -26.3571, y: 163.212, z: -61.9636 },
		     { x: -26.4454, y: 166.299, z: -62.1276 },
		     { x: -26.4348, y: 167.816, z: -61.8699 },
		     { x: -26.4058, y: 169.172, z: -61.5654 },
		     { x: -26.5544, y: 173.156, z: -60.934 },
		     { x: -26.7391, y: 175.23, z: -60.6441 },
		     { x: -26.7391, y: 175.23, z: -60.6441 },
		     { x: -27.1809, y: 182.35, z: -61.8589 },
		     { x: -27.4431, y: 186.032, z: -64.0831 },
		     { x: -27.8075, y: 187.773, z: -65.0452 },
		     { x: -28.0821, y: 190.306, z: -66.4857 },
		     { x: -28.628, y: 194.101, z: -67.7282 },
		     { x: -28.7301, y: 195.698, z: -67.9936 },
		     { x: -28.5003, y: 198.06, z: -68.2528 },
		     { x: -28.8244, y: 200.479, z: -68.5956 },
		     { x: -28.7279, y: 202.169, z: -68.5284 },
		     { x: -28.9414, y: 203.828, z: -68.6972 },
		     { x: -29.4177, y: 207.458, z: -69.3102 },
		     { x: -29.6714, y: 209.326, z: -69.8678 },
		     { x: -29.718, y: 210.727, z: -69.829 },
		     { x: -29.8626, y: 213.039, z: -69.4556 },
		     { x: -30.0191, y: 213.66, z: -69.333 },
		     { x: -29.8742, y: 215.992, z: -68.8784 },
		     { x: -29.6184, y: 218.653, z: -68.4698 },
		     { x: -29.4451, y: 223.173, z: -67.4107 },
		     { x: -29.3372, y: 225.572, z: -66.6819 },
		     { x: -29.1087, y: 228.182, z: -65.4972 },
		     { x: -28.8838, y: 230.013, z: -65.1095 },
		     { x: -28.5642, y: 234.549, z: -64.1441 },
		     { x: -28.1528, y: 237.655, z: -63.7249 },
		     { x: -28.2354, y: 239.703, z: -63.5454 },
		     { x: -27.6996, y: 241.531, z: -63.7692 },
		     { x: -27.352, y: 244.513, z: -63.2321 },
		     { x: -28.2032, y: 250.701, z: -61.8362 },
		     { x: -27.9726, y: 251.684, z: -62.526 },
		     { x: -27.7506, y: 253.101, z: -62.5486 },
		     { x: -27.6916, y: 254.86, z: -62.2457 },
		     { x: -27.8624, y: 267.769, z: -58.2524 },
		     { x: -28.3191, y: 270.046, z: -56.8466 },
		     { x: -28.4993, y: 270.85, z: -56.3404 },
		     { x: -28.6819, y: 271.411, z: -55.9641 },
		     { x: -28.7322, y: 271.554, z: -55.8673 },
		     { x: -28.7671, y: 271.675, z: -55.7886 },
		     { x: -28.8271, y: 271.989, z: -55.3995 },
		     { x: -28.8255, y: 272.209, z: -55.1333 },
		     { x: -28.8225, y: 272.432, z: -54.8639 },
		     { x: -28.8238, y: 272.491, z: -54.79 },
		     { x: -28.8459, y: 272.505, z: -54.7413 },
		     { x: -28.8883, y: 272.511, z: -54.6744 },
		     { x: -28.9071, y: 272.508, z: -54.6506 },
		     { x: -28.918, y: 272.52, z: -54.6253 },
		     { x: -13.866, y: 221.507, z: 2.18759 },
		     { x: -12.0777, y: 216.685, z: 10.4878 },
		     { x: -12.9158, y: 216.211, z: 9.86127 },
		     { x: -12.9158, y: 216.211, z: 9.86127 },
		     { x: -17.426, y: 213.072, z: 7.42101 },
		     { x: -21.05, y: 206.543, z: 7.25876 },
		     { x: -23.0742, y: 204.572, z: 9.04634 },
		     { x: -23.4827, y: 204.268, z: 9.33822 },
		     { x: -23.5856, y: 204.191, z: 9.3927 },
		     { x: -23.727, y: 204.088, z: 9.45875 },
		     { x: -23.8156, y: 204.04, z: 9.49978 },
		     { x: -23.8625, y: 204.048, z: 9.53534 },
		     { x: -23.8991, y: 204.107, z: 9.51393 },
		     { x: -23.908, y: 204.192, z: 9.50978 },
		     { x: -23.9118, y: 204.27, z: 9.50603 },
		     { x: -23.909, y: 204.309, z: 9.50706 },
		     { x: -23.8854, y: 204.396, z: 9.4617 },
		     { x: -24.0164, y: 204.53, z: 8.84184 },
		     { x: -24.0769, y: 204.621, z: 8.516 },
		     { x: -24.0919, y: 204.662, z: 8.42147 },
		     { x: -25.2739, y: 204.877, z: 6.8711 },
		     { x: -26.3813, y: 205.154, z: 5.59293 },
		     { x: -26.5615, y: 205.258, z: 5.42079 },
		     { x: -27.1634, y: 205.764, z: 4.7238 },
		     { x: -29.6384, y: 208.858, z: 1.92252 },
		     { x: -31.4042, y: 211.235, z: -0.0236034 },
		     { x: -32.4468, y: 212.527, z: -1.2346 },
		     { x: -33.1204, y: 213.178, z: -2.12288 },
		     { x: -33.4565, y: 213.28, z: -2.7197 },
		     { x: -33.4224, y: 212.513, z: -3.20627 },
		     { x: -32.8426, y: 210.913, z: -3.77644 },
		     { x: -32.4603, y: 209.825, z: -3.86625 },
		     { x: -32.2267, y: 209.168, z: -3.92999 },
		     { x: -32.077, y: 208.75, z: -3.97753 },
		     { x: -31.9685, y: 208.426, z: -4.04105 },
		     { x: -31.6101, y: 207.496, z: -3.99463 },
		     { x: -30.908, y: 206.178, z: -3.71502 },
		     { x: -30.2759, y: 204.903, z: -3.51147 },
		     { x: -29.2366, y: 203.054, z: -2.32263 },
		     { x: -28.996, y: 202.619, z: -2.02235 },
		     { x: -28.7804, y: 202.302, z: -1.61143 },
		     { x: -28.6677, y: 202.121, z: -1.3357 },
		     { x: -28.5691, y: 201.978, z: -1.1365 },
		     { x: -28.4969, y: 201.849, z: -0.981609 },
		     { x: -28.483, y: 201.836, z: -0.932947 },
		     { x: -28.483, y: 201.836, z: -0.932947 },
		     { x: -28.4782, y: 201.835, z: -0.904278 },
		     { x: -28.4738, y: 201.833, z: -0.879297 },
		     { x: -28.4356, y: 201.782, z: -0.850186 } ]
    }
];

},{}],28:[function(require,module,exports){
var Sketch = function(id, enableMouseDrag) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
    this.context.translate(this.canvas.width/2, this.canvas.height/2);
    this.mousePressed = false;
    this.mouseX = 0;
    this.mouseY = 0;

    if (enableMouseDrag) {
	this.enableMouseDrag();
    }
};

Sketch.prototype.drawCircle =  function(x, y) {
    this.context.beginPath();
//    this.context.strokeStyle = '#6DD900';
    this.context.arc(x, y, 12, 0, Math.PI*2, false);
    this.context.stroke();
};

Sketch.prototype.setStrokeStyle =  function(color) {
    this.context.strokeStyle = color;
    this.context.stroke();
};

Sketch.prototype.clear = function() {
    this.context.clearRect(-this.canvas.width/2, -this.canvas.height/2, this.canvas.width, this.canvas.height);
};


Sketch.prototype.enableMouseDrag = function() {
    var sketch = this;
    var canvas = sketch.canvas;

    canvas.addEventListener('mousedown', function(e) {
    	sketch.clear();
	sketch.mousePressed = true;
    });

    canvas.addEventListener('mouseup', function(e) {
	sketch.mousePressed = false;
    });

    canvas.addEventListener('mousemove', function(e) {
	if (sketch.mousePressed) {
    	    var rect = e.target.getBoundingClientRect();
    	    sketch.mouseX = e.clientX - rect.left;
    	    sketch.mouseY = e.clientY - rect.top;
    	    sketch.drawCircle(sketch.mouseX, sketch.mouseY);
	}
    }, false);
};

module.exports = Sketch;

},{}],29:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],30:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[26]);
