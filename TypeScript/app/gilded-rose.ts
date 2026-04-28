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
      
      const item = this.items[i];
      
      const isAgedBrie = item.name === 'Aged Brie';
      const isBackstagePasses = item.name === 'Backstage passes to a TAFKAL80ETC concert';
      const isSulfuras = item.name === 'Sulfuras, Hand of Ragnaros';

      if(isSulfuras) continue;
      
      if (isBackstagePasses) {
        if (item.sellIn < 6){
          this.increaseQuality(i, 3);
        }else if(item.sellIn < 11){ 
          this.increaseQuality(i, 2);
        }else{
          this.increaseQuality(i,1);
        }
        
        item.sellIn--;
        
        if (item.sellIn < 0) item.quality = 0;
          
      }else {
        item.sellIn--;
        
        if(isAgedBrie){ 
          
          (item.sellIn < 0) ? this.increaseQuality(i,2) : this.increaseQuality(i,1);
          
        }else{
          if (item.quality > 0){
            this.decreaseQuality(i)
            if (item.sellIn < 0) this.decreaseQuality(i)
          }
          }
      }
      
    }
    
    return this.items;
  }
  
  
  private increaseQuality(itemIndex, increaseAmount){
    this.items[itemIndex].quality = this.items[itemIndex].quality + increaseAmount;
    if (this.items[itemIndex].quality > 50) this.items[itemIndex].quality = 50;
  }
  
  private decreaseQuality(itemIndex){
    this.items[itemIndex].quality = this.items[itemIndex].quality - 1
  }
}
