const APP = require('./configs/server');
const PORT = process.env.PORT || 3000;
const IP_BIND = process.env.IP || '0.0.0.0';

String.prototype.format = function () {
    var args = [].slice.call(arguments);
    return this.replace(/(\{\d+\})/g, function (a){
        return args[+(a.substr(1,a.length-2))||0];
    });
};

APP.listen(PORT, IP_BIND, () => console.log(`Server running on http://${IP_BIND}:${PORT}/`));
