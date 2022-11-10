$("#product-form").on("submit", (e) => {
    e.preventDefault(); //prevent form from submitting

    const inputs = $("#product-form");

    const name = inputs.find("#name").val().trim();
    const desc = inputs.find("#description").val().trim();
    const imageURL = inputs.find("#imageurl").val().trim();
    const price = inputs.find("#price").val().trim();
    const brand = inputs.find("#brand").find(":selected").val();

    const data = {
        name,
        description: desc,
        brand,
        price,
        imageUrl: imageURL,
    };

    request
        .post(uri, data)
        .then((data) => {
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
});

$("#edit-product-form").on("submit", (e) => {
    e.preventDefault(); //prevent form from submitting

    const inputs = $("#edit-product-form");

    const name = inputs.find("#editname").val().trim();
    const id = inputs.find("#product_id").val().trim();
    const desc = inputs.find("#editdescription").val().trim();
    const imageURL = inputs.find("#editimageurl").val().trim();
    const price = inputs.find("#editprice").val().trim();
    const brand = inputs.find("#editbrand").find(":selected").val();

    const data = {
        name,
        description: desc,
        brand,
        price,
        imageUrl: imageURL,
    };

    request
        .put(uri + id, data)
        .then((data) => {
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
});

const events = () => {
    $('[data-action="edit"]').on("click", function (e) {
        $("main").hide();
        const _id = $(this).data("objectid");
        request
            .get(uri + _id)
            .then(({ name, description, imageUrl, price, brand }) => {
                const modal = $("#editProduct");
                modal.find("h5").text("Editing: " + name);
                $("#editname").val(name);
                $("#editdescription").val(description);
                $("#editimageurl").val(imageUrl);
                $("#editprice").val(price);
                $("#editbrand").val(brand);
                $("#product_id").val(_id);
                modal.modal();
            })
            .catch((err) => {
                alert("Error fetching, check console");
                console.error(err);
            })
            .finally(() => {
                $("main").show();
            });
    });
    $('[data-action="delete"]').on("click", function (e) {
        const col = $(this).closest(".col-md-3");
        const _id = $(this).data("objectid");
        request
            .delete(uri + _id)
            .then(() => {
                col.remove();
            })
            .catch((err) => {
                alert("Error deleting, check console");
                console.error(err);
            });
    });
};

$(function () {
    request
        .get("https://striveschool-api.herokuapp.com/api/product/")
        .then((data) => {
            if (data.length) {
                let html = ``;
                for (const {
                    _id,
                    name,
                    description,
                    brand,
                    price,
                    updatedAt,
                    createdAt,
                    userId,
                    imageUrl,
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
                                <div class="btn-group">
                                    <button class="btn btn-primary" data-action="edit" data-objectid="${_id}">
                                        <i class="mdi mdi-pencil"></i>
                                        Edit
                                        
                                    </button>
                                    <button class="btn btn-danger" data-action="delete" data-objectid="${_id}">
                                        <i class="mdi mdi-trash-can"></i>
                                        Delete
                                        
                                    </button>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>`;
                }

                $("#products").html(html);

                events();
            } else {
                $("#products").html("No products found");
            }
        });
});
