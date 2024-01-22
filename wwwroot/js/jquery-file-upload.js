(function($) {
  'use strict';
  if ($("#fileuploader").length) {
    $("#fileuploader").uploadFile({
      url: "YOUR_FILE_UPLOAD_URL",
      fileName: "myfile"
    });
  }

  if ($("#fileuploader2").length) {
    $("#fileuploader2").uploadFile({
      url: "YOUR_FILE_UPLOAD_URL",
      fileName: "myfile"
    });
  }
})(jQuery);