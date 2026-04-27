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
    for (let i = 0; i < this.items.length; i++) {
      
      const isAgedBrie = this.items[i].name === 'Aged Brie';
      const isBackstagePasses = this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert';
      const isSulfuras = this.items[i].name === 'Sulfuras, Hand of Ragnaros';


      // if(isAgedBrie){
      //   if (this.items[i].quality < 50)
      // }else if(isBackstagePasses){

      // }else if(isSulfuras){

      // }else{
        
      // }

      if (!isAgedBrie && !isBackstagePasses) {
        if (this.items[i].quality > 0) {
          if (!isSulfuras) {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else if (this.items[i].quality < 50) {
          this.increaseQuality(i);
          
          if (isBackstagePasses) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.increaseQuality(i);

                if (this.items[i].sellIn < 6) this.increaseQuality(i);
              }
            }
        }
      }





      if (!isSulfuras) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      
      if (this.items[i].sellIn < 0) {
        if (!isAgedBrie) {
          if (!isBackstagePasses) {
            if (this.items[i].quality > 0) {
              if (!isSulfuras) {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.increaseQuality(i);
          }
        }
      }
    }

    return this.items;
  }


  private increaseQuality(itemIndex){
    this.items[itemIndex].quality = this.items[itemIndex].quality + 1
  }
}
