$(document).on("ready", function(){
    databaseHandler.createDatabase();
});
function addProduct(){
    var name = $("#txtName").val();
    var quantity = $("#txtQuantity").val();

    if(!name){
        alert("Name is required");
    }else{
        var r = confirm("Name: " + name + "\n" + "Quantity: " + quantity);
        if(r==true){
            productHandler.addProduct(name, quantity);
            $("#txtName").val("");
            $("#txtQuantity").val("");
        }
    }
}
var currentProduct={
id: -1,
name: "",
quantity:-1,
}
function displayProducts(results){
    var length = results.rows.length;
    var lstProducts = $("#lstProducts");
    lstProducts.empty();//Clean the old data before adding.
    for(var i = 0; i< length; i++){
        var item = results.rows.item(i);
        var a = $("<a />");
        var h3 = $("<h3 />").text("Product name: ");
        var h4 = $("<h4 />").text("Quantity: ");
        var p = $("<p />").text("Id: ");
        var spanName = $("<span />").text(item.name);
        spanName.attr("name", "name");
        var spandQuantity = $("<span />").text(item.quantity);
        spandQuantity.attr("name", "quantity");
        var spanId = $("<span />").text(item._id);
        spanId.attr("name", "_id");
        h3.append(spanName);
        h4.append(spandQuantity);
        p.append(spanId);
        a.append(h3);
        a.append(h4);
        a.append(p);
        var li = $("<li/>");
        li.attr("data-filtertext", item.name);
        li.append(a);
        lstProducts.append(li);
    }
    lstProducts.listview("refresh");
    lstProducts.on("tap", "li", function(){
        currentProduct.id = $(this).find("[name='_id']").text();
        currentProduct.name = $(this).find("[name='name']").text();
        currentProduct.quantity = $(this).find("[name='quantity']").text();
        //Set event for the list item
        $("#popupUpdateDelete").popup("open");
    });
}

$(document).on("pagebeforeshow", "#loadpage", function(){
    productHandler.loadProducts(displayProducts);
});

function deleteProduct(){
    var r = confirm("Delete product\nName: "+currentProduct.name+
                    "\nQuantity: " + currentProduct.quantity);
    if(r==true){
        productHandler.deleteProduct(currentProduct.id);
        productHandler.loadProducts(displayProducts);
    }
    $("#popupUpdateDelete").popup("close");
}

$(document).on("pagebeforeshow", "#updatedialog", function(){
    $("#txtNewName").val(currentProduct.name);
    $("#txtNewQuantity").val(currentProduct.quantity);
});

function updateProduct(){
    var newName = $("#txtNewName").val();
    var newQuantity = $("#txtNewQuantity").val();
    productHandler.updateProduct(currentProduct.id, newName, newQuantity);
    $("#updatedialog").dialog("close");
}