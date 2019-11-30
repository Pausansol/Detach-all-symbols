const sketch = require('sketch')
const doc = sketch.getSelectedDocument()
const pages = doc.pages

// Search in document pages for symbols
var inspectSelection = function(layers) {
	layers.forEach(function(layer) {
		if (layer.layers) {
			inspectSelection(layer.layers)
		}
		else {
			if(layer.type == 'SymbolInstance'){
				layer.detach({
					recursively: true
				})
			}
		}
	})
}

// Send all document layers to detach
var detachDocumentSymbols = function() {
	pages.forEach(function(page) {
		inspectSelection(page.layers)
	})
	sketch.UI.message(`🎉 All document symbols have been detached 🎉`)
}

// Sends all selected layers to detach
var detachSelectedSymbols = function() {
	inspectSelection(doc.selectedLayers.layers)
	sketch.UI.message(`🎉 Selected symbols have been detached 🎉`)
}
