export default function View() {
    /**
	 * ID of the store details container DOM element'
	 * @constant
	 * @type {string}
	 */
    const EMPTY_STORE_DETAILS_BLOCK = "empty-page";

    /**
	 * ID of the store details table title DOM element'
	 * @constant
	 * @type {string}
	 */
	const STORE_DETAILS_TITLE = "store-details__title";

    /**
	 * ID of the store details header DOM element'
	 * @constant
	 * @type {string}
	 */
    const STORE_DETAILS_HEADER = "store-details__header";

	/**
	 * ID of the stores list container DOM element'
	 * @constant
	 * @type {string}
	 */
    const STORES_CONTAINER = "stores-container";

	/**
	 *  Class of the stores list DOM element'
	 * @constant
	 * @type {string}
	 */
	const LIST_STORES_ITEMS = "list__item";

	/**
	 * ID of the products table wrapper DOM element'
	 * @constant
	 * @type {string}
	 */
	const PRODUCTS_TABLE_WRAPPER = "store-details__table";

	/**
	 * ID of the products container DOM element'
	 * @constant
	 * @type {string}
	 */
	const PRODUCTS_CONTAINER = "products-container";

	/**
	 * ID of the products container DOM element'
	 * @constant
	 * @type {string}
	 */
	const PRODUCTS_STATUS_CONTAINER = "store-details__status";

	/**
	 * Group classes of products status controls DOM elements'
	 * @constant
	 * @type {string}
	 */
	const PRODUCTS_STATUS_CONTROLS = {
		OK:  "status-ok-js",
		STORAGE: "status-warning-js",
		"OUT_OF_STOCK": "status-error-js",
	};

	/**
	 * ID of the products count DOM element'
	 * @constant
	 * @type {string}
	 */
	const PRODUCTS_STATUS_COUNT = "store-details__products-count";

    /**
	 * ID of the button create store DOM element'
	 * @constant
	 * @type {string}
	 */
	const BUTTON_CREATE_STORE = "button_create-store";
	
	 /**
	 * ID of the button create product DOM element'
	 * @constant
	 * @type {string}
	 */
    const BUTTON_CREATE_PRODUCT = "button_create-product";

	 /**
	 * ID of the button delete store DOM element'
	 * @constant
	 * @type {string}
	 */
	const BUTTON_DELETE_STORE = "button_delete";
	
	 /**
	 * Class of the button sort products DOM element'
	 * @constant
	 * @type {string}
	 */
	const BUTTON_SORT = "button-sort";

     /**
	 * ID of the popup DOM element'
	 * @constant
	 * @type {string}
	 */
	const POPUP = "popup";

	 /**
	 * ID of the wrapper stores list form DOM element'
	 * @constant
	 * @type {string}
	 */
	const STORES_LIST_FORM_WRAPPER = "stores-list__form-wrapper";

	 /**
	 * ID of the wrapper products table form DOM element'
	 * @constant
	 * @type {string}
	 */
	const STORE_DETAILS_FORM_WRAPPER = "store-details__form-wrapper";

	/**
	 * ID of the stores list form DOM element'
	 * @constant
	 * @type {string}
	 */
	const STORES_LIST_FORM = "stores__list-form";

	/**
	 * ID of the products list form DOM element'
	 * @constant
	 * @type {string}
	 */
	const PRODUCTS_LIST_FORM = "products__list-form";

	/**
	 * Class of the list form inputs DOM element'
	 * @constant
	 * @type {string}
	 */
	const LIST_FORM_INPUTS = "list-form__input";

	/**
	 * ID of the create store form DOM element'
	 * @constant
	 * @type {string}
	 */
	const CREATE_STORE_FORM = "create-store-form";

	/**
	 * ID of the create product form DOM element'
	 * @constant
	 * @type {string}
	 */
	const CREATE_PRODUCT_FORM = "create-product-form";

	/**
	 * Class of the form search button DOM element'
	 * @constant
	 * @type {string}
	 */
	const SEARCH_FORM_SEARCH_BUTTONS = "button_search";

	/**
	 * Class of the form reset button DOM element'
	 * @constant
	 * @type {string}
	 */
	const SEARCH_FORM_RESTART_BUTTONS = "button_restart";

	/**
	 * Class of the form clear button DOM element'
	 * @constant
	 * @type {string}
	 */
	const SEARCH_FORM_CLEAR_BUTTONS = "button_clear";

	/**
	 * ID tost message DOM element'
	 * @constant
	 * @type {string}
	 */
	const TOST_MESSAGE = "tost-message";

    /**
	 * ID tost message DOM element'
	 * @constant
	 * @type {string}
	 */
    const FORM_SELECT = "select-status";
	
	/**
	 * Open popup element.
	 *
	 * @param {string} selector the name of class.
	 *
	 * @public
	 */
    this.openModal = function(selector) {
		const formModal = document.querySelector(selector);
		const popup = this.getPopup();
        popup.style.display = "block";
        formModal.style.display = "block";
    }

	/**
	 * Close popup element, remove inputs style.
	 *
	 * @param {string} selector the name of class.
	 *
	 * @public
	 */
    this.closeModal = function(selector) {
		const formModal = document.querySelector(selector);
		const createProductForm = this.getProductCreateForm();
		const createStoreForm = this.getStoreCreateForm();
        if(selector === ".stores-list__modal") {
            const inputsStoreObject = this.getFormStoreData();
            const inputsStoreArray = Object.values(inputsStoreObject);
            this.hideInputsStyle(inputsStoreArray);
        }
        if(selector === ".store-details__modal") {
            const inputsProductsObject = this.getFormProductData();
            const inputsProductsArray = Object.values(inputsProductsObject);
            this.hideInputsStyle(inputsProductsArray);
        }
        
		createProductForm.reset();
		createStoreForm.reset();
		const popup = this.getPopup();
        popup.style.display = "none";
        formModal.style.display = "none";
    }

    this.hideInputsStyle = function (inputsArray) {
        inputsArray.forEach(el => {
            this.removeInputError(el)
        });
    }
	/**
	 * Show product list.
	 *
	 * @public
	 */
	this.showStoreDetailsBlock = function () {
		const emptyStoreDetailsBlock = this.getEmptyStoreDetailsBlock();
		const storeDetailsTitle = this.getStoreDetailsTitle();
        const storeDetailsHeader = this.getStoreDetailsHeader();
        const storeDetailsTable = this.getProductsTableWrapper();

		emptyStoreDetailsBlock.classList.add("hide");
		storeDetailsTitle.classList.remove("hide");
        storeDetailsHeader.classList.remove("hide");
        storeDetailsTable.classList.remove("hide");
	}

	/**
	 * Show empty page.
	 *
	 * @public
	 */
	 this.showEmptyBlock = function () {
		const emptyStoreDetailsBlock = this.getEmptyStoreDetailsBlock();
		const storeDetailsTitle = this.getStoreDetailsTitle();
        const storeDetailsHeader = this.getStoreDetailsHeader();
        const storeDetailsTable = this.getProductsTableWrapper();

        emptyStoreDetailsBlock.classList.remove("hide");
		storeDetailsTitle.classList.add("hide");
        storeDetailsHeader.classList.add("hide");
        storeDetailsTable.classList.add("hide");
	}

	/**
	 * Pick selected store list element.
	 *
	 * @param {string} selectedElementId id selected element.
	 * 
	 * @public
	 */
	this.pickClickedStore = function (selectedElementId) {
		const listItems = this.getListStoresItems();
		listItems.forEach(item => {
			item.classList.remove("list__item_active");
			if (item.dataset.storeId === selectedElementId) {
				item.classList.add("list__item_active");
			}
		});
	}

	/**
	 * Render stores list.
	 *
	 * @param {Object[]} storesList array of stores list items.
	 * 
	 * @public
	 */
    this.renderStoresList = function(storesList) {
		const storesContainer = this.getStoresContainer();
		storesContainer.innerHTML = "";
        if(!storesList.length) {
            const emptyResult = ` 
                <li>
                    <td class="table-list__col">Not found.</td>
                </li>`;
				storesContainer.innerHTML = emptyResult;
			return;
        }
        const storesListRender = storesList.map(({ id, Name, Address, FloorArea }) => {
            return `
                <li class="list__item" data-store-id="${id}">
                    <div class="list__cell-wrapper">
                        <div class="list__contact-info">
                            <div class="list__name">${Name}</div>
                            <div class="list__address">${Address}</div>
                        </div>
                        <div class="list__store-area">
                            <div class="list__area">${FloorArea}</div>
                            <div class="list__dimension">sq. m</div>	
                        </div>
                    </div>
                </li>
            `;
        })
        .join(" ");
        storesContainer.innerHTML = storesListRender;
    }

	/**
	 * Render picked store products.
	 *
	 * @param {Object[]} productsArray array of products.
	 * 
	 * @public
	 */
	this.renderStoreTable = function(productsArray) {
		const productsContainer = this.getProductsContainer();
		this.showStoreDetailsBlock();
		productsContainer.innerHTML = "";
		
		if(productsArray.length === 0) {
			productsContainer.innerHTML = `
			<tr>
				<td class="table-list__col">Not found.</td>
			</tr>
			`;
			return ;
		}
		const tableProductRow = productsArray.map((product, index) => {
				const {
					Name,
					Price,
					Specs,
					Rating,
					SupplierInfo,
					MadeIn,
					ProductionCompanyName,
					id
				} = product;
				return `<tr class="table-product__row" data-product-id=${id}>
						<td class="table-product__col col_name">
							<div>${Name}</div>
							<div>${index + 1}</div>
						</td>
						<td class="table-product__col col_price">
							<span><strong>${Price}</strong> USD</span>
						</td>
						<td class="table-product__col col_specs">
							<div class="col_hide-text" title="${Specs}elem">${Specs}</div>
						</td>
						<td class="table-product__col col_info">
							<div class="col_hide-text" title="${SupplierInfo}">${SupplierInfo}</div>
						</td>
						<td class="table-product__col col_country">${MadeIn}</td>
						<td class="table-product__col col_company" title="${ProductionCompanyName}">
							<div class="col_hide-text">${ProductionCompanyName}</div>
						</td>
						<td class="table-product__col col_rating">
							<div class="table-product__stars-wrapper">
								${this.renderStars(Rating)}
							</div>
						</td>
						<td class="table-product__col icon-arrow-right">
							<div class="fix-product-info" data-product-id=${id}>
								<i class="material-icons" >border_color</i>
							</div>
							<div class="clear" data-product-id=${id}>
								<i class="material-icons clear" data-product-id=${id}>clear</i>
							</div>
						</td>
				</tr>`;
				})
				.join(" ");
			productsContainer.innerHTML = tableProductRow;
	}

	/**
	 * Render rating stars for products table.
	 *
	 * @param {number} rating amount stars for render.
	 * 
	 * @public
	 */
	this.renderStars = function(rating) {
        let stars = "";
        const starsAmount = 5;
        for (let i = 0; i < starsAmount; i++) {
            if (i < rating) {
                stars +=
                    '<i class="material-icons icon-star_colored">star</i> ';
            } else {
                stars += '<i class="material-icons icon-star">star_border</i> ';
            }
        }
        return stars;
    }

	/**
	 * Render info about picked store.
	 *
	 * @param {Object[]} rating array with one object.
	 * 
	 * @public
	 */
	this.renderStoreInfo = function([{ Email, PhoneNumber, Address, Established, FloorArea }]) {
		const contactInfoEmailJs = document.querySelector(".email-js");
        const contactInfoPhoneJs = document.querySelector(".phone-js");
        const contactInfoAddressJs = document.querySelector(".address-js");
        const contactInfoDateJs = document.querySelector(".date-js");
        const contactInfoAreaJs = document.querySelector(".area-js");
		const established = new Date(Established);
		contactInfoEmailJs.innerHTML = `${Email}`;
		contactInfoEmailJs.href = `mailto:${Email}`;
		contactInfoPhoneJs.innerHTML = `${PhoneNumber}`;
		contactInfoPhoneJs.href = `tel:${PhoneNumber}`;
		contactInfoAddressJs.innerHTML = `${Address}`;
		contactInfoDateJs.innerHTML = `${String(established).slice(4, 15)}`;
		contactInfoAreaJs.innerHTML = `${FloorArea}`;
	}
	
	/**
	 * Render info for products status controls.
	 *
	 * @param {Object} statusInfoObject object with information about status.
	 * @param {number} length all products count.
	 * 
	 * @public
	 */
	this.renderStatusInfo = function ([statusInfoObject, length]) {
		const storeProductStatus = document.querySelectorAll(".status-count");
        const productsCount = document.querySelector(".store-details__products-count");
        const statusArray = Object.keys(statusInfoObject);
		productsCount.innerHTML = `<div> ${length} <small>All</small></div>`;
       
        statusArray.forEach((status, index) => {
            storeProductStatus[index].innerHTML = `${statusInfoObject[status]}`;
        });
    }

	/**
	 * Remove active style status controls and count products control.
	 */
	this.removeAllActiveStatusControlsView = function () {
		const statusProductsControls = this.getStatsProductsControls();
		Object.values(statusProductsControls).forEach(item => {
            item.classList.remove("store-details__status_active");
        });
	}

    /**
	 * Remove active style status controls.
	 */
	this.removeActiveStatusControlsView = function () {
		const statusProductsControls = this.getStatsProductsControls();
		Object.values(statusProductsControls).forEach((item, index) => {
			item.style.borderColor = ""
			item.classList.remove("store-details__status_active");
			document.querySelector(".icon-round_done").classList.remove("icon-round_done-active");
			document.querySelector(".icon-done").classList.remove("icon_done-active");
			document.querySelector(".icon-round_warning").classList.remove("icon-round_warning-active");
			document.querySelector(".icon-warning").classList.remove("icon_warning-active");
			document.querySelector(".icon-round_error").classList.remove("icon-round_error-active");
			document.querySelector(".icon-error").classList.remove("icon_error-active");
		});
	}

    /**
	 * Add active style selected status control.
	 */
	this.addActiveStatusControlsView = function(selectedElementId) {
		const statusProductsCount = this.getStatusProductsCount();
		const statusProductsControls = this.getStatsProductsControls();
		statusProductsCount.classList.remove("store-details__status_active");
		statusProductsControls[selectedElementId].classList.add("store-details__status_active");
		switch(selectedElementId) {
			case "OK":
				document.querySelector(".icon-round_done").classList.add("icon-round_done-active");
				document.querySelector(".icon-done").classList.add("icon_done-active");
				statusProductsControls[selectedElementId].style.borderColor = "#1b5e20";
				break;
			case "STORAGE":
				document.querySelector(".icon-round_warning").classList.add("icon-round_warning-active");
				document.querySelector(".icon-warning").classList.add("icon_warning-active");
				statusProductsControls[selectedElementId].style.borderColor = "#ffb300";
				break;
			case "OUT_OF_STOCK":
				document.querySelector(".icon-round_error").classList.add("icon-round_error-active");
				document.querySelector(".icon-error").classList.add("icon_error-active");
				statusProductsControls[selectedElementId].style.borderColor = "#d32f2f";
				break;
		}
	}

    /**
	 * Add active style for count control.
	 */
	this.addActiveProductsCountView = function () {
		const statusProductsCount = this.getStatusProductsCount();
		statusProductsCount.classList.add("store-details__status_active");
	}

     /**
	 * Remove data-attr clicked for sort buttons.
	 */
	this.removeCheckedDatasetSortButtons = function () {
		const buttonsSort = this.getButtonsSort();
		buttonsSort.forEach(btn => {
				if(btn.dataset.clicked === "clicked") {
					btn.dataset.clicked = "";
				}
			});
	}

    /**
	 * Add style for clicked sort buttons.
     * 
     * @param {HTMLButtonElement} targetedButton checked sort button.
	 */
	this.addStyleButtonsSort = function (targetedButton) {
		targetedButton.dataset.clicked = "clicked";
		const buttonsSort = this.getButtonsSort();
		buttonsSort.forEach(btn => {
			if(btn.dataset.clicked === "") {
				btn.classList.remove("button-sort_active");
				btn.sortType = "not";
				btn.innerHTML = `
					<span><i class="material-icons icon-sort">compare_arrows</i></span>
				`;
			}
		});
		targetedButton.classList.add("button-sort_active");
		const sortType = targetedButton.dataset.sortType;
		if(sortType === "not") {
			targetedButton.dataset.sortType = "up";
			targetedButton.innerHTML = `
					<span><i class="material-icons icon-sort">arrow_upward</i></span>
				`;
		} 
		if(sortType === "up") {
			targetedButton.dataset.sortType = "down";
			targetedButton.innerHTML = `
					<span><i class="material-icons icon-sort">arrow_downward</i></span>
				`;
		} 
		if(sortType === "down") {
			targetedButton.dataset.sortType = "not";
			targetedButton.innerHTML = `
					<span><i class="material-icons icon-sort">compare_arrows</i></span>
				`;
		}
	}

     /**
	 *Get info from create store form inputs for create form request.
     * 
     * @return {Object} with inputs DOM elements.
	 */
	this.getFormStoreData = function () {
		const createStoreForm = this.getStoreCreateForm();
		const fieldsArray = ["Name", "Email", "PhoneNumber", "Address", "Established", "FloorArea"];
		const data = {};
		fieldsArray.forEach(item => {
			data[item] = createStoreForm[item];
		});
        return data;
	}

    /**
	 *Put info in products create form after put request.
     * 
     * @param {Object} responseData object with service request .
	 */
    this.fixProductData = function (responseData) {
        const createProductForm = this.getProductCreateForm();
        const fieldsArray = ["Name", "Price", "Specs", "Rating", "SupplierInfo", "MadeIn", "ProductionCompanyName"];
		fieldsArray.forEach(item => {
			createProductForm[item].value = responseData[item];
		});
    }

    /**
	 *Get info from create product form inputs for create form request.
     * 
     * @return {Object} with inputs DOM elements.
	 */
	this.getFormProductData = function () {
		const createProductForm = this.getProductCreateForm();
		const fieldsArray = ["Name", "Price", "Specs", "Rating", "SupplierInfo", "MadeIn", "ProductionCompanyName"];
		const data ={};
		fieldsArray.forEach(item => {
			data[item] = createProductForm[item];
		});
        return data;
	}

    /**
	 *Add error style for input.
     * 
     * @param {HTMLInputElement} el input DOM element.
	 */
    this.showInputError = function(el) {
        const parent = el.parentElement;
        const msg = el.dataset.invalidMessage;
        const err = parent.querySelector(".invalid-feedback");
        err.style.display = "block";
        err.innerHTML = msg;
        el.classList.add("is-invalid");
    }

    /**
	 *Remove error style for input.
     * 
     * @param {HTMLInputElement} el input DOM element.
	 */
    this.removeInputError = function(el) {
        const parent = el.parentElement;
        const err = parent.querySelector(".invalid-feedback");
        el.classList.remove("is-invalid");
        err.style.display = "none";
    }
   
    /**
	 *Show reset button in search stores list or products table form.
     * 
     * @param {number} index index in DOM list.
	 */
	this.showRestartButton = function(index) {
		const buttonsSearch = this.getSearchFormSearchButtons();
		const buttonsRestart = this.getSearchFormRestartButtons();
		buttonsRestart[index].style.display = "block";
        buttonsSearch[index].style.right = "36px";
	}

    /**
	 *Show clear button in search stores list or products table form.
     * 
     * @param {number} index index data-attr position in DOM list.
     * @param {string} value search form text;
	 */
	this.showClearButton = function(index, value) {
		const buttonsClear = this.getSearchFormClearButtons();
		if(value.length) {
			buttonsClear[index].style.display = "block";
		} else {
			buttonsClear[index].style.display = "none";
		}
	}

    /**
	 *Hide clear button in search stores list or products table form.
     * 
     * @param {number} index index data-attr position in DOM list.
	 */
	this.hideClearButton = function (index) {
		const buttonsClear = this.getSearchFormClearButtons();
		buttonsClear[index].style.display = "none";
		this.showRestartButton(index);
	}
    /**
	 *Hide reset button in search stores list or products table form.
     * 
     * @param {number} index index data-attr position in DOM list.
	 */
	this.hideRestartButton = function(index) {
		const buttonsSearch = this.getSearchFormSearchButtons();
		const buttonsRestart = this.getSearchFormRestartButtons();
		buttonsRestart[index].style.display = "none";
        buttonsSearch[index].style.right = "12px";
	}

    /**
	 *Remove text in search stores list form.
	 */
	this.removeStoresFormValue = function () {
		const form = this.getStoresListForm();
		form.reset();
	}

    /**
	 *Remove text in search products table form.
	 */
	this.removeProductsFormValue = function () {
		const form = this.getProductsListForm();
		form.reset();
	}

    this.showTostMessage = function (msg) {
        const messageElement = this.getTostMessage();
        messageElement.classList.remove("hide")
        messageElement.innerHTML = msg;
    }

    this.closeTostMessage = function () {
        const messageElement = this.getTostMessage();
        messageElement.classList.add("hide");
    }

	/**
	 * Return search form value.
	 *
	 * @param {number} index index form input in array.
	 *
	 * @return {string} searched text.
	 */
	this.getSearchFormInputValue = function (index) {
		const listFormInputs = this.getListFormInputs();
		return listFormInputs[index].value;
	}

	/**
	 * Show spinner style.
	 *
	 * @public
	 */
	this.showSpinner = function () {
		document.querySelector(".stores-list .spinner").classList.remove("hide");
		document.querySelector(".stores-list .spinner").classList.add("show");
	}

	/**
	 * Hide spinner style.
	 *
	 * @public
	 */
	this.hideSpinner = function () {
		document.querySelector(".stores-list .spinner").classList.remove("show");
		document.querySelector(".stores-list .spinner").classList.add("hide");
	}

	/**
	 * Returns the container for stores elements.
	 *
	 * @returns {HTMLUlElement} the ul element.
	 *
	 * @public
	 */
	this.getStoresContainer = function () {
		return document.querySelector("#" + STORES_CONTAINER);
	};

	/**
	 * Returns the container for products elements.
	 *
	 * @returns {HTMLTbodyElement} the tbody element.
	 *
	 * @public
	 */
	this.getProductsContainer = function () {
		return document.querySelector("#" + PRODUCTS_CONTAINER);
	}

	/**
	 * Returns the products table wrapper.
	 *
	 * @returns {HTMLDivElement} the div element.
	 *
	 * @public
	 */
	this.getProductsTableWrapper = function () {
		return document.querySelector("#" + PRODUCTS_TABLE_WRAPPER);
	}

    /**
	 * Returns the empty store details block.
	 *
	 * @returns {HTMLDivElement} the div element.
	 *
	 * @public
	 */
    this.getEmptyStoreDetailsBlock = function () {
        return document.querySelector("#" + EMPTY_STORE_DETAILS_BLOCK);
    }

     /**
	 * Returns the store details table title.
	 *
	 * @returns {HTMLDivElement} the div element.
	 *
	 * @public
	 */
    this.getStoreDetailsTitle = function () {
        return document.querySelector("#" + STORE_DETAILS_TITLE);
    }

    /**
	 * Returns the store details  header.
	 *
	 * @returns {HTMLDivElement} the div element.
	 *
	 * @public
	 */
    this.getStoreDetailsHeader = function () {
        return document.querySelector("#" + STORE_DETAILS_HEADER);
    }

	/**
	 * Returns the stores list group.
	 *
	 * @returns {HTMLLiElement} the li element.
	 *
	 * @public
	 */
	this.getListStoresItems = function () {
		return document.querySelectorAll("." + LIST_STORES_ITEMS);
	}

	/**
	 * Returns the create store button.
	 *
	 * @returns {HTMLButtonElement} the button element.
	 *
	 * @public
	 */
    this.getButtonCreateStore = function () {
        return document.querySelector("#" + BUTTON_CREATE_STORE);
    }

	/**
	 * Returns the create product button.
	 *
	 * @returns {HTMLButtonElement} the button element.
	 *
	 * @public
	 */
    this.getButtonCreateProduct = function () {
        return document.querySelector("#" + BUTTON_CREATE_PRODUCT);
    }

	/**
	 * Returns the delete store button.
	 *
	 * @returns {HTMLButtonElement} the button element.
	 *
	 * @public
	 */
	this.getButtonDeleteStore = function () {
		return document.querySelector("#" + BUTTON_DELETE_STORE);
	}

	/**
	 * Returns the products table sort buttons.
	 *
	 * @returns {HTMLButtonElement} the button element.
	 *
	 * @public
	 */
	this.getButtonsSort = function () {
		return document.querySelectorAll("." + BUTTON_SORT);
	}

	/**
	 * Returns the modal popup.
	 *
	 * @returns {HTMLDivElement} the div element.
	 *
	 * @public
	 */
    this.getPopup = function () {
        return document.querySelector("#" + POPUP);
    }

	/**
	 * Returns the products status elements container.
	 *
	 * @returns {HTMLDivElement} the div element.
	 *
	 * @public
	 */
	this.getProductsStatusContainer = function () {
		return document.querySelector("#" + PRODUCTS_STATUS_CONTAINER);
	}

	/**
	 * Returns the products count wrappers group.
	 *
	 * @returns {HTMLDivElement} the div element.
	 *
	 * @public
	 */
	this.getStatusProductsCount = function() {
		return document.querySelector("#" + PRODUCTS_STATUS_COUNT);
	}

	/**
	 * Returns the status products control wrappers.
	 *
	 * @returns {HTMLDivElement} the div element.
	 *
	 * @public
	 */
	this.getStatsProductsControls = function () {
		return  {
            OK: document.querySelector("." + PRODUCTS_STATUS_CONTROLS["OK"]),
            STORAGE: document.querySelector("." + PRODUCTS_STATUS_CONTROLS["STORAGE"]),
            "OUT_OF_STOCK":  document.querySelector("." + PRODUCTS_STATUS_CONTROLS["OUT_OF_STOCK"]),
        }
	}

	/**
	 * Returns the search form search buttons.
	 *
	 * @returns {HTMLButtonElement} the buttons elements group.
	 *
	 * @public
	 */
	this.getSearchFormSearchButtons = function () {
		return document.querySelectorAll(`.${SEARCH_FORM_SEARCH_BUTTONS}`);
	}

	/**
	 * Returns the search form reset buttons.
	 *
	 * @returns {HTMLButtonElement} the buttons elements group.
	 *
	 * @public
	 */
	this.getSearchFormRestartButtons = function () {
		return document.querySelectorAll(`.${SEARCH_FORM_RESTART_BUTTONS}`);
	}

	/**
	 * Returns the search form clear buttons.
	 *
	 * @returns {HTMLButtonElement} the buttons elements group.
	 *
	 * @public
	 */
	this.getSearchFormClearButtons = function () {
		return document.querySelectorAll(`.${SEARCH_FORM_CLEAR_BUTTONS}`);
	}

	/**
	 * Returns the list  search form wrapper.
	 *
	 * @returns {HTMLDivElement} the div element.
	 *
	 * @public
	 */
	this.getStoresListFormWrapper = function () {
		return document.querySelector("#" + STORES_LIST_FORM_WRAPPER);
	}

	/**
	 * Returns the products search form wrapper.
	 *
	 * @returns {HTMLDivElement} the div element.
	 *
	 * @public
	 */
	this.getStoreDetailsFormWrapper = function () {
		return document.querySelector("#" + STORE_DETAILS_FORM_WRAPPER);
	}

	/**
	 * Returns the stores list search form.
	 *
	 * @returns {HTMLFormElement} the form element.
	 *
	 * @public
	 */
	this.getStoresListForm = function () {
		return document.querySelector("#" + STORES_LIST_FORM);
	}

	/**
	 * Returns the products table search form.
	 *
	 * @returns {HTMLFormElement} the form element.
	 *
	 * @public
	 */
	this.getProductsListForm = function () {
		return document.querySelector("#" + PRODUCTS_LIST_FORM);
	}

	/**
	 * Returns the products table  and stores list search form input elements group.
	 *
	 * @returns {HTMLInputElement} the input element.
	 *
	 * @public
	 */
	this.getListFormInputs = function () {
		return document.querySelectorAll("." + LIST_FORM_INPUTS);
	}

	/**
	 * Returns the store create form.
	 *
	 * @returns {HTMLFormElement} the form element.
	 *
	 * @public
	 */
	this.getStoreCreateForm = function () {
		return document.forms[CREATE_STORE_FORM]
	}

	/**
	 * Returns the product create form.
	 *
	 * @returns {HTMLFormElement} the form element.
	 *
	 * @public
	 */
	this.getProductCreateForm = function () {
		return document.forms[CREATE_PRODUCT_FORM]
	}

	/**
	 * Returns the wrapper for tost message.
	 *
	 * @returns {HTMLDivElement} the div element.
	 *
	 * @public
	 */
	this.getTostMessage = function () {
		return document.querySelector("#" + TOST_MESSAGE);
	}

    /**
	 * Returns select element in products form.
	 *
	 * @returns {HTMLSelectElement} the select element.
	 *
	 * @public
	 */
    this.getProductsFormSelectElement = function () {
        return document.querySelector("#" + FORM_SELECT);
    }
}
