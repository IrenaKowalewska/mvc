import Model from "./model.js";
import View from "./view.js";

/**
 * Controller class. Orchestrates the model and view objects. A "glue" between them.
 *
 * @param {View} view view instance.
 * @param {Model} model model instance.
 *
 * @constructor
 */
function Controller(view, model) {

	/**
	 * Initialize controller.
	 *
	 * @public
	 */
	this.init = function() {
        const storesContainer           = view.getStoresContainer();
		const productsTableWrapper		= view.getProductsTableWrapper();
		const productsStatusContainer 	= view.getProductsStatusContainer();
        
		const buttonCreateStore         = view.getButtonCreateStore();
        const buttonCreateProduct       = view.getButtonCreateProduct();
		const buttonDeleteStore			= view.getButtonDeleteStore();
        
		const popup                     = view.getPopup();

		const storesListFormWrapper 	= view.getStoresListFormWrapper();
		const storeDetailsFormWrapper	= view.getStoreDetailsFormWrapper();
		const storesListForm 			= view.getStoresListForm();
		const productsListForm			= view.getProductsListForm();
		
        buttonCreateStore.addEventListener("click", this._onButtonCreateStoreClick);
        buttonCreateProduct.addEventListener("click", this._onButtonCreateProductClick);
		buttonDeleteStore.addEventListener("click", this._onButtonDeleteStoreClick)
        popup.addEventListener("click", this._onPopupClick);
		storesContainer.addEventListener("click", this._onStoresContainerClick);
		productsStatusContainer.addEventListener("click", this._onProductsStatusContainerClick);
		productsTableWrapper.addEventListener("click", this._onProductsContainerClick);

		storesListFormWrapper.addEventListener("click", this.onStoresListFormWrapperClick);
		storeDetailsFormWrapper.addEventListener("click", this.onStoreDetailsFormWrapper);
		storesListForm.addEventListener("focus", (e) => {
            this._onFocus(e);
        },true);
		productsListForm.addEventListener("focus", (e) => {
            this._onFocus(e);
        },true);
		storesListForm.addEventListener("keyup", this._onKeyup);
		productsListForm.addEventListener("keyup", this._onKeyup);
		storesListForm.addEventListener("blur", (e) => {
            this._onBlur(e);
        },true);
		productsListForm.addEventListener("blur", (e) => {
            this._onBlur(e);
        },true);

        model
			.fetchStoresList(view.showSpinner, view.hideSpinner)
			.then((storesList) => {
				view.renderStoresList(storesList);
			})
			.catch((err) => console.log(err));
	};

	let _pickedStoreId = null;

	/**
	 * Create store button click handler.
	 *
	 * @listens click
	 *
	 * @private
	 */
    this._onButtonCreateStoreClick = function() {
        view.openModal(".stores-list__modal"); 
    }

	/**
	 * Create product button click handler.
	 *
	 * @listens click
	 *
	 * @private
	 */
    this._onButtonCreateProductClick = function() {
        view.openModal(".store-details__modal"); 
    }

	/**
	 * Delete store button click event handler. Send delete request. Render new stores list.
	 *
	 * @listens click
	 *
	 * @param {Event} e the DOM event object.
	 *
	 * @private
	 */
	this._onButtonDeleteStoreClick = function(e) {
		e.stopImmediatePropagation();
		const confirmation = confirm("Are you sure you want to delete this store?"); 
		if(confirmation) {
			model.deleteStore(_pickedStoreId) 
			.then(() => {
				const messageElement = view.getTostMessage();
				messageElement.classList.remove("hide");
				messageElement.innerHTML = "The store has been deleted!";
				setTimeout(() => {
					messageElement.classList.add("hide");
				}, 2000);
			})
			.then(() => {
				model.fetchStoresList(view.showSpinner, view.hideSpinner)
					.then(newStoresList => {
						view.renderStoresList(newStoresList);
						view.showEmptyBlock();
					});
			})
			.catch((err) => console.log(err));
		}
	}

	/**
	 * Popup click event handler. Listens events on the buttons: create product or store and cancel.
	 *
	 * @listens click
	 *
	 * @param {Event} e the DOM event object.
	 *
	 * @private
	 */
    this._onPopupClick = function(e) {
        if(e.target.closest(".stores-list__modal .button_cancel")) {
			e.stopImmediatePropagation();
            view.closeModal(".stores-list__modal");
        }

		if(e.target.closest(".store-details__modal .button_cancel")) {
			e.stopImmediatePropagation();
			view.closeModal(".store-details__modal");
		}
		
        if(e.target.closest(".stores-list__modal .button_form-create")) {
        	e.preventDefault();
			const formData = view.getFormStoreData();
			const inputsArray = Object.values(formData);
			const validData = {};
			inputsArray.forEach(input => {
				input.addEventListener("focus", (e) => {
					e.preventDefault();
					view.removeInputError(input)
				});
			});
			const isValidForm = inputsArray.every(el => {
				const isValidInput = model.validate(el);
				if(!isValidInput) {
					view.showInputError(el);
				}
				return isValidInput;
			});
			if(isValidForm) {
				const objKey = Object.keys(formData);
				objKey.forEach((item, index) => {
					validData[item] = inputsArray[index].value
				});
				model
				.postStore(validData)
				.then(() => {
					view.closeModal(".stores-list__modal");
					view.showTostMessage("The store has been created!");
					setTimeout(() => {
						view.closeTostMessage();
					}, 3000);
				})
				.then(() => {
					model
						.fetchStoresList(view.showSpinner, view.hideSpinner)
						.then(newStoresList => {
							view.renderStoresList(newStoresList);
						});
				})
				.catch((err) => console.log(err));
			} else {
				return;
			}
        }
		if(e.target.closest(".store-details__modal .button_form-create")) {
        	e.preventDefault();
			const formData = view.getFormProductData(_pickedStoreId);
			const status = view.getProductsFormSelectElement().value;
			const inputsArray = Object.values(formData);
			const validData = {
				"Photo" : "Photo",
				"StoreId": _pickedStoreId,
				"Status": status,
			}
			inputsArray.forEach(el => {
				el.addEventListener("click", (e) => {
					e.preventDefault();
					view.removeInputError(el)
				});
			});
			const isValidForm = inputsArray.every(el => {
				const isValidInput = model.validate(el);
				if(!isValidInput) {
					view.showInputError(el);
				}
				return isValidInput;
			});
			if(isValidForm) {
				const objKey = Object.keys(formData);
				objKey.forEach((item, index) => {
					validData[item] = inputsArray[index].value
				});
				model
				.postProduct(validData)
					.then(() => {
						view.closeModal(".store-details__modal");
						view.showTostMessage("The store has been created!");
						setTimeout(() => {
							view.closeTostMessage();
						}, 3000);
					})
				.then(() => {
					model
						.fetchStore(_pickedStoreId, view.showSpinner, view.hideSpinner)
						.then((store) => {
							const statusInfo = model.getStatusInfo(store);
							view.renderStoreTable(store);
							view.renderStatusInfo(statusInfo, store);
							return store;
						});
				})
				.catch((err) => console.log(err))
			} else {
				return false;
			}
		}	
    }

	/**
	 * Stores container click handler. Listens events on the list items.
	 *
	 * @listens click
	 *
	 * @private
	 */
	this._onStoresContainerClick = function(e) {
		if (e.target.closest(".list__item")) {
			const listItem = e.target.closest(".list__item");
			const storeId = listItem.dataset.storeId;
			_pickedStoreId = storeId;
			view.pickClickedStore(_pickedStoreId);
			model
				.fetchStore(_pickedStoreId, view.showSpinner, view.hideSpinner)
				.then((store) => {
					const statusInfo = model.getStatusInfo(store);
					view.renderStatusInfo(statusInfo, store);
					view.renderStoreTable(store);
					return store;
				});
			model
				.fetchStoreInfo(_pickedStoreId)
				.then((storeInfo) => {
					view.renderStoreInfo(storeInfo);
				});
		} else {
			return;
		}
	}

	/**
	 * Products status controls container click handler.
	 *
	 * @listens click
	 *
	 * @private
	 */
	this._onProductsStatusContainerClick = function(e) {
		view.removeAllActiveStatusControlsView();
		if (e.target.closest(".store-details__status-wrapper") || (e.target.closest(".store-details__products-count"))) {
			view.removeActiveStatusControlsView();
		} else {
			return;
		}
		if (e.target.closest(".store-details__status-wrapper")) {
			const selectedElementId = e.target.closest(".store-details__status-wrapper").dataset.status;
			view.removeActiveStatusControlsView();
			view.addActiveStatusControlsView(selectedElementId);
			view.renderStoreTable(model.filterStatusProducts(selectedElementId));
		} else if ((e.target.closest(".store-details__products-count"))) {
			view.addActiveProductsCountView();
			view.renderStoreTable(model.filterStatusProducts("ALL"));
		} 
	}

	/**
	 * Products container click handler. Listens events on the buttons: delete product, fix info in product, sort products list.
	 *
	 * @listens click
	 *
	 * @private
	 */
	this._onProductsContainerClick = function(e) {
		if(e.target.closest(".clear")) {
			e.preventDefault();
			const deleteElemId = e.target.dataset.productId;
			const confirmation = confirm("Are you sure you want to delete this product?"); 
			if(confirmation) {
				model.deleteProduct(deleteElemId) 
				.then(() => {
					view.showTostMessage("The product has been deleted!");
					setTimeout(() => {
						view.closeTostMessage();
					}, 3000);
				})
				.then(() => {
					model
						.fetchStore(_pickedStoreId, view.showSpinner, view.hideSpinner)
						.then((res) => {
							const statusInfo = model.getStatusInfo(res);
							view.renderStoreTable(res);
							view.renderStatusInfo(statusInfo, statusInfo);
						});
				})
				.catch((err) => console.log(err));
			}
		}
		if (e.target.closest(".fix-product-info")) {
			const fixedElemId = e.target.closest(".fix-product-info").dataset.productId;
			model.fetchOneProduct(fixedElemId)
				.then(([res]) => {
					return res;
				})
				.then(res => {
					model.putProduct(fixedElemId, res) 
					.then(res => {
						view.openModal(".store-details__modal");
						view.fixProductData(res);
						return res;
					})
					.then(() => {
						model.deleteProduct(fixedElemId)
						.then((res) => res);
					})
					
				})
				.catch(error => console.log(error))
			
		}
		if (e.target.closest(".button-sort")) {
			view.removeCheckedDatasetSortButtons();
			const targetedButton = e.target.closest(".button-sort");
			const type = e.target.closest(".button-sort").dataset.sort;
			const sortType = e.target.closest(".button-sort").dataset.sortType;
			view.addStyleButtonsSort(targetedButton);
			view.renderStoreTable(model.sortProductsList(type, sortType))
		}
	}

	/**
	 * Stores list form wrapper click handler. Listens events on the buttons: search store, clear field, reset field.
	 *
	 * @listens click
	 *
	 * @private
	 */
	this.onStoresListFormWrapperClick = function (e) {
		e.preventDefault();
		if (e.target.closest(".button_search")) {
			const listSearchFormText = view.getSearchFormInputValue(+e.target.closest(".button_search").dataset.position);
			const type = "list";
			view.renderStoresList(model.searchElements(listSearchFormText, type));
		}
		if (e.target.closest(".button_clear")) {
			e.preventDefault();
			view.removeStoresFormValue();
			view.hideClearButton(+e.target.closest(".button_clear").dataset.position);
		}
		if (e.target.closest(".button_restart")) {
			e.preventDefault();
			model
				.fetchStoresList(view.showSpinner, view.hideSpinner)
				.then((storesList) => {
					view.renderStoresList(storesList);
				})
				.catch((err) => console.log(err));
		}
	}

	/**
	 * Products table form wrapper click handler. Listens events on the buttons: search store, clear field, reset field.
	 *
	 * @listens click
	 *
	 * @private
	 */
	this.onStoreDetailsFormWrapper = function (e) {
		e.preventDefault();
		if (e.target.closest(".button_search")) {
			const listSearchFormText = view.getSearchFormInputValue(+e.target.closest(".button_search").dataset.position);
			const type = "store";
			view.renderStoreTable(model.searchElements(listSearchFormText, type));
			const statusInfo = model.getStatusInfo()
			view.renderStatusInfo(statusInfo);
		}
		if (e.target.closest(".button_clear")) {
			e.preventDefault();
			view.removeProductsFormValue();
			view.hideClearButton(+e.target.closest(".button_clear").dataset.position);
		}
		if (e.target.closest(".button_restart")) {
			e.preventDefault();
			view.removeActiveStatusControlsView();
			view.addActiveProductsCountView();
			view.pickClickedStore(_pickedStoreId);
			model
			.fetchStore(_pickedStoreId, view.showSpinner, view.hideSpinner)
			.then((store) => {
				const statusInfo = model.getStatusInfo()
				view.renderStatusInfo(statusInfo);
				view.renderStoreTable(store);
				return store;
			});
		}
	}

	/**
	 * Form stores list and products table focus helper.
	 *
	 * @listens focus
	 *
	 * @private
	 */
	this._onFocus = function(e) {
		const targetBtnPosition = +e.target.dataset.position;
		view.hideRestartButton(targetBtnPosition);
	}

	/**
	 * Form stores list and products table blur helper.
	 *
	 * @listens blur
	 *
	 * @private
	 */
	this._onBlur = function(e) {
		const targetBtnPosition = +e.target.dataset.position;
		const listSearchFormText = view.getSearchFormInputValue(targetBtnPosition);
		if(!listSearchFormText) {
			view.showRestartButton(targetBtnPosition);
		}
	}

	/**
	 * Form stores list and products table keyup helper.
	 *
	 * @listens keyup
	 *
	 * @private
	 */
	this._onKeyup = function (e) {
		const targetBtnPosition = +e.target.closest(".list-form__input").dataset.position;
		const listSearchFormText = view.getSearchFormInputValue(targetBtnPosition);
		view.showClearButton(targetBtnPosition, listSearchFormText);
	}
}

(new Controller(new View(), new Model())).init();