import {
  require_prop_types
} from "./chunk-3CIWYIXP.js";
import {
  require_react
} from "./chunk-W5VMUIAY.js";
import {
  __commonJS
} from "./chunk-2TUXWMP5.js";

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/react-contenteditable/lib/react-contenteditable.js
var require_react_contenteditable = __commonJS({
  "node_modules/react-contenteditable/lib/react-contenteditable.js"(exports) {
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = __importStar(require_react());
    var fast_deep_equal_1 = __importDefault(require_fast_deep_equal());
    var PropTypes = __importStar(require_prop_types());
    function normalizeHtml(str) {
      return str && str.replace(/&nbsp;|\u202F|\u00A0/g, " ").replace(/<br \/>/g, "<br>");
    }
    function replaceCaret(el) {
      var target = document.createTextNode("");
      el.appendChild(target);
      var isTargetFocused = document.activeElement === el;
      if (target !== null && target.nodeValue !== null && isTargetFocused) {
        var sel = window.getSelection();
        if (sel !== null) {
          var range = document.createRange();
          range.setStart(target, target.nodeValue.length);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
        if (el instanceof HTMLElement)
          el.focus();
      }
    }
    var ContentEditable = (
      /** @class */
      function(_super) {
        __extends(ContentEditable2, _super);
        function ContentEditable2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.lastHtml = _this.props.html;
          _this.el = typeof _this.props.innerRef === "function" ? { current: null } : React.createRef();
          _this.getEl = function() {
            return (_this.props.innerRef && typeof _this.props.innerRef !== "function" ? _this.props.innerRef : _this.el).current;
          };
          _this.emitChange = function(originalEvt) {
            var el = _this.getEl();
            if (!el)
              return;
            var html = el.innerHTML;
            if (_this.props.onChange && html !== _this.lastHtml) {
              var evt = Object.assign({}, originalEvt, {
                target: {
                  value: html
                }
              });
              _this.props.onChange(evt);
            }
            _this.lastHtml = html;
          };
          return _this;
        }
        ContentEditable2.prototype.render = function() {
          var _this = this;
          var _a = this.props, tagName = _a.tagName, html = _a.html, innerRef = _a.innerRef, props = __rest(_a, ["tagName", "html", "innerRef"]);
          return React.createElement(tagName || "div", __assign(__assign({}, props), { ref: typeof innerRef === "function" ? function(current) {
            innerRef(current);
            _this.el.current = current;
          } : innerRef || this.el, onInput: this.emitChange, onBlur: this.props.onBlur || this.emitChange, onKeyUp: this.props.onKeyUp || this.emitChange, onKeyDown: this.props.onKeyDown || this.emitChange, contentEditable: !this.props.disabled, dangerouslySetInnerHTML: { __html: html } }), this.props.children);
        };
        ContentEditable2.prototype.shouldComponentUpdate = function(nextProps) {
          var props = this.props;
          var el = this.getEl();
          if (!el)
            return true;
          if (normalizeHtml(nextProps.html) !== normalizeHtml(el.innerHTML)) {
            return true;
          }
          return props.disabled !== nextProps.disabled || props.tagName !== nextProps.tagName || props.className !== nextProps.className || props.innerRef !== nextProps.innerRef || props.placeholder !== nextProps.placeholder || !(0, fast_deep_equal_1.default)(props.style, nextProps.style);
        };
        ContentEditable2.prototype.componentDidUpdate = function() {
          var el = this.getEl();
          if (!el)
            return;
          if (this.props.html !== el.innerHTML) {
            el.innerHTML = this.props.html;
          }
          this.lastHtml = this.props.html;
          replaceCaret(el);
        };
        ContentEditable2.propTypes = {
          html: PropTypes.string.isRequired,
          onChange: PropTypes.func,
          disabled: PropTypes.bool,
          tagName: PropTypes.string,
          className: PropTypes.string,
          style: PropTypes.object,
          innerRef: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.func
          ])
        };
        return ContentEditable2;
      }(React.Component)
    );
    exports.default = ContentEditable;
  }
});
export default require_react_contenteditable();
//# sourceMappingURL=react-contenteditable.js.map
