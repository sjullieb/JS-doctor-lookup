import { Tamagotchi } from "./../src/tamagotchi.js"

describe('Tamagotchi', function() {

  let tama;
  let timerUnit = 1000;

  beforeEach(function(){
    tama = new Tamagotchi("Tama", timerUnit);
    jasmine.clock().install();
    tama.start();
  });

  afterEach(function(){
    jasmine.clock().uninstall();
  })

  it('should test whether tamagotchis hunger increases', function() {
    jasmine.clock().tick(timerUnit+1);
    expect(tama.hunger).toEqual(1);
  });
});
