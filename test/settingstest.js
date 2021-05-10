var expect = require('chai').expect;
var formatDate = require('../test');

describe('formatDate()', function(){
    it('should get the date', function(){
        //Arrange
        var date = new Date(2021,1,1,12,0,0,0);
        
        //act 
        var date1 = formatDate(date);

        //Assert 
        var fullyear = "2021-01-01";
        /* expect(fullyear).to.Throw(date); */
        expect(date1).to.equal(fullyear);
    })
})