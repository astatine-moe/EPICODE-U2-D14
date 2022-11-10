$(function () {
    request
        .get("https://striveschool-api.herokuapp.com/api/product/")
        .then((data) => {
            if (data.length) {
                let html = ``;
                for (const {
                    name,
                    description,
                    brand,
                    price,
                    updatedAt,
                    createdAt,
                    userId,
                    imageUrl,
                    _id,
                } of data) {
                    html += `<div class="col-md-3 col-4 book">
                    <div class="card bg-dark">
                        <span class="badge badge-danger">${brand}</span>
                        <img src="${imageUrl}" class="img-fluid" />
                        <div class="card-body">
                            <h4 class="card-title">${name}</h4>
                            <p class="card-text">
                                ${description}
                                <br>
                                $${price}
                                <br>
                                <a class="btn btn-primary" href="details.html?_id=${_id}">
                                    <i class="mdi mdi-information"></i>
                                    Details
                                    
                                </a>
                            </p>
                        </div>
                    </div>
                </div>`;
                }

                $("#products").html(html);
            } else {
                $("#products").html("No products found");
            }
        });
});
