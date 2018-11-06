'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let peeps = [];
    function isSuperevent(superevent, event) {
        return event.indexOf(superevent) === 0 &&
            (event.length === superevent.length || event[superevent.length] === '.');
    }

    return {

        /*
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         */
        on: function (event, context, handler) {
            peeps.push({
                event,
                context,
                handler
            });

            return this;
        },


        off: function (event, context) {
            peeps = peeps.filter((subscription) => {
                return subscription.context !== context ||
                    !isSuperevent(event, subscription.event);
            });

            return this;
        },


        emit: function (event) {
            const suitableSubscriptions = peeps.filter((subscription) => {
                return isSuperevent(subscription.event, event);
            });
            suitableSubscriptions.sort((a, b) => {
                return a.event.split('.').length < b.event.split('.').length;
            });
            for (let subscription of suitableSubscriptions) {
                subscription.handler.call(subscription.context);
            }


        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
