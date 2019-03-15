const sketch = require('sketch')
const pages = sketch.getSelectedDocument().pages
const doc = sketch.getSelectedDocument()

//Search in document pages for symbols
var inspectSelection = function(layers) {
	layers.forEach(function(layers){
		if(layers.layers != undefined){
			inspectSelection(layers.layers)
		}
		if(layers.layers == undefined){
			if(layers.type == 'SymbolInstance'){
				var group = layers.detach({
					recursively: true,
				})
			}
		}
	})
}

//Sends all document layers to detach
var detachDocumentSymbols = function(){
	pages.forEach(function(page) {
		inspectSelection(page.layers)
	})
	sketch.UI.message(`🎉 All document symbols have been detached 🎉 `)
}

//Sends all selected layers to detach
var detachSelectedSymbols = function(){
	inspectSelection(doc.selectedLayers.layers)
	sketch.UI.message(`🎉 Selected symbols have been detached 🎉 `)
}

