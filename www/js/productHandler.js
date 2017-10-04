var productHandler={
addProduct: function(name, quantity){
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "insert into product(name, quantity) values(?, ?)",
                [name, quantity],
                function(tx, results){},
                function(tx, error){
                    console.log("add product error: " + error.message);
                }
            );
        },
        function(error){},
        function(){}
    );
},
loadProducts: function(displayProducts){
    databaseHandler.db.readTransaction(
        function(tx){
            tx.executeSql(
                "select * from product",
                [],
                function(tx, results){
                    //Do the display
                    displayProducts(results);
                },
                function(tx, error){//TODO: Alert the message to user
                    console.log("Error while selecting the products" + error.message);
                }
            );
        }
    );
},
deleteProduct:function(_id){
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "delete from product where _id = ?",
                [_id],
                function(tx, results){},
                function(tx, error){//TODO: Could make an alert for this one.
                    console.log("Error happen when deleting: " + error.message);
                }
            );
        }
    );
},
updateProduct: function(_id, newName, newQuantity){
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "update product set name=?, quantity=? where _id = ?",
                [newName, newQuantity, _id],
                function(tx, result){},
                function(tx, error){//TODO: alert/display this message to user
                    console.log("Error updating product" + error.message);
                }
            );
        }
    );
}
};