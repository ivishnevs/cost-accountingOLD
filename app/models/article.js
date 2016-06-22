import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  items: hasMany('article', { inverse: 'parent' }),
  parent: belongsTo('article', { inverse: 'items' }),

  title: attr('string'),
  cost: attr('number', { defaultValue: 0 }),

  isParent: Ember.computed('items', function(){
    var items = this.get('items').toArray();
    if(items.length){
      return true;
    }
  }),

  isRoot: Ember.computed('parent', function(){
    var parent = this.get('parent');
    if(!parent.get('title')){
      return true;
    }
  }),

  amountCost: Ember.computed('cost', 'items.@each.amountCost', function() {
    var items = this.get('items').toArray();
    var amount = +this.get('cost');

    for(let i=0; i<items.length; i++){
      amount += +items[i].get('amountCost');
    }
    return amount;
  })

});
