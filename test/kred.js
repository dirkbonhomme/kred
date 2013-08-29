var expect = require('expect.js');
var sinon = require('sinon');
var http = require('http');
var Kred = require('../lib/kred');

describe('Kred', function(){

    var kred, kredRequest, httpGet;
    beforeEach(function(){
        kred = new Kred('appid', 'appkey');
        kredRequest = sinon.spy(kred, 'request');
        httpGet = sinon.stub(http, 'get', function(){
            return {on: function(){}};
        });
    });

    afterEach(function(){
        http.get.restore();
    });

    it('should throw error on omitted app id', function(){
        try{
            new Kred();
            throw 'Should not reach this line';
        }catch(e){}
    });

    it('should throw error on omitted app key', function(){
        try{
            new Kred('appid');
            throw 'Should not reach this line';
        }catch(e){}
    });

    it('should set defaults on omitted config', function(){
        expect(kred.protocol).to.be('http');
        expect(kred.host).to.be('api.kred.com');
        expect(kred.port).to.be(80);
    });

    it('should set custom config', function(){
        var kred = new Kred('appid', 'appkey', {
            protocol: 'https',
            host: 'example.com',
            port: 123
        });
        expect(kred.protocol).to.be('https');
        expect(kred.host).to.be('example.com');
        expect(kred.port).to.be(123);
    });

    it('should pass pass correct endpoint for kredscore', function(){
        kred.kredscore({});
        expect(kredRequest.args[0][0]).to.be('kredscore');
    });

    it('should pass pass correct endpoint for kred', function(){
        kred.kred({});
        expect(kredRequest.args[0][0]).to.be('kred');
    });

    it('should pass pass correct endpoint for kredentials', function(){
        kred.kredentials({});
        expect(kredRequest.args[0][0]).to.be('kredentials');
    });

    it('should pass pass correct endpoint for dailyscore', function(){
        kred.dailyscore({});
        expect(kredRequest.args[0][0]).to.be('dailyscore');
    });

    it('should pass pass correct endpoint for dailypoints', function(){
        kred.dailypoints({});
        expect(kredRequest.args[0][0]).to.be('dailypoints');
    });

    it('should pass pass correct endpoint for activityStream', function(){
        kred.activityStream({});
        expect(kredRequest.args[0][0]).to.be('activity-stream');
    });

    it('should pass pass correct endpoint for friendStream', function(){
        kred.friendStream({});
        expect(kredRequest.args[0][0]).to.be('FriendStream');
    });

    it('should pass pass correct endpoint for kredinfluence', function(){
        kred.kredinfluence({});
        expect(kredRequest.args[0][0]).to.be('kredinfluence');
    });

    it('should pass pass correct endpoint for kredoutreach', function(){
        kred.kredoutreach({});
        expect(kredRequest.args[0][0]).to.be('kredoutreach');
    });

    it('should pass pass correct endpoint for kredretweetinfluence', function(){
        kred.kredretweetinfluence({});
        expect(kredRequest.args[0][0]).to.be('kredretweetinfluence');
    });

    it('should use all parameters in request uri', function(){
        kred.kredscore({foo: 'bar'});
        expect(httpGet.lastCall.args[0]).to.be('http://api.kred.com:80/kredscore?foo=bar&app_id=appid&app_key=appkey');
    });
});