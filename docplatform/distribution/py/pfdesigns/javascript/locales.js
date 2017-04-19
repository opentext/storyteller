"use strict";

var repo = require('repo');

function init_data(api_key) {
    //
    // Online Exchange Rates API
    //
    // see https://openexchangerates.org/
    //
    var local_uri = 'wd:/rates.json';
    if (api_key) {
        var remote_uri = 'http://openexchangerates.org/api/latest.json?app_id=' + api_key;
        var data = repo.load(remote_uri);
        repo.save(local_uri, data);
        return data;
    } else {
        return repo.load(local_uri);
    }
}

function init_money(data) {
    var money = require('money');
    if (money.rates.length) {
        throw new Error("Currency rates conflict!");
    }
    var rates = JSON.parse(data);
    money.base = rates.base;
    money.rates = rates.rates;
    return money;
}

// key => download latest rates
// null => use local cache
var api_key = null; // '7adaaab5ebf0490eb871b8553aa283b5';

var money = init_money(init_data(api_key));

var accounting = require('accounting');

// Comes from http://www.localeplanet.com/api/auto/currencymap.json
var currencies = JSON.parse(repo.load("wd:/currencies.json"));

var moment = require('moment');

exports.reformat_date = function (value, locale, from, to) {
    var m = moment(value, from);
    m.locale(locale);
    return m.format(to);
};

exports.reformat_money = function (value, locale, from) {
    from = from || "USD";
    var currency = currencies[locale];
    value = accounting.unformat(value);
    value = money.convert(value, {from: from, to: currency.code});
    var options = {
        symbol: currency.symbol_native,
        decimal: currency.decimal,
        thousand: currency.group,
        precision: currency.decimal_digits,
        format: currency.format
    };
    return accounting.formatMoney(value, options);
};
