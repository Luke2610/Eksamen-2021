var expect = require('chai').expect;
var formatDate = require('../test');

describe('formatDate()', function(){
    it('should get the date', function(){
        //Arrange - opstil data
        var date = new Date(2021,1,1,12,0,0,0);
        
        //act - opstil funktion
        var date1 = formatDate(date);

        //Assert - sikrer at formatet fra date opfyldes
        var fullyear = "2021-01-01";
        /* expect(fullyear).to.Throw(date); */
        // test af funktion - forventning af resultat
        expect(date1).to.equal(fullyear);
    })
})