
angular.module('myApp',["firebase"])
.constant('FIREBASE_URI','https://dazzling-inferno-1472.firebaseio.com/')
.controller('myCtrl',function($scope,$http){
    var url = 'https://gdata.youtube.com/feeds/api/users/orbitalofficial/uploads?alt=json-in-script&callback=JSON_CALLBACK';
    $http.jsonp(url).success(function(data) {
        $scope.results = data.feed.entry;
    });
    
    $scope.finder = function(entry){
        return ~entry.title.$t.toLowerCase().indexOf($scope.filtering.toLowerCase());
    };
})

.controller('firebaseCtrl',function($scope,ItemFactory){
    $scope.items = ItemFactory.getItems();
    
    $scope.addItem = function(text){
        ItemFactory.addItem({text:text});
    };
    
    $scope.removeItem = function(item){
        ItemFactory.removeItem(item);
    };
    
})

.factory('ItemFactory',function($firebase,FIREBASE_URI){
    var ref = new Firebase(FIREBASE_URI);
    ref = ref.child('items');
    
    var sync = $firebase(ref);
    var items = sync.$asArray();
    
    var getItems = function () {
        return items;
    }
    
    var addItem = function(item){
        items.$add(item);
    }
    
    var removeItem = function(item){
        console.log(item);
        items.$remove(item);
    }
    
    var updateItem = function(id){
        
    }
    
    return{
        getItems: getItems,
        addItem: addItem,
        removeItem: removeItem
    }
    
});