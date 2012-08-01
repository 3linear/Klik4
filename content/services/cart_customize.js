item: {
	type: "t-shirt",
	minimalorderquantity: "200",
	title: {
		label: "",
		value: "Muška majica"
	},
	id: {
		label: "Item Id", // locale
		value: "12345"
	},
	sku: {
		label: "Item SKU", // locale
		value: "12345456"
	},
	image: {
		label: "Muška majica crvene boje", // title slike ako postoji, a ako ne onda item.title.value
		value: "http://www.nekra.net/klik4/media/catalog/product/cache/1/image/200x/9df78eab33525d08d6e5fb8d27136e95/6/2/6241999888121.jpg"
	},
	description: {
		label: "Quick Overview", // locale
		value: "Kratak opis proizvoda"
	},
	actions: {
		
	}
}
	
colors: {
	title: "Imprint color", // locale
	label: "Please select your imprint color below. Stock imprint colors shown on website are for reference only and may not match actual print color.", // locale
	colors: {
		color: {
			name: "plava",
			code: "#ccdddd"
		},
		color: {
			name: "crna",
			code: "#cc3ddd"
		},
		color: {
			name: "ljubičasta",
			code: "#ccd34d"
		},
		color: {
			name: "krem",
			code: "#ffdddd"
		},
		color: {
			name: "crvena",
			code: "#ff0000"
		},
		color: {
			name: "zelena",
			code: "#00ff00"
		},
		color: {
			name: "plava",
			code: "#0000ff"
		},
		color: {
			name: "plava",
			code: "#ccdddd"
		},
		color: {
			name: "plava",
			code: "#ccdddd"
		}
	}
}

size: {
	size: "s",
	size: "l",
	size: "xl",
	size: "xxl",
	size: "xxxl"
};

application: {
	title: "Logo and Artwork", // locale
	label: "Would you like to add a logo or graphic image to your imprint? To ensure a quality print, our professional artists will touch-up low-resolution images.", // locale
	locations: {
		title: "Chose one application location", // locale
		label: "Please chose one application location and …", // locale
		locations: {
			location: {
				id: "1",
				label: "Back Center",
				maxwidth: "200",
				maxheight: "300"
			},
			location: {
				id: "2",
				label: "Back Top",
				maxwidth: "200",
				maxheight: "300"
			},
			location: {
				id: "3",
				label: "Front Center",
				maxwidth: "200",
				maxheight: "300"
			}
		}
	},
	customlocation: {
		title: "or chose custom location", // locale
		label: "Or you can chose custom location and …" // locale
	},
	decoration: {
		title: "Chose one decoration type", // locale
		label: "Please chose one decoration type and …", // locale
		decorations: {
			decoration: {
				id: "1",
				label: "Digitalni tisak"
			},
			decoration: {
				id: "2",
				label: "Tampon tisak",
				maxcolors: "4",
				colors: {
					color: {
						name: "plava",
						code: "#ccdddd",
						pantone: "Pantone 112"
					},
					color: {
						name: "crna",
						code: "#cc3ddd",
						pantone: "Pantone 113"
					},
					color: {
						name: "ljubičasta",
						code: "#ccd34d",
						pantone: "Pantone 114"
					},
					color: {
						name: "krem",
						code: "#ffdddd",
						pantone: "Pantone 115"
					},
					color: {
						name: "crvena",
						code: "#ff0000",
						pantone: "Pantone 116"
					}
				}
			},
			decoration: {
				id: "3",
				label: "Sito tisak",
				maxcolors: "2",
				colors: {
					color: {
						name: "crna",
						code: "#cc3ddd",
						pantone: "Pantone 113"
					},
					color: {
						name: "ljubičasta",
						code: "#ccd34d",
						pantone: "Pantone 114"
					},
					color: {
						name: "krem",
						code: "#ffdddd",
						pantone: "Pantone 115"
					},
					color: {
						name: "crvena",
						code: "#ff0000",
						pantone: "Pantone 116"
					}
				}
			},
			decoration: {
				id: "4",
				label: "Končani vez", // locale
				sticheslabel: "Broj uboda", // locale
				maxcolors: "6",
				colors: {
					color: {
						name: "plava",
						code: "#ccdddd",
						pantone: "Pantone 112"
					},
					color: {
						name: "crna",
						code: "#cc3ddd",
						pantone: "Pantone 113"
					},
					color: {
						name: "ljubičasta",
						code: "#ccd34d",
						pantone: "Pantone 114"
					},
					color: {
						name: "krem",
						code: "#ffdddd",
						pantone: "Pantone 115"
					},
					color: {
						name: "crvena",
						code: "#ff0000",
						pantone: "Pantone 116"
					},
					color: {
						name: "crna",
						code: "#cc3ddd",
						pantone: "Pantone 113"
					},
					color: {
						name: "ljubičasta",
						code: "#ccd34d",
						pantone: "Pantone 114"
					},
					color: {
						name: "krem",
						code: "#ffdddd",
						pantone: "Pantone 115"
					}
				}
				types: {
					type: {
						id: "1",
						label: "Only Letters",
						stitches: "120"
					},
					type: {
						id: "2",
						label: "Letters on surface",
						stitches: "100"
					},
					type: {
						id: "3",
						label: "Logo letters",
						stitches: "220"
					}
				}
			}
		}
	},
	customdecoration: {
		title: "or chose custom decoration", // locale
		label: "Or you can chose custom decoration and …" // locale
	},
};

artwork: {
	title: "Logo and Artwork", // locale
	label: "Would you like to add a logo or graphic image to your imprint? To ensure a quality print, our professional artists will touch-up low-resolution images.", // locale
	types: {
		type: {
			id: "1",
			label: "No, Text Only",
			description: "Choose this option if you would only like text for your imprint."
		},
		type: {
			id: "2",
			label: "Yes, Artwork On File",
			description: "Choose this option if you have placed an order with us before and your artwork is on file."
		},
		type: {
			id: "3",
			label: "Yes, I Will Upload Art",
			description: "Choose this option if you have an image that you would like to upload to your order."
		}
	}
};


	