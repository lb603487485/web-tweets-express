function requireDelete(tweet_id) {
    $.ajax({
        url: '/tweets/delete/'+tweet_id,
        type: 'DELETE',
        success(res) {
            console.log(res);
            if (res.success) location.reload();
        }
    });
};

function requireUpdate(tweet_id, content) {
    $.ajax({
        url: '/tweets/update/'+tweet_id,
        type: 'PUT',
        data: {
            content: content
        },
        success(res) {
            console.log(res);
            if (res.success) location.href = document.referrer;
        }
    });
}
