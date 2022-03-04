(function(global) {

  'use strict';

  var extend = fabric.util.object.extend;

  if (!global.fabric) {
    global.fabric = { };
  }

  if (global.fabric.TextBoxVertical) {
    fabric.warn('fabric.TextBoxVertical is already defined.');
    return;
  }

  /**
   * Image class
   * @class fabric.Image
   * @extends fabric.Object
   * @tutorial {@link http://fabricjs.com/fabric-intro-part-1#images}
   * @see {@link fabric.Image#initialize} for constructor definition
   */
  fabric.TextBoxVertical = fabric.util.createClass(fabric.Image, /** @lends fabric.TextBoxVertical.prototype */ {

    _renderFill: function(ctx) {
      var elementToDraw = this._element;
      if (!elementToDraw) {
        return;
      }
      var scaleX = this._filterScalingX,
          scaleY = this._filterScalingY,
          w = this.width,
          h = this.height,
          min = Math.min,
          max = Math.max,
          // crop values cannot be lesser than 0.
          cropX = max(this.cropX, 0),
          cropY = max(this.cropY, 0),
          elWidth = elementToDraw.naturalWidth || elementToDraw.width,
          elHeight = elementToDraw.naturalHeight || elementToDraw.height,
          sX = cropX * scaleX,
          sY = cropY * scaleY,
          // the width height cannot exceed element width/height, starting from the crop offset.
          sW = min(w * scaleX, elWidth - sX),
          sH = min(h * scaleY, elHeight - sY),
          // x = -w / 2,
          x = w / 2 - elWidth, // Changed
          y = -h / 2,
          maxDestW = min(w, elWidth / scaleX - cropX),
          maxDestH = min(h, elHeight / scaleY - cropY);

      elementToDraw && ctx.drawImage(elementToDraw, sX, sY, sW, sH, x, y, maxDestW, maxDestH);
    },

    // 高さ、幅を要素より小さくしない
    render: function(ctx) {
      if (this.isNotVisible()) {
        return;
      }
      if (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen()) {
        return;
      }
      var elementToDraw = this._element;
      if (!elementToDraw) {
        return;
      }
      var elWidth = elementToDraw.naturalWidth || elementToDraw.width,
          elHeight = elementToDraw.naturalHeight || elementToDraw.height;
      this.height = Math.max(elHeight, this.height);
      this.width = Math.max(elWidth, this.width);
      this.callSuper('render', ctx);
    }
  });


  /**
   * Creates an instance of fabric.Image from an URL string
   * @static
   * @param {String} url URL to create an image from
   * @param {Function} [callback] Callback to invoke when image is created (newly created image is passed as a first argument). Second argument is a boolean indicating if an error occurred or not.
   * @param {Object} [imgOptions] Options object
   */
   fabric.TextBoxVertical.fromURL = function(url, callback, imgOptions) {
    fabric.util.loadImage(url, function(img, isError) {
      callback && callback(new fabric.TextBoxVertical(img, imgOptions), isError);
    }, null, imgOptions && imgOptions.crossOrigin);
  };

})(typeof exports !== 'undefined' ? exports : this);
