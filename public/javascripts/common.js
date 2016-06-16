$(function() {
    if($('.back_btn')) {
        $('.back_btn').click(function() {
            if(history.length > 1) {
                history.go(-1);
            } else {
                window.location.href = '/';
            }
        });
    }
})
