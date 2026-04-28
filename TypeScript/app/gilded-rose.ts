export class Item {
  name: string;
  sellIn: number;
  quality: number;
  
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  
  constructor(items = [] as Array<Item>) {
    this.items = items;
  }
  
  updateQuality() {
    const QUALITY_MAX : number = 50;
    

    for (let i = 0; i < this.items.length; i++) {
      
      const isAgedBrie = this.items[i].name === 'Aged Brie';
      const isBackstagePasses = this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert';
      const isSulfuras = this.items[i].name === 'Sulfuras, Hand of Ragnaros';
      
      if (isBackstagePasses) {
        if (this.items[i].sellIn < 6){
          this.increaseQuality(i, 3);
        }else if(this.items[i].sellIn < 11){ 
          this.increaseQuality(i, 2);
        }else{
          this.increaseQuality(i,1);
        }
        
        if (this.items[i].quality > QUALITY_MAX) this.items[i].quality = QUALITY_MAX;

        this.items[i].sellIn--;
        if (this.items[i].sellIn < 0) this.items[i].quality = 0;


      }else if(isAgedBrie){ 
        if (this.items[i].quality < QUALITY_MAX) this.increaseQuality(i,1);

        this.items[i].sellIn = this.items[i].sellIn - 1;

        if (this.items[i].sellIn < 0 && (this.items[i].quality < QUALITY_MAX))this.increaseQuality(i,1);
        
      }else{

          if (this.items[i].quality > 0) {
            if (!isSulfuras) {
              this.decreaseQuality(i)
            }
          }
       

      }
      
      
      
      
      
      if (!isSulfuras && !isBackstagePasses && !isAgedBrie) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      
      
      if (this.items[i].sellIn < 0) {
        if (!isAgedBrie) {
            if (this.items[i].quality > 0) {
              if (!isSulfuras) {
                this.decreaseQuality(i)
              }
            }
        } 
        
      }
    }
    
    return this.items;
  }
  
  
  private increaseQuality(itemIndex, increaseAmount){
    this.items[itemIndex].quality = this.items[itemIndex].quality + increaseAmount;
  }
  
  private decreaseQuality(itemIndex){
    this.items[itemIndex].quality = this.items[itemIndex].quality - 1
  }
}
