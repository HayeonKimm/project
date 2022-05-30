module.exports = {


    


    password_test2 : (value) => {

        var nickname = "하연";

        if (value.split(nickname).length>1){
                
            return false;
        }else{

            return true;
        }
    }

};