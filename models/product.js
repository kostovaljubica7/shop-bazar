const products = [];

module.exports = class Product {
    constructor(name,image,description,price){
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
    }

    save(){
        this.id = Math.random().toString();
        products.push(this);
    }

    static fetchAll(){
        return products;
    }
    static findById(id,cb){
        var product = [];
        products.forEach(element => {
            if(element.id==id)
                product = element;
        });
        cb(product);
    }

}