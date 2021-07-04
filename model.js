/**
 * Model class. Knows everything about API endpoint and data structure. Can format/map data to any structure.
 *
 * @constructor
 */
export default function Model() {

    /**
	 * URL service.
	 * @type {string}
	 *
	 * @private
	 */
    const _apiPrefix = "http://localhost:3000/api";

    /**
	 * URL template for getting the stores from service.
     * 
	 * @type {string}
	 *
	 * @private
	 */
    const _apiStores = `${_apiPrefix}/Stores`;

    /**
	 * URL template for getting the products from service.
	 * @type {string}
	 *
	 * @private
	 */
	const _apiStoreProducts = `${_apiPrefix}/Products`;

    /**
	 * Keeps stores array after request for service.
	 * @type {Object[]}
	 *
	 * @private
	 */
	let _storesList = null;

    /**
	 * Keeps one store products array after request for service.
	 * @type {Object[]}
	 *
	 * @private
	 */
	let _pickedStore = null;

     /**
	 * Keeps one store products array after filter in control panel.
	 * @type {Object[]}
	 *
	 * @private
	 */
	let _filteredStore = null;

    /**
	 * Keeps one store products array after search with search form.
	 * @type {Object[]}
	 *
	 * @private
	 */
	let _searchedStoreElements = null;

    /**
	 * Keeps array after quick sort.
	 * @type {Object[]}
	 *
	 * @private
	 */
	let _sortedList = null;

    /**
	 * Flag - monitoring sorting with control filter.
	 * @type {boolean}
	 *
	 * @private
	 */
	let _isFiltered = false;

     /**
	 * Flag - monitoring sorting with search panel.
	 * @type {boolean}
	 *
	 * @private
	 */
	let _isSearched = false;

     /**
	 * Flag - search monitoring sorting with quick sort.
	 * @type {boolean}
     * 
	 * @private
	 */
	let _isSorted = false;
	
     /**
	 * Fetch the stores object.
	 * @type {boolean}
	 *
     * @param {Object} fnShowSpinner show busy indicator
     * @param {Object} fnHideSpinner hide busy indicators
     * 
     * @returns {Promise} the promise object will be resolved once the stores object gets loaded.
     * 
	 * @public
	 */
    this.fetchStoresList = function(fnShowSpinner, fnHideSpinner) {
		fnShowSpinner();
        return this.
			fetchData(_apiStores)
			.then(function (storesData) {
				fnHideSpinner();
				_storesList = storesData;
				return storesData;
			});
    }

    /**
	 * Fetch the store products object by store id. Changes flags, save store list.
	 *
	 * @param {String} storeId the store id.
     * 
	 * @returns {Promise} the promise object will be resolved once the Products object gets loaded.
	 *
	 * @public
	 */
	this.fetchStore = function(storeId, fnShowSpinner, fnHideSpinner) {
        fnShowSpinner();
        return this.
			fetchData(`${_apiStoreProducts}?filter={"where":{"StoreId":${storeId}}}`)
			.then(function (storeData) {
                fnHideSpinner();
				_isFiltered = false;
				_isSearched = false;
				_isSorted = false;
				_pickedStore = storeData;
				return storeData;
			});
    }

    /**
	 * Fetch the product object by product id.
	 *
	 * @param {String} productId the store id.
     * 
	 * @returns {Promise} the promise object will be resolved once the Store object gets loaded.
	 *
	 * @public
	 */
    this.fetchOneProduct = function(productId) {
        return this.
			fetchData(`${_apiStoreProducts}?filter={"where":{"id":${productId}}}`)
			.then(function (productData) {
				return productData;
			});
    }

    /**
	 * Fetch the store info object by product id.
	 *
	 * @param {String} storeId the store id.
     * 
	 * @returns {Promise} the promise object will be resolved once the store info object gets loaded.
	 *
	 * @public
	 */
	this.fetchStoreInfo = function(storeId) {
        return this.
			fetchData(`${_apiStores}?filter={"where":{"id":${storeId}}}`)
			.then(function (storeData) {
				return storeData;
			});
    }

    
    /**
	 * Post new store.
	 *
	 * @param {Object} body the object with body for request.
     * 
	 * @returns {Promise} the promise object will be resolved when the store post.
	 *
	 * @public
	 */
	this.postStore = function(body) {
		return this.
			postData(_apiStores, body)
			.then(function (result) {
				return result;
			});
	}

     /**
	 * Post new product.
	 *
	 * @param {Object} body the object with body for request.
     * 
	 * @returns {Promise} the promise object will be resolved when the product post.
	 *
	 * @public
	 */
	this.postProduct = function(body) {
		return this.
			postData(_apiStoreProducts, body)
			.then(function (result) {
				return result;
			});
	}

    /**
	 * Get product for fix.
	 *
	 * @param {Object} body the object with body for request.
     * @param {string} id the product id.
     * 
	 * @returns {Promise} the promise object will be resolved when the product get.
	 *
	 * @public
	 */
    this.putProduct = function(id, body) {
		return this.
			putData(`${_apiStoreProducts}/${id}`, body)
			.then(function (result) {
				return result;
			});
	}

    /**
	 * Delete store.
	 *
     * @param {string} id the store id.
     * 
	 * @returns {Promise} the promise object will be resolved when the store delete.
	 *
	 * @public
	 */
	this.deleteStore = function(id) {
		return this.
			deleteData(`${_apiStores}/${id}`)
			.then(function (result) {
				return result;
			});
	}

     /**
	 * Delete product.
	 *
     * @param {string} id the store id.
     * 
	 * @returns {Promise} the promise object will be resolved when the product delete.
	 *
	 * @public
	 */
	this.deleteProduct = function(id) {
		return this.
			deleteData(`${_apiStoreProducts}/${id}`)
			.then(function (result) {
				return result;
			});
	}

     /**
	 * Helper for control panel. Use object with searched elements or picked store.
     * 
	 * @returns {Object[]}  array: object with status info and length products array for all control.
	 *
	 * @public
	 */
	this.getStatusInfo = function () {
		const productsArray =  _isSearched ? _searchedStoreElements : _pickedStore;
		const statusObject = {
			"OK": 0,
			"STORAGE": 0,
			"OUT_OF_STOCK": 0,
		};
		let length = productsArray.length;
		productsArray.forEach(({Status}) => {
			statusObject[Status]++;
		});
		return [statusObject, length];
    }

     /**
	 * Search elements in stores list or products list.
     * 
	 * @returns {Object[]}  array of searched elements.
	 *
	 * @public
	 */
	this.searchElements = function (searchText, type) {
		const fieldsStore = ["Name", "Address", "FloorArea"];
		const fieldsProducts = ["Name", "Price", "SupplierInfo", "Specs", "MadeIn", "ProductionCompanyName"];
		
        if (!searchText.length) {
            return [];
        } else if (type === "list") {
			return _storesList.filter(store => {
				return fieldsStore.some((prop) =>  store[prop].toString().toLowerCase().includes(searchText.toString().toLowerCase()));
			});
		} else if (type === "store") {
			_isSearched = true;
			if(_isFiltered) {
				_searchedStoreElements = _filteredStore.filter(store => {
					return fieldsProducts.some((prop) =>  store[prop].toString().toLowerCase().includes(searchText.toString().toLowerCase()));
				})
			} else {
				_searchedStoreElements = _pickedStore.filter(store => {
					return fieldsProducts.some((prop) =>  store[prop].toString().toLowerCase().includes(searchText.toString().toLowerCase()));
				});
			}
			return _searchedStoreElements;
		}
	}

     /**
	 * Filter for control panel.
     * 
     * @param {string} filterStatusText sorting type from data-attr.
     * 
	 * @returns {Object[]}  filtered array.
	 *
	 * @public
	 */
	this.filterStatusProducts = function(filterStatusText) {
		if(filterStatusText === "ALL") {
			if(_isSearched) {
				return _searchedStoreElements;
			} else {
				return _pickedStore;
			}
		} else {
			_isFiltered = true;
			if(_isSearched) {
				_filteredStore = _searchedStoreElements.filter(elem => {
			
					if (elem.Status === filterStatusText) {
						return elem;
					}
				}); 
			} else {
				_filteredStore = _pickedStore.filter(elem => {
			
					if (elem.Status === filterStatusText) {
						return elem;
					}
				}); 
			}
		}
		return _filteredStore;
    }

    /**
	 * Sort products list. Use object with filtered elements or picked store.
     * 
     * @param {string} type type for sorting from data-attr.
     * @param {string} sortType field for sorting from data-attr.
     * 
	 * @returns {Object[]}  sorted array.
	 *
	 * @public
	 */
	this.sortProductsList = function (type, sortType) {
		if(_isFiltered) {
			const copy = JSON.stringify(_filteredStore);
			_sortedList = JSON.parse(copy);
		} else {
			const copy = JSON.stringify(_pickedStore);
			_sortedList = JSON.parse(copy);
		}
        _isSorted = sortType === "down" ? false: true;
		if (_isSorted) {
			switch(sortType) {
                case "not":
                    _sortedList.sort((a, b) =>  a[type] > b[type] ? 1 : -1);
                    break;
                case "up":
                    _sortedList.sort((a, b) =>  b[type] > a[type] ? 1 : -1);
                    break;
            }
		} else {
			if(_isFiltered) {
				_sortedList = _filteredStore;

			} else {
				_sortedList = _pickedStore;
			}
		}
		return _sortedList;
	}

    /**
     * Function validate. Check Input on RegExp provided in regExpDic by input data-required type.
     * 
     * @param {HTMLInputElement} el input DOM element.
     * 
     * @returns {Boolean} - Return true if input valid or doesn't has data-required attr, but length can be > 0.
     */
	this.validate = function(el) {
        const regExpName = el.dataset.required;
        const regExpDic = {
            email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
            number: /^[a-z0-9_-]{12}$/,
            area: /^[a-z0-9_-]{1,16}$/,
            rating: /^[a-z1-5_-]{1}$/,
            price: /^[a-z0-9_-]{1,20}$/
        };
        if(!regExpName && el.value.length > 0) {
          return true;
        }
        if(regExpName && el.value.length > 0) {
            return regExpDic[regExpName].test(el.value);
        }
        return false;
    } 

    /**
	 * Function wrapper for get request.
	 *
	 * @param {String} url service url.
     * 
	 * @returns {Promise} the promise object will be resolved once.
	 *
	 * @public
	 */
	this.fetchData = async function (url) {
        try {
			const response = await fetch(url);
			if(!response.ok) {
				throw `Error: ${response.statusText}`;
			}
			
			return await response.json();
		} catch(err) {
			return Promise.reject(err);
		}
	}

    /**
	 * Function wrapper for post request.
	 *
	 * @param {String} url service url.
     * @param {Object} body object with data for post.
     * 
	 * @returns {Promise} the promise object will be resolved once.
	 *
	 * @public
	 */
	this.postData = async function (url, body) {
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			});
			if(!response.ok) {
				throw `Error: ${response.statusText}`;
			}

			return await response.json();
		} catch(err) {
			return Promise.reject(err);
		}
    }

    /**
	 * Function wrapper for delete request.
	 *
	 * @param {String} url service url.
     * 
	 * @returns {Promise} the promise object will be resolved once.
	 *
	 * @public
	 */
	this.deleteData = async function(url) {
		try {
			const response = await fetch(url, {
				method: "DELETE",
				headers: {'Accept': 'application/json'}
			});
			if(!response.ok) {
				throw `Error: ${response.statusText}`;
			}
			return await response.json();
		} catch(err) {
			return Promise.reject(err);
		}
    }

    /**
	 * Function wrapper for put request.
	 *
	 * @param {String} url service url.
     * @param {Object} body object with data for put data.
     * 
	 * @returns {Promise} the promise object will be resolved once.
	 *
	 * @public
	 */
    this.putData = async function (url, body) {
		try {
			const response = await fetch(url, {
				method: "PUT",
				headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
			});
			if(!response.ok) {
				throw `Error: ${response.statusText}`;
			}

			return await response.json();
		} catch(err) {
			return Promise.reject(err);
		}
    }
}