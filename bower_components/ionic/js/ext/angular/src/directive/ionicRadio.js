(function(ionic) {
'use strict';

angular.module('ionic.ui.radio', [])

/**
 * @ngdoc directive
 * @name ionRadio
 * @module ionic
 * @restrict E
 * @description
 * No different than the HTML radio input, except it's styled differently.
 *
 * Behaves like any [AngularJS radio](http://docs.angularjs.org/api/ng/input/input[radio]).
 *
 * @usage
 * ```html
 * <ion-radio ng-model="choice" value="A">Choose A</ion-radio>
 * <ion-radio ng-model="choice" value="B">Choose B</ion-radio>
 * <ion-radio ng-model="choice" value="C">Choose C</ion-radio>
 * ```
 */
.directive('ionRadio', function() {
  return {
    restrict: 'E',
    replace: true,
    require: '?ngModel',
    scope: {
      ngModel: '=?',
      ngValue: '=?',
      ngChange: '&',
      icon: '@'
    },
    transclude: true,
    template: '<label class="item item-radio">' +
                '<input type="radio" name="radio-group"' +
                ' ng-model="ngModel" ng-value="ngValue" ng-change="ngChange()">' +
                '<div class="item-content disable-pointer-events" ng-transclude></div>' +
                '<i class="radio-icon disable-pointer-events icon ion-checkmark"></i>' +
              '</label>',

    compile: function(element, attr) {
      if(attr.name) element.children().eq(0).attr('name', attr.name);
      if(attr.icon) element.children().eq(2).removeClass('ion-checkmark').addClass(attr.icon);
    }
  };
})

// The radio button is a radio powered element with only
// one possible selection in a set of options.
.directive('ionRadioButtons', function() {
  return {
    restrict: 'E',
    replace: true,
    require: '?ngModel',
    scope: {
      value: '@'
    },
    transclude: true,
    template: '<div class="button-bar button-bar-inline" ng-transclude></div>',

    controller: ['$scope', '$element', function($scope, $element) {

      this.select = function(element) {
        var c, children = $element.children();
        for(var i = 0; i < children.length; i++) {
          c = children[i];
          if(c != element[0]) {
            c.classList.remove('active');
          }
        }
      };

    }],

    link: function($scope, $element, $attr, ngModel) {
      var radio;

      if(ngModel) {
        //$element.bind('tap', tapHandler);

        ngModel.$render = function() {
          var children = $element.children();
          for(var i = 0; i < children.length; i++) {
            children[i].classList.remove('active');
          }
          $scope.$parent.$broadcast('radioButton.select', ngModel.$viewValue);
        };
      }
    }
  };
})

.directive('ionButtonRadio', function() {
  return {
    restrict: 'CA',
    require: ['?^ngModel', '?^ionRadioButtons'],
    link: function($scope, $element, $attr, ctrls) {
      var ngModel = ctrls[0];
      var radioButtons = ctrls[1];
      if(!ngModel || !radioButtons) { return; }

      var setIt = function() {
        $element.addClass('active');
        ngModel.$setViewValue($scope.$eval($attr.ngValue));

        radioButtons.select($element);
      };

      var clickHandler = function(e) {
        setIt();
      };

      $scope.$on('radioButton.select', function(e, val) {
        if(val == $scope.$eval($attr.ngValue)) {
          $element.addClass('active');
        }
      });

      ionic.on('tap', clickHandler, $element[0]);

      $scope.$on('$destroy', function() {
        ionic.off('tap', clickHandler);
      });
    }
  };
});

})(window.ionic);
