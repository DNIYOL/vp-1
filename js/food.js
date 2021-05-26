class Food{

    constructor(){
        //this.foodStock;
        this.image = loadImage("images/Milk.png");
        // this.lastFed;
    }

    updateFoodStock(FStk){
        database.ref('/').update({
            FOOD:FStk
        })
    }


    deductFood() {
        // if(x<=0){
        //     x=0;
        // }else{
        //     x=x-1;
        // }
        
        // database.ref('/').update({
        //     FOOD:x
        //   })
    }

    getFoodStock() {
        var foosStk  = database.ref('FOOD');
        foosStk.on("value",function(data){
            foodStock=data.val();
        })
        //console.log(foodStock);
    }

    display() {
        var x=80, y=100;
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        //console.log(foodStock)
        if(this.foodStock!=0){
            for(var i=0;i<foodStock;i++){
                //console.log(i)
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                //console.log(x+' -- '+y);
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }


    }


}