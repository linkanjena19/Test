(function($) {
  'use strict';
 

  //Summernote editor
  if ($("#summernoteExample").length) {
    $('#summernoteExample').summernote({
      height: 300,
      tabsize: 2,
      toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],       
        //['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['codeview']]
      ]
    });
  }

})(jQuery);