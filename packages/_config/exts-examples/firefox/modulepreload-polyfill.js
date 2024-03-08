!function(){

	const relList = document.createElement( 'link' ).relList;if( !( relList && relList.supports && relList.supports( 'modulepreload' ) ) ){

		for( const link of document.querySelectorAll( 'link[rel="modulepreload"]' ) )processPreload( link );new MutationObserver( ( mutations=>{

			for( const mutation of mutations )if( 'childList' === mutation.type )for( const node of mutation.addedNodes )'LINK' === node.tagName && 'modulepreload' === node.rel && processPreload( node )

} ) ).observe( document,{
			childList : !0,subtree : !0,
} )

}}/**
} *
} */
	function processPreload( link ){

		if( link.ep )return;link.ep = !0;const fetchOpts = function( link ){
const fetchOpts = {};return link.integrity && ( fetchOpts.integrity = link.integrity ),link.referrerPolicy && ( fetchOpts.referrerPolicy = link.referrerPolicy ),'use-credentials'===link.crossOrigin ? fetchOpts.credentials = "include" : "anonymous" === link.crossOrigin ? fetchOpts.credentials = "omit" : fetchOpts.credentials = "same-origin",fetchOpts
}( link );fetch( link.href,fetchOpts )

}

}()
