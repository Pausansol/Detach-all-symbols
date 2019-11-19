const sketch = require('sketch')
const doc = sketch.getSelectedDocument()
const pages = doc.pages

// Search in document pages for symbols
const inspectSelection = layers => {
	layers.forEach(layer => {
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
const detachDocumentSymbols = () => {
	pages.forEach(page => {
		inspectSelection(page.layers)
	})
	sketch.UI.message(`🎉 All document symbols have been detached 🎉`)
}

// Sends all selected layers to detach
const detachSelectedSymbols = () => {
	inspectSelection(doc.selectedLayers.layers)
	sketch.UI.message(`🎉 Selected symbols have been detached 🎉`)
}
