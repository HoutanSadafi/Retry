
(function(){

        function Retry(delay, func){
 
                if ( !(this instanceof Retry) ){
                        return new Retry(delay, func);
                }
         
                if (func.constructor !== Function){
                        throw {
                                name: "Invalid Argument type",
                                message : "type must be Function"
                        }
                }
         
                this.func = func;
                this.delay = delay || [];
        };
 
        Retry.prototype.start = function() {
                var self = this;
         
                this.stopped = false;
                
                var time = this.delay.shift();
                this.id = setTimeout(function execute(){
                        self.func.call(self);
                        if (!self.stopped) {
                                var time = self.delay.shift();
                                if (time !== undefined) { 
                                        self.id = setTimeout(execute, time); 
                                }
                        }
                }, time);
        };
         
        Retry.prototype.stop = function() {
                clearTimeout(this.id);
                this.stopped = true;
        };

        this.Retry = Retry;

})();