const users = [{
    name: 'kostova@pabau.com',
    password: '123456'
}];

module.exports = class User {
    constructor(name,email){
        this.name = name;
        this.email = email;
    }

    save(){
        this.id = Math.random().toString();
        users.push(this);
    }

    static findByEmail(name, cb){
        // var user = [];
        // users.forEach(element => {
        //     console.info(element,name);
        //     if(element.name==name)
        //         return element;
        // });

        const i = users.find(cp => {
            if(cp.name.toString() === name)
                return cp;
          });
          console.info('hi from find by email:',i,users);

        cb(i);

    
        // user.email = 'kostova@pabau.com';
        // user.password = '123456';
        // // cb(user);
        // return null;
    }

    static fetchAll(){
        return users;
    }

    static findMe(userId){
        var user = [];
        user.email = 'kostova@pabau.com';
        user.password = '123456';
        return user;
    }


}