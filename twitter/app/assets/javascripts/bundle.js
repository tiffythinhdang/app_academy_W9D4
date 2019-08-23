/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  follow: (id) => {
    return $.ajax({
      method: "POST",
      url: `/users/${id}/follow/`,
      dataType: "JSON"
    });
  },

  unfollow: (id) => {
    return $.ajax({
      method: "DELETE",
      url: `/users/${id}/follow/`,
      dataType: "JSON"
    });
  },

  searchUser: (query) => {
    return $.ajax({
      method: "GET",
      url: "/users/search/",
      dataType: "JSON",
      data: {query}
    });
  }
};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow-toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow-toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class FollowToggle {
  constructor ($button) {
    this.userId = $button.data("user-id");
    this.followState = $button.data("initial-follow-state");
    this.$button = $button;
    this.render();
    this.$button.on("click", this.handleClick.bind(this));
  }

  render() {
    if (this.followState === "unfollowed") {
      this.$button.text("Follow!");
    } else {
      this.$button.text("Unfollow!");
    }
  }

  handleClick(e) {
    e.preventDefault();

    if (this.followState === "unfollowed") {
      APIUtil.follow(this.userId)
      .then( res => {
        let but = e.currentTarget;
        $(but).data("initial-follow-state", "followed");
        this.followState = "followed";
        return this.render();
      });

    } else {
      APIUtil.unfollow(this.userId).then(res => {
        let but = e.currentTarget;
        $(but).data("initial-follow-state", "unfollowed");
        this.followState = "unfollowed";
        return this.render();
      });
    }
  }
}

module.exports = FollowToggle;

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow-toggle */ "./frontend/follow-toggle.js");
const UserSearch = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");

$(() => {
  let $followButton = $(".follow-toggle");
  let $toggleFollow = new FollowToggle($followButton);
  let $searchNav = $(".user-search");
  
  let $userSearch = new UserSearch($searchNav);
});

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js")

class UserSearch {
  constructor($nav) {
    this.$nav = $nav;
    this.$input = $nav.find("input");
    this.$ul = $nav.find("ul");
    this.handleInput();
  }

  handleInput() {
    this.$input.on("input", (e) => {
      let that = this;
    
      let res = APIUtil.searchUser(that.$input.val());
      // debugger;
      res.then(res => {
      debugger;
      window.alert('works');
      console.log(res);
    }, () => {
      // window.alert('does not work');
    });
  });
  }  
}

module.exports = UserSearch;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map