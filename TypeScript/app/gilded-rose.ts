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


abstract class BaseItem {
  constructor(protected item:Item){
  }
  
  abstract update():void;
  
  protected increaseQuality(increaseAmount){
    this.item.quality += increaseAmount;
    if (this.item.quality > 50) this.item.quality = 50;
  }
  
  protected decreaseQuality(decreaseAmount){
    this.item.quality -= decreaseAmount;
    if (this.item.quality <0 ) this.item.quality = 0;
  }
}

class AgedBrieItem extends BaseItem{
  update(){
    this.item.sellIn--;
    
    this.increaseQuality(1);
    if (this.item.sellIn < 0) {
      this.increaseQuality(1);
    }
  }
}

class RegularItem extends BaseItem{
  
  update(){
    this.item.sellIn--;
    
    this.decreaseQuality(1);
    
    if (this.item.sellIn < 0) this.decreaseQuality(1)    
    }
}

class BackstagePassItem extends BaseItem{
  
  update(){
    this.item.sellIn--;
    
    if (this.item.sellIn < 0){
      this.item.quality = 0;
      return;
    }
    
    if (this.item.sellIn < 5){
      this.increaseQuality(3);
    }else if(this.item.sellIn < 10){
      this.increaseQuality(2);
    }else{
      this.increaseQuality(1);
    }
  }
}

class SulfurasItem extends BaseItem{
  
  update(){}
}

class Factory{  
  static create(item:Item):BaseItem{
    switch(item.name){
      case 'Aged Brie':
      return new AgedBrieItem(item);
      case 'Backstage passes to a TAFKAL80ETC concert':
      return new BackstagePassItem(item);
      case 'Sulfuras, Hand of Ragnaros':
      return new SulfurasItem(item);
      default:
      return new RegularItem(item);
    }
  }
}


export class GildedRose {
  items: Array<Item>;
  
  constructor(items = [] as Array<Item>) {
    this.items = items;
  }
  
  updateQuality() {
    
    for (let i = 0; i < this.items.length; i++) {
      const item = Factory.create(this.items[i])
      item.update();
    }
    
    return this.items;
  }
}
