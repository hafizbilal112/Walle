angular.module('Walle')
    .factory('$transactions', function ($categories, $colors) {
        return {
            get: function (id) {
                if (id) {
                    var transactions = [];
                    if (localStorage.getItem('transactions') == null) {
                        localStorage.setItem('transactions', JSON.stringify(transactions));
                    }
                    else {
                        transactions = JSON.parse(localStorage.getItem('transactions'));
                        transactions=transactions.map(function (v) {
                            v.cat=$categories.get(v.cat);
                            return v
                        })
                    }
                    return transactions.filter(function (v) {
                        return v.id == id
                    })[0];
                }
                else {
                    var transactions = [];
                    if (localStorage.getItem('transactions') == null) {
                        localStorage.setItem('transactions', JSON.stringify([]));
                    }
                    else {
                        transactions = JSON.parse(localStorage.getItem('transactions'));
                        transactions=transactions.map(function (v) {
                            v.cat=angular.copy($categories.get(v.cat));
                            v.cat.color=angular.copy($colors.get(v.cat.color));
                            return v
                        })
                    }
                    return transactions;
                }
            },
            set: function (arg) {
                if (angular.isArray(arg)) {
                    var transactions = arg;
                    if (localStorage.getItem('transactions') == null) {
                        localStorage.setItem('transactions', JSON.stringify(transactions));
                    } else {
                        transactions = JSON.parse(localStorage.getItem('transactions'));
                    }
                    return transactions
                } else {
                    var transactions = [];
                    if (localStorage.getItem('transactions') == null) {
                        localStorage.setItem('transactions', JSON.stringify(transactions));
                    } else {
                        transactions = JSON.parse(localStorage.getItem('transactions'));
                    }
                    transactions.push(arg);
                    localStorage.setItem('transactions', JSON.stringify(transactions));
                }
            },
            remove: function (obj) {
                var transactions = JSON.parse(localStorage.getItem('transactions'));
                transactions.forEach(function (v,i) {
                    if(v.date==obj.date){
                        transactions.splice(i,1)
                    }
                });
                localStorage.setItem('transactions', JSON.stringify(transactions));
            }
        }
    });
