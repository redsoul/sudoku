angular.module('Sudoku').factory('TimerService', ['$rootScope', '$timeout',

    function ($rootScope, $timeout) {
        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        var t;

        $rootScope.timeString = "00:00:00";

        function clear() {
            $rootScope.timeString = "00:00:00";
            seconds = 0;
            minutes = 0;
            hours = 0;
        }

        function add() {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }

            $rootScope.timeString = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

            timer();
        }

        function timer() {
            t = $timeout(add, 1000);
        }

        function stop() {
            if (t) {
                $timeout.cancel(t);
            }
        }

        return {
            start: timer,
            stop: stop,
            clear: clear,
            reset: function () {
                stop();
                clear();
                timer();
            }
        }
    }]);