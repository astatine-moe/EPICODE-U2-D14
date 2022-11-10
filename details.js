$(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const _id = urlParams.get("_id");

    request
        .get(uri + _id)
        .then((data) => {
            console.log(data);
            if (!data) {
                window.location.href = "index.html";
            } else {
                $(".container img").attr("src", data.imageUrl);
                $(".container h3").text(data.name);
                $(".container p").text(data.description);
                $(".container span").text("$" + data.price);
            }
        })
        .catch((err) => {
            window.location.href = "index.html";
        });
});
