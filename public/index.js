(function ($) {
    var
        $form = $('form'),
        $uploadButton = $form.find('#uploadButton'),
        $progress = $form.find('progress');
    $uploadButton.on('click', function () {
        var $button = $(this),
            $form = $button.closest('form'),
            $inputFile = $form.find(':input').filter('[type=file]'),
            fileFormData = new FormData();
        $inputFile.each(function () {
            if (!this.files) {
                return this;
            }
            $.each(this.files, function (key, val) {
                fileFormData.append(key, val);
            });
        });
        $.ajax({
            type: 'POST',
            url: '/upload',
            dataType: 'json',
            processData: false, // Dont process the files
            contentType: false, // Its a query string request
            xhr: function () {  // Custom XMLHttpRequest
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { // Check if upload property exists
                    myXhr.upload.addEventListener('progress', function (event) {
                        if (event.lengthComputable) {
                            $progress.attr({
                                value: event.loaded,
                                max: event.total
                            });
                        }
                    }, false); // For handling the progress of the upload
                }
                return myXhr;
            },
            data: fileFormData,
            success: function (res) {

            }
        });
    });
})(jQuery);
